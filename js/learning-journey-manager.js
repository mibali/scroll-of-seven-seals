// LEARNING JOURNEY MANAGER - Seal-by-seal progression with reflection and progress tracking
// Creates meaningful spiritual learning experiences for each age group

class LearningJourneyManager {
    constructor() {
        this.currentJourney = null;
        this.progressTracker = new ProgressTracker();
        this.reflectionEngine = new ReflectionEngine();
        this.achievementSystem = new AchievementSystem();
        
        this.sealJourneyThemes = {
            1: {
                title: "Faith's First Steps",
                subtitle: "Building Your Biblical Foundation",
                description: "Every spiritual journey begins with knowing God's Word",
                spiritualFocus: "Foundation of Faith",
                lifeApplication: "Daily Bible Reading",
                reflection: "How is God speaking to you through His Word?",
                nextSealPreview: "Next: Learning to think with biblical wisdom"
            },
            2: {
                title: "Words of Wisdom", 
                subtitle: "Learning Biblical Logic",
                description: "God's wisdom guides our thinking and reasoning",
                spiritualFocus: "Biblical Thinking",
                lifeApplication: "Making Wise Decisions",
                reflection: "Where do you need God's wisdom in your life?",
                nextSealPreview: "Next: Working together in unity"
            },
            3: {
                title: "Prophetic Pictures",
                subtitle: "Spiritual Team Unity",
                description: "The body of Christ works together in harmony",
                spiritualFocus: "Christian Fellowship",
                lifeApplication: "Church Community",
                reflection: "How can you better serve others in the body of Christ?",
                nextSealPreview: "Next: Understanding God's timeline"
            },
            4: {
                title: "Historical Harmony",
                subtitle: "God's Timeline Revealed",
                description: "Understanding the flow of biblical history",
                spiritualFocus: "God's Plan Through Time",
                lifeApplication: "Seeing God's Hand in History",
                reflection: "How do you see God working in your life's timeline?",
                nextSealPreview: "Next: Organizing spiritual truth"
            },
            5: {
                title: "Divine Design",
                subtitle: "Chronological Understanding",
                description: "Seeing God's perfect timing in all things",
                spiritualFocus: "Divine Timing",
                lifeApplication: "Trusting God's Timing",
                reflection: "What is God teaching you about patience and timing?",
                nextSealPreview: "Next: Categorizing God's truth"
            },
            6: {
                title: "Sacred Scrolls",
                subtitle: "Organizing Spiritual Truth",
                description: "Learning to categorize and apply God's Word",
                spiritualFocus: "Systematic Bible Study",
                lifeApplication: "Personal Bible Organization",
                reflection: "How can you better organize your spiritual learning?",
                nextSealPreview: "Next: The ultimate wisdom test"
            },
            7: {
                title: "Crown of Completion",
                subtitle: "Ultimate Spiritual Mastery",
                description: "Demonstrating spiritual maturity and wisdom",
                spiritualFocus: "Spiritual Maturity",
                lifeApplication: "Living Out Your Faith",
                reflection: "How will you use this biblical knowledge to serve God?",
                nextSealPreview: "Journey complete - ready to teach others!"
            }
        };

        this.ageGroups = {
            kids: {
                encouragementStyle: 'celebratory',
                reflectionPrompts: 'simple',
                achievementVisuals: 'stickers',
                progressDisplay: 'colorful'
            },
            teenagers: {
                encouragementStyle: 'motivational',
                reflectionPrompts: 'relatable', 
                achievementVisuals: 'badges',
                progressDisplay: 'modern'
            },
            adults: {
                encouragementStyle: 'affirming',
                reflectionPrompts: 'practical',
                achievementVisuals: 'certificates',
                progressDisplay: 'professional'
            },
            scholars: {
                encouragementStyle: 'academic',
                reflectionPrompts: 'theological',
                achievementVisuals: 'credentials',
                progressDisplay: 'scholarly'
            }
        };
    }

    // Start a new learning journey
    startJourney(difficulty, ageGroup, playerName = null) {
        this.currentJourney = {
            id: `journey_${Date.now()}`,
            difficulty: difficulty,
            ageGroup: ageGroup,
            playerName: playerName,
            startTime: Date.now(),
            currentSeal: 1,
            completedSeals: [],
            reflections: {},
            achievements: [],
            progressMilestones: [],
            spiritualGrowthNotes: []
        };

        this.progressTracker.initializeJourney(this.currentJourney);
        console.log(`🛤️ Learning Journey started for ${ageGroup} at ${difficulty} level`);
        
        return this.currentJourney;
    }

