/**
 * Bible Content Generation System
 * Provides fresh, dynamic biblical content for each seal and restart
 */

// Bible Content Database - Structured biblical knowledge
const BibleContentDatabase = {
    // OLD TESTAMENT EVENTS (Seal 1 theme)
    oldTestamentEvents: {
        creation: {
            events: [
                { name: 'Creation of Light', day: 1, reference: 'Genesis 1:3-5' },
                { name: 'Separation of Waters', day: 2, reference: 'Genesis 1:6-8' },
                { name: 'Dry Land and Plants', day: 3, reference: 'Genesis 1:9-13' },
                { name: 'Sun, Moon, and Stars', day: 4, reference: 'Genesis 1:14-19' },
                { name: 'Sea Creatures and Birds', day: 5, reference: 'Genesis 1:20-23' },
                { name: 'Land Animals and Humans', day: 6, reference: 'Genesis 1:24-31' },
                { name: 'God Rested', day: 7, reference: 'Genesis 2:1-3' }
            ],
            timelineQuestions: [
                'What did God create on the fourth day?',
                'Which day did God rest?',
                'What was created before the sun and moon?'
            ]
        },
        patriarchs: [
            { name: 'Abraham', event: 'Called by God to leave Ur', reference: 'Genesis 12:1-3', period: 'c. 2000 BC' },
            { name: 'Isaac', event: 'Born to Abraham and Sarah', reference: 'Genesis 21:1-7', period: 'c. 1900 BC' },
            { name: 'Jacob', event: 'Wrestling with God, renamed Israel', reference: 'Genesis 32:22-32', period: 'c. 1800 BC' },
            { name: 'Joseph', event: 'Sold into Egypt, becomes ruler', reference: 'Genesis 37-50', period: 'c. 1700 BC' }
        ],
        exodus: [
            { event: 'Moses born in Egypt', reference: 'Exodus 2:1-10', order: 1 },
            { event: 'Burning bush encounter', reference: 'Exodus 3:1-15', order: 2 },
            { event: 'Ten plagues on Egypt', reference: 'Exodus 7-12', order: 3 },
            { event: 'Passover established', reference: 'Exodus 12:1-30', order: 4 },
            { event: 'Red Sea crossing', reference: 'Exodus 14:1-31', order: 5 },
            { event: 'Ten Commandments given', reference: 'Exodus 20:1-17', order: 6 },
            { event: 'Golden calf incident', reference: 'Exodus 32:1-35', order: 7 },
            { event: 'Tabernacle construction', reference: 'Exodus 35-40', order: 8 }
        ],
        kings: [
            { name: 'Saul', period: 'First King', event: 'Anointed by Samuel', reference: '1 Samuel 10:1' },
            { name: 'David', period: 'Man after God\'s heart', event: 'Defeated Goliath', reference: '1 Samuel 17' },
            { name: 'Solomon', period: 'Wisest King', event: 'Built the Temple', reference: '1 Kings 6' },
            { name: 'Rehoboam', period: 'Kingdom divided', event: 'Lost northern tribes', reference: '1 Kings 12' }
        ]
    },

    // PSALMS & PROVERBS (Seal 2 theme)
    psalmsAndProverbs: {
        memorableVerses: [
            {
                category: 'Trust',
                verses: [
                    { text: 'The Lord is my shepherd, I lack nothing', reference: 'Psalm 23:1', theme: 'Divine care' },
                    { text: 'Trust in the Lord with all your heart', reference: 'Proverbs 3:5', theme: 'Complete faith' },
                    { text: 'Cast all your anxiety on him', reference: '1 Peter 5:7', theme: 'Release worry' }
                ]
            },
            {
                category: 'Wisdom',
                verses: [
                    { text: 'The fear of the Lord is the beginning of wisdom', reference: 'Proverbs 9:10', theme: 'True wisdom' },
                    { text: 'A gentle answer turns away wrath', reference: 'Proverbs 15:1', theme: 'Communication' },
                    { text: 'Train up a child in the way he should go', reference: 'Proverbs 22:6', theme: 'Parenting' }
                ]
            },
            {
                category: 'Comfort',
                verses: [
                    { text: 'Be still and know that I am God', reference: 'Psalm 46:10', theme: 'Peace' },
                    { text: 'Create in me a clean heart, O God', reference: 'Psalm 51:10', theme: 'Renewal' },
                    { text: 'He heals the brokenhearted', reference: 'Psalm 147:3', theme: 'Healing' }
                ]
            }
        ],
        wisdomPrinciples: [
            'Humility comes before honor',
            'Pride goes before destruction',
            'A friend loves at all times',
            'Iron sharpens iron',
            'Above all else, guard your heart',
            'The righteous flourish like a palm tree'
        ]
    },

    // FAITH & GROWTH (Seal 3 theme)
    faithJourneys: {
        biblicalExamples: [
            {
                name: 'Abraham',
                journey: 'From idolatry to faith',
                stages: ['Called from Ur', 'Promise of son', 'Testing with Isaac', 'Covenant confirmed'],
                lessons: ['Obedience to God', 'Faith in promises', 'Trust through testing', 'Covenant relationship']
            },
            {
                name: 'Joseph',
                journey: 'From betrayal to blessing',
                stages: ['Sold by brothers', 'Slavery in Egypt', 'Prison for righteousness', 'Ruler of Egypt'],
                lessons: ['Forgiveness', 'Perseverance', 'Integrity', 'God\'s sovereignty']
            },
            {
                name: 'David',
                journey: 'From shepherd to king',
                stages: ['Anointed by Samuel', 'Defeated Goliath', 'Fled from Saul', 'Became king'],
                lessons: ['Courage in faith', 'Patience in waiting', 'Repentance from sin', 'Heart for worship']
            },
            {
                name: 'Peter',
                journey: 'From fisherman to apostle',
                stages: ['Called by Jesus', 'Walked on water', 'Denied Jesus', 'Restored and commissioned'],
                lessons: ['Boldness', 'Faith over fear', 'Failure and restoration', 'Leadership through service']
            }
        ],
        growthStages: [
            { stage: 'Hearing', description: 'Faith comes by hearing the Word', verse: 'Romans 10:17' },
            { stage: 'Believing', description: 'Trust in Jesus for salvation', verse: 'John 3:16' },
            { stage: 'Following', description: 'Obedience and discipleship', verse: 'Luke 9:23' },
            { stage: 'Growing', description: 'Maturity through trials', verse: 'James 1:2-4' },
            { stage: 'Serving', description: 'Using gifts to help others', verse: '1 Peter 4:10' },
            { stage: 'Leading', description: 'Mentoring and teaching others', verse: '2 Timothy 2:2' }
        ]
    },

    // KINGDOM PRINCIPLES (Seal 4 theme)
    kingdomParables: [
        {
            name: 'Parable of the Sower',
            reference: 'Matthew 13:1-23',
            lesson: 'Different hearts receive God\'s word differently',
            soilTypes: ['Hard path', 'Rocky ground', 'Among thorns', 'Good soil'],
            applications: ['Hardened heart', 'Shallow faith', 'Worldly distractions', 'Fruitful life']
        },
        {
            name: 'Parable of the Mustard Seed',
            reference: 'Matthew 13:31-32',
            lesson: 'God\'s kingdom starts small but grows mighty',
            elements: ['Tiny seed', 'Great tree', 'Birds nesting'],
            applications: ['Small beginnings', 'Exponential growth', 'Blessing others']
        },
        {
            name: 'Parable of the Good Samaritan',
            reference: 'Luke 10:25-37',
            lesson: 'Love your neighbor as yourself',
            characters: ['Priest', 'Levite', 'Samaritan', 'Wounded man'],
            applications: ['Religious hypocrisy', 'Ethnic prejudice', 'True compassion', 'Human need']
        }
    ],

    // NEW TESTAMENT TEACHINGS (Seal 5 theme)
    newTestamentTeachings: {
        jesusTeachings: [
            { topic: 'Love', verse: 'Love one another as I have loved you', reference: 'John 13:34' },
            { topic: 'Forgiveness', verse: 'Forgive as you have been forgiven', reference: 'Matthew 6:14' },
            { topic: 'Service', verse: 'Whoever wants to be great must be a servant', reference: 'Mark 10:43' },
            { topic: 'Eternal Life', verse: 'I am the way, the truth, and the life', reference: 'John 14:6' }
        ],
        paulLetters: [
            { book: 'Romans', theme: 'Salvation by faith', keyVerse: 'Romans 3:23' },
            { book: 'Corinthians', theme: 'Church unity', keyVerse: '1 Corinthians 13:13' },
            { book: 'Galatians', theme: 'Freedom in Christ', keyVerse: 'Galatians 5:1' },
            { book: 'Ephesians', theme: 'Unity in Christ', keyVerse: 'Ephesians 4:4-6' },
            { book: 'Philippians', theme: 'Joy in Christ', keyVerse: 'Philippians 4:13' },
            { book: 'Colossians', theme: 'Christ\'s supremacy', keyVerse: 'Colossians 1:17' }
        ],
        churchPractices: [
            { practice: 'Baptism', meaning: 'Death and resurrection with Christ', reference: 'Romans 6:3-4' },
            { practice: 'Communion', meaning: 'Remembering Christ\'s sacrifice', reference: '1 Corinthians 11:23-26' },
            { practice: 'Prayer', meaning: 'Communication with God', reference: '1 Thessalonians 5:17' },
            { practice: 'Fellowship', meaning: 'Community of believers', reference: 'Acts 2:42' }
        ]
    },

    // HEALTH & VITALITY (Seal 6 theme)
    healthAndWellness: {
        biblicalHealth: [
            { principle: 'Body as temple', verse: 'Your body is a temple of the Holy Spirit', reference: '1 Corinthians 6:19' },
            { principle: 'Moderation', verse: 'All things in moderation', reference: '1 Corinthians 10:31' },
            { principle: 'Rest', verse: 'Come to me and find rest', reference: 'Matthew 11:28' },
            { principle: 'Joy', verse: 'The joy of the Lord is your strength', reference: 'Nehemiah 8:10' }
        ],
        mentalHealth: [
            { issue: 'Anxiety', solution: 'Cast your cares on God', verse: '1 Peter 5:7' },
            { issue: 'Depression', solution: 'God is near to the brokenhearted', verse: 'Psalm 34:18' },
            { issue: 'Stress', solution: 'Be still and know that I am God', verse: 'Psalm 46:10' },
            { issue: 'Fear', solution: 'Perfect love casts out fear', verse: '1 John 4:18' }
        ]
    },

    // REVELATION (Seal 7 theme)
    revelation: {
        endTimes: [
            { event: 'Second Coming', description: 'Jesus returns in glory', reference: 'Revelation 19:11-16' },
            { event: 'New Heaven and Earth', description: 'All things made new', reference: 'Revelation 21:1-5' },
            { event: 'Final Judgment', description: 'Books are opened', reference: 'Revelation 20:11-15' },
            { event: 'Eternal Life', description: 'No more death or sorrow', reference: 'Revelation 21:4' }
        ],
        symbols: [
            { symbol: 'Seven', meaning: 'Completeness and perfection' },
            { symbol: 'Lamb', meaning: 'Jesus Christ, sacrificial savior' },
            { symbol: 'Dragon', meaning: 'Satan, the deceiver' },
            { symbol: 'New Jerusalem', meaning: 'Heaven, eternal dwelling' }
        ]
    }
};

