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
            
            // Load available translations and books
            await this.loadBooksData();
            
            // Pre-cache essential data for each seal
            await this.preCacheEssentialData();
            
            this.isInitialized = true;
            console.log('✅ Bible Data Service initialized successfully');
        } catch (error) {
            console.error('❌ Failed to initialize Bible Data Service:', error);
        }
    }

    // Load books data
    async loadBooksData() {
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
        const events = [
            { reference: 'Genesis 1:1', event: 'Creation of the heavens and earth', period: 'Beginning' },
            { reference: 'Genesis 7:11', event: 'The great flood begins', period: 'Antediluvian' },
            { reference: 'Genesis 12:1', event: 'God calls Abraham', period: 'Patriarchs' },
            { reference: 'Exodus 12:29', event: 'The Exodus from Egypt', period: 'Exodus' },
            { reference: '1 Samuel 16:13', event: 'David anointed as king', period: 'United Kingdom' },
            { reference: '1 Kings 6:1', event: 'Solomon builds the temple', period: 'Golden Age' },
            { reference: '2 Kings 25:8-9', event: 'Jerusalem destroyed', period: 'Exile' },
            { reference: 'Ezra 3:10-11', event: 'Temple rebuilt', period: 'Return' }
        ];
        
        // Fetch actual verse texts
        for (const event of events) {
            try {
                const verse = await this.getVerseByReference(event.reference);
                if (verse) {
                    event.text = verse.text;
                }
                await this.delay(100);
            } catch (error) {
                console.warn(`Could not fetch verse for ${event.reference}`);
            }
        }
        
        return events;
    }

    // Generate Psalms and wisdom content for Seal 2
    async generateWisdomContent() {
        const wisdomBooks = ['PSA', 'PRO', 'ECC'];
        const content = [];
        
        for (const bookId of wisdomBooks) {
            try {
                const randomVerse = await this.getRandomVerseFromBooks([bookId]);
                if (randomVerse) {
                    content.push({
                        book: randomVerse.book,
                        reference: randomVerse.reference,
                        text: randomVerse.text,
                        type: bookId === 'PSA' ? 'psalm' : 'wisdom'
                    });
                }
                await this.delay(200);
            } catch (error) {
                console.warn(`Failed to get wisdom content from ${bookId}`);
            }
        }
        
        return content;
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