    // Complete a seal and show reflection
    async completeSeal(sealId, gameData = {}) {
        if (!this.currentJourney) {
            console.error('No active learning journey');
            return;
        }

        const sealTheme = this.sealJourneyThemes[sealId];
        const ageProfile = this.ageGroups[this.currentJourney.ageGroup];
        
        // Record completion
        this.currentJourney.completedSeals.push({
            sealId: sealId,
            completedAt: Date.now(),
            performance: gameData.performance || {},
            timeSpent: gameData.timeSpent || 0
        });

        // Show completion celebration
        await this.showSealCompletion(sealId, sealTheme, ageProfile);
        
        // Show reflection prompt
        await this.showReflectionPrompt(sealId, sealTheme, ageProfile);
        
        // Check for achievements
        this.achievementSystem.checkAchievements(this.currentJourney, sealId);
        
        // Update progress
        this.progressTracker.updateProgress(this.currentJourney, sealId);
        
        // Save journey progress
        this.saveJourneyProgress();
        
        console.log(`✅ Seal ${sealId} completed in learning journey`);
    }

    // Show seal completion with age-appropriate celebration
    async showSealCompletion(sealId, sealTheme, ageProfile) {
        const modal = this.createCompletionModal(sealId, sealTheme, ageProfile);
        document.body.appendChild(modal);
        
        // Animate modal appearance
        setTimeout(() => modal.classList.add('show'), 100);
        
        return new Promise(resolve => {
            modal.querySelector('.continue-journey').addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    resolve();
                }, 300);
            });
        });
    }

    createCompletionModal(sealId, sealTheme, ageProfile) {
        const modal = document.createElement('div');
        modal.className = `seal-completion-modal ${this.currentJourney.ageGroup}-modal`;
        
        const completionIcon = this.getCompletionIcon(sealId, this.currentJourney.ageGroup);
        const completionMessage = this.getCompletionMessage(sealId, this.currentJourney.ageGroup);
        
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content ${ageProfile.progressDisplay}">
                <div class="completion-header">
                    <div class="completion-icon">${completionIcon}</div>
                    <h2 class="seal-title">${sealTheme.title}</h2>
                    <h3 class="seal-subtitle">${sealTheme.subtitle}</h3>
                </div>
                
                <div class="completion-body">
                    <div class="spiritual-focus-card">
                        <h4>🌟 Spiritual Focus:</h4>
                        <p>${sealTheme.spiritualFocus}</p>
                    </div>
                    
                    <div class="life-application-card">
                        <h4>🎯 Life Application:</h4>
                        <p>${sealTheme.lifeApplication}</p>
                    </div>
                    
                    <div class="encouragement-message">
                        ${completionMessage}
                    </div>
                    
                    ${sealId < 7 ? `
                        <div class="next-seal-preview">
                            <h4>🔮 Coming Next:</h4>
                            <p>${sealTheme.nextSealPreview}</p>
                        </div>
                    ` : `
                        <div class="journey-complete">
                            <h4>👑 Journey Complete!</h4>
                            <p>${this.getJourneyCompleteMessage(this.currentJourney.ageGroup)}</p>
                        </div>
                    `}
                </div>
                
                <div class="completion-footer">
                    <button class="continue-journey btn-${ageProfile.progressDisplay}">
                        ${sealId < 7 ? this.getContinueText(this.currentJourney.ageGroup) : this.getFinishText(this.currentJourney.ageGroup)}
                    </button>
                </div>
            </div>
        `;
        
        return modal;
    }

    // Show reflection prompt with age-appropriate questions
    async showReflectionPrompt(sealId, sealTheme, ageProfile) {
        const reflectionModal = this.createReflectionModal(sealId, sealTheme, ageProfile);
        document.body.appendChild(reflectionModal);
        
        setTimeout(() => reflectionModal.classList.add('show'), 100);
        
        return new Promise(resolve => {
            const submitBtn = reflectionModal.querySelector('.submit-reflection');
            const skipBtn = reflectionModal.querySelector('.skip-reflection');
            
            submitBtn.addEventListener('click', () => {
                const reflectionText = reflectionModal.querySelector('.reflection-input').value;
                this.saveReflection(sealId, reflectionText);
                this.closeReflectionModal(reflectionModal, resolve);
            });
            
            skipBtn.addEventListener('click', () => {
                this.closeReflectionModal(reflectionModal, resolve);
            });
        });
    }

    createReflectionModal(sealId, sealTheme, ageProfile) {
        const modal = document.createElement('div');
        modal.className = `reflection-modal ${this.currentJourney.ageGroup}-modal`;
        
        const reflectionPrompt = this.getAgeAppropriateReflectionPrompt(sealId, sealTheme, this.currentJourney.ageGroup);
        
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content reflection-content">
                <div class="reflection-header">
                    <h3>${this.getReflectionTitle(this.currentJourney.ageGroup)}</h3>
                    <div class="reflection-icon">${this.getReflectionIcon(this.currentJourney.ageGroup)}</div>
                </div>
                
                <div class="reflection-body">
                    <div class="reflection-prompt">
                        <p>${reflectionPrompt}</p>
                    </div>
                    
                    <div class="reflection-input-area">
                        <textarea class="reflection-input" 
                                  placeholder="${this.getReflectionPlaceholder(this.currentJourney.ageGroup)}"
                                  maxlength="500"></textarea>
                        <div class="character-count">0/500</div>
                    </div>
                    
                    <div class="reflection-guidance">
                        <p><em>${this.getReflectionGuidance(this.currentJourney.ageGroup)}</em></p>
                    </div>
                </div>
                
                <div class="reflection-footer">
                    <button class="submit-reflection btn-primary-${ageProfile.progressDisplay}">
                        ${this.getSubmitReflectionText(this.currentJourney.ageGroup)}
                    </button>
                    <button class="skip-reflection btn-secondary-${ageProfile.progressDisplay}">
                        ${this.getSkipReflectionText(this.currentJourney.ageGroup)}
                    </button>
                </div>
            </div>
        `;
        
        // Add character counter
        const textarea = modal.querySelector('.reflection-input');
        const counter = modal.querySelector('.character-count');
        textarea.addEventListener('input', () => {
            counter.textContent = `${textarea.value.length}/500`;
        });
        
        return modal;
    }

    // Save reflection and update spiritual growth
    saveReflection(sealId, reflectionText) {
        if (!this.currentJourney) return;
        
        this.currentJourney.reflections[sealId] = {
            text: reflectionText,
            timestamp: Date.now(),
            sealTheme: this.sealJourneyThemes[sealId].title
        };
        
        // Add to spiritual growth notes
        if (reflectionText.trim()) {
            this.currentJourney.spiritualGrowthNotes.push({
                sealId: sealId,
                reflection: reflectionText,
                theme: this.sealJourneyThemes[sealId].spiritualFocus,
                timestamp: Date.now()
            });
        }
        
        console.log(`📝 Reflection saved for Seal ${sealId}`);
    }

    closeReflectionModal(modal, resolve) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
            resolve();
        }, 300);
    }

    // Generate progress report
    generateProgressReport() {
        if (!this.currentJourney) return null;
        
        const completionPercentage = (this.currentJourney.completedSeals.length / 7) * 100;
        const totalTime = this.currentJourney.completedSeals.reduce((total, seal) => total + (seal.timeSpent || 0), 0);
        
        return {
            journeyId: this.currentJourney.id,
            playerName: this.currentJourney.playerName,
            difficulty: this.currentJourney.difficulty,
            ageGroup: this.currentJourney.ageGroup,
            completion: {
                percentage: Math.round(completionPercentage),
                sealsCompleted: this.currentJourney.completedSeals.length,
                totalSeals: 7
            },
            timeSpent: {
                total: totalTime,
                average: Math.round(totalTime / Math.max(1, this.currentJourney.completedSeals.length))
            },
            achievements: this.currentJourney.achievements,
            reflectionCount: Object.keys(this.currentJourney.reflections).length,
            spiritualGrowth: this.analyzeSpiritalGrowth(),
            nextSteps: this.getNextSteps(),
            generatedAt: Date.now()
        };
    }

    analyzeSpiritalGrowth() {
        if (!this.currentJourney || !this.currentJourney.spiritualGrowthNotes.length) {
            return { themes: [], insights: [], recommendations: [] };
        }
        
        const themes = [...new Set(this.currentJourney.spiritualGrowthNotes.map(note => note.theme))];
        const insights = this.extractInsights(this.currentJourney.spiritualGrowthNotes);
        const recommendations = this.generateRecommendations(themes, this.currentJourney.ageGroup);
        
        return { themes, insights, recommendations };
    }

    extractInsights(notes) {
        // Analyze reflection content for common themes and insights
        const commonWords = {};
        notes.forEach(note => {
            const words = note.reflection.toLowerCase().split(/\s+/).filter(word => word.length > 4);
            words.forEach(word => {
                commonWords[word] = (commonWords[word] || 0) + 1;
            });
        });
        
        return Object.entries(commonWords)
            .filter(([word, count]) => count > 1)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([word]) => word);
    }

    generateRecommendations(themes, ageGroup) {
        const recommendations = {
            kids: [
                'Keep reading Bible stories with your family',
                'Try memorizing one Bible verse each week',
                'Share what you learned with friends',
                'Ask God to help you obey His Word'
            ],
            teenagers: [
                'Join a youth Bible study group',
                'Find a Christian mentor or accountability partner',
                'Apply biblical principles to school and friendships',
                'Consider serving in your church youth ministry'
            ],
            adults: [
                'Develop a consistent daily devotional practice',
                'Join a small group Bible study',
                'Find opportunities to teach or mentor others',
                'Apply biblical wisdom to work and family decisions'
            ],
            scholars: [
                'Pursue advanced theological education',
                'Engage in scholarly biblical research',
                'Consider teaching or writing about biblical topics',
                'Mentor others in biblical interpretation'
            ]
        };
        
        return recommendations[ageGroup] || recommendations['adults'];
    }

    getNextSteps() {
        if (!this.currentJourney) return [];
        
        const completedCount = this.currentJourney.completedSeals.length;
        
        if (completedCount === 7) {
            return this.getCompletionNextSteps(this.currentJourney.ageGroup);
        } else {
            return this.getContinuationNextSteps(completedCount + 1, this.currentJourney.ageGroup);
        }
    }

    // Age-appropriate content methods
    getCompletionIcon(sealId, ageGroup) {
        const icons = {
            kids: ['🌟', '🎉', '🏆', '👑', '⭐', '💎', '🎊'][sealId - 1] || '🌟',
            teenagers: ['⚡', '🔥', '💪', '🎯', '🚀', '💫', '👑'][sealId - 1] || '⚡',
            adults: ['✅', '📚', '🤝', '⏰', '📅', '📋', '🎓'][sealId - 1] || '✅',
            scholars: ['📖', '🧠', '⚖️', '📜', '🔍', '📊', '🎯'][sealId - 1] || '📖'
        };
        return icons[ageGroup] || icons['adults'];
    }

    getCompletionMessage(sealId, ageGroup) {
        const messages = {
            kids: [
                '🌈 Amazing! You\'re learning so much about God!',
                '🎈 Fantastic! You\'re thinking like Jesus!',
                '🦋 Beautiful! You\'re working together!',
                '🌟 Wonderful! You understand God\'s plan!',
                '🎵 Terrific! You see God\'s perfect timing!',
                '📚 Excellent! You\'re organizing God\'s truth!',
                '👑 INCREDIBLE! You\'re a Bible champion!'
            ],
            teenagers: [
                '🔥 Your biblical foundation is solid!',
                '⚡ Your biblical reasoning is sharp!',
                '💪 Your teamwork reflects Christ!',
                '🎯 Your timeline knowledge is impressive!',
                '🚀 Your understanding of God\'s timing is deep!',
                '💫 Your organizational skills honor God!',
                '👑 You\'ve achieved biblical mastery!'
            ],
            adults: [
                'Strong biblical foundation established.',
                'Logical biblical thinking demonstrated.',
                'Christian unity principles understood.',
                'Biblical chronology comprehended.',
                'Divine timing concepts grasped.',
                'Scriptural organization skills developed.',
                'Comprehensive biblical wisdom achieved.'
            ],
            scholars: [
                'Foundational hermeneutical competency demonstrated.',
                'Advanced biblical reasoning exhibited.',
                'Ecclesiological unity principles mastered.',
                'Chronological biblical analysis completed.',
                'Theological timing concepts understood.',
                'Systematic biblical organization achieved.',
                'Comprehensive theological synthesis accomplished.'
            ]
        };
        
        return messages[ageGroup]?.[sealId - 1] || messages['adults'][sealId - 1];
    }

    // Save and load journey progress
    saveJourneyProgress() {
        if (!this.currentJourney) return;
        
        try {
            const savedJourneys = JSON.parse(localStorage.getItem('sevenSeals_learningJourneys') || '{}');
            savedJourneys[this.currentJourney.id] = this.currentJourney;
            localStorage.setItem('sevenSeals_learningJourneys', JSON.stringify(savedJourneys));
            console.log('💾 Learning journey progress saved');
        } catch (error) {
            console.error('Could not save learning journey:', error);
        }
    }

    loadJourneyProgress(journeyId) {
        try {
            const savedJourneys = JSON.parse(localStorage.getItem('sevenSeals_learningJourneys') || '{}');
            const journey = savedJourneys[journeyId];
            if (journey) {
                this.currentJourney = journey;
                console.log('📖 Learning journey loaded');
                return journey;
            }
        } catch (error) {
            console.error('Could not load learning journey:', error);
        }
        return null;
    }
}

