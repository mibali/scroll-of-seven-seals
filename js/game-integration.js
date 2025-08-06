// Game Integration Layer - Connects all enhanced features
class GameIntegrationManager {
    constructor() {
        this.isInitialized = false;
        this.features = {
            bibleDataset: false,
            enhancedMultiplayer: false,
            winnerDetection: false,
            leaderboardSync: false,
            puzzleGeneration: false
        };
        
        this.init();
    }

    // Initialize all enhanced features
    async init() {
        try {
            console.log('🚀 Initializing enhanced game features...');
            
            // Wait for dependencies to load
            await this.waitForDependencies();
            
            // Initialize Bible dataset
            this.initializeBibleDataset();
            
            // Setup enhanced multiplayer
            this.setupEnhancedMultiplayer();
            
            // Configure winner detection
            this.configureWinnerDetection();
            
            // Initialize leaderboard improvements
            this.initializeLeaderboardSync();
            
            // Setup puzzle generation
            this.setupPuzzleGeneration();
            
            this.isInitialized = true;
            console.log('✅ All enhanced features initialized successfully!');
            
            // Show initialization success
            this.showInitializationStatus();
            
        } catch (error) {
            console.error('❌ Error initializing enhanced features:', error);
            this.handleInitializationError(error);
        }
    }

