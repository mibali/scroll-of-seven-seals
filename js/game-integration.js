// GAME INTEGRATION SCRIPT - Connects all enhanced features
// Ensures seamless integration between unique content, age adaptation, and learning journey

let enhancedPuzzleManager = null;
let learningJourneyManager = null;
let currentGameDifficulty = 'beginner';
let currentPlayerAge = null;

// Initialize enhanced game system
function initializeEnhancedGame() {
    console.log('🚀 Initializing Enhanced Seven Seals Game System...');
    
    // Initialize learning journey manager only
    learningJourneyManager = new LearningJourneyManager();
    
    // Use the existing PuzzleManager from puzzles.js if available
    enhancedPuzzleManager = window.PuzzleManager || new EnhancedPuzzleManager();
    
    // Make managers globally available
    window.enhancedPuzzleManager = enhancedPuzzleManager;
    window.learningJourneyManager = learningJourneyManager;
    
    // Ensure PuzzleManager is set (don't overwrite if already set)
    if (!window.PuzzleManager) {
        window.PuzzleManager = enhancedPuzzleManager;
        console.log('🔧 Set PuzzleManager from game-integration.js');
    } else {
        console.log('🔧 PuzzleManager already exists, not overwriting');
    }
    
    // Debug: Check final PuzzleManager state
    console.log('🔧 Final PuzzleManager state:', {
        exists: !!window.PuzzleManager,
        hasGenerateMethod: typeof window.PuzzleManager?.generatePuzzleContent,
        hasRegenerateMethod: typeof window.PuzzleManager?.regeneratePuzzles
    });
    
    console.log('✅ Enhanced game system ready!');
    
    // Show age selection if not set
    showAgeSelectionPrompt();
}

// Show age/difficulty selection with improved UX
function showAgeSelectionPrompt() {
    // Check if we have saved preferences
    const savedPrefs = localStorage.getItem('sevenSeals_playerPreferences');
    if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        currentPlayerAge = prefs.ageGroup;
        currentGameDifficulty = prefs.difficulty;
        console.log(`🎯 Loaded saved preferences: ${prefs.ageGroup} / ${prefs.difficulty}`);
        return;
    }

    // Create enhanced selection modal
    const modal = document.createElement('div');
    modal.className = 'age-selection-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content age-selection-content">
            <div class="selection-header">
                <h2>🌟 Welcome to the Scroll of Seven Seals! 🌟</h2>
                <p>Help us customize your biblical learning experience!</p>
            </div>
            
            <div class="selection-body">
                <div class="age-group-section">
                    <h3>👥 Choose Your Learning Style:</h3>
                    <div class="age-options">
                        <div class="age-option" data-age="kids">
                            <div class="age-icon">🌈</div>
                            <div class="age-title">Kids & Families</div>
                            <div class="age-description">Fun, colorful, with helpful hints</div>
                            <div class="age-features">• Large text & icons • Lots of encouragement • Family-friendly</div>
                        </div>
                        <div class="age-option" data-age="teenagers">
                            <div class="age-icon">🔥</div>
                            <div class="age-title">Teenagers</div>
                            <div class="age-description">Modern, engaging, relatable</div>
                            <div class="age-features">• Contemporary design • Real-world application • Youth-focused</div>
                        </div>
                        <div class="age-option" data-age="adults">
                            <div class="age-icon">📖</div>
                            <div class="age-title">Adults</div>
                            <div class="age-description">Professional, meaningful, practical</div>
                            <div class="age-features">• Clean interface • Life application • Spiritual growth</div>
                        </div>
                        <div class="age-option" data-age="scholars">
                            <div class="age-icon">🎓</div>
                            <div class="age-title">Scholars</div>
                            <div class="age-description">Academic, comprehensive, precise</div>
                            <div class="age-features">• Advanced terminology • Scholarly depth • Academic rigor</div>
                        </div>
                    </div>
                </div>
                
                <div class="difficulty-section" style="display: none;">
                    <h3>🎯 Choose Your Challenge Level:</h3>
                    <div class="difficulty-options">
                        <div class="difficulty-option" data-difficulty="beginner">
                            <div class="difficulty-icon">🌱</div>
                            <div class="difficulty-title">Beginner</div>
                            <div class="difficulty-description">New to Bible study - very forgiving answers</div>
                        </div>
                        <div class="difficulty-option" data-difficulty="intermediate">
                            <div class="difficulty-icon">🌿</div>
                            <div class="difficulty-title">Intermediate</div>
                            <div class="difficulty-description">Some Bible knowledge - flexible answers</div>
                        </div>
                        <div class="difficulty-option" data-difficulty="advanced">
                            <div class="difficulty-icon">🌳</div>
                            <div class="difficulty-title">Advanced</div>
                            <div class="difficulty-description">Strong Bible knowledge - precise answers</div>
                        </div>
                        <div class="difficulty-option" data-difficulty="expert">
                            <div class="difficulty-icon">🏆</div>
                            <div class="difficulty-title">Expert</div>
                            <div class="difficulty-description">Biblical scholar - exact answers required</div>
                        </div>
                    </div>
                </div>
                
                <div class="player-info-section" style="display: none;">
                    <h3>✨ Optional: Tell us your name for a personalized experience</h3>
                    <input type="text" id="playerName" placeholder="Enter your name (optional)" maxlength="30">
                </div>
            </div>
            
            <div class="selection-footer">
                <button class="continue-btn" disabled>Continue</button>
                <div class="selection-info">
                    <small>💡 Don't worry - you can change these settings anytime!</small>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Handle age selection
    const ageOptions = modal.querySelectorAll('.age-option');
    const difficultySection = modal.querySelector('.difficulty-section');
    const difficultyOptions = modal.querySelectorAll('.difficulty-option');
    const playerInfoSection = modal.querySelector('.player-info-section');
    const continueBtn = modal.querySelector('.continue-btn');
    
    let selectedAge = null;
    let selectedDifficulty = null;
    
    ageOptions.forEach(option => {
        option.addEventListener('click', () => {
            ageOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedAge = option.dataset.age;
            
            // Show difficulty selection
            difficultySection.style.display = 'block';
            difficultySection.scrollIntoView({ behavior: 'smooth' });
            
            // Auto-select recommended difficulty based on age
            const recommendedDifficulty = getRecommendedDifficulty(selectedAge);
            difficultyOptions.forEach(opt => {
                opt.classList.remove('selected');
                if (opt.dataset.difficulty === recommendedDifficulty) {
                    opt.classList.add('selected');
                    selectedDifficulty = recommendedDifficulty;
                }
            });
            
            updateContinueButton();
        });
    });
    
    difficultyOptions.forEach(option => {
        option.addEventListener('click', () => {
            difficultyOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedDifficulty = option.dataset.difficulty;
            
            // Show player info section
            playerInfoSection.style.display = 'block';
            playerInfoSection.scrollIntoView({ behavior: 'smooth' });
            
            updateContinueButton();
        });
    });
    
    function updateContinueButton() {
        if (selectedAge && selectedDifficulty) {
            continueBtn.disabled = false;
            continueBtn.textContent = 'Start Your Biblical Journey!';
        }
    }
    
    continueBtn.addEventListener('click', () => {
        if (selectedAge && selectedDifficulty) {
            const playerName = modal.querySelector('#playerName').value.trim() || null;
            
            // Save preferences
            const preferences = {
                ageGroup: selectedAge,
                difficulty: selectedDifficulty,
                playerName: playerName,
                savedAt: Date.now()
            };
            localStorage.setItem('sevenSeals_playerPreferences', JSON.stringify(preferences));
            
            // Set global variables
            currentPlayerAge = selectedAge;
            currentGameDifficulty = selectedDifficulty;
            
            // Start enhanced game
            startEnhancedGame(selectedDifficulty, selectedAge, playerName);
            
            // Close modal
            modal.classList.remove('show');
            setTimeout(() => document.body.removeChild(modal), 300);
        }
    });
}

