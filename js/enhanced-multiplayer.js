// Enhanced Multiplayer System with Auto Winner Detection & Improved Sync
class EnhancedMultiplayerManager extends MultiplayerManager {
    constructor() {
        super();
        this.winnerDetected = false;
        this.gameEndHandlers = new Set();
        this.optimisticUpdates = new Map();
        this.syncRetryAttempts = new Map();
        this.maxRetryAttempts = 3;
        this.syncDelay = 100; // milliseconds for optimistic updates
        
        this.initializeWinnerDetection();
    }

    // Initialize automatic winner detection system
    initializeWinnerDetection() {
        console.log('🏆 Winner detection system initialized');
    }

    // Enhanced team progress update with optimistic UI and winner detection
    async updateTeamProgress(gameId, teamId, progressData) {
        try {
            // Optimistic update for immediate UI feedback
            this.applyOptimisticUpdate(gameId, teamId, progressData);
            
            const teamRef = FirebaseUtils.ref(`games/${gameId}/teams/${teamId}/progress`);
            const updateData = {
                ...progressData,
                lastUpdateTime: firebase.database.ServerValue.TIMESTAMP,
                updateId: Date.now() // For conflict resolution
            };
            
            await teamRef.update(updateData);

            // Check for winner if all seals completed
            if (progressData.sealsCompleted && progressData.sealsCompleted.length === 7) {
                await this.handleTeamCompletion(gameId, teamId, progressData);
            }

            // Clear optimistic update after successful sync
            this.clearOptimisticUpdate(gameId, teamId);
            
        } catch (error) {
            console.error('Error updating team progress:', error);
            
            // Retry mechanism for failed updates
            await this.retryProgressUpdate(gameId, teamId, progressData);
            throw error;
        }
    }

    // Handle team completion and winner detection
    async handleTeamCompletion(gameId, teamId, progressData) {
        try {
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            const gameSnapshot = await gameRef.once('value');
            const gameData = gameSnapshot.val();
            
            if (!gameData || gameData.status !== 'playing') {
                return; // Game not active
            }

            // Check if this is the first team to complete (winner detection)
            const isFirstToComplete = await this.checkIfFirstToComplete(gameId, teamId);
            
            if (isFirstToComplete && !this.winnerDetected) {
                await this.declareWinner(gameId, teamId, progressData);
            } else {
                // Still update completion for non-winners
                await this.recordTeamCompletion(gameId, teamId, progressData);
            }
            
        } catch (error) {
            console.error('Error handling team completion:', error);
        }
    }

    // Check if team is first to complete all seals
    async checkIfFirstToComplete(gameId, teamId) {
        try {
            const teamsRef = FirebaseUtils.ref(`games/${gameId}/teams`);
            const snapshot = await teamsRef.once('value');
            const teams = snapshot.val();
            
            if (!teams) return false;
            
            // Count teams that have completed 7 seals
            const completedTeams = Object.entries(teams).filter(([id, team]) => {
                return team.progress && team.progress.sealsCompleted && 
                       team.progress.sealsCompleted.length === 7;
            });
            
            // If only one team (this team) has completed, they are the winner
            return completedTeams.length === 1 && completedTeams[0][0] === teamId;
            
        } catch (error) {
            console.error('Error checking first completion:', error);
            return false;
        }
    }

    // Declare winner and end game for all players
    async declareWinner(gameId, teamId, progressData) {
        this.winnerDetected = true;
        
        try {
            const completionTime = Date.now() - progressData.startTime;
            const teamRef = FirebaseUtils.ref(`games/${gameId}/teams/${teamId}`);
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            
            // Get team data for winner announcement
            const teamSnapshot = await teamRef.once('value');
            const teamData = teamSnapshot.val();
            
            if (!teamData) return;
            
            // Update game status and declare winner
            const gameUpdates = {
                status: 'finished',
                endedAt: firebase.database.ServerValue.TIMESTAMP,
                winner: {
                    teamId: teamId,
                    teamName: teamData.name,
                    completionTime: completionTime,
                    finalScore: this.calculateScore(progressData, completionTime)
                }
            };
            
            // Update team as winner
            const teamUpdates = {
                status: 'winner',
                'progress/completionTime': completionTime,
                'progress/isWinner': true,
                score: this.calculateScore(progressData, completionTime),
                winnerDeclaredAt: firebase.database.ServerValue.TIMESTAMP
            };
            
            // Atomic updates
            await Promise.all([
                gameRef.update(gameUpdates),
                teamRef.update(teamUpdates)
            ]);
            
            // Add to global leaderboard
            await this.addToGlobalLeaderboard(teamData, completionTime);
            
            // Broadcast winner modal to all clients
            this.broadcastWinnerModal(gameId, teamData, completionTime);
            
            // Lock game state for all devices
            await this.lockGameForAllPlayers(gameId);
            
            console.log(`🏆 Winner declared: ${teamData.name} in ${this.formatTime(completionTime)}`);
            
        } catch (error) {
            console.error('Error declaring winner:', error);
        }
    }

