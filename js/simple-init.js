// Simple Game Initialization - Replaces complex integration system
(function() {
    'use strict';
    
    console.log('🎮 Simple game initialization started');
    
    // Wait for basic dependencies
    function waitForBasics() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 20;
            
            const checkBasics = () => {
                attempts++;
                
                const hasFirebase = typeof window.firebase !== 'undefined';
                const hasGameData = typeof window.GameData !== 'undefined';
                
                if (hasFirebase && hasGameData) {
                    console.log('✅ Basic dependencies ready');
                    resolve();
                    return;
                }
                
                if (attempts >= maxAttempts) {
                    console.log('⚠️ Proceeding without all dependencies');
                    resolve();
                    return;
                }
                
                setTimeout(checkBasics, 200);
            };
            
            checkBasics();
        });
    }
    
    // Initialize enhanced features safely
    function initializeEnhancedFeatures() {
        try {
            // Check for Bible dataset
            if (window.BibleDatasetManager) {
                console.log('📚 Bible dataset available');
                window.hasBibleDataset = true;
            } else {
                console.log('📝 Using original puzzles');
                window.hasBibleDataset = false;
            }
            
            // Check for enhanced multiplayer
            if (window.MultiplayerManager && window.MultiplayerManager.declareWinner) {
                console.log('🏆 Enhanced multiplayer available');
                window.hasEnhancedMultiplayer = true;
            } else {
                console.log('🎮 Basic multiplayer only');
                window.hasEnhancedMultiplayer = false;
            }
            
            // Setup safe puzzle generation
            if (window.PuzzleManager) {
                const originalGeneratePuzzleContent = window.PuzzleManager.generatePuzzleContent;
                
                window.PuzzleManager.generatePuzzleContent = function(sealId, puzzleType) {
                    try {
                        if (window.hasBibleDataset && this.currentGamePuzzles && this.currentGamePuzzles.length > 0) {
                            const gamePuzzle = this.currentGamePuzzles[sealId - 1];
                            if (gamePuzzle && this.generateBiblePuzzleContent) {
                                return this.generateBiblePuzzleContent(gamePuzzle);
                            }
                        }
                        
                        // Fallback to original
                        if (originalGeneratePuzzleContent) {
                            return originalGeneratePuzzleContent.call(this, sealId, puzzleType);
                        }
                        
                        return '<div class="puzzle-loading">🔄 Loading puzzle...</div>';
                    } catch (error) {
                        console.error('Error generating puzzle:', error);
                        return '<div class="puzzle-error">⚠️ Puzzle temporarily unavailable</div>';
                    }
                };
                
                // Safe current puzzle getter
                window.PuzzleManager.getCurrentPuzzle = function(puzzleId) {
                    try {
                        if (this.currentGamePuzzles && Array.isArray(this.currentGamePuzzles) && 
                            puzzleId >= 1 && puzzleId <= this.currentGamePuzzles.length) {
                            return this.currentGamePuzzles[puzzleId - 1];
                        }
                        return null;
                    } catch (error) {
                        console.error('Error getting current puzzle:', error);
                        return null;
                    }
                };
                
                // Safe puzzle loading
                window.PuzzleManager.loadGamePuzzles = function(puzzles) {
                    try {
                        if (puzzles && Array.isArray(puzzles)) {
                            this.currentGamePuzzles = puzzles;
                            console.log(`🧩 Loaded ${puzzles.length} puzzles`);
                        } else {
                            this.currentGamePuzzles = [];
                            console.log('📝 No puzzles loaded, using fallback');
                        }
                    } catch (error) {
                        console.error('Error loading puzzles:', error);
                        this.currentGamePuzzles = [];
                    }
                };
                
                // Initialize with empty array
                if (!window.PuzzleManager.currentGamePuzzles) {
                    window.PuzzleManager.currentGamePuzzles = [];
                }
            }
            
            console.log('✅ Enhanced features initialized safely');
            
        } catch (error) {
            console.error('Error in enhanced features initialization:', error);
        }
    }
    
    // Start initialization
    waitForBasics().then(() => {
        initializeEnhancedFeatures();
        
        // Notify that game is ready
        document.dispatchEvent(new CustomEvent('gameInitialized', {
            detail: {
                hasBibleDataset: window.hasBibleDataset || false,
                hasEnhancedMultiplayer: window.hasEnhancedMultiplayer || false,
                timestamp: Date.now()
            }
        }));
        
        console.log('🎮 Game initialization complete');
    });
    
})();

console.log('🔧 Simple initialization system loaded');
