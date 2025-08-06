// Bible Dataset Integration and Question Generation System
class BibleDatasetManager {
    constructor() {
        this.bibleData = {};
        this.questionBank = [];
        this.usedQuestions = new Set();
        this.loadBibleDataset();
    }

    // Core Bible dataset with verses categorized by themes
    loadBibleDataset() {
        this.bibleData = {
            creation: [
                { book: "Genesis", chapter: 1, verse: 1, text: "In the beginning God created the heavens and the earth.", theme: "creation" },
                { book: "Genesis", chapter: 1, verse: 3, text: "And God said, 'Let there be light,' and there was light.", theme: "creation" },
                { book: "Genesis", chapter: 1, verse: 27, text: "So God created mankind in his own image, in the image of God he created them; male and female he created them.", theme: "creation" },
                { book: "Genesis", chapter: 2, verse: 7, text: "Then the Lord God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being.", theme: "creation" }
            ],
            faith: [
                { book: "Hebrews", chapter: 11, verse: 1, text: "Now faith is confidence in what we hope for and assurance about what we do not see.", theme: "faith" },
                { book: "Romans", chapter: 10, verse: 17, text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.", theme: "faith" },
                { book: "Ephesians", chapter: 2, verse: 8, text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.", theme: "faith" },
                { book: "James", chapter: 2, verse: 17, text: "In the same way, faith by itself, if it is not accompanied by action, is dead.", theme: "faith" }
            ],
            love: [
                { book: "1 John", chapter: 4, verse: 8, text: "Whoever does not love does not know God, because God is love.", theme: "love" },
                { book: "1 Corinthians", chapter: 13, verse: 4, text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", theme: "love" },
                { book: "John", chapter: 3, verse: 16, text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", theme: "love" },
                { book: "Romans", chapter: 5, verse: 8, text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", theme: "love" }
            ],
            wisdom: [
                { book: "Proverbs", chapter: 3, verse: 5, text: "Trust in the Lord with all your heart and lean not on your own understanding.", theme: "wisdom" },
                { book: "James", chapter: 1, verse: 5, text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", theme: "wisdom" },
                { book: "Proverbs", chapter: 27, verse: 17, text: "As iron sharpens iron, so one person sharpens another.", theme: "wisdom" },
                { book: "Ecclesiastes", chapter: 3, verse: 1, text: "There is a time for everything, and a season for every activity under the heavens.", theme: "wisdom" }
            ],
            salvation: [
                { book: "Acts", chapter: 4, verse: 12, text: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.", theme: "salvation" },
                { book: "Romans", chapter: 6, verse: 23, text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.", theme: "salvation" },
                { book: "John", chapter: 14, verse: 6, text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'", theme: "salvation" },
                { book: "2 Corinthians", chapter: 5, verse: 17, text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", theme: "salvation" }
            ],
            hope: [
                { book: "Jeremiah", chapter: 29, verse: 11, text: "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future.", theme: "hope" },
                { book: "Romans", chapter: 15, verse: 13, text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", theme: "hope" },
                { book: "1 Peter", chapter: 1, verse: 3, text: "Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead.", theme: "hope" },
                { book: "Psalm", chapter: 42, verse: 5, text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.", theme: "hope" }
            ],
            courage: [
                { book: "Joshua", chapter: 1, verse: 9, text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", theme: "courage" },
                { book: "Isaiah", chapter: 41, verse: 10, text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", theme: "courage" },
                { book: "Philippians", chapter: 4, verse: 13, text: "I can do all this through him who gives me strength.", theme: "courage" },
                { book: "2 Timothy", chapter: 1, verse: 7, text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", theme: "courage" }
            ],
            miracles: [
                { book: "Matthew", chapter: 14, verse: 25, text: "Shortly before dawn Jesus went out to them, walking on the lake.", theme: "miracles" },
                { book: "John", chapter: 6, verse: 11, text: "Jesus then took the loaves, gave thanks, and distributed to those who were seated as much as they wanted. He did the same with the fish.", theme: "miracles" },
                { book: "Mark", chapter: 4, verse: 39, text: "He got up, rebuked the wind and said to the waves, 'Quiet! Be still!' Then the wind died down and it was completely calm.", theme: "miracles" },
                { book: "John", chapter: 11, verse: 43, text: "When he had said this, Jesus called in a loud voice, 'Lazarus, come out!'", theme: "miracles" }
            ],
            parables: [
                { book: "Matthew", chapter: 13, verse: 31, text: "He told them another parable: 'The kingdom of heaven is like a mustard seed, which a man took and planted in his field.'", theme: "parables" },
                { book: "Luke", chapter: 15, verse: 11, text: "Jesus continued: 'There was a man who had two sons.'", theme: "parables" },
                { book: "Matthew", chapter: 25, verse: 14, text: "Again, it will be like a man going on a journey, who called his servants and entrusted his wealth to them.", theme: "parables" },
                { book: "Luke", chapter: 10, verse: 30, text: "In reply Jesus said: 'A man was going down from Jerusalem to Jericho, when he was attacked by robbers.'", theme: "parables" }
            ],
            prophecy: [
                { book: "Isaiah", chapter: 53, verse: 5, text: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.", theme: "prophecy" },
                { book: "Micah", chapter: 5, verse: 2, text: "But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel, whose origins are from of old, from ancient times.", theme: "prophecy" },
                { book: "Isaiah", chapter: 7, verse: 14, text: "Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel.", theme: "prophecy" },
                { book: "Zechariah", chapter: 9, verse: 9, text: "Rejoice greatly, Daughter Zion! Shout, Daughter Jerusalem! See, your king comes to you, righteous and victorious, lowly and riding on a donkey, on a colt, the foal of a donkey.", theme: "prophecy" }
            ]
        };

        this.generateQuestionBank();
    }

    // Generate comprehensive question bank from Bible dataset
    generateQuestionBank() {
        this.questionBank = [];
        
        // Generate different types of questions for each verse
        Object.entries(this.bibleData).forEach(([theme, verses]) => {
            verses.forEach(verse => {
                // Question type 1: Fill in the blank
                this.generateFillInBlankQuestions(verse, theme);
                
                // Question type 2: Multiple choice about content
                this.generateMultipleChoiceQuestions(verse, theme);
                
                // Question type 3: True/False questions
                this.generateTrueFalseQuestions(verse, theme);
                
                // Question type 4: Reference questions
                this.generateReferenceQuestions(verse, theme);
                
                // Question type 5: Theme-based questions
                this.generateThemeQuestions(verse, theme);
            });
        });
        
        console.log(`📚 Generated ${this.questionBank.length} questions from Bible dataset`);
    }

    // Generate fill-in-the-blank questions
    generateFillInBlankQuestions(verse, theme) {
        const words = verse.text.split(' ');
        const keyWords = words.filter(word => 
            word.length > 4 && 
            !['and', 'the', 'for', 'with', 'that', 'will', 'have', 'they', 'from', 'this'].includes(word.toLowerCase())
        );

        if (keyWords.length > 0) {
            const randomWord = keyWords[Math.floor(Math.random() * keyWords.length)];
            const questionText = verse.text.replace(new RegExp(randomWord, 'i'), '______');
            
            this.questionBank.push({
                id: `fill_${verse.book}_${verse.chapter}_${verse.verse}_${randomWord}`,
                type: 'fill_blank',
                question: `Complete this verse: "${questionText}"`,
                answer: randomWord.replace(/[.,!?;]/g, '').toLowerCase(),
                reference: `${verse.book} ${verse.chapter}:${verse.verse}`,
                theme: theme,
                difficulty: 'medium',
                originalVerse: verse.text
            });
        }
    }

    // Generate multiple choice questions
    generateMultipleChoiceQuestions(verse, theme) {
        const questions = [
            {
                question: `According to ${verse.book} ${verse.chapter}:${verse.verse}, what is the main message?`,
                correct: this.extractMainConcept(verse.text),
                distractors: this.generateDistractors(theme, 3)
            },
            {
                question: `Where can you find: "${verse.text.substring(0, 30)}..."?`,
                correct: `${verse.book} ${verse.chapter}:${verse.verse}`,
                distractors: this.generateFakeReferences(3)
            }
        ];

        questions.forEach((q, index) => {
            const options = [q.correct, ...q.distractors].sort(() => Math.random() - 0.5);
            const correctIndex = options.indexOf(q.correct);
            
            this.questionBank.push({
                id: `mc_${verse.book}_${verse.chapter}_${verse.verse}_${index}`,
                type: 'multiple_choice',
                question: q.question,
                options: options,
                correctIndex: correctIndex,
                reference: `${verse.book} ${verse.chapter}:${verse.verse}`,
                theme: theme,
                difficulty: 'easy',
                showReferenceOnWrong: true
            });
        });
    }

    // Generate true/false questions
    generateTrueFalseQuestions(verse, theme) {
        const trueFalseQuestions = [
            {
                question: `True or False: ${verse.text}`,
                answer: true,
                reference: `${verse.book} ${verse.chapter}:${verse.verse}`
            },
            {
                question: `True or False: This verse is found in ${this.getRandomBook()}.`,
                answer: this.getRandomBook() === verse.book,
                reference: `${verse.book} ${verse.chapter}:${verse.verse}`
            }
        ];

        trueFalseQuestions.forEach((q, index) => {
            this.questionBank.push({
                id: `tf_${verse.book}_${verse.chapter}_${verse.verse}_${index}`,
                type: 'true_false',
                question: q.question,
                answer: q.answer,
                reference: q.reference,
                theme: theme,
                difficulty: 'easy',
                showReferenceOnWrong: true
            });
        });
    }

    // Generate reference questions
    generateReferenceQuestions(verse, theme) {
        this.questionBank.push({
            id: `ref_${verse.book}_${verse.chapter}_${verse.verse}`,
            type: 'reference',
            question: `What book and chapter contains: "${verse.text.substring(0, 50)}..."?`,
            answer: `${verse.book} ${verse.chapter}`,
            fullReference: `${verse.book} ${verse.chapter}:${verse.verse}`,
            theme: theme,
            difficulty: 'hard',
            showReferenceOnWrong: true
        });
    }

    // Generate theme-based questions
    generateThemeQuestions(verse, theme) {
        const themeQuestions = {
            creation: "What does this verse teach us about God's creative power?",
            faith: "How does this verse encourage us to trust in God?",
            love: "What does this verse reveal about God's love?",
            wisdom: "What practical wisdom can we gain from this verse?",
            salvation: "How does this verse explain God's plan of salvation?",
            hope: "What hope does this verse offer believers?",
            courage: "How does this verse encourage us to be brave?",
            miracles: "What does this miracle teach us about Jesus' power?",
            parables: "What spiritual truth does this parable convey?",
            prophecy: "How was this prophecy fulfilled?"
        };

        if (themeQuestions[theme]) {
            this.questionBank.push({
                id: `theme_${verse.book}_${verse.chapter}_${verse.verse}`,
                type: 'theme_reflection',
                question: `${themeQuestions[theme]} (${verse.book} ${verse.chapter}:${verse.verse})`,
                verse: verse.text,
                theme: theme,
                difficulty: 'medium',
                requiresReflection: true,
                acceptableKeywords: this.getThemeKeywords(theme)
            });
        }
    }

    // Generate random puzzle set for a game session
    generateRandomPuzzleSet(count = 7, themeDistribution = { random: 80, themed: 20 }) {
        const puzzleSet = [];
        const randomCount = Math.floor(count * themeDistribution.random / 100);
        const themedCount = count - randomCount;
        
        // Get random questions
        const availableQuestions = this.questionBank.filter(q => !this.usedQuestions.has(q.id));
        const randomQuestions = this.getRandomItems(availableQuestions, randomCount);
        
        // Get themed questions (group by theme)
        const themedQuestions = this.getThemedQuestions(themedCount);
        
        // Combine and shuffle
        const allQuestions = [...randomQuestions, ...themedQuestions];
        const shuffledSet = allQuestions.sort(() => Math.random() - 0.5);
        
        // Mark questions as used
        shuffledSet.forEach(q => this.usedQuestions.add(q.id));
        
        // Convert to puzzle format
        return shuffledSet.map((question, index) => ({
            id: index + 1,
            title: `Seal ${index + 1}: ${this.getSealTitle(question.theme)}`,
            question: question,
            type: question.type,
            theme: question.theme,
            difficulty: question.difficulty,
            hint: this.generateHint(question),
            keywords: this.generateKeywords(question)
        }));
    }

    // Get themed questions in groups
    getThemedQuestions(count) {
        const themes = Object.keys(this.bibleData);
        const questionsPerTheme = Math.ceil(count / themes.length);
        const themedQuestions = [];
        
        themes.forEach(theme => {
            const themeQuestions = this.questionBank.filter(q => 
                q.theme === theme && !this.usedQuestions.has(q.id)
            );
            const selected = this.getRandomItems(themeQuestions, questionsPerTheme);
            themedQuestions.push(...selected);
        });
        
        return themedQuestions.slice(0, count);
    }

    // Get unique puzzle set for team (no duplication across teams in same game)
    generateUniquePuzzleSet(gameId, teamId, count = 7) {
        const gameUsedQuestions = this.getGameUsedQuestions(gameId);
        const availableQuestions = this.questionBank.filter(q => 
            !gameUsedQuestions.has(q.id)
        );
        
        if (availableQuestions.length < count) {
            console.warn('Not enough unique questions available, reusing some questions');
            return this.generateRandomPuzzleSet(count);
        }
        
        const puzzleSet = this.generateRandomPuzzleSet(count);
        this.markQuestionsUsedForGame(gameId, puzzleSet.map(p => p.question.id));
        
        return puzzleSet;
    }

    // Auto-generate educational hints
    generateHint(question) {
        const hintTemplates = {
            fill_blank: `Think about the context of ${question.reference}. What word would fit the meaning?`,
            multiple_choice: `Consider the main theme of ${question.theme}. What would be most consistent with Scripture?`,
            true_false: `Carefully examine the exact wording. Check ${question.reference} if needed.`,
            reference: `Think about which books of the Bible typically contain ${question.theme} themes.`,
            theme_reflection: `Consider how this theme appears throughout Scripture. What are the key concepts?`
        };
        
        return hintTemplates[question.type] || `Study ${question.reference} for insight.`;
    }

    // Generate keywords for learning reinforcement
    generateKeywords(question) {
        const themeKeywords = {
            creation: ['God', 'created', 'beginning', 'earth', 'heavens'],
            faith: ['believe', 'trust', 'confidence', 'hope', 'assurance'],
            love: ['love', 'compassion', 'mercy', 'kindness', 'grace'],
            wisdom: ['wisdom', 'understanding', 'knowledge', 'discernment', 'truth'],
            salvation: ['saved', 'eternal', 'life', 'redemption', 'forgiveness'],
            hope: ['hope', 'future', 'promise', 'restoration', 'renewal'],
            courage: ['strength', 'courage', 'brave', 'fearless', 'bold'],
            miracles: ['miracle', 'power', 'healing', 'supernatural', 'divine'],
            parables: ['kingdom', 'teaching', 'story', 'lesson', 'truth'],
            prophecy: ['prophecy', 'fulfillment', 'promised', 'foretold', 'messiah']
        };
        
        return themeKeywords[question.theme] || ['faith', 'God', 'truth'];
    }

    // Helper methods
    getRandomItems(array, count) {
        const shuffled = [...array].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    extractMainConcept(text) {
        // Simple extraction of main concept
        const concepts = ['love', 'faith', 'hope', 'salvation', 'grace', 'mercy', 'truth', 'wisdom'];
        const foundConcept = concepts.find(concept => 
            text.toLowerCase().includes(concept)
        );
        return foundConcept ? `The importance of ${foundConcept}` : 'God\'s character and nature';
    }

    generateDistractors(theme, count) {
        const allConcepts = [
            'The importance of wealth', 'Human wisdom', 'Self-reliance', 
            'Worldly success', 'Material possessions', 'Personal achievement',
            'Social status', 'Physical strength', 'Earthly power'
        ];
        return this.getRandomItems(allConcepts, count);
    }

    generateFakeReferences(count) {
        const books = ['Matthew', 'Mark', 'Luke', 'John', 'Romans', 'Psalms', 'Genesis', 'Exodus'];
        const fakeRefs = [];
        
        for (let i = 0; i < count; i++) {
            const book = books[Math.floor(Math.random() * books.length)];
            const chapter = Math.floor(Math.random() * 20) + 1;
            const verse = Math.floor(Math.random() * 30) + 1;
            fakeRefs.push(`${book} ${chapter}:${verse}`);
        }
        
        return fakeRefs;
    }

    getRandomBook() {
        const books = ['Genesis', 'Exodus', 'Psalms', 'Proverbs', 'Isaiah', 'Matthew', 'John', 'Romans', 'Revelation'];
        return books[Math.floor(Math.random() * books.length)];
    }

    getSealTitle(theme) {
        const titles = {
            creation: 'The Genesis Mystery',
            faith: 'The Faith Challenge',
            love: 'The Love Puzzle',
            wisdom: 'The Wisdom Quest',
            salvation: 'The Salvation Riddle',
            hope: 'The Hope Cipher',
            courage: 'The Courage Trial',
            miracles: 'The Miracle Code',
            parables: 'The Parable Path',
            prophecy: 'The Prophecy Scroll'
        };
        return titles[theme] || 'The Scripture Challenge';
    }

    getThemeKeywords(theme) {
        const keywords = {
            creation: ['God', 'created', 'made', 'formed', 'beginning'],
            faith: ['faith', 'believe', 'trust', 'confidence'],
            love: ['love', 'beloved', 'compassion', 'mercy'],
            wisdom: ['wisdom', 'wise', 'understanding', 'knowledge'],
            salvation: ['salvation', 'saved', 'redeemed', 'eternal'],
            hope: ['hope', 'future', 'promise', 'restoration'],
            courage: ['courage', 'strength', 'bold', 'fearless'],
            miracles: ['miracle', 'power', 'healing', 'divine'],
            parables: ['kingdom', 'parable', 'story', 'teaching'],
            prophecy: ['prophecy', 'fulfillment', 'messiah', 'promised']
        };
        return keywords[theme] || ['God', 'faith', 'truth'];
    }

    // Game session management
    getGameUsedQuestions(gameId) {
        if (!this.gameUsedQuestions) {
            this.gameUsedQuestions = new Map();
        }
        
        if (!this.gameUsedQuestions.has(gameId)) {
            this.gameUsedQuestions.set(gameId, new Set());
        }
        
        return this.gameUsedQuestions.get(gameId);
    }

    markQuestionsUsedForGame(gameId, questionIds) {
        const gameUsed = this.getGameUsedQuestions(gameId);
        questionIds.forEach(id => gameUsed.add(id));
    }

    clearGameQuestions(gameId) {
        if (this.gameUsedQuestions) {
            this.gameUsedQuestions.delete(gameId);
        }
    }

    // Get statistics about question bank
    getStatistics() {
        const stats = {
            totalQuestions: this.questionBank.length,
            byType: {},
            byTheme: {},
            byDifficulty: {}
        };

        this.questionBank.forEach(q => {
            stats.byType[q.type] = (stats.byType[q.type] || 0) + 1;
            stats.byTheme[q.theme] = (stats.byTheme[q.theme] || 0) + 1;
            stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
        });

        return stats;
    }

    // Reset used questions (for testing or cleanup)
    resetUsedQuestions() {
        this.usedQuestions.clear();
        if (this.gameUsedQuestions) {
            this.gameUsedQuestions.clear();
        }
    }
}

// Initialize Bible Dataset Manager
window.BibleDatasetManager = new BibleDatasetManager();

// Export for use in other modules
window.BibleDatasetManager.generatePuzzlesForGame = function(gameId, teamId, count = 7) {
    return this.generateUniquePuzzleSet(gameId, teamId, count);
};

console.log('📖 Bible Dataset Manager initialized with comprehensive question generation system');
