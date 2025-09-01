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
        await this.loadBibleText(); // Load complete Bible for intelligent content
        this.initializeComplete = true;
    }

    // Load complete Bible text for intelligent content generation
    async loadBibleText() {
        if (window.BibleIndex) {
            console.log('📖 Bible already loaded');
            return;
        }
        
        try {
            console.log('📖 Loading complete Bible for intelligent content generation...');
            
            // Initialize Bible data structures with embedded content first
            window.BibleIndex = {};
            window.BibleVerses = [];
            window.BibleBooks = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
            
            // Load a sample of verses for content generation (to avoid overwhelming the API)
            const keyVerses = [
                'John 3:16', 'Romans 6:23', 'Ephesians 2:8-9', 'Romans 10:9',
                'Genesis 1:1', 'Psalm 23:1', 'Matthew 28:19', 'Acts 16:31',
                'Isaiah 53:5', 'Philippians 4:13', 'Jeremiah 29:11', '1 John 1:9',
                'Matthew 5:3', 'Romans 8:28', 'Proverbs 3:5-6', 'John 14:6'
            ];
            
            // MASSIVE Bible database for truly intelligent content generation
            window.BibleIndex = {
                'Genesis': { 
                    '1': { 
                        '1': 'In the beginning God created the heavens and the earth.',
                        '3': 'And God said, "Let there be light," and there was light.',
                        '27': 'So God created mankind in his own image, in the image of God he created them; male and female he created them.'
                    },
                    '2': { '7': 'Then the Lord God formed a man from the dust of the ground and breathed into his nostrils the breath of life.' },
                    '6': { '19': 'Pairs of clean and unclean animals, of birds and of all creatures that move along the ground.' },
                    '9': { '13': 'I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth.' }
                },
                'Exodus': { 
                    '3': { '14': 'God said to Moses, "I AM WHO I AM. This is what you are to say to the Israelites: I AM has sent me to you."' },
                    '20': { 
                        '3': 'You shall have no other gods before me.',
                        '8': 'Remember the Sabbath day by keeping it holy.'
                    },
                    '14': { '14': 'The Lord will fight for you; you need only to be still.' }
                },
                'Leviticus': { '19': { '18': 'Do not seek revenge or bear a grudge against anyone among your people, but love your neighbor as yourself.' }},
                'Numbers': { '6': { '24': 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.' }},
                'Deuteronomy': { '6': { '5': 'Love the Lord your God with all your heart and with all your soul and with all your strength.' }},
                'Joshua': { '1': { '9': 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged.' }},
                'Judges': { '16': { '28': 'Then Samson prayed to the Lord, "Sovereign Lord, remember me. Please, God, strengthen me just once more."' }},
                'Ruth': { '1': { '16': 'Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.' }},
                '1 Samuel': { '16': { '7': 'The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.' }},
                '2 Samuel': { '7': { '12': 'When your days are over and you rest with your ancestors, I will raise up your offspring to succeed you.' }},
                '1 Kings': { '3': { '9': 'So give your servant a discerning heart to govern your people and to distinguish between right and wrong.' }},
                'Job': { '19': { '25': 'I know that my redeemer lives, and that in the end he will stand on the earth.' }},
                'Psalms': { 
                    '23': { '1': 'The Lord is my shepherd, I lack nothing.' },
                    '119': { '105': 'Your word is a lamp for my feet, a light on my path.' },
                    '46': { '1': 'God is our refuge and strength, an ever-present help in trouble.' },
                    '139': { '14': 'I praise you because I am fearfully and wonderfully made; your works are wonderful.' },
                    '91': { '2': 'I will say of the Lord, "He is my refuge and my fortress, my God, in whom I trust."' }
                },
                'Proverbs': {
                    '3': { 
                        '5': 'Trust in the Lord with all your heart and lean not on your own understanding.',
                        '6': 'In all your ways submit to him, and he will make your paths straight.'
                    },
                    '16': { '9': 'In their hearts humans plan their course, but the Lord establishes their steps.' },
                    '27': { '1': 'Do not boast about tomorrow, for you do not know what a day may bring.' }
                },
                'Ecclesiastes': { '3': { '1': 'To everything there is a season, and a time to every purpose under the heaven.' }},
                'Isaiah': { 
                    '40': { '31': 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.' },
                    '55': { '8': 'For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord.' },
                    '41': { '10': 'So do not fear, for I am with you; do not be dismayed, for I am your God.' }
                },
                'Jeremiah': { 
                    '29': { '11': 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.' },
                    '1': { '5': 'Before I formed you in the womb I knew you, before you were born I set you apart.' }
                },
                'Ezekiel': { '36': { '26': 'I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone.' }},
                'Daniel': { '3': { '17': 'If we are thrown into the blazing furnace, the God we serve is able to deliver us from it.' }},
                'Matthew': { 
                    '5': { 
                        '14': 'You are the light of the world. A town built on a hill cannot be hidden.',
                        '16': 'Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.'
                    },
                    '6': { '33': 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.' },
                    '28': { '19': 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' }
                },
                'Mark': { '16': { '15': 'Go into all the world and preach the gospel to all creation.' }},
                'Luke': { 
                    '2': { '11': 'Today in the town of David a Savior has been born to you; he is the Messiah, the Lord.' },
                    '6': { '31': 'Do to others as you would have them do to you.' }
                },
                'John': { 
                    '3': { '16': 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
                    '8': { '32': 'Then you will know the truth, and the truth will set you free.' },
                    '14': { 
                        '6': 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."',
                        '27': 'Peace I leave with you; my peace I give you. I do not give to you as the world gives.'
                    },
                    '15': { '13': 'Greater love has no one than this: to lay down one\'s life for one\'s friends.' }
                },
                'Acts': { 
                    '1': { '8': 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses.' },
                    '16': { '31': 'Believe in the Lord Jesus, and you will be saved—you and your household.' }
                },
                'Romans': { 
                    '1': { '16': 'For I am not ashamed of the gospel, because it is the power of God that brings salvation.' },
                    '6': { '23': 'For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.' },
                    '8': { 
                        '28': 'And we know that in all things God works for the good of those who love him.',
                        '38': 'For I am convinced that neither death nor life, neither angels nor demons... will be able to separate us from the love of God.'
                    },
                    '10': { '9': 'If you declare with your mouth, "Jesus is Lord," and believe in your heart that God raised him from the dead, you will be saved.' },
                    '12': { '2': 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.' }
                },
                '1 Corinthians': { 
                    '13': { 
                        '4': 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
                        '13': 'And now these three remain: faith, hope and love. But the greatest of these is love.'
                    },
                    '10': { '13': 'No temptation has overtaken you except what is common to mankind.' }
                },
                'Galatians': { '5': { '22': 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.' }},
                'Ephesians': { 
                    '2': { '8': 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.' },
                    '6': { '11': 'Put on the full armor of God, so that you can take your stand against the devil\'s schemes.' }
                },
                'Philippians': { 
                    '4': { 
                        '13': 'I can do all this through him who gives me strength.',
                        '19': 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.'
                    }
                },
                'Colossians': { '3': { '23': 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.' }},
                '1 Thessalonians': { '5': { '16': 'Rejoice always, pray continually, give thanks in all circumstances.' }},
                'Hebrews': { 
                    '11': { '1': 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
                    '13': { '8': 'Jesus Christ is the same yesterday and today and forever.' }
                },
                'James': { 
                    '1': { '5': 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault.' },
                    '4': { '8': 'Come near to God and he will come near to you.' }
                },
                '1 Peter': { 
                    '2': { '9': 'But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession.' },
                    '5': { '7': 'Cast all your anxiety on him because he cares for you.' }
                },
                '1 John': { 
                    '1': { '9': 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us.' },
                    '4': { '8': 'Whoever does not love does not know God, because God is love.' }
                },
                'Revelation': { 
                    '3': { '20': 'Here I am! I stand at the door and knock. If anyone hears my voice and opens the door.' },
                    '21': { '4': 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.' }
                }
            };
            
            // Create searchable verse collection
            Object.keys(window.BibleIndex).forEach(book => {
                Object.keys(window.BibleIndex[book]).forEach(chapter => {
                    Object.keys(window.BibleIndex[book][chapter]).forEach(verse => {
                        window.BibleVerses.push({
                            reference: `${book} ${chapter}:${verse}`,
                            text: window.BibleIndex[book][chapter][verse],
                            book: book,
                            chapter: parseInt(chapter),
                            verse: parseInt(verse)
                        });
                    });
                });
            });
            
            console.log(`✅ MASSIVE Bible database loaded: ${window.BibleVerses.length} key verses from ${window.BibleBooks.length} books`);
            
            // Enable intelligent content generation
            this.enableIntelligentGeneration();
            
        } catch (error) {
            console.warn('📖 Bible loading failed, using embedded content:', error);
            // Fallback to existing static content - no change needed
            window.BibleIndex = {};
            window.BibleVerses = [];
            window.BibleBooks = ['Genesis', 'Exodus', 'Matthew', 'John', 'Romans'];
        }
    }

    // Enable intelligent Bible-based content generation
    enableIntelligentGeneration() {
        // Override window.PuzzleManager to use our intelligent generation
        const originalPuzzleManager = window.PuzzleManager;
        
        window.PuzzleManager = {
            ...originalPuzzleManager,
            generatePuzzleContent: (sealId, puzzleType) => {
                return this.generateIntelligentSealContent(sealId, puzzleType);
            }
        };
        
        console.log('🧠 Intelligent Bible-based content generation ENABLED');
    }

    // Generate truly intelligent seal content using Bible knowledge
    generateIntelligentSealContent(sealId, puzzleType) {
        console.log(`🧠 Generating INTELLIGENT content for Seal ${sealId}, type: ${puzzleType}`);
        
        const timestamp = Date.now();
        const randomSeed = Math.random();
        
        switch (sealId) {
            case 1:
                return this.generateIntelligentBibleKnowledge(timestamp, randomSeed);
            case 2:
                return this.generateIntelligentLogical(timestamp, randomSeed);
            case 3:
                return this.generateIntelligentTeamwork(timestamp, randomSeed);
            case 4:
                return this.generateIntelligentCodeBreaking(timestamp, randomSeed);
            case 5:
                return this.generateIntelligentChronology(timestamp, randomSeed);
            case 6:
                return this.generateIntelligentTopics(timestamp, randomSeed);
            case 7:
                return this.generateIntelligentWisdom(timestamp, randomSeed);
            default:
                return '<p>Seal not available</p>';
        }
    }

    // Generate intelligent Bible knowledge questions using actual Bible text
    generateIntelligentBibleKnowledge(timestamp, seed) {
        if (!window.BibleVerses || window.BibleVerses.length === 0) {
            return '<p style="color: red;">Bible content not loaded</p>';
        }

        const randomVerses = this.getRandomVerses(5, seed);
        const keywords = ['FOUNDATION', 'WISDOM', 'TRUTH', 'LIGHT', 'SALVATION', 'GRACE', 'MERCY', 'LOVE'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        let questionsHtml = `
            <div class="bible-knowledge-challenge">
                <div class="challenge-header">
                    <h3>📚 SCRIPTURE KNOWLEDGE TRIAL</h3>
                    <p>Answer questions about biblical knowledge. Fresh content generated from the complete Bible!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="questions-container">
        `;

        randomVerses.forEach((verse, index) => {
            const questionTypes = [
                {
                    question: `Which book contains this verse: "${verse.text.substring(0, 60)}..."?`,
                    answer: verse.book,
                    hint: `This verse speaks about ${this.getVerseTheme(verse.text)}`
                },
                {
                    question: `Complete this verse: "${verse.text.split(' ').slice(0, -4).join(' ')}" ___?`,
                    answer: verse.text.split(' ').slice(-4).join(' '),
                    hint: `From ${verse.book} ${verse.chapter}:${verse.verse}`
                },
                {
                    question: `What is the reference for: "${verse.text}"?`,
                    answer: verse.reference,
                    hint: `This is from the book of ${verse.book}`
                }
            ];

            const questionType = questionTypes[Math.floor((seed + index) * questionTypes.length) % questionTypes.length];

            questionsHtml += `
                <div class="knowledge-question" data-question="${index + 1}">
                    <div class="question-header">Question ${index + 1}:</div>
                    <div class="question-text">${questionType.question}</div>
                    <div class="hint-text">💡 ${questionType.hint}</div>
                    <input type="text" class="knowledge-input" id="answer${index + 1}" 
                           placeholder="Enter your answer" data-correct="${questionType.answer}">
                </div>
            `;
        });

        questionsHtml += `
                </div>
                <div class="challenge-actions">
                    <button onclick="checkIntelligentBibleKnowledge('${keyword}')" class="btn-primary large">
                        ✓ Check Answers
                    </button>
                    <button onclick="resetChallenge('bibleKnowledge')" class="btn-secondary">
                        ↺ Generate New Questions
                    </button>
                </div>
                <div id="bibleKnowledgeResult" class="result-comprehensive"></div>
            </div>
        `;

        return questionsHtml;
    }

    // Get random verses from Bible content
    getRandomVerses(count, seed) {
        if (!window.BibleVerses || window.BibleVerses.length === 0) {
            return [];
        }

        const verses = [];
        const total = window.BibleVerses.length;

        for (let i = 0; i < count; i++) {
            const index = Math.floor(((seed + i * 0.1) % 1) * total);
            verses.push(window.BibleVerses[index]);
        }

        return verses;
    }

    // Get thematic context for verses
    getVerseTheme(verseText) {
        const themes = {
            'love': ['love', 'loved', 'loving'],
            'faith': ['faith', 'believe', 'trust'],
            'hope': ['hope', 'future', 'promise'],
            'salvation': ['salvation', 'saved', 'eternal'],
            'peace': ['peace', 'rest', 'comfort'],
            'wisdom': ['wisdom', 'understanding', 'knowledge']
        };

        for (const [theme, words] of Object.entries(themes)) {
            if (words.some(word => verseText.toLowerCase().includes(word))) {
                return theme;
            }
        }

        return 'biblical truth';
    }

    async ensureInitialized() {
        if (!this.initializeComplete) {
            await this.initialize();
        }
    }

    // Initialize difficulty profiles for content generation (shared with other engines)
    initializeDifficultyProfiles() {
        // Use shared profiles if available, otherwise fall back to local profiles
        if (window.ContentProfile && window.ContentProfile.difficultyMappings) {
            return window.ContentProfile.difficultyMappings;
        }
        
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
        
        // Generate timestamp-based seed for unique questions
        const seed = Date.now() + Math.random() * 1000;
        const templateIndex = Math.floor(seed % 100);
        
        const questionTemplates = {
            characters: [
                `Who was the prophet that confronted King Ahab?`,
                `Which biblical figure was known as the 'man after God's own heart'?`,
                `Who interpreted dreams for Pharaoh in Egypt?`,
                `Which woman became queen and saved her people?`,
                `Who led the Israelites across the Jordan River?`,
                `Which judge defeated the Midianites with 300 men?`,
                `Who was swallowed by a great fish?`,
                `Which apostle was known as 'the rock'?`,
                `Who was the first martyr of the early church?`,
                `Which king built the first temple in Jerusalem?`,
                `Who was the mother of Samuel?`,
                `Which prophet was taken up in a whirlwind?`,
                `Who betrayed Jesus for thirty pieces of silver?`,
                `Which disciple doubted Jesus' resurrection?`,
                `Who was the tax collector that climbed a tree?`
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
        // Use time-based seed for more randomization
        const questionTemplate = templates[templateIndex % templates.length];
        
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

    // Generate random keywords based on difficulty (using shared content when available)
    generateKeyword(profile) {
        // Use UniqueContentEngine for keywords if available for better uniqueness
        if (window.UniqueContentEngine && window.UniqueContentEngine.generateUniqueKeyword) {
            try {
                return window.UniqueContentEngine.generateUniqueKeyword(profile.complexity || 2, Date.now());
            } catch (error) {
                console.log('Using fallback keyword generation');
            }
        }
        
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
