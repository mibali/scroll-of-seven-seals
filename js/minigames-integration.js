// Mini-Games Integration with Existing Scroll of Seven Seals System
// Seamlessly integrates Bible-based mini-games into the current game flow

class MiniGamesIntegration {
    constructor() {
        this.isIntegrated = false;
        this.originalSealHandlers = new Map();
        this.miniGameEnabled = true;
    }

    // Initialize the integration
    initialize() {
        if (this.isIntegrated) return;

        console.log('🎮 Initializing Mini-Games Integration...');
        
        // Wait for all required systems to be ready
        this.waitForDependencies().then(() => {
            this.integrateWithExistingSystem();
            this.addMiniGameButtons();
            this.setupEventListeners();
            this.isIntegrated = true;
            console.log('✅ Mini-Games Integration completed successfully');
        }).catch(error => {
            console.error('❌ Failed to initialize Mini-Games Integration:', error);
        });
    }

    // Wait for all dependencies to load
    async waitForDependencies() {
        const maxWaitTime = 30000; // 30 seconds
        const checkInterval = 500; // 500ms
        let elapsedTime = 0;

        return new Promise((resolve, reject) => {
            const checkDependencies = () => {
                // Check if all required objects exist
                const dependencies = [
                    window.BibleService,
                    window.SealMiniGames,
                    window.PuzzleManager || window.GameSystem, // Check existing game system
                    document.getElementById('gameArea') || document.querySelector('.container')
                ];

                const allReady = dependencies.every(dep => dep !== null && dep !== undefined);

                if (allReady) {
                    // Additional check for Bible service initialization
                    if (window.BibleService && window.BibleService.isInitialized) {
                        resolve();
                        return;
                    }
                }

                elapsedTime += checkInterval;
                if (elapsedTime >= maxWaitTime) {
                    reject(new Error('Timeout waiting for dependencies'));
                    return;
                }

                setTimeout(checkDependencies, checkInterval);
            };

            checkDependencies();
        });
    }

    // Integrate with the existing seal system
    integrateWithExistingSystem() {
        // Hook into existing seal opening mechanism
        this.interceptSealMethods();
        
        // Add mini-game option to existing UI
        this.enhanceExistingUI();
        
        console.log('🔗 Integrated with existing seal system');
    }

