// Multiplayer Game Management
class MultiplayerManager {
    constructor() {
        this.currentGame = null;
        this.currentTeam = null;
        this.isHost = false;
        this.gameListeners = new Map();
        this.leaderboardUpdate = null;
    }

    // Create a new multiplayer game
    async createGame(gameTitle, maxTeams, hostTeamName, hostTeamSize) {
        try {
            const roomCode = FirebaseUtils.generateRoomCode();
            const gameId = `game_${roomCode}_${Date.now()}`;
            
            const gameData = {
                id: gameId,
                roomCode: roomCode,
                title: gameTitle,
                maxTeams: parseInt(maxTeams),
                hostTeamId: null, // Will be set after team is created
                status: 'waiting', // waiting, playing, finished
                createdAt: FirebaseUtils.timestamp(),
                startedAt: null,
                endedAt: null,
                teams: {},
                settings: {
                    allowHints: true,
                    timeLimit: null,
                    difficulty: 'normal'
                }
            };

            // Create the game in Firebase
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            await gameRef.set(gameData);

            // Add the host team
            const teamData = await this.joinGameAsTeam(gameId, hostTeamName, hostTeamSize, true);
            
            // Update game with host team ID
            await gameRef.update({ hostTeamId: teamData.id });

            this.currentGame = { ...gameData, hostTeamId: teamData.id };
            this.currentTeam = teamData;
            this.isHost = true;

            showNotification(`Game created! Room code: ${roomCode}`, 'success');
            return { gameId, roomCode, teamData };

        } catch (error) {
            console.error('Error creating game:', error);
            showNotification('Failed to create game. Please try again.', 'error');
            throw error;
        }
    }

    // Join an existing game with room code
    async joinGame(roomCode, teamName, teamSize) {
        try {
            if (!FirebaseUtils.isValidRoomCode(roomCode)) {
                throw new Error('Invalid room code format');
            }

            // Find game by room code
            const gameId = await this.findGameByRoomCode(roomCode);
            if (!gameId) {
                throw new Error('Game not found');
            }

            // Check if game is available for joining
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            const gameSnapshot = await gameRef.once('value');
            const gameData = gameSnapshot.val();

            if (!gameData) {
                throw new Error('Game not found');
            }

            if (gameData.status !== 'waiting') {
                throw new Error('Game has already started or ended');
            }

            const teamCount = Object.keys(gameData.teams || {}).length;
            if (teamCount >= gameData.maxTeams) {
                throw new Error('Game is full');
            }

            // Join as team
            const teamData = await this.joinGameAsTeam(gameId, teamName, teamSize, false);
            
            this.currentGame = gameData;
            this.currentTeam = teamData;
            this.isHost = false;

            showNotification(`Joined game: ${gameData.title}`, 'success');
            return { gameId, teamData };

        } catch (error) {
            console.error('Error joining game:', error);
            showNotification(`Failed to join game: ${error.message}`, 'error');
            throw error;
        }
    }