    // Wait for required dependencies
    async waitForDependencies() {
        const dependencies = [
            'BibleDatasetManager',
            'MultiplayerManager', 
            'LeaderboardManager',
            'PuzzleManager',
            'GameData'
        ];
        
        const maxAttempts = 50;
        let attempts = 0;
        
        while (attempts < maxAttempts) {
            const missing = dependencies.filter(dep => !window[dep]);
            
            if (missing.length === 0) {
                console.log('📦 All dependencies loaded');
                return;
            }
            
            console.log(`⏳ Waiting for dependencies: ${missing.join(', ')}`);
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        throw new Error('Timeout waiting for dependencies');
    }

    // Initialize Bible dataset integration
    initializeBibleDataset() {
        if (!window.BibleDatasetManager) {
            throw new Error('BibleDatasetManager not available');
        }
        
        // Configure Bible dataset
        const stats = window.BibleDatasetManager.getStatistics();
        console.log(`📚 Bible Dataset: ${stats.totalQuestions} questions across ${Object.keys(stats.byTheme).length} themes`);
        
        // Setup auto-generation of unique puzzle sets
        this.enableUniquePuzzleGeneration();
        
        this.features.bibleDataset = true;
        this.features.puzzleGeneration = true;
    }

    // Setup enhanced multiplayer features
    setupEnhancedMultiplayer() {
        if (!window.MultiplayerManager) {
            throw new Error('Enhanced MultiplayerManager not available');
        }
        
        // Verify enhanced features are available
        const hasWinnerDetection = typeof window.MultiplayerManager.declareWinner === 'function';
        const hasOptimisticUpdates = typeof window.MultiplayerManager.applyOptimisticUpdate === 'function';
        
        if (hasWinnerDetection) {
            console.log('🏆 Winner detection system active');
            this.features.winnerDetection = true;
        }
        
        if (hasOptimisticUpdates) {
            console.log('⚡ Optimistic UI updates enabled');
        }
        
        this.features.enhancedMultiplayer = true;
    }

    // Configure automatic winner detection
    configureWinnerDetection() {
        // Add winner detection hooks to game events
        const originalCompleteSeal = window.completeSeal;
        
        window.completeSeal = async (sealId) => {
            if (originalCompleteSeal) {
                await originalCompleteSeal(sealId);
            }
            
            // Check for winner in multiplayer
            if (window.gameController?.gameState?.mode === 'multiplayer') {
                const gameState = window.gameController.gameState;
                if (gameState.completedSeals.length === 7) {
                    await this.handlePotentialWinner(gameState);
                }
            }
        };
        
        this.features.winnerDetection = true;
    }

    // Handle potential winner detection
    async handlePotentialWinner(gameState) {
        try {
            if (window.MultiplayerManager && gameState.gameId && gameState.currentTeam) {
                await window.MultiplayerManager.handleTeamCompletion(
                    gameState.gameId,
                    window.MultiplayerManager.currentTeam?.id,
                    gameState.progress
                );
            }
        } catch (error) {
            console.error('Error in winner detection:', error);
        }
    }

    // Initialize improved leaderboard sync
    initializeLeaderboardSync() {
        if (!window.LeaderboardManager) {
            throw new Error('LeaderboardManager not available');
        }
        
        // Enable real-time sync with reduced lag
        this.enableOptimisticLeaderboardUpdates();
        
        // Setup automatic refresh for live leaderboard
        this.setupLeaderboardAutoRefresh();
        
        this.features.leaderboardSync = true;
    }

    // Enable optimistic leaderboard updates
    enableOptimisticLeaderboardUpdates() {
        const originalUpdateProgress = window.MultiplayerManager?.updateTeamProgress;
        
        if (originalUpdateProgress) {
            window.MultiplayerManager.updateTeamProgress = async function(gameId, teamId, progressData) {
                // Apply optimistic update first
                if (window.LeaderboardManager && window.LeaderboardManager.liveLeaderboard) {
                    const teamIndex = window.LeaderboardManager.liveLeaderboard.findIndex(team => team.id === teamId);
                    if (teamIndex !== -1) {
                        window.LeaderboardManager.liveLeaderboard[teamIndex].progress = {
                            ...window.LeaderboardManager.liveLeaderboard[teamIndex].progress,
                            ...progressData
                        };
                        window.LeaderboardManager.renderLiveLeaderboard();
                    }
                }
                
                // Then call original function
                return await originalUpdateProgress.call(this, gameId, teamId, progressData);
            };
        }
    }

    // Setup automatic leaderboard refresh
    setupLeaderboardAutoRefresh() {
        setInterval(() => {
            if (window.LeaderboardManager && window.LeaderboardManager.currentGameId) {
                window.LeaderboardManager.updateTimeElapsed();
            }
        }, 1000); // Update every second for smooth time display
    }

    // Enable unique puzzle generation per game
    enableUniquePuzzleGeneration() {
        // Hook into game start to generate unique puzzles
        const originalStartGame = window.MultiplayerManager?.startGame;
        
        if (originalStartGame) {
            window.MultiplayerManager.startGame = async function(gameId) {
                // Generate and store unique puzzle set for this game
                try {
                    const puzzleSet = await this.generateGamePuzzleSet(gameId);
                    
                    // Load puzzles into the puzzle manager
                    if (window.PuzzleManager && window.PuzzleManager.loadGamePuzzles) {
                        window.PuzzleManager.loadGamePuzzles(puzzleSet);
                    }
                    
                    console.log(`🎲 Generated ${puzzleSet.length} unique Bible puzzles for game ${gameId}`);
                } catch (error) {
                    console.error('Error generating puzzle set:', error);
                }
                
                // Call original start game
                return await originalStartGame.call(this, gameId);
            };
        }
        
        // Hook into single player game start
        const originalStartSinglePlayer = window.gameController?.startSinglePlayerGame;
        
        if (originalStartSinglePlayer) {
            window.gameController.startSinglePlayerGame = async function() {
                // Generate unique puzzles for single player
                try {
                    const gameId = `single_${Date.now()}`;
                    const puzzleSet = window.BibleDatasetManager.generateRandomPuzzleSet(7, { random: 80, themed: 20 });
                    
                    if (window.PuzzleManager && window.PuzzleManager.loadGamePuzzles) {
                        window.PuzzleManager.loadGamePuzzles(puzzleSet);
                    }
                    
                    console.log(`🎯 Generated ${puzzleSet.length} unique Bible puzzles for single player`);
                } catch (error) {
                    console.error('Error generating single player puzzles:', error);
                }
                
                // Call original function
                return await originalStartSinglePlayer.call(this);
            };
        }
    }

    // Show initialization status to user
    showInitializationStatus() {
        const activeFeatures = Object.entries(this.features)
            .filter(([feature, active]) => active)
            .map(([feature]) => this.getFeatureDisplayName(feature));
        
        if (activeFeatures.length > 0) {
            const message = `🎮 Enhanced Features Active: ${activeFeatures.join(', ')}`;
            
            // Show notification if available
            if (window.showNotification) {
                setTimeout(() => {
                    window.showNotification(message, 'success');
                }, 1000);
            }
            
            console.log(message);
        }
    }

    // Get user-friendly feature names
    getFeatureDisplayName(feature) {
        const names = {
            bibleDataset: 'Full Bible Dataset',
            enhancedMultiplayer: 'Enhanced Multiplayer',
            winnerDetection: 'Auto Winner Detection',
            leaderboardSync: 'Real-time Leaderboard',
            puzzleGeneration: 'Dynamic Puzzle Generation'
        };
        
        return names[feature] || feature;
    }

    // Handle initialization errors
    handleInitializationError(error) {
        console.error('Failed to initialize enhanced features:', error);
        
        // Try to continue with basic functionality
        if (window.showNotification) {
            window.showNotification('Some enhanced features may not be available', 'warning');
        }
        
        // Enable fallback mode
        this.enableFallbackMode();
    }

    // Enable fallback mode with basic functionality
    enableFallbackMode() {
        console.log('🔄 Enabling fallback mode with basic features');
        
        // Ensure basic game functionality works
        if (!window.PuzzleManager) {
            console.warn('⚠️ Creating minimal puzzle manager');
            window.PuzzleManager = {
                generatePuzzleContent: () => '<p>Loading puzzle...</p>',
                showHint: () => console.log('Hint not available'),
                resetPuzzle: () => console.log('Reset not available')
            };
        }
    }

    // Check if feature is available
    isFeatureAvailable(featureName) {
        return this.features[featureName] || false;
    }

    // Get status report
    getStatusReport() {
        return {
            initialized: this.isInitialized,
            features: { ...this.features },
            summary: `${Object.values(this.features).filter(Boolean).length}/${Object.keys(this.features).length} features active`
        };
    }

    // Reset for new game
    resetForNewGame() {
        // Clear any game-specific state
        if (window.BibleDatasetManager) {
            window.BibleDatasetManager.resetUsedQuestions();
        }
        
        if (window.PuzzleManager && window.PuzzleManager.clearPuzzles) {
            window.PuzzleManager.clearPuzzles();
        }
        
        console.log('🔄 Game integration reset for new game');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.GameIntegration = new GameIntegrationManager();
});

// Export for debugging and manual control
window.GameIntegrationManager = GameIntegrationManager;

console.log('🔧 Game Integration Manager loaded');
