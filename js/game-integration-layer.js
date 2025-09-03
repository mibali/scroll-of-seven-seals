/**
 * Game Integration Layer - Connects all refactored systems
 * Provides backward compatibility while enabling new architecture
 */

// Enhanced Game Integration - Bridges old and new systems
class GameIntegrationLayer {
    constructor() {
        this.unifiedController = null;
        this.sealMechanics = null;
        this.contentGenerator = null;
        this.isInitialized = false;
        
        console.log('🔧 GameIntegrationLayer initializing...');
        this.initialize();
    }

    async initialize() {
        try {
            // Wait for all systems to be available
            await this.waitForSystems();
            
            // Initialize unified systems
            this.unifiedController = new UnifiedGameController();
            this.sealMechanics = window.sealMechanicsManager;
            this.contentGenerator = window.bibleContentGenerator;
            
            // Set up integration bridges
            this.setupBridges();
            
            // Replace old functions with unified versions
            this.replaceGlobalFunctions();
            
            this.isInitialized = true;
            console.log('✅ Game Integration Layer initialized successfully');
            
            // Notify that enhanced system is ready
            this.notifySystemReady();
            
        } catch (error) {
            console.error('❌ Failed to initialize GameIntegrationLayer:', error);
            // Fall back to original system
            this.fallbackToOriginalSystem();
        }
    }

    async waitForSystems() {
        const maxWait = 10000; // 10 seconds max wait
        const checkInterval = 100; // Check every 100ms
        let waited = 0;

        while (waited < maxWait) {
            if (window.UnifiedGameController && 
                window.sealMechanicsManager && 
                window.bibleContentGenerator &&
                window.GameData) {
                return true;
            }
            
            await new Promise(resolve => setTimeout(resolve, checkInterval));
            waited += checkInterval;
        }
        
        throw new Error('Timeout waiting for systems to initialize');
    }

    setupBridges() {
        // Bridge: Unified controller to seal mechanics
        this.unifiedController.gameState.subscribe((state, previousState) => {
            // Update seal mechanics when game state changes
            if (state.currentSeal !== previousState.currentSeal && state.currentSeal) {
                this.handleSealOpened(state.currentSeal);
            }
            
            // Update UI when seals completed
            if (state.completedSeals.length !== previousState.completedSeals.length) {
                this.handleSealsCompleted(state.completedSeals);
            }
        });

        // Bridge: Enhanced puzzle generation
        const originalGeneratePuzzleContent = window.PuzzleManager?.generatePuzzleContent;
        if (window.PuzzleManager) {
            window.PuzzleManager.generatePuzzleContent = async (sealId, puzzleType) => {
                try {
                    // Try enhanced content generation first
                    const enhancedContent = this.contentGenerator.generateSealContent(sealId);
                    if (enhancedContent) {
                        return this.renderEnhancedContent(enhancedContent, puzzleType);
                    }
                } catch (error) {
                    console.warn('Enhanced content generation failed, using fallback:', error);
                }
                
                // Fallback to original system
                if (originalGeneratePuzzleContent) {
                    return originalGeneratePuzzleContent.call(window.PuzzleManager, sealId, puzzleType);
                }
                
                return '<p>Content not available</p>';
            };
        }

        // Bridge: State synchronization with original system
        if (window.gameState) {
            this.unifiedController.gameState.subscribe((state) => {
                // Keep original gameState in sync for compatibility
                window.gameState.completedSeals = [...state.completedSeals];
                window.gameState.mode = state.mode;
                window.gameState.teamName = state.teamName;
                window.gameState.isGameActive = state.isGameActive;
            });
        }
    }

