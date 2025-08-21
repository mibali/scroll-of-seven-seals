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
        // DISABLED: Don't hook into existing seal methods to prevent old system from running
        // this.interceptSealMethods();
        
        // Add mini-game option to existing UI
        this.enhanceExistingUI();
        
        console.log('🔗 Enhanced UI with mini-games (original system preserved)');
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
                            ✨ Play Interactive Game
                        </button>
                        <button class="minigame-option-btn secondary" onclick="window.MiniGamesIntegration.continueOriginalGame()">
                            📜 Skip to Next
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
                    // Mark seal as completed and show success message
                    this.completeSeal(seal, score);
                    // DO NOT call original callback - mini-game is the complete experience
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

    // Complete seal with mini-game (replaces original game flow)
    completeSeal(sealNumber, score) {
        // Show completion notification
        this.showSealCompletionNotification(sealNumber, score);
        
        // Mark seal as completed in any existing system
        this.markSealAsCompleted(sealNumber);
        
        // Update any global game state if needed
        if (typeof window.updateGameProgress === 'function') {
            window.updateGameProgress(sealNumber, score);
        }
        
        console.log(`✅ Seal ${sealNumber} completed through mini-game with score: ${score}`);
    }

    // Mark seal as completed in existing game systems
    markSealAsCompleted(sealNumber) {
        try {
            // Try to find and update any existing seal tracking
            const sealElements = document.querySelectorAll(`[data-seal="${sealNumber}"], .seal-${sealNumber}, #seal${sealNumber}`);
            sealElements.forEach(element => {
                element.classList.add('completed', 'mini-game-completed');
                element.setAttribute('data-completed', 'true');
            });

            // Update any global seal completion tracking
            if (window.completedSeals) {
                if (Array.isArray(window.completedSeals)) {
                    if (!window.completedSeals.includes(sealNumber)) {
                        window.completedSeals.push(sealNumber);
                    }
                } else if (typeof window.completedSeals === 'object') {
                    window.completedSeals[sealNumber] = true;
                }
            }
        } catch (error) {
            console.warn('Could not update existing seal tracking:', error);
        }
    }

    // Show seal completion notification
    showSealCompletionNotification(sealNumber, score) {
        const notification = document.createElement('div');
        notification.className = 'seal-completion-notification';
        notification.innerHTML = `
            <div class="completion-content">
                <div class="completion-icon">🏆</div>
                <div class="completion-text">
                    <strong>Seal ${sealNumber} Completed!</strong><br>
                    Biblical knowledge gained: ${score} points<br>
                    <small>You have unlocked deeper spiritual understanding</small>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        this.addCompletionNotificationStyles();
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
        // Find existing game mode cards and enhance them
        const gameModeCards = document.querySelectorAll('.mode-card');
        
        if (gameModeCards.length > 0) {
            // Add mini-game info to existing cards
            gameModeCards.forEach((card, index) => {
                this.enhanceModeCard(card, index + 1);
            });
        } else {
            // Create new enhanced seal cards
            this.createEnhancedSealCards();
        }
        
        this.addLauncherStyles();
    }

    // Enhance existing mode cards with mini-game features
    enhanceModeCard(card, sealNumber) {
        // Add mini-game badge if not already present
        if (!card.querySelector('.minigame-badge')) {
            const badge = document.createElement('div');
            badge.className = 'minigame-badge';
            badge.innerHTML = '🎮';
            badge.title = 'Interactive Bible game available!';
            card.style.position = 'relative';
            card.appendChild(badge);

            // Add mini-game launch button
            const launchBtn = document.createElement('button');
            launchBtn.className = 'minigame-launch-btn';
            launchBtn.innerHTML = '✨ Play Interactive Game';
            launchBtn.onclick = (e) => {
                e.stopPropagation();
                this.launchDirectMiniGame(sealNumber);
            };
            
            card.appendChild(launchBtn);
        }
    }

    // Create enhanced seal cards with mini-games built-in
    createEnhancedSealCards() {
        const container = document.querySelector('.container') || document.body;
        
        const sealCards = document.createElement('div');
        sealCards.className = 'enhanced-seal-cards';
        sealCards.innerHTML = `
            <div class="enhanced-seals-header">
                <h2>🔮 The Seven Seals of Revelation</h2>
                <p>Discover biblical truths through interactive games and challenges</p>
            </div>
            <div class="seals-grid">
                ${this.generateSealCards()}
            </div>
            <div class="minigame-controls">
                <label class="toggle-label">
                    <input type="checkbox" id="miniGameToggle" ${this.miniGameEnabled ? 'checked' : ''} 
                           onchange="window.MiniGamesIntegration.toggleMiniGames(this.checked)">
                    <span>Auto-launch interactive games</span>
                </label>
            </div>
        `;
        
        container.appendChild(sealCards);
    }

    // Generate individual seal cards
    generateSealCards() {
        const sealData = [
            { title: 'Timeline of Faith', icon: '📜', description: 'Old Testament Events & History', theme: 'Arrange biblical events in chronological order' },
            { title: 'Wisdom & Worship', icon: '🎵', description: 'Psalms & Proverbs', theme: 'Complete verses from wisdom literature' },
            { title: 'Principles of Faith', icon: '⛪', description: 'Spiritual Growth', theme: 'Match verses with faith principles' },
            { title: 'Kingdom Parables', icon: '🌱', description: 'Jesus\' Teachings', theme: 'Connect parables with their meanings' },
            { title: 'Church Letters', icon: '📜', description: 'Paul\'s Epistles', theme: 'Test knowledge of early church' },
            { title: 'Stories of Healing', icon: '🙏', description: 'Divine Restoration', theme: 'Complete healing miracle accounts' },
            { title: 'Revelation Symbols', icon: '🔮', description: 'Prophetic Imagery', theme: 'Decode symbolic language' }
        ];

        return sealData.map((seal, index) => `
            <div class="enhanced-seal-card" data-seal="${index + 1}">
                <div class="seal-header">
                    <div class="seal-icon">${seal.icon}</div>
                    <div class="seal-number">Seal ${index + 1}</div>
                </div>
                <h3 class="seal-title">${seal.title}</h3>
                <p class="seal-description">${seal.description}</p>
                <p class="seal-theme">${seal.theme}</p>
                <button class="play-seal-btn" onclick="window.MiniGamesIntegration.launchDirectMiniGame(${index + 1})">
                    <span class="btn-icon">🎮</span>
                    <span class="btn-text">Play Interactive Game</span>
                </button>
            </div>
        `).join('');
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
            /* Enhanced Seal Cards */
            .enhanced-seal-cards {
                margin: 40px 0;
            }

            .enhanced-seals-header {
                text-align: center;
                margin-bottom: 30px;
            }

            .enhanced-seals-header h2 {
                color: #d4af37;
                font-family: 'Cinzel', serif;
                font-size: 2.5em;
                margin-bottom: 10px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }

            .enhanced-seals-header p {
                color: #e8e8e8;
                font-size: 1.2em;
                max-width: 600px;
                margin: 0 auto;
                line-height: 1.6;
            }

            .seals-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                gap: 25px;
                margin-bottom: 30px;
            }

            .enhanced-seal-card {
                background: linear-gradient(145deg, rgba(139, 69, 19, 0.4), rgba(160, 82, 45, 0.3));
                border: 2px solid rgba(212, 175, 55, 0.4);
                border-radius: 20px;
                padding: 30px;
                text-align: center;
                backdrop-filter: blur(15px);
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                position: relative;
                overflow: hidden;
                cursor: pointer;
            }

            .enhanced-seal-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 60%);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .enhanced-seal-card:hover::before {
                opacity: 1;
            }

            .enhanced-seal-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: #d4af37;
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 8px 25px rgba(212, 175, 55, 0.3);
            }

            .seal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
                position: relative;
                z-index: 2;
            }

            .seal-icon {
                font-size: 3em;
                filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
            }

            .seal-number {
                background: linear-gradient(135deg, #d4af37, #b8860b);
                color: #1a0f0f;
                padding: 8px 15px;
                border-radius: 20px;
                font-weight: 700;
                font-size: 0.9em;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .seal-title {
                color: #d4af37;
                font-family: 'Cinzel', serif;
                font-size: 1.6em;
                margin-bottom: 10px;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                position: relative;
                z-index: 2;
            }

            .seal-description {
                color: #e8e8e8;
                font-size: 1.1em;
                font-weight: 600;
                margin-bottom: 8px;
                position: relative;
                z-index: 2;
            }

            .seal-theme {
                color: #b8a082;
                font-size: 0.95em;
                line-height: 1.4;
                margin-bottom: 25px;
                position: relative;
                z-index: 2;
            }

            .play-seal-btn {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                border: none;
                border-radius: 12px;
                padding: 15px 25px;
                font-weight: 700;
                font-size: 1.1em;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                width: 100%;
                box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
                position: relative;
                z-index: 2;
                font-family: 'Cinzel', serif;
            }

            .play-seal-btn:hover {
                background: linear-gradient(135deg, #16a34a, #15803d);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
            }

            .btn-icon {
                font-size: 1.2em;
            }

            .minigame-controls {
                text-align: center;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(212, 175, 55, 0.3);
            }

            .toggle-label {
                color: #e8e8e8;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                cursor: pointer;
                font-size: 1.1em;
                font-weight: 500;
            }

            .toggle-label input[type="checkbox"] {
                width: 20px;
                height: 20px;
                accent-color: #d4af37;
                cursor: pointer;
            }

            /* Enhancement badges for existing cards */
            .minigame-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                animation: pulse 2s infinite;
                box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
                z-index: 10;
                border: 2px solid rgba(255, 255, 255, 0.2);
            }

            .minigame-launch-btn {
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                border: none;
                border-radius: 8px;
                padding: 10px 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9em;
                margin-top: 15px;
                width: 100%;
            }

            .minigame-launch-btn:hover {
                background: linear-gradient(135deg, #16a34a, #15803d);
                transform: translateY(-1px);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .seals-grid {
                    grid-template-columns: 1fr;
                    gap: 20px;
                }
                
                .enhanced-seals-header h2 {
                    font-size: 2em;
                }
                
                .enhanced-seal-card {
                    padding: 25px;
                }
            }

            @media (max-width: 480px) {
                .enhanced-seal-card {
                    padding: 20px;
                }
                
                .seal-icon {
                    font-size: 2.5em;
                }
                
                .seal-title {
                    font-size: 1.4em;
                }
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

    // Add styles for completion notification
    addCompletionNotificationStyles() {
        if (document.getElementById('completionNotificationStyles')) return;

        const styles = document.createElement('style');
        styles.id = 'completionNotificationStyles';
        styles.textContent = `
            .seal-completion-notification {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #22c55e, #16a34a);
                color: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
                z-index: 15000;
                animation: completionBounce 0.8s ease, completionFadeOut 0.8s ease 4.2s forwards;
                border: 3px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(15px);
                text-align: center;
                min-width: 400px;
            }

            .completion-content {
                display: flex;
                align-items: center;
                gap: 20px;
                justify-content: center;
            }

            .completion-icon {
                font-size: 3em;
                animation: rotateGlow 2s ease-in-out infinite;
                filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
            }

            .completion-text {
                font-weight: 600;
                text-align: left;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            .completion-text strong {
                font-size: 1.4em;
                display: block;
                margin-bottom: 5px;
                font-family: 'Cinzel', serif;
            }

            .completion-text small {
                opacity: 0.9;
                font-style: italic;
                display: block;
                margin-top: 5px;
            }

            @keyframes completionBounce {
                0% {
                    transform: translate(-50%, -50%) scale(0.3);
                    opacity: 0;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.1);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }

            @keyframes completionFadeOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }

            @keyframes rotateGlow {
                0%, 100% { 
                    transform: rotate(0deg);
                    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
                }
                50% { 
                    transform: rotate(5deg);
                    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
                }
            }

            @media (max-width: 480px) {
                .seal-completion-notification {
                    min-width: 300px;
                    padding: 30px;
                }
                
                .completion-content {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .completion-text {
                    text-align: center;
                }
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