    // Intercept existing seal methods to add mini-game option
    interceptSealMethods() {
        // Find and enhance existing seal functions
        const gameSystem = window.PuzzleManager || window.GameSystem || window;
        
        // Common seal-related function names to look for
        const sealFunctionNames = [
            'openSeal',
            'startSeal',
            'handleSeal',
            'processSeal',
            'activateSeal'
        ];

        sealFunctionNames.forEach(funcName => {
            if (typeof gameSystem[funcName] === 'function') {
                this.originalSealHandlers.set(funcName, gameSystem[funcName]);
                gameSystem[funcName] = this.createEnhancedSealHandler(funcName);
                console.log(`🎯 Enhanced ${funcName} with mini-game integration`);
            }
        });

        // Also check for global functions
        sealFunctionNames.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                this.originalSealHandlers.set(`global_${funcName}`, window[funcName]);
                window[funcName] = this.createEnhancedSealHandler(funcName);
            }
        });
    }

    // Create enhanced seal handler that includes mini-game option
    createEnhancedSealHandler(originalFunctionName) {
        const originalFunction = this.originalSealHandlers.get(originalFunctionName) || 
                               this.originalSealHandlers.get(`global_${originalFunctionName}`);
        
        return (...args) => {
            const sealNumber = this.extractSealNumber(args);
            
            if (sealNumber && this.miniGameEnabled) {
                // Offer mini-game option before proceeding with original logic
                this.offerMiniGameOption(sealNumber, () => {
                    // Proceed with original function after mini-game
                    if (originalFunction) {
                        return originalFunction.apply(this, args);
                    }
                });
            } else {
                // No seal number detected or mini-games disabled, proceed normally
                if (originalFunction) {
                    return originalFunction.apply(this, args);
                }
            }
        };
    }

    // Extract seal number from function arguments
    extractSealNumber(args) {
        // Try to find seal number in arguments
        for (const arg of args) {
            if (typeof arg === 'number' && arg >= 1 && arg <= 7) {
                return arg;
            }
            if (typeof arg === 'string') {
                const match = arg.match(/seal[_\s]*(\d)/i);
                if (match) {
                    return parseInt(match[1]);
                }
            }
            if (typeof arg === 'object' && arg !== null) {
                if (arg.sealNumber || arg.seal || arg.id) {
                    const sealNum = arg.sealNumber || arg.seal || arg.id;
                    if (typeof sealNum === 'number' && sealNum >= 1 && sealNum <= 7) {
                        return sealNum;
                    }
                }
            }
        }
        return null;
    }

    // Offer mini-game option to player
    offerMiniGameOption(sealNumber, originalCallback) {
        const sealInfo = window.BibleService ? window.BibleService.getSealInfo(sealNumber) : null;
        const sealName = sealInfo ? sealInfo.description : `Seal ${sealNumber}`;

        // Create a beautiful modal asking if user wants to play mini-game
        const modal = document.createElement('div');
        modal.className = 'minigame-option-modal';
        modal.innerHTML = `
            <div class="minigame-option-overlay">
                <div class="minigame-option-card">
                    <div class="minigame-option-header">
                        <h3>🎮 Enhanced Biblical Experience</h3>
                        <p>Ready to deepen your understanding of ${sealName}?</p>
                    </div>
                    <div class="minigame-option-content">
                        <div class="minigame-option-description">
                            <p>🌟 Experience an interactive Bible-based mini-game designed specifically for this seal!</p>
                            <p>📖 Learn through engaging puzzles, quizzes, and activities.</p>
                            <p>🏆 Earn extra points and spiritual insights.</p>
                        </div>
                    </div>
                    <div class="minigame-option-buttons">
                        <button class="minigame-option-btn primary" onclick="window.MiniGamesIntegration.playMiniGame(${sealNumber})">
                            ✨ Play Mini-Game
                        </button>
                        <button class="minigame-option-btn secondary" onclick="window.MiniGamesIntegration.continueOriginalGame()">
                            📜 Continue Traditional Way
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Store callback for later use
        this.currentOriginalCallback = originalCallback;
        this.currentSealNumber = sealNumber;
        
        // Add styles for the modal
        this.addMiniGameOptionStyles();
    }

    // Play the mini-game for the seal
    playMiniGame(sealNumber) {
        this.closeMiniGameOptionModal();
        
        if (window.SealMiniGames) {
            window.SealMiniGames.launchSealGame(sealNumber, {
                onComplete: (seal, score) => {
                    console.log(`🎉 Mini-game completed for Seal ${seal} with score: ${score}`);
                    // Award bonus points or benefits
                    this.awardMiniGameBonus(seal, score);
                    // Continue with original game flow
                    if (this.currentOriginalCallback) {
                        this.currentOriginalCallback();
                    }
                },
                onScoreUpdate: (score) => {
                    // Optional: Update global game score
                    console.log(`Score updated: ${score}`);
                }
            });
        } else {
            console.error('Mini-games system not available');
            this.continueOriginalGame();
        }
    }

    // Continue with original game without mini-game
    continueOriginalGame() {
        this.closeMiniGameOptionModal();
        if (this.currentOriginalCallback) {
            this.currentOriginalCallback();
        }
    }

    // Close the mini-game option modal
    closeMiniGameOptionModal() {
        const modal = document.querySelector('.minigame-option-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Award bonus for completing mini-game
    awardMiniGameBonus(sealNumber, score) {
        // Try to integrate with existing scoring system
        const bonusPoints = Math.floor(score * 0.5); // 50% bonus
        
        // Look for existing score update functions
        const possibleScoreFunctions = [
            'updateScore',
            'addScore',
            'awardPoints',
            'incrementScore'
        ];

        let scoreUpdated = false;
        possibleScoreFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function' && !scoreUpdated) {
                try {
                    window[funcName](bonusPoints);
                    scoreUpdated = true;
                    console.log(`🌟 Awarded ${bonusPoints} bonus points for mini-game completion`);
                } catch (error) {
                    console.warn(`Failed to award points via ${funcName}:`, error);
                }
            }
        });

        // Show bonus notification
        this.showBonusNotification(bonusPoints);
    }

    // Show bonus notification
    showBonusNotification(points) {
        const notification = document.createElement('div');
        notification.className = 'minigame-bonus-notification';
        notification.innerHTML = `
            <div class="bonus-content">
                <div class="bonus-icon">🎉</div>
                <div class="bonus-text">
                    <strong>Mini-Game Bonus!</strong><br>
                    +${points} points earned
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);

        this.addBonusNotificationStyles();
    }

    // Add mini-game buttons to existing UI
    addMiniGameButtons() {
        // Add a mini-games launcher button
        const existingContainer = document.querySelector('.game-mode') || 
                                document.querySelector('.container') || 
                                document.body;

        if (existingContainer) {
            const miniGameLauncher = document.createElement('div');
            miniGameLauncher.className = 'minigame-launcher-section';
            miniGameLauncher.innerHTML = `
                <div class="minigame-launcher-card">
                    <h3>🎮 Biblical Mini-Games</h3>
                    <p>Experience interactive Bible-based games for each of the 7 seals</p>
                    <div class="minigame-quick-launch">
                        ${Array.from({length: 7}, (_, i) => `
                            <button class="minigame-quick-btn" onclick="window.MiniGamesIntegration.launchDirectMiniGame(${i + 1})">
                                Seal ${i + 1}
                            </button>
                        `).join('')}
                    </div>
                    <div class="minigame-toggle">
                        <label>
                            <input type="checkbox" id="miniGameToggle" ${this.miniGameEnabled ? 'checked' : ''} 
                                   onchange="window.MiniGamesIntegration.toggleMiniGames(this.checked)">
                            Auto-offer mini-games during seal opening
                        </label>
                    </div>
                </div>
            `;

            existingContainer.appendChild(miniGameLauncher);
            this.addLauncherStyles();
        }
    }

    // Launch mini-game directly
    launchDirectMiniGame(sealNumber) {
        if (window.SealMiniGames) {
            window.SealMiniGames.launchSealGame(sealNumber);
        }
    }

    // Toggle mini-games feature
    toggleMiniGames(enabled) {
        this.miniGameEnabled = enabled;
        localStorage.setItem('miniGamesEnabled', enabled);
        console.log(`🎮 Mini-games ${enabled ? 'enabled' : 'disabled'}`);
    }

    // Setup additional event listeners
    setupEventListeners() {
        // Load saved preference
        const saved = localStorage.getItem('miniGamesEnabled');
        if (saved !== null) {
            this.miniGameEnabled = saved === 'true';
        }

        // Listen for keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + M to toggle mini-games
            if (e.altKey && e.key.toLowerCase() === 'm') {
                this.toggleMiniGames(!this.miniGameEnabled);
                const toggle = document.getElementById('miniGameToggle');
                if (toggle) toggle.checked = this.miniGameEnabled;
            }
        });
    }

    // Enhance existing UI elements
    enhanceExistingUI() {
        // Add visual indicators to seal-related elements
        const sealElements = document.querySelectorAll('[data-seal], .seal, .mode-card');
        
        sealElements.forEach(element => {
            const badge = document.createElement('div');
            badge.className = 'minigame-available-badge';
            badge.innerHTML = '🎮';
            badge.title = 'Mini-game available for this seal!';
            
            if (!element.querySelector('.minigame-available-badge')) {
                element.style.position = 'relative';
                element.appendChild(badge);
            }
        });
    }

    // Add styles for mini-game option modal
    addMiniGameOptionStyles() {
        if (document.getElementById('minigameOptionStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'minigameOptionStyles';
        styles.textContent = `
            .minigame-option-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 15000;
                animation: fadeIn 0.3s ease;
            }

            .minigame-option-overlay {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            .minigame-option-card {
                background: linear-gradient(145deg, rgba(139, 69, 19, 0.95), rgba(160, 82, 45, 0.9));
                border: 3px solid #d4af37;
                border-radius: 20px;
                max-width: 500px;
                width: 100%;
                padding: 30px;
                text-align: center;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
                animation: slideInUp 0.4s ease;
            }

            .minigame-option-header h3 {
                color: #d4af37;
                font-family: 'Cinzel', serif;
                font-size: 1.8em;
                margin-bottom: 10px;
            }

            .minigame-option-header p {
                color: #f5f5f5;
                font-size: 1.2em;
                margin-bottom: 25px;
            }

            .minigame-option-description {
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 25px;
                border: 2px solid rgba(212, 175, 55, 0.3);
            }

            .minigame-option-description p {
                color: #e8e8e8;
                margin-bottom: 10px;
                font-size: 1em;
                line-height: 1.5;
            }

            .minigame-option-buttons {
                display: flex;
                gap: 15px;
                justify-content: center;
                flex-wrap: wrap;
            }

            .minigame-option-btn {
                padding: 15px 25px;
                border: none;
                border-radius: 12px;
                font-size: 1.1em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Cinzel', serif;
                min-width: 160px;
            }

            .minigame-option-btn.primary {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
            }

            .minigame-option-btn.primary:hover {
                background: linear-gradient(135deg, #16a34a, #15803d);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
            }

            .minigame-option-btn.secondary {
                background: linear-gradient(135deg, #6b7280, #4b5563);
                color: white;
                box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
            }

            .minigame-option-btn.secondary:hover {
                background: linear-gradient(135deg, #4b5563, #374151);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideInUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Add styles for launcher section
    addLauncherStyles() {
        if (document.getElementById('minigameLauncherStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'minigameLauncherStyles';
        styles.textContent = `
            .minigame-launcher-section {
                margin: 30px 0;
            }

            .minigame-launcher-card {
                background: linear-gradient(145deg, rgba(139, 69, 19, 0.3), rgba(160, 82, 45, 0.2));
                border: 2px solid rgba(212, 175, 55, 0.4);
                border-radius: 20px;
                padding: 30px;
                text-align: center;
                backdrop-filter: blur(10px);
            }

            .minigame-launcher-card h3 {
                color: #d4af37;
                font-family: 'Cinzel', serif;
                font-size: 1.8em;
                margin-bottom: 10px;
            }

            .minigame-launcher-card p {
                color: #e8e8e8;
                margin-bottom: 25px;
                font-size: 1.1em;
            }

            .minigame-quick-launch {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 10px;
                margin-bottom: 20px;
            }

            .minigame-quick-btn {
                background: linear-gradient(135deg, #d4af37, #b8860b);
                color: #1a0f0f;
                border: none;
                border-radius: 8px;
                padding: 12px 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9em;
            }

            .minigame-quick-btn:hover {
                background: linear-gradient(135deg, #ffd700, #d4af37);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
            }

            .minigame-toggle {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
                padding: 15px;
                border: 1px solid rgba(212, 175, 55, 0.3);
            }

            .minigame-toggle label {
                color: #e8e8e8;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                cursor: pointer;
                font-size: 1em;
            }

            .minigame-toggle input[type="checkbox"] {
                width: 18px;
                height: 18px;
                accent-color: #d4af37;
            }

            .minigame-available-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                animation: pulse 2s infinite;
                box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
                z-index: 10;
            }
        `;

        document.head.appendChild(styles);
    }

    // Add styles for bonus notification
    addBonusNotificationStyles() {
        if (document.getElementById('bonusNotificationStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'bonusNotificationStyles';
        styles.textContent = `
            .minigame-bonus-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 12000;
                animation: bounceIn 0.6s ease, fadeOut 0.5s ease 2.5s forwards;
                border: 2px solid rgba(255, 255, 255, 0.2);
            }

            .bonus-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .bonus-icon {
                font-size: 2em;
                animation: rotate 2s ease-in-out infinite;
            }

            .bonus-text {
                font-weight: 600;
                text-align: left;
            }

            @keyframes bounceIn {
                0% {
                    transform: scale(0.3) translateY(-50px);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.05) translateY(0);
                    opacity: 1;
                }
                70% {
                    transform: scale(0.95);
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }

            @keyframes rotate {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-10deg); }
                75% { transform: rotate(10deg); }
            }
        `;

        document.head.appendChild(styles);
    }
}

// Global instance
window.MiniGamesIntegration = new MiniGamesIntegration();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.MiniGamesIntegration) {
            window.MiniGamesIntegration.initialize();
        }
    }, 2000); // Wait for other systems to load first
});