// Progress Tracker - Visual progress indicators
class ProgressTracker {
    constructor() {
        this.progressDisplays = {};
    }

    initializeJourney(journey) {
        this.createProgressDisplay(journey);
    }

    createProgressDisplay(journey) {
        // Create progress indicator in UI
        const progressContainer = document.getElementById('progress-container') || this.createProgressContainer();
        
        const ageStyle = journey.ageGroup;
        progressContainer.innerHTML = `
            <div class="learning-progress ${ageStyle}-progress">
                <div class="progress-header">
                    <h4>${this.getProgressTitle(ageStyle)}</h4>
                    <div class="progress-stats">
                        <span class="completed-seals">0</span> / 7 Seals
                    </div>
                </div>
                <div class="seals-progress">
                    ${Array.from({length: 7}, (_, i) => `
                        <div class="seal-progress-item" data-seal="${i + 1}">
                            <div class="seal-icon">${this.getSealIcon(i + 1, ageStyle)}</div>
                            <div class="seal-title">${this.getSealProgressTitle(i + 1, ageStyle)}</div>
                            <div class="seal-status pending">Pending</div>
                        </div>
                    `).join('')}
                </div>
                <div class="overall-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="progress-percentage">0%</div>
                </div>
            </div>
        `;
    }

    updateProgress(journey, completedSealId) {
        const progressContainer = document.querySelector('.learning-progress');
        if (!progressContainer) return;

        // Update completed seal
        const sealItem = progressContainer.querySelector(`[data-seal="${completedSealId}"]`);
        if (sealItem) {
            sealItem.classList.add('completed');
            sealItem.querySelector('.seal-status').textContent = 'Completed';
            sealItem.querySelector('.seal-status').className = 'seal-status completed';
        }

        // Update overall progress
        const completedCount = journey.completedSeals.length;
        const percentage = Math.round((completedCount / 7) * 100);
        
        progressContainer.querySelector('.completed-seals').textContent = completedCount;
        progressContainer.querySelector('.progress-fill').style.width = `${percentage}%`;
        progressContainer.querySelector('.progress-percentage').textContent = `${percentage}%`;
    }