    replaceGlobalFunctions() {
        // Enhanced seal opening with full-screen mechanics
        const originalOpenSeal = window.openSeal;
        window.openSeal = async (sealId) => {
            try {
                console.log(`🎯 Enhanced openSeal called for seal ${sealId}`);
                
                // Check if seal can be opened using unified controller
                const seal = await this.unifiedController.openSeal(sealId);
                
                // Generate content and launch enhanced mechanics
                const content = this.contentGenerator.generateSealContent(sealId, this.unifiedController.gameState.getState().sessionId);
                await this.sealMechanics.launchSealMechanic(sealId, content);
                
                return seal;
                
            } catch (error) {
                console.warn('Enhanced seal opening failed, using fallback:', error);
                if (originalOpenSeal) {
                    return originalOpenSeal(sealId);
                }
                throw error;
            }
        };

        // Enhanced seal completion
        const originalCompleteSeal = window.completeSeal;
        window.completeSeal = async (sealId, keyword = null) => {
            try {
                console.log(`🎯 Enhanced completeSeal called for seal ${sealId}`);
                
                // Auto-generate keyword if not provided
                if (!keyword) {
                    const content = this.contentGenerator.generateSealContent(sealId);
                    keyword = content.keyword || this.generateDefaultKeyword(sealId);
                }
                
                // Use unified controller to complete seal
                await this.unifiedController.completeSeal(sealId, keyword);
                
                // Update UI and show feedback
                this.showSealCompletionFeedback(sealId, keyword);
                
                return true;
                
            } catch (error) {
                console.warn('Enhanced seal completion failed, using fallback:', error);
                if (originalCompleteSeal) {
                    return originalCompleteSeal(sealId, keyword);
                }
                throw error;
            }
        };

        // Enhanced game mode initialization
        window.startSinglePlayerGame = async () => {
            try {
                console.log('🎮 Enhanced startSinglePlayerGame called');
                await this.unifiedController.initializeMode('single', { 
                    teamName: this.getTeamNameInput() 
                });
                await this.unifiedController.startGame();
                this.showGameInterface();
                console.log('🎮 Enhanced single player game started and interface shown');
                
            } catch (error) {
                console.error('Enhanced single player start failed:', error);
                // Fallback to original
                if (window.gameController?.startSinglePlayerGame) {
                    console.log('🎮 Falling back to original single player start');
                    return window.gameController.startSinglePlayerGame();
                }
            }
        };

        window.startAIArenaGame = async () => {
            try {
                console.log('🎮 Enhanced startAIArenaGame called');
                await this.unifiedController.initializeMode('ai', { 
                    teamName: this.getTeamNameInput() 
                });
                await this.unifiedController.startGame();
                this.showGameInterface();
                console.log('🎮 Enhanced AI arena game started and interface shown');
                
            } catch (error) {
                console.error('Enhanced AI arena start failed:', error);
                // Could implement fallback here
                throw error;
            }
        };

        // Also handle the HTML's startAIGame function
        window.startAIGame = async () => {
            console.log('🎮 startAIGame called - delegating to startAIArenaGame');
            return window.startAIArenaGame();
        };

        // Enhanced render seals function
        const originalRenderSeals = window.renderSeals;
        window.renderSeals = () => {
            try {
                // Only render if game container is visible (prevents home screen rendering)
                const gameContainer = document.getElementById('gameContainer');
                if (!gameContainer || gameContainer.style.display === 'none') {
                    console.log('🎯 Skipping seal render - game container not visible');
                    return;
                }
                
                // If we have a unified controller and it has a game mode, use it
                if (this.unifiedController && this.unifiedController.gameState.getState().mode) {
                    console.log('🎯 Using enhanced renderSeals for mode:', this.unifiedController.gameState.getState().mode);
                    this.unifiedController.renderSeals();
                } else if (originalRenderSeals) {
                    console.log('🎯 Using fallback renderSeals');
                    originalRenderSeals();
                } else {
                    console.log('🎯 No renderSeals method available');
                }
            } catch (error) {
                console.error('Error in enhanced renderSeals:', error);
                if (originalRenderSeals) {
                    originalRenderSeals();
                }
            }
        };

        // Full-screen toggle
        window.toggleFullScreen = () => {
            this.unifiedController.toggleFullScreen();
        };

        // New game with enhanced reset
        window.newGame = () => {
            if (confirm('Start a new game? This will reset all progress and generate fresh content.')) {
                this.contentGenerator.clearSession();
                this.unifiedController.reset();
                this.showMainMenu();
                
                // Show notification about fresh content
                if (window.showNotification) {
                    window.showNotification('🔄 New game started with fresh biblical content!', 'success');
                }
            }
        };
    }

