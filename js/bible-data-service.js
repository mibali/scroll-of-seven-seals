// Bible Data Service - Complete Bible Ingestion and Management
// Enhanced for Scroll of Seven Seals Game

class BibleDataService {
    constructor() {
        this.baseUrl = 'https://bible-api.com';
        this.cache = new Map();
        this.isInitialized = false;
        this.sealTopics = this.initializeSealTopics();
        this.booksData = null;
        this.loadCache();
    }

    // Initialize seal-specific Bible topics mapping
    initializeSealTopics() {
        return {
            1: { // Old Testament Events & Timeline
                books: ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST'],
                themes: ['creation', 'flood', 'exodus', 'covenant', 'kingdom', 'exile', 'return'],
                keyFigures: ['Adam', 'Noah', 'Abraham', 'Moses', 'David', 'Solomon', 'Daniel'],
                description: 'Old Testament foundational events and timeline'
            },
            2: { // Bible Stories, Psalms, Proverbs
                books: ['PSA', 'PRO', 'ECC', 'SON', 'JOB', '1SA', '2SA', '1KI', '2KI', 'DAN'],
                themes: ['wisdom', 'praise', 'worship', 'faith', 'courage', 'deliverance'],
                keyFigures: ['David', 'Solomon', 'Job', 'Daniel', 'Esther'],
                description: 'Stories of faith, wisdom literature, and worship'
            },
            3: { // Faith and Spiritual Growth
                books: ['ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHI', 'COL', 'HEB', 'JAS', '1PE', '2PE'],
                themes: ['faith', 'grace', 'salvation', 'spiritual growth', 'christian living'],
                keyFigures: ['Jesus', 'Paul', 'Peter', 'James'],
                description: 'Faith development and spiritual principles'
            },
            4: { // Kingdom Affairs and Teachings
                books: ['MAT', 'MRK', 'LUK', 'JOH', 'ACT'],
                themes: ['kingdom of heaven', 'parables', 'ministry', 'discipleship', 'miracles'],
                keyFigures: ['Jesus', 'disciples', 'apostles'],
                description: 'Jesus\'s teachings and kingdom principles'
            },
            5: { // New Testament Churches and Letters
                books: ['ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHI', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM'],
                themes: ['church', 'fellowship', 'ministry', 'evangelism', 'christian unity'],
                keyFigures: ['Paul', 'Timothy', 'Titus', 'Barnabas'],
                description: 'Early church development and apostolic letters'
            },
            6: { // Health, Wholeness, and Healing
                books: ['MAT', 'MRK', 'LUK', 'JOH', 'ACT', 'JAS', '3JO'],
                themes: ['healing', 'wholeness', 'restoration', 'health', 'body and spirit'],
                keyFigures: ['Jesus', 'apostles', 'healing recipients'],
                description: 'Divine healing and wholeness ministry'
            },
            7: { // Book of Revelation and End Times
                books: ['REV', 'DAN', 'EZE', 'MAT', 'MRK', 'LUK', '1TH', '2TH', '2PE'],
                themes: ['prophecy', 'second coming', 'new heaven', 'judgment', 'eternal life'],
                keyFigures: ['John', 'Jesus', 'angels', 'saints'],
                description: 'Prophetic revelation and eternal hope'
            }
        };
    }

    // Load cached data from localStorage
    loadCache() {
        try {
            const cached = localStorage.getItem('bibleDataCache');
            if (cached) {
                const data = JSON.parse(cached);
                this.cache = new Map(data.entries);
                this.booksData = data.booksData;
                console.log('📖 Bible data cache loaded successfully');
            }
        } catch (error) {
            console.log('📖 Starting with fresh Bible data cache');
        }
    }

    // Save cache to localStorage
    saveCache() {
        try {
            const data = {
                entries: Array.from(this.cache.entries()),
                booksData: this.booksData,
                timestamp: Date.now()
            };
            localStorage.setItem('bibleDataCache', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save Bible data cache:', error);
        }
    }

    // Initialize Bible data service
    async initialize() {
        if (this.isInitialized) return;
        
        try {
            console.log('📖 Initializing Bible Data Service...');
            
            // Use fallback content immediately for better UX
            this.initializeFallbackContent();
            
            // Try to load API data in background with rate limiting
            this.loadBooksDataSafely();
            
            this.isInitialized = true;
            console.log('✅ Bible Data Service initialized with fallback content');
        } catch (error) {
            console.error('❌ Failed to initialize Bible Data Service:', error);
            // Ensure fallback content is available even if initialization fails
            this.initializeFallbackContent();
            this.isInitialized = true;
        }
    }

    // Initialize fallback Bible content for when API is unavailable
    initializeFallbackContent() {
        console.log('📚 Loading fallback Bible content...');
        
        // Store rich Bible content for each seal
        this.fallbackContent = {
            1: { // Old Testament Timeline
                timelineEvents: [
                    { reference: 'Genesis 1:1', event: 'Creation of the heavens and earth', period: 'Beginning', text: 'In the beginning God created the heaven and the earth.' },
                    { reference: 'Genesis 7:11', event: 'The great flood begins', period: 'Antediluvian', text: 'In the six hundredth year of Noah\'s life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened.' },
                    { reference: 'Genesis 12:1', event: 'God calls Abraham', period: 'Patriarchs', text: 'Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father\'s house, unto a land that I will shew thee:' },
                    { reference: 'Exodus 12:29', event: 'The Exodus from Egypt', period: 'Exodus', text: 'And it came to pass, that at midnight the LORD smote all the firstborn in the land of Egypt, from the firstborn of Pharaoh that sat on his throne unto the firstborn of the captive that was in the dungeon; and all the firstborn of cattle.' },
                    { reference: '1 Samuel 16:13', event: 'David anointed as king', period: 'United Kingdom', text: 'Then Samuel took the horn of oil, and anointed him in the midst of his brethren: and the Spirit of the LORD came upon David from that day forward.' },
                    { reference: '1 Kings 6:1', event: 'Solomon builds the temple', period: 'Golden Age', text: 'And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon\'s reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.' },
                    { reference: '2 Kings 25:8-9', event: 'Jerusalem destroyed', period: 'Exile', text: 'And in the fifth month, on the seventh day of the month, which is the nineteenth year of king Nebuchadnezzar king of Babylon, came Nebuzaradan, captain of the guard, a servant of the king of Babylon, unto Jerusalem: And he burnt the house of the LORD, and the king\'s house, and all the houses of Jerusalem.' },
                    { reference: 'Ezra 3:10-11', event: 'Temple rebuilt', period: 'Return', text: 'And when the builders laid the foundation of the temple of the LORD, they set the priests in their apparel with trumpets, and the Levites the sons of Asaph with cymbals, to praise the LORD, after the ordinance of David king of Israel. And they sang together by course in praising and giving thanks unto the LORD.' }
                ]
            },
            2: { // Psalms and Wisdom
                wisdomContent: [
                    { book: 'Psalms', reference: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.', type: 'psalm' },
                    { book: 'Psalms', reference: 'Psalm 46:1', text: 'God is our refuge and strength, a very present help in trouble.', type: 'psalm' },
                    { book: 'Proverbs', reference: 'Proverbs 3:5-6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', type: 'wisdom' },
                    { book: 'Proverbs', reference: 'Proverbs 16:9', text: 'A man\'s heart deviseth his way: but the LORD directeth his steps.', type: 'wisdom' },
                    { book: 'Ecclesiastes', reference: 'Ecclesiastes 3:1', text: 'To every thing there is a season, and a time to every purpose under the heaven.', type: 'wisdom' }
                ]
            },
            3: { // Faith Principles
                faithVerses: [
                    { principle: 'Faith overcomes fear', verse: 'Fear not, for I am with you; be not dismayed, for I am your God', reference: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.' },
                    { principle: 'Trust in God\'s plan', verse: 'For I know the thoughts that I think toward you, saith the LORD', reference: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
                    { principle: 'Prayer brings peace', verse: 'Be careful for nothing; but in every thing by prayer and supplication', reference: 'Philippians 4:6', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
                    { principle: 'Love your neighbor', verse: 'Thou shalt love thy neighbour as thyself', reference: 'Matthew 22:39', text: 'And the second is like unto it, Thou shalt love thy neighbour as thyself.' },
                    { principle: 'God\'s strength in weakness', verse: 'My grace is sufficient for thee: for my strength is made perfect in weakness', reference: '2 Corinthians 12:9', text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.' }
                ]
            },
            4: { // Parables
                parables: [
                    { parable: 'The Good Samaritan', teaching: 'Show compassion to all people', reference: 'Luke 10:25-37', summary: 'A story about helping those in need regardless of their background' },
                    { parable: 'The Prodigal Son', teaching: 'God\'s forgiveness and grace', reference: 'Luke 15:11-32', summary: 'A father\'s unconditional love for his wayward son' },
                    { parable: 'The Mustard Seed', teaching: 'Small faith grows greatly', reference: 'Matthew 13:31-32', summary: 'The kingdom of heaven starts small but grows mighty' },
                    { parable: 'The Lost Sheep', teaching: 'God seeks the lost', reference: 'Luke 15:3-7', summary: 'The shepherd leaves 99 sheep to find the one that is lost' },
                    { parable: 'The Talents', teaching: 'Use your gifts faithfully', reference: 'Matthew 25:14-30', summary: 'A master entrusts his servants with talents to invest' }
                ]
            },
            5: { // Church Letters
                churchQuestions: [
                    { question: 'Which church was told "I can do all things through Christ who strengthens me"?', options: ['Ephesians', 'Philippians', 'Colossians', 'Thessalonians'], correct: 1, reference: 'Philippians 4:13' },
                    { question: 'Which letter contains the "Love Chapter"?', options: ['Romans', 'Corinthians', 'Galatians', 'Ephesians'], correct: 1, reference: '1 Corinthians 13' },
                    { question: 'Which church was reminded about the "armor of God"?', options: ['Romans', 'Colossians', 'Ephesians', 'Philippians'], correct: 2, reference: 'Ephesians 6:10-18' },
                    { question: 'Which letter teaches about spiritual gifts?', options: ['Romans', 'Corinthians', 'Galatians', 'Timothy'], correct: 1, reference: '1 Corinthians 12' },
                    { question: 'Which church received the letter about "running the race"?', options: ['Philippians', 'Corinthians', 'Hebrews', 'Timothy'], correct: 1, reference: '1 Corinthians 9:24' }
                ]
            },
            6: { // Healing Stories
                healingStories: [
                    { story: 'The blind man at Bethsaida', incomplete: 'Jesus took the _____ man by the hand and led him outside the village.', answer: 'blind', reference: 'Mark 8:22-26', text: 'And he took the blind man by the hand, and led him out of the town' },
                    { story: 'The paralytic lowered through the roof', incomplete: 'When Jesus saw their _____, he said to the paralytic, "Son, your sins are forgiven."', answer: 'faith', reference: 'Mark 2:1-12', text: 'When Jesus saw their faith, he said unto the sick of the palsy, Son, thy sins be forgiven thee.' },
                    { story: 'The woman with the issue of blood', incomplete: 'She said, "If I just _____ his clothes, I will be healed."', answer: 'touch', reference: 'Mark 5:25-34', text: 'For she said, If I may touch but his clothes, I shall be whole.' },
                    { story: 'The ten lepers', incomplete: 'One of them, when he saw he was healed, came back, praising God in a loud _____.', answer: 'voice', reference: 'Luke 17:11-19', text: 'And one of them, when he saw that he was healed, turned back, and with a loud voice glorified God' },
                    { story: 'The centurion\'s servant', incomplete: 'The centurion said, "Lord, I am not worthy that thou shouldest come under my roof: but speak the _____ only, and my servant shall be healed."', answer: 'word', reference: 'Matthew 8:5-13', text: 'The centurion answered and said, Lord, I am not worthy that thou shouldest come under my roof: but speak the word only, and my servant shall be healed.' }
                ]
            },
            7: { // Revelation Symbols
                symbols: [
                    { symbol: '🐑 Lamb', meaning: 'Jesus Christ', reference: 'Revelation 5:6', text: 'And I beheld, and, lo, in the midst of the throne and of the four beasts, and in the midst of the elders, stood a Lamb as it had been slain' },
                    { symbol: '👑 24 Elders', meaning: 'Representatives of God\'s people', reference: 'Revelation 4:4', text: 'And round about the throne were four and twenty seats: and upon the seats I saw four and twenty elders sitting, clothed in white raiment' },
                    { symbol: '🌟 Morning Star', meaning: 'Jesus as the bright hope', reference: 'Revelation 22:16', text: 'I Jesus have sent mine angel to testify unto you these things in the churches. I am the root and the offspring of David, and the bright and morning star.' },
                    { symbol: '🌆 New Jerusalem', meaning: 'The eternal dwelling with God', reference: 'Revelation 21:2', text: 'And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband.' },
                    { symbol: '⚡ Seven Thunders', meaning: 'God\'s powerful voice', reference: 'Revelation 10:3-4', text: 'And cried with a loud voice, as when a lion roareth: and when he had cried, seven thunders uttered their voices.' }
                ]
            }
        };

        console.log('✅ Fallback Bible content loaded successfully');
    }

    // Safely load books data with rate limiting and CORS handling
    async loadBooksDataSafely() {
        const cacheKey = 'books_data';
        
        if (this.cache.has(cacheKey)) {
            this.booksData = this.cache.get(cacheKey);
            return;
        }

        try {
            const response = await fetch(`${this.baseUrl}/data/web`);
            const data = await response.json();
            
            this.booksData = data;
            this.cache.set(cacheKey, data);
            this.saveCache();
            
            console.log('📚 Loaded Bible books data');
        } catch (error) {
            console.error('Failed to load books data:', error);
        }
    }

    // Pre-cache essential data for game performance
    async preCacheEssentialData() {
        const promises = [];
        
        // Cache key verses for each seal
        for (const sealNum of [1, 2, 3, 4, 5, 6, 7]) {
            promises.push(this.cacheKeyVersesForSeal(sealNum));
        }
        
        await Promise.all(promises);
        this.saveCache();
    }

    // Cache key verses for a specific seal
    async cacheKeyVersesForSeal(sealNum) {
        const sealData = this.sealTopics[sealNum];
        
        for (const bookId of sealData.books.slice(0, 3)) { // Cache first 3 books per seal
            try {
                const chapters = await this.getBookChapters(bookId);
                if (chapters && chapters.length > 0) {
                    // Cache first chapter of each book
                    await this.getChapterVerses(bookId, 1);
                }
            } catch (error) {
                console.warn(`Failed to cache data for ${bookId}:`, error);
            }
        }
    }

    // Get book chapters
    async getBookChapters(bookId) {
        const cacheKey = `chapters_${bookId}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseUrl}/data/web/${bookId}`);
            const data = await response.json();
            
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error(`Failed to load chapters for ${bookId}:`, error);
            return [];
        }
    }

    // Get chapter verses
    async getChapterVerses(bookId, chapter) {
        const cacheKey = `verses_${bookId}_${chapter}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseUrl}/data/web/${bookId}/${chapter}`);
            const data = await response.json();
            
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error(`Failed to load verses for ${bookId} ${chapter}:`, error);
            return [];
        }
    }

    // Get random verse from specific books
    async getRandomVerseFromBooks(bookIds) {
        try {
            const booksParam = bookIds.join(',');
            const response = await fetch(`${this.baseUrl}/data/web/random/${booksParam}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to get random verse:', error);
            return null;
        }
    }

    // Get verses for seal-specific content
    async getVersesForSeal(sealNum, count = 10) {
        const sealData = this.sealTopics[sealNum];
        const verses = [];
        
        try {
            for (let i = 0; i < count; i++) {
                const verse = await this.getRandomVerseFromBooks(sealData.books);
                if (verse && verse.text) {
                    verses.push({
                        reference: verse.reference,
                        text: verse.text,
                        book: verse.book,
                        chapter: verse.chapter,
                        verse: verse.verse
                    });
                }
                
                // Add delay to respect rate limiting
                await this.delay(200);
            }
        } catch (error) {
            console.error(`Failed to get verses for seal ${sealNum}:`, error);
        }
        
        return verses;
    }

    // Search verses by keyword/theme
    async searchVersesByTheme(theme, sealBooks = null) {
        const searchBooks = sealBooks || ['PSA', 'PRO', 'MAT', 'JOH', 'ROM'];
        const results = [];
        
        try {
            // For now, get random verses and filter by theme
            // In production, you'd want a more sophisticated search
            for (const bookId of searchBooks) {
                const chapters = await this.getBookChapters(bookId);
                if (chapters && chapters.length > 0) {
                    const randomChapter = Math.floor(Math.random() * chapters.length) + 1;
                    const verses = await this.getChapterVerses(bookId, randomChapter);
                    
                    if (verses && verses.length > 0) {
                        const relevantVerses = verses.filter(verse => 
                            verse.text && verse.text.toLowerCase().includes(theme.toLowerCase())
                        );
                        results.push(...relevantVerses);
                    }
                }
                
                await this.delay(300); // Rate limiting
                if (results.length >= 5) break;
            }
        } catch (error) {
            console.error(`Failed to search verses for theme "${theme}":`, error);
        }
        
        return results.slice(0, 5);
    }

    // Get specific verse by reference
    async getVerseByReference(reference) {
        const cacheKey = `ref_${reference}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            const response = await fetch(`${this.baseUrl}/${encodeURIComponent(reference)}`);
            const data = await response.json();
            
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error(`Failed to get verse ${reference}:`, error);
            return null;
        }
    }

    // Generate timeline events for Seal 1
    async generateTimelineEvents() {
        if (this.fallbackContent && this.fallbackContent[1]) {
            return [...this.fallbackContent[1].timelineEvents];
        }
        
        // Fallback to basic events if no content available
        return [
            { reference: 'Genesis 1:1', event: 'Creation of the heavens and earth', period: 'Beginning', text: 'In the beginning God created the heaven and the earth.' },
            { reference: 'Genesis 12:1', event: 'God calls Abraham', period: 'Patriarchs', text: 'Now the LORD had said unto Abram, Get thee out of thy country...' },
            { reference: 'Exodus 12:29', event: 'The Exodus from Egypt', period: 'Exodus', text: 'And it came to pass, that at midnight the LORD smote all the firstborn in the land of Egypt...' },
            { reference: '1 Samuel 16:13', event: 'David anointed as king', period: 'United Kingdom', text: 'Then Samuel took the horn of oil, and anointed him...' }
        ];
    }

    // Generate Psalms and wisdom content for Seal 2
    async generateWisdomContent() {
        if (this.fallbackContent && this.fallbackContent[2]) {
            return [...this.fallbackContent[2].wisdomContent];
        }
        
        // Basic fallback content
        return [
            { book: 'Psalms', reference: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.', type: 'psalm' },
            { book: 'Proverbs', reference: 'Proverbs 3:5', text: 'Trust in the LORD with all thine heart', type: 'wisdom' }
        ];
    }

    // Get content for specific seals using fallback data
    getSealContent(sealNumber) {
        if (!this.fallbackContent || !this.fallbackContent[sealNumber]) {
            return null;
        }
        return this.fallbackContent[sealNumber];
    }

    // Helper function for delays (rate limiting)
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get seal-specific information
    getSealInfo(sealNum) {
        return this.sealTopics[sealNum] || null;
    }

    // Clear cache (for maintenance)
    clearCache() {
        this.cache.clear();
        localStorage.removeItem('bibleDataCache');
        console.log('📖 Bible data cache cleared');
    }
}

// Global Bible service instance
window.BibleService = new BibleDataService();

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.BibleService.initialize();
    }, 1000); // Delay to ensure other scripts load first
});