    createProgressContainer() {
        const container = document.createElement('div');
        container.id = 'progress-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 10px;
            padding: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-family: Arial, sans-serif;
        `;
        document.body.appendChild(container);
        return container;
    }
}

// Reflection Engine - Thoughtful spiritual reflection prompts
class ReflectionEngine {
    constructor() {
        this.reflectionPrompts = {
            kids: {
                1: "What's your favorite Bible story and why? How does it help you know God better?",
                2: "When you need to make a choice, how can you ask God for help?",
                3: "How can you be a good friend and help others like Jesus did?",
                4: "What's something amazing God has done that you want to remember?",
                5: "When do you need to wait for something? How can you trust God's timing?",
                6: "What Bible verse makes you happy? Why do you like it?",
                7: "How can you use what you learned to help others know about Jesus?"
            },
            teenagers: {
                1: "How has your understanding of Scripture grown, and where do you want to deepen your knowledge?",
                2: "What decisions in your life could benefit from biblical wisdom right now?",
                3: "How can you better contribute to unity in your youth group or church?",
                4: "Where do you see God's hand working in your personal timeline and future plans?",
                5: "What situation in your life requires patience and trust in God's timing?",
                6: "How can you create better systems for studying and applying God's Word?",
                7: "What specific ways will you live out your biblical knowledge in school and relationships?"
            },
            adults: {
                1: "How is God calling you to deepen your relationship with His Word in this season?",
                2: "What major decisions or challenges require biblical wisdom and discernment?",
                3: "How can you better serve and support unity in your church and community?",
                4: "What patterns do you see in how God has worked throughout your life?",
                5: "Where do you need to trust God's timing rather than your own agenda?",
                6: "How can you better organize your spiritual life for growth and effectiveness?",
                7: "What is your calling to use biblical knowledge in service to others?"
            },
            scholars: {
                1: "How does your deepening hermeneutical understanding inform your theological perspective?",
                2: "What methodological approaches to biblical reasoning do you find most compelling?",
                3: "How does ecclesiological unity manifest in contemporary theological discourse?",
                4: "What patterns in salvation history inform your understanding of divine providence?",
                5: "How does your understanding of biblical chronology impact your eschatological views?",
                6: "What systematic approaches to biblical organization best serve your scholarly work?",
                7: "How will you integrate this biblical knowledge into your academic or ministerial calling?"
            }
        };
    }

    getReflectionPrompt(sealId, ageGroup) {
        return this.reflectionPrompts[ageGroup]?.[sealId] || this.reflectionPrompts['adults'][sealId];
    }
}

// Achievement System - Celebrating progress milestones
class AchievementSystem {
    constructor() {
        this.achievements = {
            firstSeal: { name: 'First Steps', description: 'Completed your first seal' },
            quickLearner: { name: 'Quick Learner', description: 'Completed a seal in under 3 minutes' },
            thoughtfulReflector: { name: 'Thoughtful Reflector', description: 'Completed 3 reflections' },
            biblicalScholar: { name: 'Biblical Scholar', description: 'Completed all seals with high accuracy' },
            persistent: { name: 'Persistent', description: 'Completed a challenging seal after multiple attempts' },
            teamPlayer: { name: 'Team Player', description: 'Excelled in team communication challenges' },
            masterOrganizer: { name: 'Master Organizer', description: 'Perfect performance in organization challenges' }
        };
    }

    checkAchievements(journey, sealId) {
        const newAchievements = [];
        
        // First seal achievement
        if (sealId === 1 && !journey.achievements.includes('firstSeal')) {
            newAchievements.push('firstSeal');
        }
        
        // Quick learner (if time tracking available)
        const currentSeal = journey.completedSeals.find(s => s.sealId === sealId);
        if (currentSeal && currentSeal.timeSpent < 180000 && !journey.achievements.includes('quickLearner')) {
            newAchievements.push('quickLearner');
        }
        
        // Thoughtful reflector
        if (Object.keys(journey.reflections).length >= 3 && !journey.achievements.includes('thoughtfulReflector')) {
            newAchievements.push('thoughtfulReflector');
        }
        
        // Add new achievements
        journey.achievements.push(...newAchievements);
        
        // Show achievement notifications
        newAchievements.forEach(achievement => {
            this.showAchievementNotification(achievement, journey.ageGroup);
        });
    }

    showAchievementNotification(achievementId, ageGroup) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return;

        const notification = document.createElement('div');
        notification.className = `achievement-notification ${ageGroup}-achievement`;
        
        const icon = this.getAchievementIcon(achievementId, ageGroup);
        
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${icon}</div>
                <div class="achievement-text">
                    <div class="achievement-title">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate and remove
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }

    getAchievementIcon(achievementId, ageGroup) {
        const icons = {
            kids: { firstSeal: '🌟', quickLearner: '⚡', thoughtfulReflector: '💭', biblicalScholar: '🏆' },
            teenagers: { firstSeal: '🔥', quickLearner: '💨', thoughtfulReflector: '🧠', biblicalScholar: '👑' },
            adults: { firstSeal: '✅', quickLearner: '⏱️', thoughtfulReflector: '📝', biblicalScholar: '🎓' },
            scholars: { firstSeal: '📖', quickLearner: '⚡', thoughtfulReflector: '🤔', biblicalScholar: '🏅' }
        };
        
        return icons[ageGroup]?.[achievementId] || '🏆';
    }
}

// Export the learning journey manager
window.LearningJourneyManager = LearningJourneyManager;
window.ProgressTracker = ProgressTracker;
window.ReflectionEngine = ReflectionEngine;
window.AchievementSystem = AchievementSystem;

console.log('🛤️ Learning Journey Manager loaded - Meaningful spiritual progression ready!');
