// Dynamic Bible Game Intelligence Engine
// Advanced content generation, learning, and adaptation system

class BibleGameAI {
    constructor() {
        this.initializeComplete = false;
        this.contentPools = {
            bibleKnowledge: {
                characters: ['Moses', 'David', 'Solomon', 'Abraham', 'Noah', 'Joshua', 'Samuel', 'Daniel', 'Elijah', 'Jeremiah', 'Isaiah', 'Ezekiel', 'Paul', 'Peter', 'John', 'Matthew', 'Mark', 'Luke', 'Mary', 'Martha', 'Ruth', 'Esther', 'Deborah'],
                numbers: [3, 7, 12, 40, 50, 70, 144, 153, 666, 777, 1000, 144000],
                places: ['Jerusalem', 'Bethlehem', 'Nazareth', 'Galilee', 'Jordan', 'Sinai', 'Babylon', 'Egypt', 'Canaan', 'Damascus', 'Antioch', 'Corinth', 'Ephesus', 'Rome'],
                books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', 'Samuel', 'Kings', 'Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Isaiah', 'Jeremiah', 'Ezekiel', 'Daniel', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', 'Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', 'Thessalonians', 'Timothy', 'Titus', 'Hebrews', 'James', 'Peter', 'Revelation'],
                concepts: ['salvation', 'faith', 'love', 'grace', 'mercy', 'justice', 'holiness', 'righteousness', 'peace', 'joy', 'hope', 'truth', 'wisdom', 'knowledge', 'understanding']
            },
            events: {
                creation: ['God creates heavens and earth', 'God creates light', 'God creates man', 'Garden of Eden established'],
                patriarchs: ['Abraham called', 'Isaac born', 'Jacob wrestles with God', 'Joseph sold to Egypt', 'Jacob moves to Egypt'],
                exodus: ['Moses born', 'Burning bush', 'Ten plagues', 'Passover', 'Red Sea crossing', 'Ten Commandments', 'Golden calf', 'Wilderness wandering'],
                conquest: ['Joshua leads Israel', 'Jericho falls', 'Promised Land divided', 'Judges rule Israel'],
                kingdom: ['Saul anointed', 'David kills Goliath', 'David becomes king', 'Solomon builds temple', 'Kingdom divides'],
                exile: ['Assyria conquers Israel', 'Babylon conquers Judah', 'Temple destroyed', 'Jews exiled'],
                return: ['Cyrus decree', 'Jews return', 'Temple rebuilt', 'Walls rebuilt'],
                newTestament: ['Jesus born', 'Jesus baptized', 'Jesus crucified', 'Jesus resurrected', 'Pentecost', 'Paul converted', 'Church spreads']
            },
            verses: {
                salvation: [
                    'For God so loved the world that he gave his one and only Son - John 3:16',
                    'For by grace you have been saved through faith - Ephesians 2:8',
                    'The wages of sin is death, but the gift of God is eternal life - Romans 6:23',
                    'If you confess with your mouth Jesus as Lord - Romans 10:9',
                    'Whoever calls on the name of the Lord will be saved - Romans 10:13'
                ],
                faith: [
                    'Now faith is the substance of things hoped for - Hebrews 11:1',
                    'Faith comes by hearing, and hearing by the word of God - Romans 10:17',
                    'Without faith it is impossible to please God - Hebrews 11:6',
                    'We walk by faith, not by sight - 2 Corinthians 5:7',
                    'The just shall live by faith - Romans 1:17'
                ],
                love: [
                    'God is love - 1 John 4:8',
                    'Love your neighbor as yourself - Matthew 22:39',
                    'Love is patient, love is kind - 1 Corinthians 13:4',
                    'Greater love has no one than this - John 15:13',
                    'We love because he first loved us - 1 John 4:19'
                ],
                peace: [
                    'Peace I leave with you, my peace I give you - John 14:27',
                    'Do not be anxious about anything - Philippians 4:6',
                    'You will keep him in perfect peace - Isaiah 26:3',
                    'Blessed are the peacemakers - Matthew 5:9',
                    'The peace of God surpasses all understanding - Philippians 4:7'
                ],
                wisdom: [
                    'The fear of the Lord is the beginning of wisdom - Proverbs 9:10',
                    'If any of you lacks wisdom, let him ask God - James 1:5',
                    'Trust in the Lord with all your heart - Proverbs 3:5',
                    'The simple believe anything, but the prudent give thought - Proverbs 14:15',
                    'By wisdom a house is built - Proverbs 24:3'
                ]
            }
        };
        