// Content Generation Engine
class BibleContentGenerator {
    constructor() {
        this.database = BibleContentDatabase;
        this.usedContent = new Set(); // Track used content to avoid repetition
        this.sessionSeed = Date.now(); // Seed for consistent randomization per session
        
        console.log('📖 BibleContentGenerator initialized');
    }

    // Generate fresh content for a specific seal
    generateSealContent(sealId, sessionId = null) {
        const seed = sessionId || this.sessionSeed;
        
        switch (sealId) {
            case 1:
                return this.generateOldTestamentContent(seed);
            case 2:
                return this.generatePsalmsProverbsContent(seed);
            case 3:
                return this.generateFaithGrowthContent(seed);
            case 4:
                return this.generateKingdomParablesContent(seed);
            case 5:
                return this.generateNewTestamentContent(seed);
            case 6:
                return this.generateHealthVitalityContent(seed);
            case 7:
                return this.generateRevelationContent(seed);
            default:
                return this.generateGenericContent(seed);
        }
    }

    // SEAL 1: Old Testament Timeline Content
    generateOldTestamentContent(seed) {
        const categories = ['exodus', 'patriarchs', 'kings'];
        const selectedCategory = this.selectRandomWithSeed(categories, seed);
        const events = this.database.oldTestamentEvents[selectedCategory];
        
        if (Array.isArray(events)) {
            // For arrays like patriarchs, kings
            const selectedEvents = this.shuffleWithSeed([...events], seed).slice(0, 7);
            return {
                type: 'timeline',
                theme: this.capitalize(selectedCategory),
                events: selectedEvents.map((event, index) => ({
                    id: index + 1,
                    name: event.event || `${event.name} - ${event.event || event.period}`,
                    reference: event.reference,
                    period: event.period || 'Ancient Times',
                    correctOrder: index + 1
                })),
                keyword: this.generateKeyword(selectedCategory)
            };
        } else {
            // For objects like exodus
            return {
                type: 'timeline',
                theme: 'Exodus Journey',
                events: events.map(event => ({
                    id: event.order,
                    name: event.event,
                    reference: event.reference,
                    period: 'Exodus Era',
                    correctOrder: event.order
                })),
                keyword: 'EXODUS'
            };
        }
    }