    // Lock game state to prevent further input
    async lockGameForAllPlayers(gameId) {
        try {
            const gameRef = FirebaseUtils.ref(`games/${gameId}`);
            await gameRef.update({
                locked: true,
                lockReason: 'Game completed - winner declared',
                lockTime: firebase.database.ServerValue.TIMESTAMP
            });
            
            // Trigger lock for all connected clients
            await gameRef.child('lockSignal').set({
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                message: 'Game locked - winner declared'
            });
            
        } catch (error) {
            console.error('Error locking game:', error);
        }
    }

    // Broadcast winner modal to all players
    broadcastWinnerModal(gameId, winnerTeam, completionTime) {
        const gameRef = FirebaseUtils.ref(`games/${gameId}/winnerAnnouncement`);
        
        const announcement = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            winner: {
                name: winnerTeam.name,
                completionTime: completionTime,
                timeFormatted: this.formatTime(completionTime)
            },
            message: `🎉 ${winnerTeam.name} has unlocked all seven seals and won the game! 🏆`
        };
        
        gameRef.set(announcement).catch(error => {
            console.error('Error broadcasting winner announcement:', error);
        });
    }

    // Record team completion for non-winners
    async recordTeamCompletion(gameId, teamId, progressData) {
        try {
            const completionTime = Date.now() - progressData.startTime;
            const teamRef = FirebaseUtils.ref(`games/${gameId}/teams/${teamId}`);
            
            await teamRef.update({
                status: 'completed',
                'progress/completionTime': completionTime,
                score: this.calculateScore(progressData, completionTime),
                completedAt: firebase.database.ServerValue.TIMESTAMP
            });
            
        } catch (error) {
            console.error('Error recording team completion:', error);
        }
    }

    // Enhanced game listener with winner detection
    startGameListener(gameId, callback) {
        // Call parent method
        super.startGameListener(gameId, callback);
        
        // Add winner announcement listener
        this.startWinnerListener(gameId);
        
        // Add game lock listener
        this.startLockListener(gameId);
    }

    // Listen for winner announcements
    startWinnerListener(gameId) {
        const winnerRef = FirebaseUtils.ref(`games/${gameId}/winnerAnnouncement`);
        
        winnerRef.on('value', (snapshot) => {
            const announcement = snapshot.val();
            if (announcement) {
                this.showWinnerModal(announcement);
            }
        });
    }

    // Listen for game lock signals
    startLockListener(gameId) {
        const lockRef = FirebaseUtils.ref(`games/${gameId}/lockSignal`);
        
        lockRef.on('value', (snapshot) => {
            const lockData = snapshot.val();
            if (lockData) {
                this.lockLocalGameInterface();
            }
        });
    }

    // Show winner modal to all players
    showWinnerModal(announcement) {
        const modal = document.createElement('div');
        modal.className = 'winner-modal-overlay';
        modal.innerHTML = `
            <div class="winner-modal">
                <div class="winner-modal-header">
                    <h2>🏆 GAME COMPLETE! 🏆</h2>
                </div>
                <div class="winner-modal-content">
                    <div class="winner-announcement">
                        <h3>Champion: ${announcement.winner.name}</h3>
                        <p>Completion Time: ${announcement.winner.timeFormatted}</p>
                        <p class="winner-message">${announcement.message}</p>
                    </div>
                    <div class="winner-modal-actions">
                        <button class="btn btn-primary" onclick="showFinalLeaderboard('${this.currentGame?.id}')">
                            📊 View Final Results
                        </button>
                        <button class="btn btn-secondary" onclick="returnToLobby()">
                            🏠 Return to Main Menu
                        </button>
                        <button class="btn btn-success" onclick="startNewGame()">
                            🎮 Play Again
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-show notification
        showNotification(`🏆 ${announcement.winner.name} won in ${announcement.winner.timeFormatted}!`, 'success');
    }

    // Lock local game interface when game ends
    lockLocalGameInterface() {
        // Disable all puzzle inputs
        document.querySelectorAll('input, button, select').forEach(element => {
            if (!element.classList.contains('modal-action')) {
                element.disabled = true;
            }
        });
        
        // Add lock overlay to puzzle areas
        document.querySelectorAll('.seal, .puzzle-content').forEach(element => {
            element.classList.add('locked');
        });
        
        // Show lock message
        const lockMessage = document.createElement('div');
        lockMessage.className = 'game-lock-message';
        lockMessage.innerHTML = `
            <div class="lock-content">
                <h3>🔒 Game Locked</h3>
                <p>The game has ended. Winner has been declared!</p>
            </div>
        `;
        
        const gameContainer = document.getElementById('gameScreen');
        if (gameContainer) {
            gameContainer.appendChild(lockMessage);
        }
    }

    // Optimistic update system for immediate UI feedback
    applyOptimisticUpdate(gameId, teamId, progressData) {
        const key = `${gameId}_${teamId}`;
        this.optimisticUpdates.set(key, {
            data: progressData,
            timestamp: Date.now()
        });
        
        // Apply to local leaderboard immediately
        if (window.LeaderboardManager && window.LeaderboardManager.liveLeaderboard) {
            this.updateLocalLeaderboard(teamId, progressData);
        }
        
        // Clear optimistic update after delay if not cleared by successful sync
        setTimeout(() => {
            if (this.optimisticUpdates.has(key)) {
                this.clearOptimisticUpdate(gameId, teamId);
            }
        }, this.syncDelay * 10);
    }

    // Clear optimistic update
    clearOptimisticUpdate(gameId, teamId) {
        const key = `${gameId}_${teamId}`;
        this.optimisticUpdates.delete(key);
    }

    // Update local leaderboard for optimistic updates
    updateLocalLeaderboard(teamId, progressData) {
        const leaderboard = window.LeaderboardManager.liveLeaderboard;
        const teamIndex = leaderboard.findIndex(team => team.id === teamId);
        
        if (teamIndex !== -1) {
            leaderboard[teamIndex].progress = {
                ...leaderboard[teamIndex].progress,
                ...progressData
            };
            window.LeaderboardManager.renderLiveLeaderboard();
        }
    }

    // Retry mechanism for failed updates
    async retryProgressUpdate(gameId, teamId, progressData) {
        const key = `${gameId}_${teamId}`;
        const currentAttempts = this.syncRetryAttempts.get(key) || 0;
        
        if (currentAttempts < this.maxRetryAttempts) {
            this.syncRetryAttempts.set(key, currentAttempts + 1);
            
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * (currentAttempts + 1)));
            
            try {
                await this.updateTeamProgress(gameId, teamId, progressData);
                this.syncRetryAttempts.delete(key); // Success, clear retry count
            } catch (retryError) {
                console.error(`Retry ${currentAttempts + 1} failed:`, retryError);
                if (currentAttempts + 1 >= this.maxRetryAttempts) {
                    showNotification('Connection issue - progress may not be saved', 'warning');
                }
            }
        }
    }

    // Generate unique puzzle set per game start with Bible dataset
    async generateGamePuzzleSet(gameId) {
        try {
            const puzzleSet = window.BibleDatasetManager.generatePuzzlesForGame(gameId, 'shared', 7);
            
            // Store puzzle set in Firebase for all teams to use
            const gameRef = FirebaseUtils.ref(`games/${gameId}/puzzleSet`);
            await gameRef.set({
                puzzles: puzzleSet,
                generatedAt: firebase.database.ServerValue.TIMESTAMP,
                distribution: { random: 80, themed: 20 },
                seed: Date.now() // For reproducible randomization
            });
            
            console.log(`🎲 Generated unique puzzle set for game ${gameId}`);
            return puzzleSet;
            
        } catch (error) {
            console.error('Error generating puzzle set:', error);
            // Fallback to default puzzles
            return window.GameData.seals;
        }
    }

    // Load shared puzzle set for game
    async loadGamePuzzleSet(gameId) {
        try {
            const puzzleRef = FirebaseUtils.ref(`games/${gameId}/puzzleSet`);
            const snapshot = await puzzleRef.once('value');
            const puzzleData = snapshot.val();
            
            if (puzzleData && puzzleData.puzzles) {
                return puzzleData.puzzles;
            }
            
            // Generate if doesn't exist
            return await this.generateGamePuzzleSet(gameId);
            
        } catch (error) {
            console.error('Error loading puzzle set:', error);
            return window.GameData.seals; // Fallback
        }
    }

    // Enhanced game start with puzzle generation
    async startGame(gameId) {
        if (!this.isHost) {
            throw new Error('Only the host can start the game');
        }

        try {
            // Generate unique puzzle set first
            const puzzleSet = await this.generateGamePuzzleSet(gameId);
            
            // Reset winner detection
            this.winnerDetected = false;
            
            // Start the game
            const result = await super.startGame(gameId);
            
            showNotification('🎯 Game started with fresh Bible puzzles!', 'success');
            return result;
            
        } catch (error) {
            console.error('Error starting enhanced game:', error);
            throw error;
        }
    }

    // Format time helper
    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Enhanced cleanup
    cleanup() {
        super.cleanup();
        this.optimisticUpdates.clear();
        this.syncRetryAttempts.clear();
        this.winnerDetected = false;
        this.gameEndHandlers.clear();
    }
}

// Global functions for winner modal actions
window.showFinalLeaderboard = function(gameId) {
    // Implementation for showing final game results
    console.log('Showing final leaderboard for game:', gameId);
    window.LeaderboardManager.loadGlobalLeaderboard('today');
    document.querySelector('.winner-modal-overlay')?.remove();
};

window.returnToLobby = function() {
    document.querySelector('.winner-modal-overlay')?.remove();
    if (window.gameController) {
        window.gameController.showMainMenu();
    }
};

window.startNewGame = function() {
    document.querySelector('.winner-modal-overlay')?.remove();
    if (window.gameController) {
        window.gameController.resetGame();
        window.gameController.showMultiPlayerSetup();
    }
};

// Replace the existing multiplayer manager
window.MultiplayerManager = new EnhancedMultiplayerManager();

console.log('🚀 Enhanced Multiplayer System loaded with auto winner detection and improved sync');