        this.initialize();
        this.difficultyProfiles = this.initializeDifficultyProfiles();
        this.engagementFactors = this.initializeEngagementFactors();
    }

    async initialize() {
        this.learningData = await this.loadLearningData();
        this.initializeComplete = true;
    }

    async ensureInitialized() {
        if (!this.initializeComplete) {
            await this.initialize();
        }
    }

    // Initialize difficulty profiles for content generation
    initializeDifficultyProfiles() {
        return {
            beginner: {
                questionComplexity: 1,
                vocabularyLevel: 'simple',
                hintFrequency: 0.8,
                timeMultiplier: 1.5,
                conceptDepth: 'surface',
                answerVariations: 5,
                encouragementLevel: 'high'
            },
            intermediate: {
                questionComplexity: 2,
                vocabularyLevel: 'moderate',
                hintFrequency: 0.5,
                timeMultiplier: 1.0,
                conceptDepth: 'moderate',
                answerVariations: 3,
                encouragementLevel: 'medium'
            },
            advanced: {
                questionComplexity: 3,
                vocabularyLevel: 'advanced',
                hintFrequency: 0.2,
                timeMultiplier: 0.8,
                conceptDepth: 'deep',
                answerVariations: 2,
                encouragementLevel: 'low'
            },
            expert: {
                questionComplexity: 4,
                vocabularyLevel: 'scholarly',
                hintFrequency: 0,
                timeMultiplier: 0.6,
                conceptDepth: 'profound',
                answerVariations: 1,
                encouragementLevel: 'minimal'
            }
        };
    }

    // Initialize engagement enhancement factors
    initializeEngagementFactors() {
        return {
            narrativeElements: [
                'mysterious ancient scroll',
                'hidden temple chambers',
                'prophetic visions',
                'divine revelations',
                'sacred mysteries',
                'celestial wisdom',
                'eternal truths',
                'spiritual awakening'
            ],
            immersiveDescriptions: [
                'The ancient seal glows with divine light as you approach...',
                'Whispers of ancient wisdom echo through the sacred chambers...',
                'The scroll unfurls, revealing mysteries hidden for millennia...',
                'Celestial knowledge flows through your mind like living water...',
                'The very air shimmers with holy presence as understanding dawns...',
                'Time seems to stand still as eternal truths are unveiled...',
                'Your spirit resonates with the frequency of divine revelation...',
                'The boundary between heaven and earth grows thin as wisdom speaks...'
            ],
            successCelebrations: [
                '✨ Divine wisdom flows through you!',
                '🌟 The heavens rejoice at your understanding!',
                '⚡ Spiritual lightning illuminates your path!',
                '🔥 The fire of truth burns bright within you!',
                '💎 You have found a precious gem of eternal wisdom!',
                '🦅 Your spirit soars on wings of revelation!',
                '🌅 New horizons of understanding break forth!',
                '👑 You wear the crown of biblical mastery!'
            ]
        };
    }

    // Dynamic content generation based on difficulty and learning
    async generateDynamicSeal(sealNumber, difficulty, gameSession) {
        await this.ensureInitialized();
        const profile = this.difficultyProfiles[difficulty];
        const sessionData = this.analyzeSession(gameSession);
        
        switch(sealNumber) {
            case 1:
                return this.generateBibleKnowledgeSeal(profile, sessionData);
            case 2:
                return this.generateLogicalReasoningSeal(profile, sessionData);
            case 3:
                return this.generateTeamCommunicationSeal(profile, sessionData);
            case 4:
                return this.generateCodeBreakingSeal(profile, sessionData);
            case 5:
                return this.generateChronologicalSeal(profile, sessionData);
            case 6:
                return this.generateScriptureTopicsSeal(profile, sessionData);
            case 7:
                return this.generateWisdomSeal(profile, sessionData);
            default:
                return null;
        }
    }

    // Generate dynamic Bible Knowledge challenges
    generateBibleKnowledgeSeal(profile, sessionData) {
        const themes = ['characters', 'numbers', 'places', 'books'];
        const selectedTheme = this.selectWeightedRandom(themes, sessionData.preferences);
        
        const questions = [];
        const questionCount = Math.max(5, Math.min(10, 5 + profile.questionComplexity));
        
        for (let i = 0; i < questionCount; i++) {
            const question = this.generateBibleQuestion(selectedTheme, profile);
            questions.push(question);
        }

        return {
            keyword: this.generateKeyword(profile),
            questions: questions,
            theme: selectedTheme,
            immersiveIntro: this.generateImmersiveIntro('bibleKnowledge'),
            difficulty: profile,
            generatedAt: Date.now()
        };
    }

    generateBibleQuestion(theme, profile) {
        const pool = this.contentPools.bibleKnowledge[theme];
        const selected = this.selectRandom(pool);
        
        const questionTemplates = {
            characters: [
                `Who was the prophet that confronted King Ahab?`,
                `Which biblical figure was known as the 'man after God's own heart'?`,
                `Who interpreted dreams for Pharaoh in Egypt?`,
                `Which woman became queen and saved her people?`,
                `Who led the Israelites across the Jordan River?`
            ],
            numbers: [
                `How many days did it rain during Noah's flood?`,
                `How many disciples did Jesus choose?`,
                `How many years did the Israelites wander in the desert?`,
                `How many plagues were sent upon Egypt?`,
                `How many stones did David pick for Goliath?`
            ],
            places: [
                `In which city was Jesus born?`,
                `Where did Moses receive the Ten Commandments?`,
                `What was the promised land called?`,
                `Where was Paul on the road when he was converted?`,
                `In which garden did Jesus pray before his crucifixion?`
            ]
        };

        const templates = questionTemplates[theme] || questionTemplates.characters;
        const questionTemplate = this.selectRandom(templates);
        
        return {
            question: this.adaptQuestionComplexity(questionTemplate, profile),
            correctAnswer: selected,
            type: "exact",
            difficulty: profile.questionComplexity,
            hints: profile.hintFrequency > 0 ? this.generateHints(selected, theme) : []
        };
    }

    // Adaptive question complexity
    adaptQuestionComplexity(question, profile) {
        const complexity = profile.questionComplexity;
        
        if (complexity >= 3) {
            // Add contextual complexity for advanced players
            const contexts = [
                'In the historical context of ancient Israel,',
                'According to biblical chronology,',
                'In the theological framework of Scripture,',
                'Within the covenantal structure of the Bible,'
            ];
            return this.selectRandom(contexts) + ' ' + question.toLowerCase();
        } else if (complexity === 2) {
            // Moderate complexity
            return question;
        } else {
            // Simplify for beginners
            return question.replace(/biblical|theological|scriptural/gi, '').trim();
        }
    }

    // Generate immersive introductions
    generateImmersiveIntro(sealType) {
        const intros = {
            bibleKnowledge: [
                "🌟 The first seal pulsates with ancient knowledge. As you place your hand upon it, whispers of biblical truth echo through eternity...",
                "✨ Sacred scrolls unfurl before you, their parchment glowing with divine wisdom. The very air thrums with the power of God's Word...",
                "🔥 The flames of spiritual understanding dance around this mystical seal. Prepare to journey through the depths of biblical truth..."
            ],
            chronologicalOrder: [
                "⏳ Time itself seems to bend as this temporal seal awakens. The rivers of biblical history flow before you like liquid light...",
                "🌊 The tides of time part, revealing the great tapestry of God's eternal plan woven throughout history...",
                "⚡ Lightning flashes across the corridors of time, illuminating the divine timeline of redemption..."
            ],
            scriptureTopics: [
                "📚 Ancient libraries of wisdom materialize in the ethereal realm as categorized truths await your organization...",
                "🗂️ The great filing cabinets of heaven open, releasing torrents of topical biblical wisdom...",
                "✨ Streams of scriptural light organize themselves into perfect categories of divine truth..."
            ]
        };

        return this.selectRandom(intros[sealType] || intros.bibleKnowledge);
    }

    // Generate wisdom-based final challenges
    generateWisdomSeal(profile, sessionData) {
        const wisdomAreas = ['application', 'understanding', 'discernment', 'spiritual growth'];
        const selectedArea = this.selectWeightedRandom(wisdomAreas, sessionData.strengths);
        
        const challenges = [];
        const challengeCount = 3 + profile.questionComplexity;
        
        for (let i = 0; i < challengeCount; i++) {
            challenges.push(this.generateWisdomChallenge(selectedArea, profile, i));
        }

        return {
            keyword: this.generateWisdomKeyword(profile),
            challenges: challenges,
            area: selectedArea,
            immersiveIntro: "👑 The final seal radiates with the culmination of all biblical wisdom. As it opens, the very essence of divine understanding flows into your spirit...",
            difficulty: profile,
            generatedAt: Date.now()
        };
    }

    // Generate random keywords based on difficulty
    generateKeyword(profile) {
        const keywordPools = {
            1: ['TRUTH', 'LIGHT', 'PEACE', 'JOY', 'HOPE'],
            2: ['WISDOM', 'FAITH', 'GRACE', 'MERCY', 'LOVE'],
            3: ['RIGHTEOUSNESS', 'SANCTIFICATION', 'REDEMPTION', 'COVENANT', 'PERSEVERANCE'],
            4: ['ESCHATOLOGICAL', 'PNEUMATOLOGY', 'SOTERIOLOGY', 'CHRISTOLOGY', 'THEODICY']
        };
        
        const pool = keywordPools[profile.questionComplexity] || keywordPools[2];
        return this.selectRandom(pool);
    }

    // Self-learning capabilities
    async recordGameSession(sessionData) {
        await this.ensureInitialized();
        this.learningData.sessions.push({
            timestamp: Date.now(),
            difficulty: sessionData.difficulty,
            completionTime: sessionData.completionTime,
            sealsCompleted: sessionData.sealsCompleted,
            playerStrengths: sessionData.strengths,
            playerWeaknesses: sessionData.weaknesses,
            engagementLevel: sessionData.engagement,
            preferredChallengeTypes: sessionData.preferences
        });

        this.updateLearningPatterns();
        await this.saveLearningData();
    }

    updateLearningPatterns() {
        const recentSessions = this.learningData.sessions.slice(-100); // Last 100 sessions
        
        // Update difficulty preferences
        const difficultySuccess = {};
        recentSessions.forEach(session => {
            if (!difficultySuccess[session.difficulty]) {
                difficultySuccess[session.difficulty] = { total: 0, completed: 0 };
            }
            difficultySuccess[session.difficulty].total++;
            if (session.sealsCompleted === 7) {
                difficultySuccess[session.difficulty].completed++;
            }
        });

        // Update content preferences
        this.learningData.patterns = {
            difficultySuccess,
            averageCompletionTime: this.calculateAverageCompletionTime(recentSessions),
            popularChallengeTypes: this.identifyPopularChallenges(recentSessions),
            commonStrengths: this.identifyCommonStrengths(recentSessions),
            lastUpdated: Date.now()
        };
    }

    // Utility functions
    selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    selectWeightedRandom(array, weights = {}) {
        // If no weights provided, use random selection
        if (!weights || Object.keys(weights).length === 0) {
            return this.selectRandom(array);
        }
        
        // Implement weighted selection based on learning data
        const weightedArray = [];
        array.forEach(item => {
            const weight = weights[item] || 1;
            for (let i = 0; i < weight; i++) {
                weightedArray.push(item);
            }
        });
        
        return this.selectRandom(weightedArray);
    }

    analyzeSession(gameSession) {
        return {
            preferences: gameSession?.preferences || {},
            strengths: gameSession?.strengths || [],
            engagement: gameSession?.engagement || 'medium'
        };
    }

    async loadLearningData() {
        try {
            // Try Firebase first if user is authenticated
            if (window.firebase?.auth()?.currentUser) {
                const userId = window.firebase.auth().currentUser.uid;
                const snapshot = await window.firebase.database()
                    .ref(`playerData/${userId}/learningData`).once('value');
                
                if (snapshot.exists()) {
                    return snapshot.val();
                }
            }
            
            // Fallback to localStorage
            const saved = localStorage.getItem('bibleGameAI_learning');
            return saved ? JSON.parse(saved) : {
                sessions: [],
                patterns: {},
                contentPool: {},
                version: '1.0'
            };
        } catch (error) {
            console.log('Initializing new AI learning data');
            return {
                sessions: [],
                patterns: {},
                contentPool: {},
                version: '1.0'
            };
        }
    }

    async saveLearningData() {
        try {
            // Save to Firebase if user is authenticated
            if (window.firebase?.auth()?.currentUser) {
                const userId = window.firebase.auth().currentUser.uid;
                await window.firebase.database()
                    .ref(`playerData/${userId}/learningData`)
                    .set(this.learningData);
                
                // Also save to localStorage as backup
                localStorage.setItem('bibleGameAI_learning', JSON.stringify(this.learningData));
            } else {
                // Save to localStorage only
                localStorage.setItem('bibleGameAI_learning', JSON.stringify(this.learningData));
            }
        } catch (error) {
            console.log('Could not save AI learning data:', error);
            // Fallback to localStorage
            try {
                localStorage.setItem('bibleGameAI_learning', JSON.stringify(this.learningData));
            } catch (localError) {
                console.log('Could not save to localStorage either');
            }
        }
    }

    // Generate engagement-enhancing elements
    generateSuccessMessage(sealNumber, difficulty) {
        const celebrations = this.engagementFactors.successCelebrations;
        const baseMessage = this.selectRandom(celebrations);
        
        const sealSpecific = {
            1: "The foundation of biblical knowledge has been laid within your spirit!",
            2: "Divine logic flows through your reasoning like a mighty river!",
            3: "The bonds of spiritual unity have been forged in your heart!",
            4: "Ancient mysteries yield their secrets to your seeking mind!",
            5: "The timeline of God's plan unfolds before your enlightened eyes!",
            6: "The organization of divine truth brings clarity to your soul!",
            7: "The crown of biblical wisdom now rests upon your understanding!"
        };

        return `${baseMessage}\n\n${sealSpecific[sealNumber] || 'Divine wisdom flows through you!'}`;
    }

    // Advanced content generation for different seal types
    generateChronologicalSeal(profile, sessionData) {
        const timelineTypes = ['creation_flood', 'patriarchs', 'exodus_conquest', 'judges_kings', 'exile_return', 'new_testament'];
        const selectedTimeline = this.selectWeightedRandom(timelineTypes, sessionData.preferences);
        
        const events = this.generateTimelineEvents(selectedTimeline, profile);
        
        return {
            keyword: this.generateKeyword(profile),
            timeline: this.getTimelineTitle(selectedTimeline),
            events: events,
            correctOrder: events.map(e => e.id),
            immersiveIntro: this.generateImmersiveIntro('chronologicalOrder'),
            difficulty: profile,
            generatedAt: Date.now()
        };
    }

    generateTimelineEvents(timelineType, profile) {
        const eventPools = this.contentPools.events;
        const baseEvents = eventPools[timelineType] || eventPools.patriarchs;
        
        // Generate events based on difficulty
        const eventCount = Math.max(5, Math.min(12, 6 + profile.questionComplexity));
        const selectedEvents = this.selectMultipleRandom(baseEvents, eventCount);
        
        return selectedEvents.map((event, index) => ({
            id: `event_${timelineType}_${index}`,
            text: this.adaptEventComplexity(event, profile),
            period: this.determinePeriod(event, timelineType)
        }));
    }

    adaptEventComplexity(event, profile) {
        if (profile.questionComplexity >= 3) {
            // Add historical context for advanced players
            const contexts = ['approximately', 'during the reign of', 'in the period of', 'according to biblical chronology'];
            return event + ` (${this.selectRandom(contexts)} historical timeline)`;
        }
        return event;
    }

    selectMultipleRandom(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, array.length));
    }

    getTimelineTitle(timelineType) {
        const titles = {
            creation_flood: 'From Creation to the Flood',
            patriarchs: 'The Age of the Patriarchs',
            exodus_conquest: 'From Exodus to Conquest',
            judges_kings: 'Judges and Kings of Israel',
            exile_return: 'Exile and Return',
            new_testament: 'New Testament Timeline'
        };
        return titles[timelineType] || 'Biblical Timeline';
    }

    determinePeriod(event, timelineType) {
        const periods = {
            creation_flood: 'Primeval History',
            patriarchs: 'Patriarchal Age',
            exodus_conquest: 'Exodus Period',
            judges_kings: 'Kingdom Period',
            exile_return: 'Exile Period',
            new_testament: 'New Testament Era'
        };
        return periods[timelineType] || 'Biblical Period';
    }

    // Initialize the AI system
    static initialize() {
        if (!window.BibleGameAI) {
            window.BibleGameAI = new BibleGameAI();
            console.log('🤖 Bible Game AI Engine initialized successfully!');
        }
        return window.BibleGameAI;
    }
}

// Export and initialize
window.BibleGameAI = BibleGameAI;
BibleGameAI.initialize();