    // SEAL 2: Psalms & Proverbs Memory Content
    generatePsalmsProverbsContent(seed) {
        const wisdomCategories = this.database.psalmsAndProverbs.memorableVerses;
        const selectedVerses = [];
        
        // Select 2 verses from each category
        wisdomCategories.forEach(category => {
            const shuffled = this.shuffleWithSeed([...category.verses], seed + category.category.length);
            selectedVerses.push(...shuffled.slice(0, 2));
        });

        // Create verse-meaning pairs
        const pairs = selectedVerses.slice(0, 6).map((verse, index) => ({
            id: index,
            verse: verse.text,
            meaning: `${verse.reference} - ${verse.theme}`,
            category: verse.theme
        }));

        return {
            type: 'memory',
            theme: 'Biblical Wisdom',
            pairs,
            keyword: 'WISDOM'
        };
    }

    // SEAL 3: Faith Journey Content
    generateFaithGrowthContent(seed) {
        const examples = this.database.faithJourneys.biblicalExamples;
        const selectedExample = this.selectRandomWithSeed(examples, seed);
        
        // Create growth stages based on the selected biblical figure
        const stages = selectedExample.stages.map((stage, index) => ({
            id: index + 1,
            title: stage,
            lesson: selectedExample.lessons[index],
            description: this.generateStageDescription(selectedExample.name, stage),
            choices: this.generateFaithChoices(stage, seed + index)
        }));

        return {
            type: 'journey',
            theme: `Faith Journey of ${selectedExample.name}`,
            character: selectedExample.name,
            stages,
            keyword: 'GROWTH'
        };
    }

