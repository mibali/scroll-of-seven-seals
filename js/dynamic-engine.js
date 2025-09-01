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

            // COMPREHENSIVE BIBLE DATABASE - Organized by Seal Themes for Perfect Content Alignment
            window.BibleIndex = {
                // SEAL 1: OLD TESTAMENT EVENTS AND FOUNDATIONS
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
                'Leviticus': { '19': { '18': 'Do not seek revenge or bear a grudge against anyone among your people, but love your neighbor as yourself.' } },
                'Numbers': { '6': { '24': 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.' } },
                'Deuteronomy': { '6': { '5': 'Love the Lord your God with all your heart and with all your soul and with all your strength.' } },
                'Joshua': { '1': { '9': 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged.' } },
                'Judges': { '16': { '28': 'Then Samson prayed to the Lord, "Sovereign Lord, remember me. Please, God, strengthen me just once more."' } },
                'Ruth': { '1': { '16': 'Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.' } },
                '1 Samuel': { '16': { '7': 'The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.' } },
                '2 Samuel': { '7': { '12': 'When your days are over and you rest with your ancestors, I will raise up your offspring to succeed you.' } },
                '1 Kings': { '3': { '9': 'So give your servant a discerning heart to govern your people and to distinguish between right and wrong.' } },
                'Job': { '19': { '25': 'I know that my redeemer lives, and that in the end he will stand on the earth.' } },
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
                'Ecclesiastes': { '3': { '1': 'To everything there is a season, and a time to every purpose under the heaven.' } },
                'Isaiah': {
                    '40': { '31': 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles.' },
                    '55': { '8': 'For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord.' },
                    '41': { '10': 'So do not fear, for I am with you; do not be dismayed, for I am your God.' }
                },
                'Jeremiah': {
                    '29': { '11': 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.' },
                    '1': { '5': 'Before I formed you in the womb I knew you, before you were born I set you apart.' }
                },
                'Ezekiel': { '36': { '26': 'I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone.' } },
                'Daniel': { '3': { '17': 'If we are thrown into the blazing furnace, the God we serve is able to deliver us from it.' } },
                'Matthew': {
                    '5': {
                        '14': 'You are the light of the world. A town built on a hill cannot be hidden.',
                        '16': 'Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.'
                    },
                    '6': { '33': 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.' },
                    '28': { '19': 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' }
                },
                'Mark': { '16': { '15': 'Go into all the world and preach the gospel to all creation.' } },
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
                'Galatians': { '5': { '22': 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.' } },
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
                'Colossians': { '3': { '23': 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.' } },
                '1 Thessalonians': { '5': { '16': 'Rejoice always, pray continually, give thanks in all circumstances.' } },
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

            // SEAL-THEMED BIBLE CONTENT ORGANIZATION
            window.SealThemes = {
                1: { // OLD TESTAMENT EVENTS
                    books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', 'Job'],
                    events: [
                        { name: 'Creation of World', reference: 'Genesis 1:1', description: 'God creates heavens and earth' },
                        { name: 'Garden of Eden', reference: 'Genesis 2:8', description: 'God plants Eden and places man there' },
                        { name: 'The Fall', reference: 'Genesis 3:6', description: 'Adam and Eve disobey God' },
                        { name: 'Cain and Abel', reference: 'Genesis 4:8', description: 'First murder in human history' },
                        { name: 'Noah\'s Flood', reference: 'Genesis 6:19', description: 'God floods the earth, saves Noah\'s family' },
                        { name: 'Tower of Babel', reference: 'Genesis 11:4', description: 'Humans try to build tower to heaven' },
                        { name: 'Abraham\'s Call', reference: 'Genesis 12:1', description: 'God calls Abraham to leave his country' },
                        { name: 'Isaac\'s Birth', reference: 'Genesis 21:2', description: 'God fulfills promise to Abraham' },
                        { name: 'Jacob\'s Ladder', reference: 'Genesis 28:12', description: 'Jacob dreams of ladder to heaven' },
                        { name: 'Joseph in Egypt', reference: 'Genesis 37:28', description: 'Joseph sold into slavery, becomes ruler' },
                        { name: 'Moses\' Birth', reference: 'Exodus 2:2', description: 'Baby Moses hidden from Pharaoh' },
                        { name: 'Burning Bush', reference: 'Exodus 3:2', description: 'God speaks to Moses from burning bush' },
                        { name: 'Ten Plagues', reference: 'Exodus 7:14', description: 'God sends plagues on Egypt' },
                        { name: 'Red Sea Crossing', reference: 'Exodus 14:21', description: 'Israelites escape through Red Sea' },
                        { name: 'Ten Commandments', reference: 'Exodus 20:1', description: 'God gives laws to Moses on Mount Sinai' },
                        { name: 'Golden Calf', reference: 'Exodus 32:4', description: 'Israelites worship golden idol' },
                        { name: 'Promised Land Spies', reference: 'Numbers 13:2', description: 'Twelve spies scout Canaan' },
                        { name: 'Joshua Leads Israel', reference: 'Joshua 1:1', description: 'Joshua becomes leader after Moses' },
                        { name: 'Battle of Jericho', reference: 'Joshua 6:20', description: 'Walls of Jericho fall down' },
                        { name: 'David and Goliath', reference: '1 Samuel 17:50', description: 'Young David defeats giant with sling' }
                    ],
                    themes: ['Creation', 'Covenant', 'Deliverance', 'Leadership', 'Faith']
                },
                2: { // BIBLE STORIES, PSALMS, PROVERBS  
                    books: ['Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings'],
                    stories: [
                        { name: 'David\'s Anointing', reference: '1 Samuel 16:13', lesson: 'God sees the heart, not appearance' },
                        { name: 'David and Bathsheba', reference: '2 Samuel 11:2', lesson: 'Sin has consequences even for leaders' },
                        { name: 'Solomon\'s Wisdom', reference: '1 Kings 3:12', lesson: 'Ask God for wisdom above riches' },
                        { name: 'Elijah and Ravens', reference: '1 Kings 17:6', lesson: 'God provides in unexpected ways' },
                        { name: 'Shadrach in Fire', reference: 'Daniel 3:27', lesson: 'Faith protects us in trials' }
                    ],
                    wisdomVerses: [
                        'Trust in the Lord with all your heart - Proverbs 3:5',
                        'The Lord is my shepherd - Psalm 23:1',
                        'Be still and know that I am God - Psalm 46:10',
                        'Delight yourself in the Lord - Psalm 37:4',
                        'Your word is a lamp to my feet - Psalm 119:105'
                    ],
                    themes: ['Wisdom', 'Worship', 'Guidance', 'Trust', 'Praise']
                },
                3: { // FAITH AND SPIRITUAL GROWTH
                    books: ['Hebrews', 'James', '1 Peter', '2 Peter', '1 John', 'Romans'],
                    faithVerses: [
                        'Now faith is confidence in what we hope for - Hebrews 11:1',
                        'Faith comes by hearing, hearing by the word of God - Romans 10:17',
                        'Without faith it is impossible to please God - Hebrews 11:6',
                        'We walk by faith, not by sight - 2 Corinthians 5:7',
                        'Fight the good fight of faith - 1 Timothy 6:12'
                    ],
                    growthPrinciples: [
                        { principle: 'Prayer', reference: '1 Thessalonians 5:17', description: 'Pray continually' },
                        { principle: 'Scripture Study', reference: '2 Timothy 3:16', description: 'All Scripture is God-breathed' },
                        { principle: 'Fellowship', reference: 'Hebrews 10:25', description: 'Do not give up meeting together' },
                        { principle: 'Service', reference: 'Galatians 5:13', description: 'Serve one another humbly in love' },
                        { principle: 'Evangelism', reference: 'Matthew 28:19', description: 'Make disciples of all nations' }
                    ],
                    themes: ['Faith', 'Growth', 'Maturity', 'Discipleship', 'Transformation']
                },
                4: { // FAITH AND KINGDOM AFFAIRS
                    books: ['Matthew', 'Mark', 'Luke', '1 Corinthians', 'Ephesians'],
                    kingdomParables: [
                        { name: 'Parable of the Sower', reference: 'Matthew 13:3', lesson: 'Different hearts receive God\'s word differently' },
                        { name: 'Parable of the Mustard Seed', reference: 'Matthew 13:31', lesson: 'Kingdom starts small but grows mighty' },
                        { name: 'Parable of the Pearl', reference: 'Matthew 13:46', lesson: 'Kingdom is worth everything we have' },
                        { name: 'Parable of the Talents', reference: 'Matthew 25:14', lesson: 'Use what God gives you faithfully' },
                        { name: 'Parable of the Good Samaritan', reference: 'Luke 10:30', lesson: 'Love your neighbor as yourself' }
                    ],
                    kingdomPrinciples: ['Love', 'Service', 'Sacrifice', 'Mercy', 'Justice', 'Humility'],
                    themes: ['Kingdom', 'Parables', 'Ministry', 'Leadership', 'Service']
                },
                5: { // NEW TESTAMENT LETTERS TO CHURCHES
                    books: ['Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians'],
                    churchLetters: [
                        { church: 'Rome', theme: 'Righteousness by Faith', key: 'Romans 1:17' },
                        { church: 'Corinth', theme: 'Love and Unity', key: '1 Corinthians 13:13' },
                        { church: 'Galatia', theme: 'Freedom in Christ', key: 'Galatians 5:1' },
                        { church: 'Ephesus', theme: 'Spiritual Warfare', key: 'Ephesians 6:12' },
                        { church: 'Philippi', theme: 'Joy in Christ', key: 'Philippians 4:4' },
                        { church: 'Colossae', theme: 'Christ Supreme', key: 'Colossians 1:18' },
                        { church: 'Thessalonica', theme: 'Second Coming', key: '1 Thessalonians 4:16' }
                    ],
                    modernChurch: ['Unity', 'Mission', 'Discipleship', 'Worship', 'Fellowship', 'Outreach'],
                    themes: ['Church', 'Letters', 'Community', 'Mission', 'Doctrine']
                },
                6: { // HEALTH, WHOLENESS, VITALITY
                    books: ['3 John', 'Psalms', '1 Corinthians', 'Isaiah'],
                    healthVerses: [
                        'Dear friend, I pray that you may enjoy good health - 3 John 1:2',
                        'He heals the brokenhearted and binds up their wounds - Psalm 147:3',
                        'Your body is a temple of the Holy Spirit - 1 Corinthians 6:19',
                        'He gives strength to the weary and increases the power of the weak - Isaiah 40:29',
                        'By his wounds we are healed - Isaiah 53:5'
                    ],
                    healingStories: [
                        { name: 'Woman with bleeding', reference: 'Mark 5:28', healing: 'Faith made her well' },
                        { name: 'Blind Bartimaeus', reference: 'Mark 10:52', healing: 'Received sight through faith' },
                        { name: 'Paralyzed man', reference: 'Mark 2:11', healing: 'Sins forgiven, body healed' },
                        { name: 'Ten lepers', reference: 'Luke 17:14', healing: 'One returned to thank Jesus' }
                    ],
                    wellness: ['Physical', 'Mental', 'Spiritual', 'Emotional', 'Social', 'Purpose'],
                    themes: ['Health', 'Healing', 'Wholeness', 'Restoration', 'Vitality']
                },
                7: { // BOOK OF REVELATION
                    books: ['Revelation'],
                    sevenChurches: [
                        { name: 'Ephesus', message: 'Return to first love', reference: 'Revelation 2:4' },
                        { name: 'Smyrna', message: 'Be faithful unto death', reference: 'Revelation 2:10' },
                        { name: 'Pergamum', message: 'Hold fast to truth', reference: 'Revelation 2:13' },
                        { name: 'Thyatira', message: 'Overcome false teaching', reference: 'Revelation 2:20' },
                        { name: 'Sardis', message: 'Wake up and strengthen', reference: 'Revelation 3:2' },
                        { name: 'Philadelphia', message: 'Hold on to what you have', reference: 'Revelation 3:11' },
                        { name: 'Laodicea', message: 'Be hot or cold, not lukewarm', reference: 'Revelation 3:16' }
                    ],
                    revelationSymbols: [
                        { symbol: 'Lamb', meaning: 'Jesus Christ', reference: 'Revelation 5:6' },
                        { symbol: 'Seven Seals', meaning: 'God\'s judgment plan', reference: 'Revelation 6:1' },
                        { symbol: 'New Jerusalem', meaning: 'Heaven', reference: 'Revelation 21:2' },
                        { symbol: 'Tree of Life', meaning: 'Eternal life', reference: 'Revelation 22:2' }
                    ],
                    prophecy: ['End Times', 'Second Coming', 'Final Judgment', 'New Heaven', 'New Earth'],
                    themes: ['Prophecy', 'End Times', 'Victory', 'Judgment', 'Glory']
                }
            };

            // SEAL-SPECIFIC CONTENT POOLS for Dynamic Generation
            window.SealContent = {};

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
            },
            regeneratePuzzles: () => {
                console.log('🔄 Regenerating puzzles with fresh Bible content');
                // Force fresh content on next generation
                this.lastGenerationTime = 0;
                return true;
            },
            currentPuzzles: {},
            gameSessionId: Date.now()
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
                return this.generateSeal1_OldTestamentEvents(timestamp, randomSeed);
            case 2:
                return this.generateSeal2_FillInVerses(timestamp, randomSeed);
            case 3:
                return this.generateSeal3_FaithDragDrop(timestamp, randomSeed);
            case 4:
                return this.generateSeal4_KingdomScenarios(timestamp, randomSeed);
            case 5:
                return this.generateSeal5_ChurchLetters(timestamp, randomSeed);
            case 6:
                return this.generateSeal6_HealthWholeness(timestamp, randomSeed);
            case 7:
                return this.generateSeal7_RevelationSymbols(timestamp, randomSeed);
            default:
                return '<p>Seal not available</p>';
        }
    }

    // SEAL 1: OLD TESTAMENT EVENTS - Multiple Choice Game
    generateSeal1_OldTestamentEvents(timestamp, seed) {
        const sealTheme = window.SealThemes[1];
        if (!sealTheme) {
            return '<p style="color: red;">Old Testament content not loaded</p>';
        }

        const keywords = ['FOUNDATION', 'COVENANT', 'CREATION', 'DELIVERANCE', 'PROMISE'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        // Select 5 random Old Testament events for multiple choice questions
        const selectedEvents = this.getRandomItems(sealTheme.events, 5, seed);

        let questionsHtml = `
            <div class="bible-knowledge-challenge">
                <div class="challenge-header">
                    <h3>📜 OLD TESTAMENT FOUNDATIONS</h3>
                    <p><strong>MULTIPLE CHOICE GAME:</strong> Test your knowledge of foundational Old Testament events!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="questions-container">
        `;

        selectedEvents.forEach((event, index) => {
            const questionTypes = [
                {
                    question: `What happened in the event: "${event.name}"?`,
                    answer: event.description,
                    hint: `This event is found in ${event.reference}`,
                    options: this.generateEventDescriptionOptions(event.description)
                },
                {
                    question: `Where in the Bible do we read about "${event.name}"?`,
                    answer: event.reference.split(' ')[0], // Get just the book name
                    hint: `This is an Old Testament book`,
                    options: this.generateOldTestamentBookOptions(event.reference.split(' ')[0])
                },
                {
                    question: `What is the main lesson from "${event.name}"?`,
                    answer: this.getEventLesson(event),
                    hint: `Think about what this event teaches us about God`,
                    options: ['God\'s Power', 'God\'s Love', 'God\'s Justice', 'God\'s Faithfulness']
                },
                {
                    question: `In which order did this happen: "${event.name}"?`,
                    answer: this.getEventOrder(event, sealTheme.events),
                    hint: `This happened ${this.getEventOrder(event, sealTheme.events) <= 10 ? 'early' : 'later'} in biblical history`,
                    options: ['Very Early', 'Early', 'Middle', 'Later']
                }
            ];

            const questionType = questionTypes[Math.floor((seed + index) * questionTypes.length) % questionTypes.length];

            questionsHtml += `
                <div class="multiple-choice-question" data-question="${index + 1}">
                    <div class="question-header">
                        <h4>Question ${index + 1}/5</h4>
                        <div class="question-text">${questionType.question}</div>
                        ${questionType.hint ? `<div class="question-hint">💡 ${questionType.hint}</div>` : ''}
                    </div>
                    <div class="options-container">
                        ${questionType.options.map((option, optionIndex) => `
                            <button class="option-button" data-answer="${option}" onclick="selectMultipleChoiceAnswer(${index + 1}, '${option}', '${questionType.answer}')">
                                ${String.fromCharCode(65 + optionIndex)}. ${option}
                            </button>
                        `).join('')}
                    </div>
                    <div class="answer-feedback" id="feedback-${index + 1}" style="display: none;"></div>
                </div>
            `;
        });

        questionsHtml += `
                </div>
                <div class="completion-tracker">
                    <div class="progress-text">Progress: <span id="mcq-progress">0/5</span></div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" id="mcq-progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <button class="submit-challenge" onclick="completeSeal1MultipleChoice()" disabled>
                    🏆 Complete Old Testament Challenge
                </button>
            </div>
        `;

        return questionsHtml;
    }

    // SEAL 2: BIBLE STORIES/PSALMS/PROVERBS - Fill-in-the-Verse Game
    generateSeal2_FillInVerses(timestamp, seed) {
        const sealTheme = window.SealThemes[2];
        if (!sealTheme) {
            return '<p style="color: red;">Wisdom content not loaded</p>';
        }

        const keywords = ['WISDOM', 'GUIDANCE', 'WORSHIP', 'TRUST', 'PRAISE'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        // Select 5 wisdom verses for fill-in-the-blank
        const selectedVerses = this.getRandomItems(sealTheme.wisdomVerses, 5, seed);

        let fillInHtml = `
            <div class="fill-in-verse-challenge">
                <div class="challenge-header">
                    <h3>📖 WISDOM VERSES COMPLETION</h3>
                    <p><strong>FILL-IN-THE-BLANK:</strong> Complete these beloved Bible verses!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="verses-container">
        `;

        selectedVerses.forEach((verse, index) => {
            const [text, reference] = verse.split(' - ');
            const blankedVerse = this.createFillInBlank(text);
            const missingWords = this.extractMissingWords(text, blankedVerse.blankedText);

            fillInHtml += `
                <div class="fill-in-verse" data-verse="${index + 1}">
                    <div class="verse-header">
                        <h4>Verse ${index + 1}/5</h4>
                        <div class="verse-reference">${reference}</div>
                    </div>
                    <div class="verse-text-container">
                        <div class="verse-text">${blankedVerse.blankedText}</div>
                        <div class="word-options">
                            ${this.shuffleArray([...missingWords, ...this.generateDistractorWords(missingWords)]).map(word => `
                                <button class="word-option" onclick="fillInWord(${index + 1}, '${word}')">${word}</button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="verse-feedback" id="verse-feedback-${index + 1}" style="display: none;"></div>
                </div>
            `;
        });

        fillInHtml += `
                </div>
                <div class="completion-tracker">
                    <div class="progress-text">Progress: <span id="verse-progress">0/5</span></div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" id="verse-progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <button class="submit-challenge" onclick="completeSeal2FillInVerse()" disabled>
                    🏆 Complete Wisdom Challenge
                </button>
            </div>
        `;

        return fillInHtml;
    }

    // SEAL 3: FAITH AND SPIRITUAL GROWTH - Drag-and-Drop Principles Game
    generateSeal3_FaithDragDrop(timestamp, seed) {
        const sealTheme = window.SealThemes[3];
        if (!sealTheme) {
            return '<p style="color: red;">Faith content not loaded</p>';
        }

        const keywords = ['GROWTH', 'MATURITY', 'DISCIPLESHIP', 'TRANSFORMATION', 'FAITH'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const principles = this.getRandomItems(sealTheme.growthPrinciples, 5, seed);
        const verses = this.getRandomItems(sealTheme.faithVerses, 5, seed);

        let dragDropHtml = `
            <div class="drag-drop-faith-challenge">
                <div class="challenge-header">
                    <h3>✝️ SPIRITUAL GROWTH PRINCIPLES</h3>
                    <p><strong>DRAG & DROP:</strong> Match spiritual disciplines with their biblical foundations!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="drag-drop-container">
                    <div class="principles-section">
                        <h4 class="section-title">🌱 Spiritual Disciplines</h4>
                        <div class="drag-items-pool">
                            ${principles.map(principle => `
                                <div class="drag-item" draggable="true" data-type="principle" data-value="${principle.principle}">
                                    ${principle.principle}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="matching-section">
                        <h4 class="section-title">📖 Biblical Foundations</h4>
                        <div class="drop-zones-container">
                            ${verses.map((verse, index) => `
                                <div class="drop-zone-pair">
                                    <div class="verse-display">${verse}</div>
                                    <div class="drop-zone" data-accepts="principle" data-verse="${index}" ondrop="dropFaithPrinciple(event)" ondragover="allowDrop(event)">
                                        Drop matching discipline here
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="completion-tracker">
                    <div class="progress-text">Progress: <span id="faith-progress">0/5</span></div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" id="faith-progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <button class="submit-challenge" onclick="completeSeal3FaithDragDrop()" disabled>
                    🏆 Complete Faith Challenge
                </button>
            </div>
        `;

        return dragDropHtml;
    }

    // SEAL 4: KINGDOM AFFAIRS - Scenario-Based Decision Games
    generateSeal4_KingdomScenarios(timestamp, seed) {
        const sealTheme = window.SealThemes[4];
        if (!sealTheme) {
            return '<p style="color: red;">Kingdom content not loaded</p>';
        }

        const keywords = ['SERVICE', 'MINISTRY', 'LEADERSHIP', 'KINGDOM', 'PARABLES'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const scenarios = this.generateKingdomScenarios(sealTheme.kingdomParables, seed);

        let scenarioHtml = `
            <div class="kingdom-scenario-challenge">
                <div class="challenge-header">
                    <h3>👑 KINGDOM DECISION MAKING</h3>
                    <p><strong>SCENARIO CHOICES:</strong> Apply Jesus' parables to real-life situations!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="scenarios-container">
        `;

        scenarios.forEach((scenario, index) => {
            scenarioHtml += `
                <div class="kingdom-scenario" data-scenario="${index + 1}">
                    <div class="scenario-header">
                        <h4>Situation ${index + 1}/5</h4>
                        <div class="related-parable">📖 Based on: ${scenario.parable.name}</div>
                    </div>
                    <div class="scenario-situation">
                        <p>${scenario.situation}</p>
                    </div>
                    <div class="scenario-choices">
                        ${scenario.choices.map((choice, choiceIndex) => `
                            <button class="choice-button" onclick="selectKingdomChoice(${index + 1}, ${choiceIndex}, ${scenario.correctChoice})" data-choice="${choiceIndex}">
                                ${choice}
                            </button>
                        `).join('')}
                    </div>
                    <div class="scenario-feedback" id="scenario-feedback-${index + 1}" style="display: none;"></div>
                </div>
            `;
        });

        scenarioHtml += `
                </div>
                <div class="completion-tracker">
                    <div class="progress-text">Progress: <span id="scenario-progress">0/5</span></div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" id="scenario-progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <button class="submit-challenge" onclick="completeSeal4KingdomScenarios()" disabled>
                    🏆 Complete Kingdom Challenge
                </button>
            </div>
        `;

        return scenarioHtml;
    }

    // SEAL 5: NEW TESTAMENT CHURCH LETTERS - Church Matching Game
    generateSeal5_ChurchLetters(timestamp, seed) {
        const sealTheme = window.SealThemes[5];
        if (!sealTheme) {
            return '<p style="color: red;">Church letters content not loaded</p>';
        }

        const keywords = ['CHURCH', 'COMMUNITY', 'DOCTRINE', 'MISSION', 'LETTERS'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const churchProblems = this.generateChurchProblems(seed);
        const solutions = this.getRandomItems(sealTheme.churchLetters, 5, seed);

        let churchMatchHtml = `
            <div class="church-matching-challenge">
                <div class="challenge-header">
                    <h3>✉️ CHURCH LETTERS WISDOM</h3>
                    <p><strong>PROBLEM SOLVING:</strong> Match church challenges with Paul's solutions!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="church-matching-container">
                    <div class="problems-section">
                        <h4 class="section-title">⚠️ Church Challenges</h4>
                        <div class="problems-list">
                            ${churchProblems.map((problem, index) => `
                                <div class="church-problem" data-problem="${index}">
                                    <div class="problem-title">${problem.title}</div>
                                    <div class="problem-description">${problem.description}</div>
                                    <div class="problem-drop-zone" data-problem="${index}" ondrop="dropChurchSolution(event)" ondragover="allowDrop(event)">
                                        Drop solution here
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="solutions-section">
                        <h4 class="section-title">💡 Paul's Solutions</h4>
                        <div class="solutions-pool">
                            ${solutions.map(solution => `
                                <div class="drag-item church-solution" draggable="true" data-type="solution" data-church="${solution.church}" data-theme="${solution.theme}">
                                    <div class="solution-church">${solution.church}</div>
                                    <div class="solution-theme">${solution.theme}</div>
                                    <div class="solution-reference">${solution.key}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="completion-tracker">
                    <div class="progress-text">Progress: <span id="church-progress">0/5</span></div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" id="church-progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <button class="submit-challenge" onclick="completeSeal5ChurchMatching()" disabled>
                    🏆 Complete Church Challenge
                </button>
            </div>
        `;

        return churchMatchHtml;
    }

    // SEAL 6: HEALTH/WHOLENESS/VITALITY - Wellness Scripture Game
    generateSeal6_HealthWholeness(timestamp, seed) {
        const sealTheme = window.SealThemes[6];
        if (!sealTheme) {
            return '<p style="color: red;">Health content not loaded</p>';
        }

        const keywords = ['HEALING', 'WHOLENESS', 'RESTORATION', 'VITALITY', 'HEALTH'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const wellnessJourney = this.createWellnessJourney(sealTheme, seed);

        let wellnessHtml = `
            <div class="wellness-journey-challenge">
                <div class="challenge-header">
                    <h3>🌿 BIBLICAL WELLNESS JOURNEY</h3>
                    <p><strong>HEALING PATHWAY:</strong> Connect wellness principles with God's healing promises!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="wellness-journey-container">
                    <div class="journey-steps">
                        ${wellnessJourney.steps.map((step, index) => `
                            <div class="wellness-step" data-step="${index + 1}">
                                <div class="step-number">${index + 1}</div>
                                <div class="step-content">
                                    <h4 class="step-title">${step.aspect}</h4>
                                    <div class="step-description">${step.description}</div>
                                    <div class="verse-matching">
                                        <div class="available-verses">
                                            ${step.verseOptions.map(verse => `
                                                <button class="verse-option" onclick="selectWellnessVerse(${index + 1}, '${verse}', '${step.correctVerse}')">${verse}</button>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                                <div class="step-feedback" id="wellness-feedback-${index + 1}" style="display: none;"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="completion-tracker">
                    <div class="progress-text">Progress: <span id="wellness-progress">0/6</span></div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" id="wellness-progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <button class="submit-challenge" onclick="completeSeal6WellnessJourney()" disabled>
                    🏆 Complete Wellness Challenge
                </button>
            </div>
        `;

        return wellnessHtml;
    }

    // SEAL 7: BOOK OF REVELATION - Prophecy Symbol Decoder Game
    generateSeal7_RevelationSymbols(timestamp, seed) {
        const sealTheme = window.SealThemes[7];
        if (!sealTheme) {
            return '<p style="color: red;">Revelation content not loaded</p>';
        }

        const keywords = ['PROPHECY', 'REVELATION', 'VICTORY', 'GLORY', 'SYMBOLS'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const symbolDecoding = this.createRevelationDecoding(sealTheme, seed);

        let revelationHtml = `
            <div class="revelation-decoding-challenge">
                <div class="challenge-header">
                    <h3>🔮 REVELATION SYMBOL DECODER</h3>
                    <p><strong>PROPHECY PUZZLE:</strong> Unlock the meaning behind Revelation's mysterious symbols!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="symbol-decoding-container">
                    <div class="symbol-categories">
                        ${symbolDecoding.categories.map((category, index) => `
                            <div class="symbol-category" data-category="${index + 1}">
                                <h4 class="category-title">${category.title}</h4>
                                <div class="symbols-grid">
                                    ${category.symbols.map(symbol => `
                                        <div class="symbol-card" onclick="decodeSymbol('${symbol.symbol}', '${symbol.meaning}', ${index + 1})">
                                            <div class="symbol-image">${symbol.visual}</div>
                                            <div class="symbol-text">${symbol.symbol}</div>
                                            <div class="symbol-reference">${symbol.reference}</div>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="meaning-pool">
                                    ${this.shuffleArray([...category.meanings, ...category.distractors]).map(meaning => `
                                        <button class="meaning-option" data-meaning="${meaning}">${meaning}</button>
                                    `).join('')}
                                </div>
                                <div class="category-feedback" id="revelation-feedback-${index + 1}" style="display: none;"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="completion-tracker">
                    <div class="progress-text">Progress: <span id="revelation-progress">0/7</span></div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" id="revelation-progress-bar" style="width: 0%;"></div>
                    </div>
                </div>
                <button class="submit-challenge" onclick="completeSeal7RevelationDecoding()" disabled>
                    🏆 Complete Final Seal
                </button>
            </div>
        `;

        return revelationHtml;
    }

    // Helper Methods for Game Generation
    getRandomItems(array, count, seed) {
        if (!array || array.length === 0) return [];
        const shuffled = [...array];
        // Use seed for consistent randomization
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor((seed + i) * shuffled.length) % shuffled.length;
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    generateEventDescriptionOptions(correctDescription) {
        const distractors = [
            'God shows His power through miracles',
            'People learn to trust in God\'s plan',
            'A covenant is made between God and humanity',
            'Divine judgment comes upon the wicked'
        ];
        return this.shuffleArray([correctDescription, ...distractors]).slice(0, 4);
    }

    generateOldTestamentBookOptions(correctBook) {
        const otBooks = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings'];
        const distractors = otBooks.filter(book => book !== correctBook).slice(0, 3);
        return this.shuffleArray([correctBook, ...distractors]);
    }

    getEventLesson(event) {
        const lessons = {
            'Creation': 'God\'s Power',
            'Flood': 'God\'s Justice',
            'Abraham': 'God\'s Faithfulness',
            'Moses': 'God\'s Deliverance'
        };
        return lessons[event.name.split(' ')[0]] || 'God\'s Love';
    }

    getEventOrder(event, allEvents) {
        const index = allEvents.findIndex(e => e.name === event.name);
        if (index < 5) return 'Very Early';
        if (index < 10) return 'Early';
        if (index < 15) return 'Middle';
        return 'Later';
    }

    createFillInBlank(text) {
        const words = text.split(' ');
        const importantWords = words.filter(word =>
            word.length > 4 &&
            !['with', 'that', 'will', 'your', 'they', 'have', 'from', 'this', 'unto', 'into'].includes(word.toLowerCase())
        );

        const wordsToBlank = importantWords.slice(0, 2);
        let blankedText = text;

        wordsToBlank.forEach(word => {
            blankedText = blankedText.replace(word, '_____');
        });

        return { blankedText, missingWords: wordsToBlank };
    }

    extractMissingWords(originalText, blankedText) {
        const originalWords = originalText.split(' ');
        const blankedWords = blankedText.split(' ');
        const missing = [];

        for (let i = 0; i < originalWords.length; i++) {
            if (blankedWords[i] && blankedWords[i].includes('_____')) {
                missing.push(originalWords[i]);
            }
        }

        return missing;
    }

    generateDistractorWords(correctWords) {
        const distractors = ['peace', 'love', 'joy', 'hope', 'faith', 'grace', 'mercy', 'truth', 'light', 'wisdom'];
        return distractors.filter(word => !correctWords.includes(word)).slice(0, correctWords.length);
    }

    generateKingdomScenarios(parables, seed) {
        const scenarios = [
            {
                parable: parables[0],
                situation: 'A friend asks you to invest in a questionable business opportunity that promises huge returns.',
                choices: [
                    'Invest immediately to maximize profit',
                    'Research carefully and seek wise counsel',
                    'Ignore the opportunity completely',
                    'Invest a small amount as a test'
                ],
                correctChoice: 1,
                explanation: 'Like the wise servant, we should be careful stewards of what God has given us.'
            },
            {
                parable: parables[1] || parables[0],
                situation: 'You see a homeless person on the street while rushing to an important meeting.',
                choices: [
                    'Walk quickly past to avoid being late',
                    'Stop to help despite the inconvenience',
                    'Give money without stopping',
                    'Promise to help them later'
                ],
                correctChoice: 1,
                explanation: 'The Good Samaritan teaches us to show mercy even when inconvenient.'
            },
            {
                parable: parables[2] || parables[0],
                situation: 'Your church asks for volunteers for a ministry that will require significant time commitment.',
                choices: [
                    'Volunteer only if others also commit',
                    'Make excuses about being too busy',
                    'Commit wholeheartedly to serving',
                    'Offer to help occasionally when convenient'
                ],
                correctChoice: 2,
                explanation: 'Kingdom service requires wholehearted commitment like the pearl of great price.'
            },
            {
                parable: parables[3] || parables[0],
                situation: 'A coworker consistently takes credit for your ideas and work.',
                choices: [
                    'Confront them angrily in front of others',
                    'Speak to them privately with grace and truth',
                    'Report them to management immediately',
                    'Stop contributing ideas to avoid conflict'
                ],
                correctChoice: 1,
                explanation: 'Jesus taught us to address conflicts with grace and wisdom.'
            },
            {
                parable: parables[4] || parables[1],
                situation: 'You have the opportunity to share your faith with a neighbor who seems interested.',
                choices: [
                    'Wait for them to ask more directly',
                    'Share boldly but with gentleness and respect',
                    'Give them a tract without discussing it',
                    'Invite them to church without explanation'
                ],
                correctChoice: 1,
                explanation: 'We should share the gospel like seed scattered on different soil types.'
            }
        ];

        return this.getRandomItems(scenarios, 5, seed);
    }

    generateChurchProblems(seed) {
        const problems = [
            {
                title: 'Divisive Leadership',
                description: 'Church members are choosing sides between different leaders, causing division in the congregation.',
                solution: 'Focus on unity in Christ and humble leadership'
            },
            {
                title: 'False Teaching',
                description: 'Some members are promoting teachings that contradict core Christian doctrine.',
                solution: 'Stand firm in sound doctrine and correct with love'
            },
            {
                title: 'Lack of Love',
                description: 'The church has become focused on rules and traditions but lacks genuine love for one another.',
                solution: 'Return to the primacy of love as the greatest commandment'
            },
            {
                title: 'Complacency',
                description: 'Members have become comfortable and are no longer passionate about their faith or mission.',
                solution: 'Rekindle spiritual fervor and commitment'
            },
            {
                title: 'Persecution Fear',
                description: 'External pressure is causing some members to compromise their faith or hide their beliefs.',
                solution: 'Remain faithful despite suffering, trusting in God\'s ultimate victory'
            }
        ];

        return this.getRandomItems(problems, 5, seed);
    }

    createWellnessJourney(sealTheme, seed) {
        const wellnessAspects = [
            {
                aspect: 'Physical Health',
                description: 'Caring for your body as God\'s temple',
                correctVerse: 'Your body is a temple of the Holy Spirit - 1 Corinthians 6:19',
                verseOptions: [
                    'Your body is a temple of the Holy Spirit - 1 Corinthians 6:19',
                    'He heals the brokenhearted - Psalm 147:3',
                    'By his wounds we are healed - Isaiah 53:5'
                ]
            },
            {
                aspect: 'Mental Health',
                description: 'Finding peace and clarity through God\'s truth',
                correctVerse: 'The peace of God surpasses understanding - Philippians 4:7',
                verseOptions: [
                    'The peace of God surpasses understanding - Philippians 4:7',
                    'Cast your anxiety on him - 1 Peter 5:7',
                    'Be anxious for nothing - Philippians 4:6'
                ]
            },
            {
                aspect: 'Spiritual Health',
                description: 'Growing in relationship with God through prayer and scripture',
                correctVerse: 'Draw near to God and he will draw near to you - James 4:8',
                verseOptions: [
                    'Draw near to God and he will draw near to you - James 4:8',
                    'Pray without ceasing - 1 Thessalonians 5:17',
                    'Your word is a lamp to my feet - Psalm 119:105'
                ]
            },
            {
                aspect: 'Emotional Health',
                description: 'Processing feelings and finding healing through God\'s love',
                correctVerse: 'He heals the brokenhearted - Psalm 147:3',
                verseOptions: [
                    'He heals the brokenhearted - Psalm 147:3',
                    'Weeping may endure for a night - Psalm 30:5',
                    'God is our refuge and strength - Psalm 46:1'
                ]
            },
            {
                aspect: 'Social Health',
                description: 'Building healthy relationships and community',
                correctVerse: 'Bear one another\'s burdens - Galatians 6:2',
                verseOptions: [
                    'Bear one another\'s burdens - Galatians 6:2',
                    'Iron sharpens iron - Proverbs 27:17',
                    'Love your neighbor as yourself - Matthew 22:39'
                ]
            },
            {
                aspect: 'Purpose Health',
                description: 'Understanding your calling and living with meaning',
                correctVerse: 'For I know the plans I have for you - Jeremiah 29:11',
                verseOptions: [
                    'For I know the plans I have for you - Jeremiah 29:11',
                    'We are his workmanship - Ephesians 2:10',
                    'Walk worthy of your calling - Ephesians 4:1'
                ]
            }
        ];

        return {
            steps: this.getRandomItems(wellnessAspects, 6, seed)
        };
    }

    createRevelationDecoding(sealTheme, seed) {
        const categories = [
            {
                title: 'Divine Symbols',
                symbols: [
                    { symbol: 'Lamb', visual: '🐑', meaning: 'Jesus Christ', reference: 'Revelation 5:6' },
                    { symbol: 'Lion', visual: '🦁', meaning: 'Jesus as King', reference: 'Revelation 5:5' }
                ],
                meanings: ['Jesus Christ', 'Jesus as King'],
                distractors: ['Holy Spirit', 'Church', 'Angels']
            },
            {
                title: 'Judgment Symbols',
                symbols: [
                    { symbol: 'Seven Seals', visual: '🔒', meaning: 'God\'s judgment plan', reference: 'Revelation 6:1' },
                    { symbol: 'Four Horsemen', visual: '🐎', meaning: 'End time judgments', reference: 'Revelation 6:2' }
                ],
                meanings: ['God\'s judgment plan', 'End time judgments'],
                distractors: ['Peace treaty', 'Harvest time', 'Prayer time']
            },
            {
                title: 'Eternal Symbols',
                symbols: [
                    { symbol: 'New Jerusalem', visual: '🏛️', meaning: 'Heaven', reference: 'Revelation 21:2' },
                    { symbol: 'Tree of Life', visual: '🌳', meaning: 'Eternal life', reference: 'Revelation 22:2' }
                ],
                meanings: ['Heaven', 'Eternal life'],
                distractors: ['Earth', 'Temporary blessing', 'Human wisdom']
            }
        ];

        return { categories: this.getRandomItems(categories, 3, seed) };
    }

    // Generate intelligent Logical Reasoning (Seal 2)
    generateIntelligentLogical(timestamp, seed) {
        const keywords = ['WISDOM', 'UNDERSTANDING', 'DISCERNMENT', 'INSIGHT', 'KNOWLEDGE'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const logicalChallenges = [
            {
                type: 'sequence',
                question: 'Complete the biblical pattern: Creation → Fall → Flood → ___',
                options: ['Babel', 'Abraham', 'Moses', 'David'],
                answer: 'Babel',
                explanation: 'The Tower of Babel follows the flood in biblical chronology'
            },
            {
                type: 'deduction',
                question: 'If all apostles were disciples, but not all disciples were apostles, and Peter was chosen as an apostle, what can we conclude?',
                options: ['Peter was definitely a disciple', 'Peter was not a disciple', 'Peter was neither', 'Cannot determine'],
                answer: 'Peter was definitely a disciple',
                explanation: 'All apostles were first disciples of Jesus'
            },
            {
                type: 'pattern',
                question: 'What connects these biblical leaders: Moses (Delivered from Egypt), Joshua (Entered Promised Land), David (United Kingdom), Jesus (___)?',
                options: ['Founded Church', 'Eternal Salvation', 'Built Temple', 'Wrote Scripture'],
                answer: 'Eternal Salvation',
                explanation: 'Jesus provided eternal salvation for all mankind'
            }
        ];

        const selectedChallenges = this.getRandomItems(logicalChallenges, 3, seed);

        let html = `
            <div class="logical-reasoning-challenge">
                <div class="challenge-header">
                    <h3>🧠 COVENANT LOGIC PUZZLE</h3>
                    <p>Solve biblical logic puzzles using Scripture-based reasoning!</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="puzzles-container">
        `;

        selectedChallenges.forEach((challenge, index) => {
            const optionsHtml = challenge.options.map(option =>
                `<label class="option-label">
                    <input type="radio" name="logical${index + 1}" value="${option}" />
                    <span class="option-text">${option}</span>
                </label>`
            ).join('');

            html += `
                <div class="logical-puzzle" data-question="${index + 1}">
                    <div class="puzzle-type">${challenge.type.toUpperCase()}</div>
                    <div class="puzzle-question">${challenge.question}</div>
                    <div class="options-container" data-correct="${challenge.answer}">
                        ${optionsHtml}
                    </div>
                    <div class="explanation" style="display: none;">${challenge.explanation}</div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="challenge-actions">
                    <button onclick="checkIntelligentLogical('${keyword}')" class="btn-primary large">
                        ✓ Check Logic
                    </button>
                    <button onclick="resetChallenge('logicalReasoning')" class="btn-secondary">
                        ↺ New Puzzles
                    </button>
                </div>
                <div id="logicalResult" class="result-comprehensive"></div>
            </div>
        `;

        return html;
    }

    // Generate intelligent Team Communication (Seal 3)
    generateIntelligentTeamwork(timestamp, seed) {
        const keywords = ['UNITY', 'FELLOWSHIP', 'COOPERATION', 'HARMONY', 'BROTHERHOOD'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const teamChallenges = [
            {
                title: 'Trinity Formation',
                description: 'Complete the Trinity aspects',
                parts: [
                    { role: 'Father', attribute: 'Creator', hint: 'Who made all things?' },
                    { role: 'Son', attribute: 'Redeemer', hint: 'Who died for our sins?' },
                    { role: 'Holy Spirit', attribute: 'Comforter', hint: 'Who guides us today?' }
                ]
            },
            {
                title: 'Apostle Network',
                description: 'Match apostles with their roles',
                parts: [
                    { role: 'Rock of Church', attribute: 'Peter', hint: 'Who walked on water?' },
                    { role: 'Beloved Disciple', attribute: 'John', hint: 'Who wrote about love?' },
                    { role: 'Apostle to Gentiles', attribute: 'Paul', hint: 'Who was converted on Damascus road?' }
                ]
            }
        ];

        const selectedChallenge = teamChallenges[Math.floor(seed * teamChallenges.length)];

        let html = `
            <div class="team-communication-challenge">
                <div class="challenge-header">
                    <h3>🤝 UNITY COMMUNICATION MATRIX</h3>
                    <p>${selectedChallenge.description}</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="team-parts">
        `;

        selectedChallenge.parts.forEach((part, index) => {
            html += `
                <div class="team-part" data-part="${index + 1}">
                    <div class="part-role">${part.role}:</div>
                    <div class="part-hint">💡 ${part.hint}</div>
                    <input type="text" class="team-input" id="teamAnswer${index + 1}" 
                           placeholder="Enter answer" data-correct="${part.attribute}">
                </div>
            `;
        });

        html += `
                </div>
                <div class="challenge-actions">
                    <button onclick="checkIntelligentTeamwork('${keyword}')" class="btn-primary large">
                        ✓ Check Unity
                    </button>
                    <button onclick="resetChallenge('teamCommunication')" class="btn-secondary">
                        ↺ New Challenge
                    </button>
                </div>
                <div id="teamworkResult" class="result-comprehensive"></div>
            </div>
        `;

        return html;
    }

    // Generate intelligent Code Breaking (Seal 4) - Testament Sorting
    generateIntelligentCodeBreaking(timestamp, seed) {
        const keywords = ['TESTAMENT', 'COVENANT', 'REVELATION', 'MYSTERY', 'CIPHER'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const biblicalEvents = [
            { event: 'Creation of Adam and Eve', testament: 'Old Testament', book: 'Genesis' },
            { event: 'Noah\'s Ark and the Flood', testament: 'Old Testament', book: 'Genesis' },
            { event: 'Moses receives Ten Commandments', testament: 'Old Testament', book: 'Exodus' },
            { event: 'David defeats Goliath', testament: 'Old Testament', book: '1 Samuel' },
            { event: 'Solomon builds the Temple', testament: 'Old Testament', book: '1 Kings' },
            { event: 'Jesus\' birth in Bethlehem', testament: 'New Testament', book: 'Matthew' },
            { event: 'Jesus\' crucifixion and resurrection', testament: 'New Testament', book: 'Matthew' },
            { event: 'Paul\'s conversion on Damascus road', testament: 'New Testament', book: 'Acts' },
            { event: 'Pentecost and the Holy Spirit', testament: 'New Testament', book: 'Acts' },
            { event: 'John\'s vision of Revelation', testament: 'New Testament', book: 'Revelation' }
        ];

        const selectedEvents = this.getRandomItems(biblicalEvents, 6, seed);

        let html = `
            <div class="code-breaking-challenge">
                <div class="challenge-header">
                    <h3>🔐 ANCIENT CIPHER OF SOLOMON</h3>
                    <p>Sort these biblical events into Old Testament (before Jesus) or New Testament (Jesus and after)</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                
                <div class="sorting-area">
                    <div class="drop-zones">
                        <div class="drop-zone old-testament" data-category="Old Testament">
                            <h4>📜 Old Testament</h4>
                            <p>Before Jesus was born</p>
                        </div>
                        <div class="drop-zone new-testament" data-category="New Testament">
                            <h4>✝️ New Testament</h4>
                            <p>Jesus' time and after</p>
                        </div>
                    </div>
                    
                    <div class="draggable-events">
        `;

        selectedEvents.forEach((event, index) => {
            html += `
                <div class="draggable-event" draggable="true" data-event="${event.event}" 
                     data-correct="${event.testament}" data-book="${event.book}">
                    ${event.event}
                    <small>(from ${event.book})</small>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
                
                <div class="challenge-actions">
                    <button onclick="checkIntelligentCodeBreaking('${keyword}')" class="btn-primary large">
                        ✓ Check Sorting
                    </button>
                    <button onclick="resetChallenge('codeBreaking')" class="btn-secondary">
                        ↺ New Events
                    </button>
                </div>
                <div id="codeBreakingResult" class="result-comprehensive"></div>
            </div>
        `;

        return html;
    }

    // Generate intelligent Chronological Order (Seal 5)
    generateIntelligentChronology(timestamp, seed) {
        const keywords = ['TIMELINE', 'HISTORY', 'SEQUENCE', 'ORDER', 'PROGRESSION'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const chronologicalEvents = [
            { name: 'Creation of the World', order: 1, book: 'Genesis 1' },
            { name: 'The Great Flood', order: 2, book: 'Genesis 6-9' },
            { name: 'Abraham\'s Call', order: 3, book: 'Genesis 12' },
            { name: 'Moses and the Exodus', order: 4, book: 'Exodus' },
            { name: 'David becomes King', order: 5, book: '2 Samuel 5' },
            { name: 'Solomon builds Temple', order: 6, book: '1 Kings 6' },
            { name: 'Babylonian Exile', order: 7, book: '2 Kings 25' },
            { name: 'Return from Exile', order: 8, book: 'Ezra 1' },
            { name: 'Jesus\' Birth', order: 9, book: 'Luke 2' },
            { name: 'Jesus\' Crucifixion', order: 10, book: 'Matthew 27' },
            { name: 'Pentecost', order: 11, book: 'Acts 2' },
            { name: 'Paul\'s Missionary Journeys', order: 12, book: 'Acts 13+' }
        ];

        const selectedEvents = this.getRandomItems(chronologicalEvents, 5, seed).sort(() => Math.random() - 0.5);

        let html = `
            <div class="chronological-challenge">
                <div class="challenge-header">
                    <h3>⏰ CHRONOLOGICAL ORDER CHALLENGE</h3>
                    <p>Arrange these biblical events in the correct historical order</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                
                <div class="chronology-container">
                    <div class="timeline-slots">
        `;

        for (let i = 1; i <= selectedEvents.length; i++) {
            html += `
                <div class="timeline-slot" data-order="${i}">
                    <div class="slot-number">${i}</div>
                    <div class="slot-content">Drop event here</div>
                </div>
            `;
        }

        html += `
                    </div>
                    
                    <div class="draggable-events-chrono">
        `;

        selectedEvents.forEach((event, index) => {
            html += `
                <div class="draggable-event-chrono" draggable="true" 
                     data-event="${event.name}" data-order="${event.order}" data-book="${event.book}">
                    <strong>${event.name}</strong>
                    <small>${event.book}</small>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
                
                <div class="challenge-actions">
                    <button onclick="checkIntelligentChronology('${keyword}')" class="btn-primary large">
                        ✓ Check Timeline
                    </button>
                    <button onclick="resetChallenge('chronologicalOrder')" class="btn-secondary">
                        ↺ New Timeline
                    </button>
                </div>
                <div id="chronologyResult" class="result-comprehensive"></div>
            </div>
        `;

        return html;
    }

    // Generate intelligent Scripture Topics (Seal 6)
    generateIntelligentTopics(timestamp, seed) {
        if (!window.BibleVerses || window.BibleVerses.length === 0) {
            return '<p style="color: red;">Bible content not loaded</p>';
        }

        const keywords = ['ORGANIZATION', 'THEMES', 'CATEGORIES', 'TOPICS', 'CLASSIFICATION'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const themes = [
            { name: 'Love', color: '#e74c3c' },
            { name: 'Faith', color: '#3498db' },
            { name: 'Hope', color: '#f39c12' },
            { name: 'Salvation', color: '#27ae60' },
            { name: 'Peace', color: '#9b59b6' },
            { name: 'Wisdom', color: '#34495e' }
        ];

        const selectedVerses = this.getRandomVerses(6, seed);

        let html = `
            <div class="scripture-topics-challenge">
                <div class="challenge-header">
                    <h3>📋 SCRIPTURE TOPIC NETWORK</h3>
                    <p>Categorize these Bible verses by their main theme</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                
                <div class="topic-sorting">
                    <div class="theme-categories">
        `;

        themes.forEach(theme => {
            html += `
                <div class="theme-category" data-theme="${theme.name.toLowerCase()}" 
                     style="border-color: ${theme.color};">
                    <h4 style="color: ${theme.color};">${theme.name}</h4>
                    <div class="category-verses"></div>
                </div>
            `;
        });

        html += `
                    </div>
                    
                    <div class="draggable-verses">
        `;

        selectedVerses.forEach((verse, index) => {
            const theme = this.getVerseTheme(verse.text);
            html += `
                <div class="draggable-verse" draggable="true" 
                     data-verse="${verse.text}" data-theme="${theme}" data-reference="${verse.reference}">
                    <div class="verse-text">"${verse.text.substring(0, 80)}..."</div>
                    <div class="verse-ref">${verse.reference}</div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
                
                <div class="challenge-actions">
                    <button onclick="checkIntelligentTopics('${keyword}')" class="btn-primary large">
                        ✓ Check Categories
                    </button>
                    <button onclick="resetChallenge('scriptureTopics')" class="btn-secondary">
                        ↺ New Verses
                    </button>
                </div>
                <div id="topicsResult" class="result-comprehensive"></div>
            </div>
        `;

        return html;
    }

    // Generate intelligent Biblical Wisdom (Seal 7)
    generateIntelligentWisdom(timestamp, seed) {
        if (!window.BibleVerses || window.BibleVerses.length === 0) {
            return '<p style="color: red;">Bible content not loaded</p>';
        }

        const keywords = ['MASTERY', 'WISDOM', 'COMPLETION', 'UNDERSTANDING', 'ENLIGHTENMENT'];
        const keyword = keywords[Math.floor(seed * keywords.length)];

        const wisdomVerses = this.getRandomVerses(3, seed);

        let html = `
            <div class="biblical-wisdom-challenge">
                <div class="challenge-header">
                    <h3>👑 BIBLICAL WISDOM CHALLENGE</h3>
                    <p>Apply biblical wisdom to real-life scenarios</p>
                    <div class="keyword-display">Target Keyword: <span class="keyword-target">${keyword}</span></div>
                </div>
                <div class="wisdom-scenarios">
        `;

        wisdomVerses.forEach((verse, index) => {
            const scenarios = [
                `How would this verse: "${verse.text}" apply to modern decision-making?`,
                `What practical wisdom does this verse offer: "${verse.text}"?`,
                `How does this verse guide daily Christian living: "${verse.text}"?`
            ];

            const scenario = scenarios[index % scenarios.length];

            html += `
                <div class="wisdom-scenario" data-scenario="${index + 1}">
                    <div class="scenario-header">Wisdom Question ${index + 1}:</div>
                    <div class="scenario-text">${scenario}</div>
                    <div class="verse-reference">${verse.reference}</div>
                    <textarea class="wisdom-input" id="wisdomAnswer${index + 1}" 
                              placeholder="Share your insight..." rows="3"></textarea>
                </div>
            `;
        });

        html += `
                </div>
                <div class="challenge-actions">
                    <button onclick="checkIntelligentWisdom('${keyword}')" class="btn-primary large">
                        ✓ Submit Wisdom
                    </button>
                    <button onclick="resetChallenge('biblicalWisdom')" class="btn-secondary">
                        ↺ New Scenarios
                    </button>
                </div>
                <div id="wisdomResult" class="result-comprehensive"></div>
            </div>
        `;

        return html;
    }

    // Generate placeholder for other seals using enhanced content
    generateIntelligentTeamwork(timestamp, seed) {
        return this.generateEnhancedFallback(3, 'teamCommunication', seed);
    }

    generateIntelligentCodeBreaking(timestamp, seed) {
        return this.generateEnhancedFallback(4, 'codeBreaking', seed);
    }

    generateIntelligentChronology(timestamp, seed) {
        return this.generateEnhancedFallback(5, 'chronologicalOrder', seed);
    }

    generateIntelligentTopics(timestamp, seed) {
        return this.generateEnhancedFallback(6, 'scriptureTopics', seed);
    }

    generateIntelligentWisdom(timestamp, seed) {
        return this.generateEnhancedFallback(7, 'biblicalWisdom', seed);
    }

    // Enhanced fallback that still provides dynamic content
    generateEnhancedFallback(sealId, puzzleType, seed) {
        console.log(`🔄 Using enhanced fallback for Seal ${sealId}`);

        // Try UniqueContentEngine first
        if (window.UniqueContentEngine && window.UniqueContentEngine.generateUniqueSealContent) {
            try {
                const content = window.UniqueContentEngine.generateUniqueSealContent(sealId, puzzleType, Date.now());
                if (content) {
                    return this.renderDynamicFallback(content, puzzleType);
                }
            } catch (error) {
                console.warn('UniqueContentEngine fallback failed:', error);
            }
        }

        // Final fallback to game data with randomization
        if (window.GameData && window.GameData.puzzleVariations && window.GameData.puzzleVariations[puzzleType]) {
            const variations = window.GameData.puzzleVariations[puzzleType];
            const randomVariation = variations[Math.floor(seed * variations.length)];

            if (window.PuzzleManager && window.PuzzleManager['generate' + puzzleType.charAt(0).toUpperCase() + puzzleType.slice(1) + 'Content']) {
                return window.PuzzleManager['generate' + puzzleType.charAt(0).toUpperCase() + puzzleType.slice(1) + 'Content'](randomVariation);
            }
        }

        return `<p>Seal ${sealId} challenge loading...</p>`;
    }

    // Render dynamic content in a consistent format
    renderDynamicFallback(content, type) {
        if (typeof content === 'string') {
            return content;
        }

        // If content is an object, try to render it appropriately
        if (content && content.questions) {
            // Handle question-based content
            let html = `<div class="${type}-challenge">`;
            content.questions.forEach((q, i) => {
                html += `
                    <div class="question" data-question="${i + 1}">
                        <p>${q.question}</p>
                        <input type="text" placeholder="Your answer" data-correct="${q.correctAnswer}">
                    </div>
                `;
            });
            html += `</div>`;
            return html;
        }

        return JSON.stringify(content);
    }

    // Helper method to get random items from array
    getRandomItems(array, count, seed) {
        const shuffled = array.sort(() => (seed + Math.random()) - 0.5);
        return shuffled.slice(0, Math.min(count, array.length));
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

    // Generate multiple choice options for Bible books
    generateBookOptions(correctBook) {
        const allBooks = window.BibleBooks || ['Genesis', 'Exodus', 'Matthew', 'John', 'Romans'];
        const options = [correctBook];

        // Add 3 random other books
        while (options.length < 4) {
            const randomBook = allBooks[Math.floor(Math.random() * allBooks.length)];
            if (!options.includes(randomBook)) {
                options.push(randomBook);
            }
        }

        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    }

    // Generate character options for biblical speakers
    generateCharacterOptions(correctCharacter) {
        const characters = ['Jesus', 'God', 'Moses', 'David', 'Paul', 'Peter', 'John', 'Joshua', 'Isaiah', 'Jeremiah', 'Daniel', 'Shadrach, Meshach, Abednego', 'Biblical Author'];
        const options = [correctCharacter];

        // Add 3 random other characters, but keep common ones more likely
        const commonCharacters = ['Jesus', 'God', 'Moses', 'David', 'Paul'];

        while (options.length < 4) {
            const useCommon = Math.random() > 0.5;
            const pool = useCommon ? commonCharacters : characters;
            const randomChar = pool[Math.floor(Math.random() * pool.length)];

            if (!options.includes(randomChar)) {
                options.push(randomChar);
            }
        }

        return options.sort(() => Math.random() - 0.5);
    }

    // Determine who likely spoke the verse with accurate attribution
    getVerseSpeaker(verse) {
        const text = verse.text.toLowerCase();
        const reference = `${verse.book} ${verse.chapter}:${verse.verse}`.toLowerCase();

        // Specific verse attributions for accuracy
        if (reference.includes('daniel 3') && text.includes('blazing furnace')) {
            return 'Shadrach, Meshach, Abednego';
        } else if (text.includes('i am the way') || text.includes('i am who i am')) {
            return 'Jesus';
        } else if (verse.book === 'Exodus' && verse.chapter === 3 && text.includes('i am who i am')) {
            return 'God';
        } else if (text.includes('jesus') || text.includes('christ') || (verse.book === 'John' && !text.includes('god said'))) {
            return 'Jesus';
        } else if (text.includes('moses said') || (verse.book === 'Exodus' && text.includes('israelites'))) {
            return 'Moses';
        } else if (verse.book === 'Psalms') {
            return 'David';
        } else if (verse.book === 'Romans' || verse.book === '1 Corinthians' || verse.book === 'Ephesians' || verse.book === 'Philippians') {
            return 'Paul';
        } else if (text.includes('god said') || text.includes('declares the lord') || text.includes('says the lord')) {
            return 'God';
        } else if (verse.book === 'Daniel') {
            return 'Daniel';
        } else if (verse.book === 'Isaiah') {
            return 'Isaiah';
        } else if (verse.book === 'Jeremiah') {
            return 'Jeremiah';
        } else {
            return 'Biblical Author';
        }
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

        switch (sealNumber) {
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