function getRecommendedDifficulty(ageGroup) {
    const recommendations = {
        kids: 'beginner',
        teenagers: 'intermediate', 
        adults: 'intermediate',
        scholars: 'advanced'
    };
    return recommendations[ageGroup] || 'beginner';
}

// Start enhanced game with unique content generation
async function startEnhancedGame(difficulty, ageGroup, playerName) {
    console.log(`🎮 Starting enhanced game: ${difficulty} / ${ageGroup} / ${playerName || 'Anonymous'}`);
    
    try {
        // Start new game with unique content
        const gameSession = await enhancedPuzzleManager.startNewGame(difficulty, ageGroup);
        
        // Start learning journey
        const journey = learningJourneyManager.startJourney(difficulty, ageGroup, playerName);
        
        // Initialize progress tracker
        if (window.ProgressTracker) {
            const progressTracker = new ProgressTracker();
            progressTracker.initializeJourney(journey);
            window.progressTracker = progressTracker;
        }
        
        console.log(`✅ Enhanced game started successfully!`);
        console.log(`📊 Session ID: ${gameSession.sessionId}`);
        console.log(`🛤️ Journey ID: ${journey.id}`);
        console.log(`🎯 Content Hash: ${gameSession.contentHash}`);
        
        // Show welcome message
        showWelcomeMessage(ageGroup, playerName, difficulty);
        
        // Initialize first seal
        if (window.openSeal) {
            setTimeout(() => window.openSeal(1), 2000);
        }
        
    } catch (error) {
        console.error('Failed to start enhanced game:', error);
        // Fallback to original system
        console.log('🔄 Falling back to original game system...');
    }
}