    // SEAL 4: Kingdom Parables Content
    generateKingdomParablesContent(seed) {
        const parables = this.database.kingdomParables;
        const selectedParable = this.selectRandomWithSeed(parables, seed);
        
        return {
            type: 'interactive_story',
            theme: selectedParable.name,
            reference: selectedParable.reference,
            lesson: selectedParable.lesson,
            elements: selectedParable.elements || selectedParable.characters,
            applications: selectedParable.applications,
            keyword: 'KINGDOM'
        };
    }

    // SEAL 5: New Testament Content
    generateNewTestamentContent(seed) {
        const paulLetters = this.database.newTestamentTeachings.paulLetters;
        const selectedLetters = this.shuffleWithSeed([...paulLetters], seed).slice(0, 6);
        
        return {
            type: 'letter_sorting',
            theme: 'Paul\'s Letters to Churches',
            letters: selectedLetters.map((letter, index) => ({
                id: index + 1,
                book: letter.book,
                theme: letter.theme,
                keyVerse: letter.keyVerse,
                category: this.categorizeTheme(letter.theme)
            })),
            keyword: 'GOSPEL'
        };
    }

    // SEAL 6: Health & Vitality Content
    generateHealthVitalityContent(seed) {
        const healthPrinciples = this.database.healthAndWellness.biblicalHealth;
        const mentalHealth = this.database.healthAndWellness.mentalHealth;
        
        const selectedPrinciples = this.shuffleWithSeed([...healthPrinciples], seed).slice(0, 3);
        const selectedMental = this.shuffleWithSeed([...mentalHealth], seed).slice(0, 3);
        
        return {
            type: 'wellness_match',
            theme: 'Biblical Health & Wellness',
            physicalHealth: selectedPrinciples,
            mentalHealth: selectedMental,
            keyword: 'HEALING'
        };
    }

