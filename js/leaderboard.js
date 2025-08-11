// Leaderboard Management
class LeaderboardManager {
    constructor() {
        this.globalLeaderboard = [];
        this.liveLeaderboard = [];
        this.currentGameId = null;
        this.updateInterval = null;
        this.isLeaderboardVisible = true;
    }

    // Initialize leaderboard for a game
    initializeGameLeaderboard(gameId) {
        this.currentGameId = gameId;
        this.startLiveUpdates();
    }

    // Start real-time leaderboard updates during game
    startLiveUpdates() {
        if (!this.currentGameId) return;

        // Listen for team progress updates
        const gameRef = FirebaseUtils.ref(`games/${this.currentGameId}/teams`);
        gameRef.on('value', (snapshot) => {
            const teamsData = snapshot.val();
            if (teamsData) {
                this.updateLiveLeaderboard(teamsData);
            }
        });

        // Also update every 5 seconds for time elapsed
        this.updateInterval = setInterval(() => {
            this.updateTimeElapsed();
        }, 5000);
    }

    // Update live leaderboard during game
    updateLiveLeaderboard(teamsData) {
        const teams = Object.values(teamsData);
        
        // Sort teams by progress and time
        this.liveLeaderboard = teams
            .filter(team => team.status !== 'disconnected')
            .sort((a, b) => {
                // First by seals completed
                const aSeals = a.progress?.sealsCompleted?.length || 0;
                const bSeals = b.progress?.sealsCompleted?.length || 0;
                
                if (aSeals !== bSeals) {
                    return bSeals - aSeals;
                }
                
                // Then by completion time (if both completed)
                if (aSeals === 7 && bSeals === 7) {
                    const aTime = a.progress?.completionTime || Infinity;
                    const bTime = b.progress?.completionTime || Infinity;
                    return aTime - bTime;
                }
                
                // Finally by current elapsed time (for ongoing games)
                const aElapsed = this.getElapsedTime(a);
                const bElapsed = this.getElapsedTime(b);
                return aElapsed - bElapsed;
            });

        this.renderLiveLeaderboard();
    }

    // Update live leaderboard for single player
    updateSinglePlayerProgress(gameState) {
        if (!gameState) return;
        
        console.log('🏆 Updating single player leaderboard with gameState:', {
            teamName: gameState.teamName,
            completedSeals: gameState.completedSeals,
            sealsLength: gameState.completedSeals?.length
        });
        
        // Create single player team structure
        const singlePlayerTeam = {
            id: 'player',
            name: gameState.teamName || 'Player',
            status: 'playing',
            progress: {
                sealsCompleted: gameState.completedSeals || [],
                startTime: gameState.startTime || Date.now(),
                completionTime: null
            }
        };
        
        console.log('👤 Single player team:', singlePlayerTeam);
        
        // Add AI teams to create competitive atmosphere
        const aiTeams = this.generateAITeams(singlePlayerTeam.progress.sealsCompleted.length);
        
        // Combine player and AI teams
        const allTeams = [singlePlayerTeam, ...aiTeams];
        
        this.liveLeaderboard = allTeams.sort((a, b) => {
            const aSeals = a.progress?.sealsCompleted?.length || 0;
            const bSeals = b.progress?.sealsCompleted?.length || 0;
            
            if (aSeals !== bSeals) {
                return bSeals - aSeals;
            }
            
            const aElapsed = this.getElapsedTime(a);
            const bElapsed = this.getElapsedTime(b);
            return aElapsed - bElapsed;
        });
        
        console.log('📊 Updated leaderboard:', this.liveLeaderboard.map(t => ({ 
            name: t.name, 
            seals: t.progress?.sealsCompleted?.length || 0 
        })));
        
        this.renderLiveLeaderboard();
    }

    // Generate AI teams for single player mode
    generateAITeams(playerSeals) {
        const aiTeamNames = [
            'Gospel Guardians 🛡️', 
            'Covenant Crusaders ⚔️', 
            'Scripture Seekers 📚',
            'Faith Warriors 🗡️',
            'Divine Defenders 🙏'
        ];
        
        return aiTeamNames.map((name, index) => {
            // AI teams have slightly different progress to create challenge
            let aiSeals = playerSeals;
            if (index === 0) aiSeals = Math.min(7, playerSeals + Math.floor(Math.random() * 2)); // Ahead
            else if (index === 1) aiSeals = Math.max(0, playerSeals - Math.floor(Math.random() * 2)); // Behind
            else aiSeals = playerSeals + Math.floor(Math.random() * 3) - 1; // Varied
            
            aiSeals = Math.max(0, Math.min(7, aiSeals));
            
            return {
                id: `ai-${index}`,
                name: name,
                status: aiSeals === 7 ? 'completed' : 'playing',
                progress: {
                    sealsCompleted: Array(aiSeals).fill().map((_, i) => i + 1),
                    startTime: Date.now() - (Math.random() * 600000), // Random start time
                    completionTime: aiSeals === 7 ? Math.random() * 300000 : null
                }
            };
        });
    }