function showWelcomeMessage(ageGroup, playerName, difficulty) {
    const welcomeMessages = {
        kids: {
            title: `🌈 Welcome${playerName ? `, ${playerName}` : ''}!`,
            message: `Get ready for an amazing Bible adventure! You'll learn about God's Word and have lots of fun!`,
            encouragement: `🌟 Remember: I'll help you with hints and celebrate every step!`
        },
        teenagers: {
            title: `🔥 Ready to Level Up${playerName ? `, ${playerName}` : ''}?`,
            message: `Your biblical knowledge journey starts now! Each seal will challenge and grow your faith.`,
            encouragement: `💪 You've got this! Apply what you know and learn something new!`
        },
        adults: {
            title: `📖 Welcome to Your Spiritual Journey${playerName ? `, ${playerName}` : ''}`,
            message: `Embark on a meaningful exploration of biblical wisdom and spiritual growth.`,
            encouragement: `🎯 Take time to reflect on each lesson and apply it to your life.`
        },
        scholars: {
            title: `🎓 Academic Biblical Analysis${playerName ? ` for ${playerName}` : ''}`,
            message: `Engage with comprehensive biblical content designed for scholarly examination.`,
            encouragement: `📚 Apply your expertise and deepen your theological understanding.`
        }
    };
    
    const welcome = welcomeMessages[ageGroup] || welcomeMessages['adults'];
    
    // Create welcome notification
    const notification = document.createElement('div');
    notification.className = `welcome-notification ${ageGroup}-welcome`;
    notification.innerHTML = `
        <div class="welcome-content">
            <h3>${welcome.title}</h3>
            <p>${welcome.message}</p>
            <div class="welcome-difficulty">Playing on <strong>${difficulty}</strong> mode</div>
            <div class="welcome-encouragement">${welcome.encouragement}</div>
            <button class="welcome-close">Let's Begin! 🚀</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 500);
    
    notification.querySelector('.welcome-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    });
    
    // Auto-close after 8 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 8000);
}

// Override the original completeSeal function to integrate with learning journey
// Wait for gameController to be available before setting up override
function setupSealCompletion() {
    if (!window.gameController) {
        setTimeout(setupSealCompletion, 100);
        return;
    }
    
    const originalCompleteSeal = window.completeSeal;
    window.completeSeal = async function(sealId) {
        console.log(`🎯 Completing Seal ${sealId} with enhanced features...`);
        
        // Record completion in learning journey
        if (learningJourneyManager && learningJourneyManager.currentJourney) {
            try {
                await learningJourneyManager.completeSeal(sealId, {
                    performance: { /* performance data */ },
                    timeSpent: Date.now() - (window.sealStartTime || Date.now())
                });
                
                // Update progress tracker
                if (window.progressTracker) {
                    window.progressTracker.updateProgress(learningJourneyManager.currentJourney, sealId);
                }
            } catch (error) {
                console.error('Error in learning journey completion:', error);
            }
        }
        
        // Call the actual game controller completion logic
        if (window.gameController && window.gameController.completeSeal) {
            console.log('🎮 Calling gameController.completeSeal:', sealId);
            await window.gameController.completeSeal(sealId);
        } else if (originalCompleteSeal) {
            console.log('🎮 Calling original completeSeal:', sealId);
            originalCompleteSeal(sealId);
        } else {
            console.error('❌ No completion function available!');
        }
        
        // Check if journey is complete
        if (sealId === 7 && learningJourneyManager) {
            setTimeout(() => showJourneyCompleteModal(), 2000);
        }
    };
}

// Setup seal completion after DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSealCompletion);
} else {
    setupSealCompletion();
}

function showJourneyCompleteModal() {
    const report = learningJourneyManager.generateProgressReport();
    if (!report) return;
    
    const modal = document.createElement('div');
    modal.className = `journey-complete-modal ${currentPlayerAge}-modal`;
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content journey-complete-content">
            <div class="completion-header">
                <h2>🎉 Congratulations! Journey Complete! 🎉</h2>
                <div class="completion-stats">
                    <div class="stat">
                        <div class="stat-value">${report.completion.percentage}%</div>
                        <div class="stat-label">Completion</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${report.achievements.length}</div>
                        <div class="stat-label">Achievements</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${report.reflectionCount}</div>
                        <div class="stat-label">Reflections</div>
                    </div>
                </div>
            </div>
            
            <div class="spiritual-growth-summary">
                <h3>🌱 Your Spiritual Growth</h3>
                <div class="growth-themes">
                    ${report.spiritualGrowth.themes.map(theme => `<span class="growth-theme">${theme}</span>`).join('')}
                </div>
            </div>
            
            <div class="next-steps">
                <h3>🎯 Recommended Next Steps</h3>
                <ul>
                    ${report.nextSteps.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
            
            <div class="completion-actions">
                <button class="play-again-btn">🔄 Play Again with New Content</button>
                <button class="share-progress-btn">📤 Share Your Progress</button>
                <button class="view-report-btn">📊 View Detailed Report</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
    
    // Handle actions
    modal.querySelector('.play-again-btn').addEventListener('click', () => {
        location.reload(); // This will generate completely new content
    });
    
    modal.querySelector('.view-report-btn').addEventListener('click', () => {
        showDetailedProgressReport(report);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to load
    setTimeout(() => {
        if (window.UniqueContentEngine && window.EnhancedPuzzleManager) {
            initializeEnhancedGame();
        } else {
            console.warn('Enhanced features not available, using original system');
        }
    }, 1000);
});

// Export for global access
window.initializeEnhancedGame = initializeEnhancedGame;
window.startEnhancedGame = startEnhancedGame;

console.log('🔗 Game Integration Script loaded - Enhanced features connected!');