    // SEAL 7: Revelation Final Challenge
    generateRevelationContent(seed) {
        const endTimes = this.database.revelation.endTimes;
        const symbols = this.database.revelation.symbols;
        
        return {
            type: 'final_challenge',
            theme: 'Revelation Ultimate Challenge',
            endTimesEvents: this.shuffleWithSeed([...endTimes], seed),
            symbols: this.shuffleWithSeed([...symbols], seed).slice(0, 4),
            finalQuestion: this.generateFinalQuestion(seed),
            keyword: 'VICTORY'
        };
    }

    // Helper Methods
    selectRandomWithSeed(array, seed) {
        const index = Math.abs(this.hash(seed)) % array.length;
        return array[index];
    }

    shuffleWithSeed(array, seed) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.abs(this.hash(seed + i)) % (i + 1);
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    hash(input) {
        let hash = 0;
        const str = input.toString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    generateKeyword(category) {
        const keywords = {
            exodus: 'FREEDOM',
            patriarchs: 'COVENANT',
            kings: 'KINGDOM',
            creation: 'CREATION'
        };
        return keywords[category] || 'FAITH';
    }

    generateStageDescription(character, stage) {
        const descriptions = {
            'Abraham': {
                'Called from Ur': 'God calls you to leave everything familiar and trust in His promise.',
                'Promise of son': 'God promises you descendants, but you must wait in faith.',
                'Testing with Isaac': 'God tests your ultimate trust and obedience.',
                'Covenant confirmed': 'God establishes His eternal covenant with you.'
            },
            'Joseph': {
                'Sold by brothers': 'Your own family betrays you out of jealousy.',
                'Slavery in Egypt': 'You serve faithfully despite unjust circumstances.',
                'Prison for righteousness': 'You suffer for doing what is right.',
                'Ruler of Egypt': 'God elevates you to save many lives.'
            }
        };
        
        return descriptions[character]?.[stage] || `Experience the faith journey of ${character} in: ${stage}`;
    }

    generateFaithChoices(stage, seed) {
        // Generic faith choices that apply to most situations
        const choiceTemplates = [
            { text: 'Trust God completely despite circumstances', points: 3, outcome: 'faithful' },
            { text: 'Seek additional confirmation before acting', points: 2, outcome: 'cautious' },
            { text: 'Rely on your own understanding', points: 1, outcome: 'self-reliant' }
        ];
        
        return this.shuffleWithSeed([...choiceTemplates], seed);
    }

    categorizeTheme(theme) {
        const categories = {
            'Salvation': 'Doctrine',
            'Church unity': 'Community', 
            'Freedom': 'Liberty',
            'Unity': 'Community',
            'Joy': 'Experience',
            'Supremacy': 'Doctrine'
        };
        
        return categories[theme] || 'Teaching';
    }

    generateFinalQuestion(seed) {
        const questions = [
            'What is the ultimate message of the Bible?',
            'Who is the Alpha and Omega?',
            'What does God promise in Revelation 21:4?',
            'What is the final victory described in Revelation?'
        ];
        
        return this.selectRandomWithSeed(questions, seed);
    }

    // Clear content for new session
    clearSession() {
        this.usedContent.clear();
        this.sessionSeed = Date.now();
        console.log('🔄 Bible content session cleared');
    }

    // Generate daily scripture for footer
    generateDailyScripture() {
        const today = new Date().getDay(); // 0-6 for each day of week
        const scriptures = [
            { text: "This is the day the Lord has made; let us rejoice and be glad in it.", reference: "Psalm 118:24" },
            { text: "Trust in the Lord with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
            { text: "Be strong and courageous. Do not be afraid; do not be discouraged.", reference: "Joshua 1:9" },
            { text: "For I know the plans I have for you, declares the Lord.", reference: "Jeremiah 29:11" },
            { text: "Come to me, all you who are weary and burdened, and I will give you rest.", reference: "Matthew 11:28" },
            { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
            { text: "Cast all your anxiety on him because he cares for you.", reference: "1 Peter 5:7" }
        ];
        
        return scriptures[today];
    }
}

// Export for global use
window.BibleContentGenerator = BibleContentGenerator;
window.bibleContentGenerator = new BibleContentGenerator();

console.log('📖 Bible Content Generation System loaded successfully');