    // Calculate elapsed time for a team
    getElapsedTime(team) {
        if (!team.progress?.startTime) return 0;
        
        if (team.progress.completionTime) {
            return team.progress.completionTime;
        }
        
        return Date.now() - team.progress.startTime;
    }

    // Render live leaderboard in the UI
    renderLiveLeaderboard() {
        const container = document.getElementById('liveLeaderboardContent') || document.getElementById('leaderboardList');
        if (!container || !this.isLeaderboardVisible) return;

        let html = '';

        this.liveLeaderboard.forEach((team, index) => {
            const rank = index + 1;
            const sealsCompleted = team.progress?.sealsCompleted?.length || 0;
            const elapsedTime = this.getElapsedTime(team);
            const timeDisplay = this.formatTime(elapsedTime);
            
            let rankClass = '';
            if (rank === 1) rankClass = 'first';
            else if (rank === 2) rankClass = 'second';  
            else if (rank === 3) rankClass = 'third';

            const status = team.status === 'completed' ? '✅' : '🔄';
            const isPlayer = team.id === 'player';
            const teamDisplay = isPlayer ? `${team.name} (You)` : team.name;
            
            html += `
                <div class="leaderboard-entry ${rankClass} ${isPlayer ? 'player-team' : ''}">
                    <div class="rank">${this.getRankDisplay(rank)}</div>
                    <div class="team-info">
                        <div class="team-name">${teamDisplay} ${status}</div>
                        <div class="team-progress">${sealsCompleted}/7</div>
                    </div>
                    <div class="team-time">${timeDisplay}</div>
                </div>
            `;
        });

        container.innerHTML = html || '<p>No teams yet...</p>';
    }

    // Get rank display with medals
    getRankDisplay(rank) {
        const medals = ['🥇', '🥈', '🥉'];
        return rank <= 3 ? medals[rank - 1] : `#${rank}`;
    }

    // Update time elapsed for all teams
    updateTimeElapsed() {
        if (this.liveLeaderboard.length > 0) {
            this.renderLiveLeaderboard();
        }
    }