    // Add a team to a game
    async joinGameAsTeam(gameId, teamName, teamSize, isHost) {
        try {
            const teamId = `team_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
            const userId = window.currentUser?.uid || 'anonymous_' + Date.now();

            const teamData = {
                id: teamId,
                name: teamName,
                size: parseInt(teamSize),
                userId: userId,
                isHost: isHost,
                joinedAt: FirebaseUtils.timestamp(),
                status: 'waiting', // waiting, playing, completed, disconnected
                progress: {
                    sealsCompleted: [],
                    keywords: [],
                    currentSeal: null,
                    startTime: null,
                    completionTime: null,
                    hintsUsed: 0
                },
                score: 0
            };

            // Add team to the game
            const teamRef = FirebaseUtils.ref(`games/${gameId}/teams/${teamId}`);
            await teamRef.set(teamData);

            return teamData;

        } catch (error) {
            console.error('Error adding team to game:', error);
            throw error;
        }
    }

    // Find game by room code
    async findGameByRoomCode(roomCode) {
        try {
            const gamesRef = FirebaseUtils.ref('games');
            const snapshot = await gamesRef.orderByChild('roomCode').equalTo(roomCode).once('value');
            const games = snapshot.val();
            
            if (games) {
                const gameIds = Object.keys(games);
                return gameIds[0]; // Return the first (should be only) match
            }
            
            return null;
        } catch (error) {
            console.error('Error finding game:', error);
            return null;
        }
    }

    // Start a multiplayer game (host only)
    async startGame(gameId) {
        if (!this.isHost) {
            throw new Error('Only the host can start the game');
        }

        try {
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            const updates = {
                status: 'playing',
                startedAt: FirebaseUtils.timestamp()
            };

            // Start the game for all teams
            const gameSnapshot = await gameRef.once('value');
            const gameData = gameSnapshot.val();
            
            if (gameData && gameData.teams) {
                Object.keys(gameData.teams).forEach(teamId => {
                    updates[`teams/${teamId}/status`] = 'playing';
                    updates[`teams/${teamId}/progress/startTime`] = FirebaseUtils.timestamp();
                });
            }

            await gameRef.update(updates);

            showNotification('Game started! Good luck!', 'success');
            return true;

        } catch (error) {
            console.error('Error starting game:', error);
            showNotification('Failed to start game. Please try again.', 'error');
            throw error;
        }
    }

    // Update team progress
    async updateTeamProgress(gameId, teamId, progressData) {
        try {
            const teamRef = FirebaseUtils.ref(`games/${gameId}/teams/${teamId}/progress`);
            await teamRef.update(progressData);

            // Check if this is a seal completion
            if (progressData.sealsCompleted) {
                await this.checkGameCompletion(gameId, teamId);
            }

        } catch (error) {
            console.error('Error updating team progress:', error);
            throw error;
        }
    }

    // Check if team or game is complete
    async checkGameCompletion(gameId, teamId) {
        try {
            const teamRef = FirebaseUtils.ref(`games/${gameId}/teams/${teamId}`);
            const teamSnapshot = await teamRef.once('value');
            const teamData = teamSnapshot.val();

            // Check if team completed all seals
            if (teamData && teamData.progress.sealsCompleted.length === 7) {
                const completionTime = Date.now() - teamData.progress.startTime;
                
                // Update team completion
                await teamRef.update({
                    status: 'completed',
                    'progress/completionTime': completionTime,
                    score: this.calculateScore(teamData.progress, completionTime)
                });

                // Add to global leaderboard
                await this.addToGlobalLeaderboard(teamData, completionTime);

                // Check if this is the first team to complete (winner detection)
                const updatedTeamData = { ...teamData, score: this.calculateScore(teamData.progress, completionTime) };
                updatedTeamData.progress.completionTime = completionTime;
                await this.checkForGameWinner(gameId, teamId, updatedTeamData);

                showNotification(`🎉 ${teamData.name} completed the quest!`, 'success');
            }

        } catch (error) {
            console.error('Error checking game completion:', error);
        }
    }

    // Check for game winner and handle game end logic
    async checkForGameWinner(gameId, winningTeamId, winningTeamData) {
        try {
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            const gameSnapshot = await gameRef.once('value');
            const gameData = gameSnapshot.val();

            if (!gameData || gameData.status !== 'playing') {
                return; // Game already ended or not active
            }

            // Check if this is the first team to complete all seals
            const teams = Object.values(gameData.teams || {});
            const completedTeams = teams.filter(team => team.status === 'completed');
            
            if (completedTeams.length === 1) {
                // This is the winner! End the game immediately
                const winnerTimestamp = FirebaseUtils.timestamp();
                
                // Update game status to finished with winner info
                await gameRef.update({
                    status: 'finished',
                    endedAt: winnerTimestamp,
                    winner: {
                        teamId: winningTeamId,
                        teamName: winningTeamData.name,
                        completionTime: winningTeamData.progress.completionTime,
                        score: winningTeamData.score,
                        timestamp: winnerTimestamp
                    }
                });

                // Lock all teams (prevent further input)
                const lockUpdates = {};
                Object.keys(gameData.teams).forEach(teamId => {
                    lockUpdates[`teams/${teamId}/locked`] = true;
                });
                await gameRef.update(lockUpdates);

                // Broadcast winner announcement to all players
                await this.broadcastWinnerAnnouncement(gameId, winningTeamData);
            }

        } catch (error) {
            console.error('Error checking for game winner:', error);
        }
    }

    // Broadcast winner announcement to all players
    async broadcastWinnerAnnouncement(gameId, winningTeam) {
        try {
            const announcementRef = FirebaseUtils.ref(`games/${gameId}/announcement`);
            const announcement = {
                type: 'winner',
                message: `🎉 ${winningTeam.name} has won the game!`,
                winnerTeam: winningTeam.name,
                completionTime: winningTeam.progress.completionTime,
                timestamp: FirebaseUtils.timestamp(),
                displayUntil: Date.now() + 30000 // Show for 30 seconds
            };

            await announcementRef.set(announcement);

            // Remove announcement after display time
            setTimeout(async () => {
                try {
                    await announcementRef.remove();
                } catch (error) {
                    console.error('Error removing announcement:', error);
                }
            }, 30000);

        } catch (error) {
            console.error('Error broadcasting winner announcement:', error);
        }
    }

    // Calculate team score based on performance
    calculateScore(progress, completionTime) {
        const baseScore = 1000;
        const timeBonus = Math.max(0, 3600000 - completionTime) / 1000; // Bonus for speed
        const hintPenalty = progress.hintsUsed * 50; // Penalty for hints
        
        return Math.round(baseScore + timeBonus - hintPenalty);
    }

    // Add team result to global leaderboard
    async addToGlobalLeaderboard(teamData, completionTime) {
        try {
            const leaderboardEntry = {
                teamName: teamData.name,
                completionTime: completionTime,
                completedAt: FirebaseUtils.timestamp(),
                score: teamData.score || 0,
                sealsCompleted: 7,
                country: await this.getTeamCountry(), // Get from IP or user setting
                gameMode: 'multiplayer'
            };

            const leaderboardRef = FirebaseUtils.ref('globalLeaderboard');
            await leaderboardRef.push(leaderboardEntry);

        } catch (error) {
            console.error('Error adding to global leaderboard:', error);
        }
    }

    // Get team's country (simplified - in real app would use IP geolocation)
    async getTeamCountry() {
        // For demo purposes, return a random country
        const countryCodes = Object.keys(window.GameData.COUNTRIES);
        return countryCodes[Math.floor(Math.random() * countryCodes.length)];
    }

    // Listen for real-time game updates
    startGameListener(gameId, callback) {
        if (this.gameListeners.has(gameId)) {
            this.stopGameListener(gameId);
        }

        const gameRef = FirebaseUtils.ref(`games/${gameId}`);
        const listener = gameRef.on('value', (snapshot) => {
            const gameData = snapshot.val();
            if (gameData && callback) {
                callback(gameData);
            }
        });

        this.gameListeners.set(gameId, { ref: gameRef, callback: listener });
    }

    // Stop listening for game updates
    stopGameListener(gameId) {
        const listener = this.gameListeners.get(gameId);
        if (listener) {
            listener.ref.off('value', listener.callback);
            this.gameListeners.delete(gameId);
        }
    }

    // Leave current game
    async leaveGame() {
        try {
            if (this.currentGame && this.currentTeam) {
                const teamRef = FirebaseUtils.ref(`games/${this.currentGame.id}/teams/${this.currentTeam.id}`);
                await teamRef.update({ 
                    status: 'disconnected',
                    leftAt: FirebaseUtils.timestamp()
                });

                // Stop all listeners
                this.stopGameListener(this.currentGame.id);
                if (this.leaderboardUpdate) {
                    clearInterval(this.leaderboardUpdate);
                }
            }

            this.currentGame = null;
            this.currentTeam = null;
            this.isHost = false;

            showNotification('Left the game', 'success');

        } catch (error) {
            console.error('Error leaving game:', error);
            showNotification('Error leaving game', 'error');
        }
    }

    // Host controls
    async pauseGame(gameId) {
        if (!this.isHost) return;
        
        try {
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            await gameRef.update({ status: 'paused' });
            showNotification('Game paused', 'success');
        } catch (error) {
            console.error('Error pausing game:', error);
        }
    }

    async resumeGame(gameId) {
        if (!this.isHost) return;
        
        try {
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            await gameRef.update({ status: 'playing' });
            showNotification('Game resumed', 'success');
        } catch (error) {
            console.error('Error resuming game:', error);
        }
    }

    async endGame(gameId) {
        if (!this.isHost) return;
        
        try {
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            await gameRef.update({ 
                status: 'finished',
                endedAt: FirebaseUtils.timestamp()
            });
            showNotification('Game ended', 'success');
        } catch (error) {
            console.error('Error ending game:', error);
        }
    }

    // Clean up when page unloads
    cleanup() {
        this.gameListeners.forEach((listener, gameId) => {
            this.stopGameListener(gameId);
        });
        
        if (this.leaderboardUpdate) {
            clearInterval(this.leaderboardUpdate);
        }
    }
}

// Initialize multiplayer manager
const multiplayerManager = new MultiplayerManager();

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    multiplayerManager.cleanup();
});

// Export for use in other modules
window.MultiplayerManager = multiplayerManager;