    // Handle seal opened event
    handleSealOpened(sealId) {
        console.log(`🔓 Seal ${sealId} opened through unified system`);
        
        // Update any UI elements that need to reflect the opened seal
        const sealCards = document.querySelectorAll('.seal-card');
        sealCards.forEach(card => {
            if (card.dataset.sealId == sealId) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // Handle seals completed event
    handleSealsCompleted(completedSeals) {
        console.log(`✅ Seals completed updated:`, completedSeals);
        
        // Update seal cards appearance
        const sealCards = document.querySelectorAll('.seal-card');
        sealCards.forEach(card => {
            const sealId = parseInt(card.dataset.sealId);
            if (completedSeals.includes(sealId)) {
                card.classList.add('completed');
                card.classList.remove('locked', 'available');
            }
        });
        
        // Check for game completion
        if (completedSeals.length === 7) {
            setTimeout(() => {
                this.showGameCompletionCelebration();
            }, 1000);
        }
        
        // Update progress indicators
        this.updateProgressIndicators(completedSeals);
    }

    // Render enhanced content for different puzzle types
    renderEnhancedContent(content, puzzleType) {
        switch (content.type) {
            case 'timeline':
                return this.renderTimelineContent(content);
            case 'memory':
                return this.renderMemoryContent(content);
            case 'journey':
                return this.renderJourneyContent(content);
            case 'interactive_story':
                return this.renderInteractiveStoryContent(content);
            case 'letter_sorting':
                return this.renderLetterSortingContent(content);
            case 'wellness_match':
                return this.renderWellnessContent(content);
            case 'final_challenge':
                return this.renderFinalChallengeContent(content);
            default:
                return this.renderGenericContent(content);
        }
    }

    renderTimelineContent(content) {
        return `
            <div class="enhanced-timeline-puzzle">
                <h3>📜 ${content.theme} Timeline Challenge</h3>
                <p>Arrange these events in chronological order:</p>
                <div class="timeline-events">
                    ${content.events.map(event => `
                        <div class="timeline-event-card" data-order="${event.correctOrder}">
                            <h4>${event.name}</h4>
                            <p class="event-reference">${event.reference}</p>
                            <p class="event-period">${event.period}</p>
                        </div>
                    `).join('')}
                </div>
                <p><strong>Target Keyword:</strong> ${content.keyword}</p>
            </div>
        `;
    }

    renderMemoryContent(content) {
        return `
            <div class="enhanced-memory-puzzle">
                <h3>🧠 ${content.theme} Memory Challenge</h3>
                <p>Match the verses with their meanings:</p>
                <div class="memory-grid">
                    ${content.pairs.map(pair => `
                        <div class="memory-pair">
                            <div class="verse-card">${pair.verse}</div>
                            <div class="meaning-card">${pair.meaning}</div>
                        </div>
                    `).join('')}
                </div>
                <p><strong>Target Keyword:</strong> ${content.keyword}</p>
            </div>
        `;
    }

    renderJourneyContent(content) {
        return `
            <div class="enhanced-journey-puzzle">
                <h3>🌟 ${content.theme}</h3>
                <p>Follow the faith journey of ${content.character}:</p>
                <div class="journey-stages">
                    ${content.stages.map((stage, index) => `
                        <div class="journey-stage" data-stage="${index}">
                            <h4>Stage ${stage.id}: ${stage.title}</h4>
                            <p>${stage.description}</p>
                            <p class="stage-lesson"><strong>Lesson:</strong> ${stage.lesson}</p>
                        </div>
                    `).join('')}
                </div>
                <p><strong>Target Keyword:</strong> ${content.keyword}</p>
            </div>
        `;
    }

    renderInteractiveStoryContent(content) {
        return `
            <div class="enhanced-story-puzzle">
                <h3>📖 ${content.theme}</h3>
                <p class="story-reference">${content.reference}</p>
                <p class="story-lesson">${content.lesson}</p>
                <div class="story-elements">
                    ${content.elements.map((element, index) => `
                        <div class="story-element">
                            <span class="element-name">${element}</span>
                            <span class="element-application">${content.applications[index]}</span>
                        </div>
                    `).join('')}
                </div>
                <p><strong>Target Keyword:</strong> ${content.keyword}</p>
            </div>
        `;
    }

    renderGenericContent(content) {
        return `
            <div class="enhanced-generic-puzzle">
                <h3>${content.theme}</h3>
                <p>Enhanced biblical content coming soon!</p>
                <p><strong>Target Keyword:</strong> ${content.keyword}</p>
            </div>
        `;
    }

    // Utility functions
    getTeamNameInput() {
        const inputs = [
            document.getElementById('teamName'),
            document.getElementById('playerTeamName'),
            document.getElementById('singleTeamName')
        ];
        
        for (const input of inputs) {
            if (input && input.value.trim()) {
                return input.value.trim();
            }
        }
        
        return 'Player Team';
    }

    showGameInterface() {
        console.log('🎮 showGameInterface called');
        
        // Hide ALL other screens first
        const screens = document.querySelectorAll('.screen, .mode-selection, .setup-container');
        screens.forEach(screen => {
            if (screen.style) {
                screen.style.display = 'none';
            }
            screen.classList.remove('active');
        });

        // Also hide specific screens by ID
        const screenIds = ['mainMenu', 'singlePlayerSetup', 'multiPlayerSetup', 'modeSelection'];
        screenIds.forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) {
                screen.style.display = 'none';
                screen.classList.remove('active');
                console.log(`🎮 Hidden screen: ${screenId}`);
            }
        });
        
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.style.display = 'block';
            gameContainer.classList.add('active');
            console.log('🎮 Game container shown and activated');
        } else {
            console.error('🎮 gameContainer element not found!');
        }
        