    // Format time in MM:SS format
    formatTime(milliseconds) {
        if (!milliseconds || milliseconds <= 0) return '00:00';
        
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Load and display global leaderboard
    async loadGlobalLeaderboard(timeframe = 'all') {
        try {
            const leaderboardRef = FirebaseUtils.ref('globalLeaderboard');
            let query = leaderboardRef;

            // Filter by timeframe
            const now = Date.now();
            let startTime = 0;
            
            switch (timeframe) {
                case 'today':
                    startTime = now - 24 * 60 * 60 * 1000;
                    break;
                case 'week':
                    startTime = now - 7 * 24 * 60 * 60 * 1000;
                    break;
                case 'month':
                    startTime = now - 30 * 24 * 60 * 60 * 1000;
                    break;
                default:
                    startTime = 0;
            }

            if (startTime > 0) {
                query = query.orderByChild('completedAt').startAt(startTime);
            }

            const snapshot = await query.once('value');
            const data = snapshot.val();

            if (data) {
                this.globalLeaderboard = Object.values(data)
                    .filter(entry => entry.sealsCompleted === 7) // Only completed games
                    .sort((a, b) => a.completionTime - b.completionTime) // Sort by completion time
                    .slice(0, window.GameData.GAME_CONSTANTS.LEADERBOARD_TOP_COUNT); // Top 5
            } else {
                this.globalLeaderboard = [];
            }

            this.renderGlobalLeaderboard(timeframe);

        } catch (error) {
            console.error('Error loading global leaderboard:', error);
            this.globalLeaderboard = this.getDemoLeaderboard();
            this.renderGlobalLeaderboard(timeframe);
        }
    }

    // Render global leaderboard table
    renderGlobalLeaderboard(timeframe) {
        const container = document.getElementById('globalLeaderboardContent');
        if (!container) return;

        let html = `
            <div class="leaderboard-header">
                <h3>🏆 Top ${window.GameData.GAME_CONSTANTS.LEADERBOARD_TOP_COUNT} Teams - ${this.getTimeframeTitle(timeframe)}</h3>
            </div>
        `;

        if (this.globalLeaderboard.length === 0) {
            html += `
                <div class="no-data">
                    <p>No completed games found for this timeframe.</p>
                    <p>Be the first to complete all seven seals!</p>
                </div>
            `;
        } else {
            html += `
                <table class="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team Name</th>
                            <th>Country</th>
                            <th>Completion Time</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            this.globalLeaderboard.forEach((entry, index) => {
                const rank = index + 1;
                const countryFlag = window.GameData.COUNTRIES[entry.country] || '🌍';
                const timeFormatted = this.formatTime(entry.completionTime);
                const dateFormatted = new Date(entry.completedAt).toLocaleDateString();

                html += `
                    <tr>
                        <td class="podium-position">${this.getRankDisplay(rank)}</td>
                        <td><strong>${entry.teamName}</strong></td>
                        <td><span class="country-flag">${countryFlag}</span>${entry.country}</td>
                        <td><strong>${timeFormatted}</strong></td>
                        <td>${dateFormatted}</td>
                    </tr>
                `;
            });

            html += `
                    </tbody>
                </table>
            `;
        }

        container.innerHTML = html;
    }

    // Get timeframe title for display
    getTimeframeTitle(timeframe) {
        switch (timeframe) {
            case 'today': return 'Today';
            case 'week': return 'This Week';
            case 'month': return 'This Month';
            default: return 'All Time';
        }
    }

    // Get demo leaderboard data for testing
    getDemoLeaderboard() {
        return [
            {
                teamName: 'Lightning Seekers',
                completionTime: 1980000, // 33 minutes
                completedAt: Date.now() - 86400000,
                country: 'US',
                sealsCompleted: 7
            },
            {
                teamName: 'Scripture Warriors',
                completionTime: 2160000, // 36 minutes
                completedAt: Date.now() - 172800000,
                country: 'UK',
                sealsCompleted: 7
            },
            {
                teamName: 'Faith Challengers',
                completionTime: 2280000, // 38 minutes
                completedAt: Date.now() - 259200000,
                country: 'CA',
                sealsCompleted: 7
            },
            {
                teamName: 'Gospel Guardians',
                completionTime: 2420000, // 40 minutes  
                completedAt: Date.now() - 345600000,
                country: 'AU',
                sealsCompleted: 7
            },
            {
                teamName: 'Bible Blazers',
                completionTime: 2580000, // 43 minutes
                completedAt: Date.now() - 432000000,
                country: 'NG',
                sealsCompleted: 7
            }
        ];
    }

    // Toggle leaderboard visibility
    toggleLeaderboard() {
        this.isLeaderboardVisible = !this.isLeaderboardVisible;
        const leaderboard = document.getElementById('liveLeaderboard');
        const toggle = document.getElementById('leaderboardToggle');
        
        if (leaderboard) {
            if (this.isLeaderboardVisible) {
                leaderboard.style.display = 'block';
                toggle.textContent = 'Hide';
                this.renderLiveLeaderboard();
            } else {
                leaderboard.style.display = 'none';
                toggle.textContent = 'Show';
            }
        }
    }

    // Record a new achievement for analytics
    async recordAchievement(teamId, achievement) {
        try {
            const achievementRef = FirebaseUtils.ref(`achievements/${teamId}`);
            await achievementRef.push({
                ...achievement,
                unlockedAt: FirebaseUtils.timestamp()
            });
        } catch (error) {
            console.error('Error recording achievement:', error);
        }
    }

    // Stop leaderboard updates
    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }

        if (this.currentGameId) {
            const gameRef = FirebaseUtils.ref(`games/${this.currentGameId}/teams`);
            gameRef.off();
        }

        this.currentGameId = null;
    }

    // Clean up when game ends
    cleanup() {
        this.stopUpdates();
        this.liveLeaderboard = [];
        this.isLeaderboardVisible = true;
    }
}

// Initialize leaderboard manager
const leaderboardManager = new LeaderboardManager();

// Export for use in other modules
window.LeaderboardManager = leaderboardManager;
