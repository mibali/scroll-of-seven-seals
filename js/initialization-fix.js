// Initialization Fix - Ensures proper loading order and prevents ReferenceErrors
(function() {
    'use strict';
    
    console.log('🔧 Initialization fix loaded');
    
    // Create a global initialization status tracker
    window.GameInitialization = {
        status: 'loading',
        dependencies: [],
        errors: [],
        startTime: Date.now(),
        
        // Add dependency check
        addDependency: function(name, checkFn) {
            this.dependencies.push({ name, checkFn, loaded: false });
        },
        
        // Check if all dependencies are loaded
        checkDependencies: function() {
            let allLoaded = true;
            this.dependencies.forEach(dep => {
                try {
                    dep.loaded = dep.checkFn();
                } catch (error) {
                    dep.loaded = false;
                    console.warn(`❌ Dependency ${dep.name} check failed:`, error);
                }
                if (!dep.loaded) allLoaded = false;
            });
            return allLoaded;
        },
        
        // Get status report
        getStatus: function() {
            return {
                status: this.status,
                dependencies: this.dependencies.map(d => ({ name: d.name, loaded: d.loaded })),
                errors: this.errors,
                loadTime: Date.now() - this.startTime
            };
        }
    };
    
    // Add core dependencies
    window.GameInitialization.addDependency('firebase', () => 
        typeof window.firebase !== 'undefined' && 
        window.firebase.apps && 
        window.firebase.apps.length > 0
    );
    
    window.GameInitialization.addDependency('GameData', () => 
        typeof window.GameData !== 'undefined' &&
        window.GameData.seals &&
        window.GameData.seals.length > 0
    );
    
    // BibleDatasetManager is optional - don't block game startup
    window.GameInitialization.addDependency('BibleDatasetManager (optional)', () => {
        const available = typeof window.BibleDatasetManager !== 'undefined' &&
                         typeof window.BibleDatasetManager.generateRandomPuzzleSet === 'function';
        if (!available) {
            console.log('📝 BibleDatasetManager not available, will use fallback puzzles');
        }
        return true; // Always return true since it's optional
    });
    
    window.GameInitialization.addDependency('PuzzleManager', () => 
        typeof window.PuzzleManager !== 'undefined' &&
        typeof window.PuzzleManager.generatePuzzleContent === 'function'
    );
    
    window.GameInitialization.addDependency('MultiplayerManager', () => 
        typeof window.MultiplayerManager !== 'undefined' &&
        typeof window.MultiplayerManager.createGame === 'function'
    );
    
    window.GameInitialization.addDependency('LeaderboardManager', () => 
        typeof window.LeaderboardManager !== 'undefined' &&
        typeof window.LeaderboardManager.loadGlobalLeaderboard === 'function'
    );
    
    // Safe getter for puzzle manager to prevent ReferenceErrors
    window.safePuzzleManager = function() {
        if (window.PuzzleManager && window.PuzzleManager.currentGamePuzzles) {
            return window.PuzzleManager;
        }
        
        console.warn('⚠️ PuzzleManager not ready, returning safe fallback');
        return {
            currentGamePuzzles: [],
            generatePuzzleContent: (sealId, puzzleType) => {
                console.log(`📝 Fallback puzzle content for seal ${sealId}`);
                return '<div class="loading-puzzle"><p>🔄 Loading puzzle...</p></div>';
            },
            showHint: (type) => console.log('💡 Hint not available yet'),
            resetPuzzle: (id) => console.log('🔄 Reset not available yet'),
            loadGamePuzzles: (puzzles) => console.log('📦 Load puzzles:', puzzles?.length || 0),
            getCurrentPuzzle: (id) => null
        };
    };
    
    // Safe initialization checker
    window.checkGameReady = function() {
        if (window.GameInitialization.checkDependencies()) {
            window.GameInitialization.status = 'ready';
            console.log('✅ All game dependencies ready');
            return true;
        } else {
            window.GameInitialization.status = 'loading';
            const notReady = window.GameInitialization.dependencies
                .filter(d => !d.loaded)
                .map(d => d.name);
            console.log('⏳ Still waiting for:', notReady.join(', '));
            return false;
        }
    };
    
    // Error handler for initialization issues
    window.handleInitializationError = function(error, context) {
        console.error(`❌ Initialization error in ${context}:`, error);
        window.GameInitialization.errors.push({
            error: error.message || error,
            context: context,
            timestamp: Date.now()
        });
        
        // Try to continue with fallback
        if (context === 'puzzle') {
            return window.safePuzzleManager();
        }
        
        return null;
    };
    
    // Periodic dependency check
    let checkInterval = setInterval(() => {
        if (window.checkGameReady()) {
            clearInterval(checkInterval);
            console.log('🎮 Game initialization complete!');
            
            // Trigger ready event
            document.dispatchEvent(new CustomEvent('gameReady', {
                detail: window.GameInitialization.getStatus()
            }));
        }
    }, 200);
    
    // Clear check after 10 seconds to avoid infinite checking
    setTimeout(() => {
        if (checkInterval) {
            clearInterval(checkInterval);
            console.log('⏰ Initialization checks completed (timeout reached)');
            
            // Force trigger ready event even if not all dependencies loaded
            document.dispatchEvent(new CustomEvent('gameReady', {
                detail: window.GameInitialization.getStatus()
            }));
        }
    }, 10000);
    
    console.log('🔧 Initialization fix active');
})();