        // Hide leaderboard ONLY for single player mode, show for AI/multiplayer
        const currentMode = this.unifiedController?.gameState.getState().mode;
        const leaderboard = document.querySelector('.leaderboard');
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (currentMode === 'single') {
            if (leaderboard) {
                leaderboard.style.display = 'none';
                console.log('🎮 Hidden leaderboard for single player mode');
            }
            if (leaderboardList) {
                leaderboardList.style.display = 'none';
            }
        } else {
            // Show leaderboard for AI and multiplayer modes
            if (leaderboard) {
                leaderboard.style.display = 'block';
                console.log('🎮 Showing leaderboard for', currentMode, 'mode');
            }
            if (leaderboardList) {
                leaderboardList.style.display = 'block';
            }
        }
        
        // Check if sealsGrid exists
        const sealsGrid = document.getElementById('sealsGrid');
        if (sealsGrid) {
            console.log('🎮 sealsGrid found, ready for rendering');
        } else {
            console.error('🎮 sealsGrid element not found!');
        }
        
        // Render seals with new system - since game interface is being shown, we should render
        setTimeout(() => {
            console.log('🎮 Attempting to render seals...');
            if (window.renderSeals) {
                window.renderSeals();
            } else {
                console.error('🎮 renderSeals function not available');
            }
        }, 100);
    }

    showMainMenu() {
        console.log('🎮 showMainMenu called - hiding game container');
        
        // Hide game container
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.style.display = 'none';
            gameContainer.classList.remove('active');
            console.log('🎮 Game container hidden');
        }
        
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        const mainMenu = document.getElementById('mainMenu');
        if (mainMenu) {
            mainMenu.classList.add('active');
            mainMenu.style.display = 'block';
            console.log('🎮 Main menu shown');
        }
    }

    showSealCompletionFeedback(sealId, keyword) {
        // Show completion notification
        if (window.showNotification) {
            window.showNotification(`🎉 Seal ${sealId} completed! Keyword: ${keyword}`, 'success');
        }
        
        // Add completion animation to seal card
        const sealCard = document.querySelector(`[data-seal-id="${sealId}"]`);
        if (sealCard) {
            sealCard.classList.add('just-completed');
            setTimeout(() => {
                sealCard.classList.remove('just-completed');
            }, 2000);
        }
    }

    updateProgressIndicators(completedSeals) {
        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = (completedSeals.length / 7) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        // Update seal count display
        const sealCountDisplays = document.querySelectorAll('.seals-completed-count');
        sealCountDisplays.forEach(display => {
            display.textContent = completedSeals.length;
        });
    }

    showGameCompletionCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'game-completion-celebration';
        celebration.innerHTML = `
            <div class="celebration-overlay">
                <div class="celebration-content">
                    <h1>🏆 VICTORY! 🏆</h1>
                    <h2>All Seven Seals Unlocked!</h2>
                    <p>You have successfully completed your biblical journey!</p>
                    <div class="celebration-fireworks"></div>
                    <button onclick="this.parentElement.parentElement.parentElement.remove(); window.newGame();" 
                            class="btn-primary">
                        🎮 Play Again with New Content
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Auto-remove after 10 seconds if user doesn't interact
        setTimeout(() => {
            if (celebration.parentElement) {
                celebration.remove();
            }
        }, 10000);
    }

    generateDefaultKeyword(sealId) {
        const defaultKeywords = {
            1: 'CREATION',
            2: 'WISDOM',
            3: 'GROWTH',
            4: 'KINGDOM',
            5: 'GOSPEL',
            6: 'HEALING',
            7: 'VICTORY'
        };
        
        return defaultKeywords[sealId] || 'FAITH';
    }

    fallbackToOriginalSystem() {
        console.log('🔄 Falling back to original game system');
        // Original system should continue to work as before
        this.isInitialized = false;
    }

    notifySystemReady() {
        // Ensure game container is hidden initially
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.style.display = 'none';
            gameContainer.classList.remove('active');
            console.log('🎮 Ensured game container is hidden on system ready');
        }
        
        // Dispatch custom event to notify other parts of the system
        const event = new CustomEvent('enhancedGameSystemReady', {
            detail: {
                unifiedController: this.unifiedController,
                sealMechanics: this.sealMechanics,
                contentGenerator: this.contentGenerator
            }
        });
        
        document.dispatchEvent(event);
        
        // Update UI to show enhanced features are available
        const enhancementNotice = document.getElementById('enhancementNotice');
        if (enhancementNotice) {
            enhancementNotice.textContent = '✨ Enhanced Biblical Content System Active';
            enhancementNotice.style.color = '#32CD32';
        }
        
        // Update daily scripture with generated content
        this.updateDailyScripture();
    }

    updateDailyScripture() {
        try {
            const dailyScripture = this.contentGenerator.generateDailyScripture();
            
            const scriptureText = document.getElementById('scriptureText');
            const scriptureReference = document.getElementById('scriptureReference');
            
            if (scriptureText && scriptureReference) {
                scriptureText.textContent = dailyScripture.text;
                scriptureReference.textContent = dailyScripture.reference;
            }
        } catch (error) {
            console.warn('Failed to update daily scripture:', error);
        }
    }

    // Public API for external access
    getUnifiedController() {
        return this.unifiedController;
    }

    getSealMechanics() {
        return this.sealMechanics;
    }

    getContentGenerator() {
        return this.contentGenerator;
    }

    isReady() {
        return this.isInitialized;
    }
}

// Initialize integration layer
window.GameIntegrationLayer = GameIntegrationLayer;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.gameIntegrationLayer = new GameIntegrationLayer();
    });
} else {
    // DOM already loaded
    window.gameIntegrationLayer = new GameIntegrationLayer();
}

console.log('🔧 Game Integration Layer module loaded');
