// Seal-Specific Mini-Games Engine
// Enhanced Bible-based interactive games for each of the 7 seals

class SealMiniGames {
    constructor() {
        this.currentGame = null;
        this.gameContainer = null;
        this.isGameActive = false;
        this.gameCallbacks = {
            onComplete: null,
            onScoreUpdate: null
        };
        this.gameHistory = new Map();
    }

    // Initialize the mini-games system
    initialize() {
        this.createGameContainer();
        console.log('🎮 Seal Mini-Games initialized');
    }

    // Create the game container UI
    createGameContainer() {
        if (document.getElementById('miniGameContainer')) return;

        const container = document.createElement('div');
        container.id = 'miniGameContainer';
        container.className = 'mini-game-container';
        container.innerHTML = `
            <div class="mini-game-overlay">
                <div class="mini-game-modal">
                    <div class="mini-game-header">
                        <h2 id="miniGameTitle"></h2>
                        <div class="mini-game-controls">
                            <span id="miniGameScore">Score: 0</span>
                            <button id="miniGameClose" class="mini-game-btn close-btn">×</button>
                        </div>
                    </div>
                    <div class="mini-game-content" id="miniGameContent"></div>
                    <div class="mini-game-footer">
                        <div id="miniGameProgress" class="game-progress"></div>
                        <button id="miniGameHint" class="mini-game-btn hint-btn">💡 Hint</button>
                        <button id="miniGameReset" class="mini-game-btn reset-btn">🔄 Reset</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(container);
        this.gameContainer = container;
        this.attachEventListeners();
    }

    // Attach event listeners for game controls
    attachEventListeners() {
        document.getElementById('miniGameClose').onclick = () => this.closeGame();
        document.getElementById('miniGameReset').onclick = () => this.resetGame();
        document.getElementById('miniGameHint').onclick = () => this.showHint();
    }

    // Launch a seal-specific mini-game
    async launchSealGame(sealNumber, callbacks = {}) {
        if (!window.BibleService || !window.BibleService.isInitialized) {
            console.warn('Bible service not ready yet');
            setTimeout(() => this.launchSealGame(sealNumber, callbacks), 1000);
            return;
        }

        this.gameCallbacks = { ...this.gameCallbacks, ...callbacks };
        this.currentGame = { sealNumber, score: 0, progress: 0, hints: 3 };
        
        // Show the game container
        this.gameContainer.style.display = 'flex';
        this.isGameActive = true;

        // Launch specific game based on seal number
        switch (sealNumber) {
            case 1: await this.launchTimelinePuzzle(); break;
            case 2: await this.launchPsalmsQuiz(); break;
            case 3: await this.launchFaithDragDrop(); break;
            case 4: await this.launchParablesMatching(); break;
            case 5: await this.launchChurchLettersQuiz(); break;
            case 6: await this.launchHealingStoriesPuzzle(); break;
            case 7: await this.launchRevelationSymbols(); break;
            default:
                console.error('Invalid seal number:', sealNumber);
                this.closeGame();
        }
    }

    // SEAL 1: Old Testament Timeline Puzzle
    async launchTimelinePuzzle() {
        this.setGameTitle('📜 Timeline of Faith', 'Arrange these Old Testament events in chronological order');

        try {
            const events = await window.BibleService.generateTimelineEvents();
            
            // Shuffle the events
            const shuffledEvents = [...events].sort(() => Math.random() - 0.5);

            const content = `
                <div class="timeline-game">
                    <div class="instructions">
                        <p>📋 <strong>Instructions:</strong> Drag and drop the events below to arrange them in chronological order from earliest to latest.</p>
                    </div>
                    <div class="timeline-line"></div>
                    <div class="timeline-events" id="timelineEvents">
                        ${shuffledEvents.map((event, index) => `
                            <div class="timeline-event" draggable="true" data-correct-order="${events.indexOf(event)}" data-index="${index}">
                                <div class="event-header">${event.event}</div>
                                <div class="event-reference">${event.reference}</div>
                                <div class="event-period">${event.period}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="timeline-dropzone" id="timelineDropzone">
                        <div class="dropzone-text">Drop events here in chronological order</div>
                    </div>
                    <button class="mini-game-btn check-btn" onclick="window.SealMiniGames.checkTimelineOrder()">Check Order</button>
                </div>
            `;

            this.setGameContent(content);
            this.initTimelineDragDrop();

        } catch (error) {
            console.error('Failed to load timeline puzzle:', error);
            this.setGameContent('<div class="error">Failed to load timeline puzzle. Please try again.</div>');
        }
    }

    // Initialize drag and drop for timeline
    initTimelineDragDrop() {
        const events = document.querySelectorAll('.timeline-event');
        const dropzone = document.getElementById('timelineDropzone');

        events.forEach(event => {
            event.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', event.dataset.index);
                event.classList.add('dragging');
            });

            event.addEventListener('dragend', () => {
                event.classList.remove('dragging');
            });
        });

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('drag-over');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('drag-over');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('drag-over');
            
            const eventIndex = e.dataTransfer.getData('text/plain');
            const event = document.querySelector(`[data-index="${eventIndex}"]`);
            
            if (event) {
                dropzone.appendChild(event);
                dropzone.querySelector('.dropzone-text').style.display = 'none';
            }
        });
    }

    // Check timeline order
    checkTimelineOrder() {
        const dropzone = document.getElementById('timelineDropzone');
        const events = [...dropzone.querySelectorAll('.timeline-event')];
        
        let correct = 0;
        events.forEach((event, index) => {
            const correctOrder = parseInt(event.dataset.correctOrder);
            if (correctOrder === index) {
                event.classList.add('correct');
                correct++;
            } else {
                event.classList.add('incorrect');
            }
        });

        const score = Math.round((correct / events.length) * 100);
        this.updateScore(score);

        if (correct === events.length) {
            this.completeGame('Perfect! You have correctly arranged the timeline of Old Testament events!');
        } else {
            setTimeout(() => {
                events.forEach(event => {
                    event.classList.remove('correct', 'incorrect');
                });
            }, 2000);
        }
    }

    // SEAL 2: Psalms and Bible Stories Quiz
    async launchPsalmsQuiz() {
        this.setGameTitle('🎵 Wisdom and Worship', 'Complete the missing words in these Psalms and Proverbs');

        try {
            const content = await window.BibleService.generateWisdomContent();
            
            const quizQuestions = content.map(item => {
                const words = item.text.split(' ');
                // Choose a meaningful word to remove (not articles or short words)
                const meaningfulWords = words.map((word, idx) => ({ word, idx }))
                    .filter(w => w.word.length > 3 && !['the', 'and', 'but', 'for', 'his', 'her', 'him', 'she', 'you', 'that', 'this', 'with', 'from', 'they', 'them', 'have', 'will', 'said', 'unto'].includes(w.word.toLowerCase()));
                
                const selectedWord = meaningfulWords[Math.floor(Math.random() * meaningfulWords.length)] || { word: words[Math.floor(words.length / 2)], idx: Math.floor(words.length / 2) };
                const wordIndex = selectedWord.idx;
                const missingWord = selectedWord.word;
                
                const questionText = words.map((word, idx) => 
                    idx === wordIndex ? '____' : word
                ).join(' ');

                return {
                    question: questionText,
                    answer: missingWord.replace(/[^\w]/g, '').toLowerCase(),
                    reference: item.reference,
                    originalText: item.text,
                    type: item.type
                };
            });

            const gameContent = `
                <div class="psalms-quiz">
                    <div class="instructions">
                        <p>📝 <strong>Instructions:</strong> Fill in the missing words from these Bible verses. Type your answer in the input field.</p>
                    </div>
                    <div class="quiz-questions" id="psalmsQuestions">
                        ${quizQuestions.map((q, index) => `
                            <div class="quiz-question" data-index="${index}">
                                <div class="question-header">
                                    <span class="question-type">${q.type === 'psalm' ? '🎵 Psalm' : '🧠 Wisdom'}</span>
                                    <span class="question-reference">${q.reference}</span>
                                </div>
                                <div class="question-text">${q.question}</div>
                                <input type="text" class="answer-input" data-answer="${q.answer}" placeholder="Enter the missing word">
                                <button class="check-answer-btn" onclick="window.SealMiniGames.checkPsalmsAnswer(${index})">Check</button>
                                <div class="answer-feedback"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            this.setGameContent(gameContent);

        } catch (error) {
            console.error('Failed to load Psalms quiz:', error);
            this.setGameContent('<div class="error">Failed to load Psalms quiz. Please try again.</div>');
        }
    }

    // Check Psalms quiz answer
    checkPsalmsAnswer(questionIndex) {
        const question = document.querySelector(`[data-index="${questionIndex}"]`);
        const input = question.querySelector('.answer-input');
        const feedback = question.querySelector('.answer-feedback');
        const correctAnswer = input.dataset.answer;
        const userAnswer = input.value.toLowerCase().trim();

        if (userAnswer === correctAnswer || this.isAnswerClose(userAnswer, correctAnswer)) {
            feedback.innerHTML = '✅ Correct! Well done!';
            feedback.className = 'answer-feedback correct';
            input.disabled = true;
            this.updateScore(this.currentGame.score + 20);
        } else {
            feedback.innerHTML = `❌ Not quite. Try again or think about the context of the verse.`;
            feedback.className = 'answer-feedback incorrect';
            // Give a hint after 2 wrong attempts
            const attempts = parseInt(input.dataset.attempts || '0') + 1;
            input.dataset.attempts = attempts;
            if (attempts >= 2) {
                feedback.innerHTML += ` <br><small>💡 Hint: The answer starts with "${correctAnswer.charAt(0).toUpperCase()}"</small>`;
            }
        }

        // Check if all questions are answered correctly
        const correctAnswers = document.querySelectorAll('.answer-feedback.correct').length;
        const totalQuestions = document.querySelectorAll('.quiz-question').length;
        
        if (correctAnswers === totalQuestions) {
            setTimeout(() => {
                this.completeGame('Excellent! You have mastered the wisdom of the Psalms and Proverbs!');
            }, 1000);
        }
    }

    // SEAL 3: Faith Principles Drag and Drop
    async launchFaithDragDrop() {
        this.setGameTitle('⛪ Principles of Faith', 'Match these Bible verses with their faith principles');

        // Get faith principles from Bible service
        const sealContent = window.BibleService ? window.BibleService.getSealContent(3) : null;
        const faithPrinciples = sealContent && sealContent.faithVerses ? sealContent.faithVerses : [
            { principle: 'Faith overcomes fear', verse: 'Fear not, for I am with you', reference: 'Isaiah 41:10' },
            { principle: 'Trust in God\'s plan', verse: 'For I know the thoughts that I think toward you', reference: 'Jeremiah 29:11' },
            { principle: 'Prayer brings peace', verse: 'Be careful for nothing; but pray', reference: 'Philippians 4:6' },
            { principle: 'Love your neighbor', verse: 'Love your neighbor as yourself', reference: 'Matthew 22:39' },
            { principle: 'God\'s strength in weakness', verse: 'My grace is sufficient for you', reference: '2 Corinthians 12:9' }
        ];

        const shuffledVerses = [...faithPrinciples].sort(() => Math.random() - 0.5);

        const content = `
            <div class="faith-dragdrop">
                <div class="instructions">
                    <p>🤝 <strong>Instructions:</strong> Drag each Bible verse to match it with the correct faith principle.</p>
                </div>
                <div class="matching-game">
                    <div class="principles-column">
                        <h3>Faith Principles</h3>
                        ${faithPrinciples.map((item, index) => `
                            <div class="principle-box" data-principle="${index}">
                                <strong>${item.principle}</strong>
                                <div class="verse-dropzone" data-answer="${index}"></div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="verses-column">
                        <h3>Bible Verses</h3>
                        ${shuffledVerses.map((item, index) => `
                            <div class="verse-card" draggable="true" data-verse="${faithPrinciples.indexOf(item)}">
                                <div class="verse-text">"${item.verse}"</div>
                                <div class="verse-reference">${item.reference}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <button class="mini-game-btn check-btn" onclick="window.SealMiniGames.checkFaithMatching()">Check Matches</button>
            </div>
        `;

        this.setGameContent(content);
        this.initFaithDragDrop();
    }

    // Initialize faith drag and drop
    initFaithDragDrop() {
        const verses = document.querySelectorAll('.verse-card');
        const dropzones = document.querySelectorAll('.verse-dropzone');

        verses.forEach(verse => {
            verse.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', verse.dataset.verse);
                verse.classList.add('dragging');
            });

            verse.addEventListener('dragend', () => {
                verse.classList.remove('dragging');
            });
        });

        dropzones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const verseId = e.dataTransfer.getData('text/plain');
                const verse = document.querySelector(`[data-verse="${verseId}"]`);
                
                if (verse && zone.children.length === 0) {
                    zone.appendChild(verse);
                }
            });
        });
    }

    // Check faith matching
    checkFaithMatching() {
        const dropzones = document.querySelectorAll('.verse-dropzone');
        let correct = 0;

        dropzones.forEach(zone => {
            const verse = zone.querySelector('.verse-card');
            if (verse) {
                const correctAnswer = zone.dataset.answer;
                const verseAnswer = verse.dataset.verse;
                
                if (correctAnswer === verseAnswer) {
                    zone.classList.add('correct');
                    verse.classList.add('correct');
                    correct++;
                } else {
                    zone.classList.add('incorrect');
                    verse.classList.add('incorrect');
                }
            }
        });

        const score = Math.round((correct / dropzones.length) * 100);
        this.updateScore(score);

        if (correct === dropzones.length) {
            this.completeGame('Outstanding! You understand these fundamental principles of faith!');
        } else {
            setTimeout(() => {
                document.querySelectorAll('.correct, .incorrect').forEach(el => {
                    el.classList.remove('correct', 'incorrect');
                });
            }, 3000);
        }
    }

    // SEAL 4: Parables Matching Game
    async launchParablesMatching() {
        this.setGameTitle('🌱 Kingdom Parables', 'Match the parables with their teachings');

        const sealContent = window.BibleService ? window.BibleService.getSealContent(4) : null;
        const parables = sealContent && sealContent.parables ? sealContent.parables : [
            { parable: 'The Good Samaritan', teaching: 'Show compassion to all people', reference: 'Luke 10:25-37' },
            { parable: 'The Prodigal Son', teaching: 'God\'s forgiveness and grace', reference: 'Luke 15:11-32' },
            { parable: 'The Mustard Seed', teaching: 'Small faith grows greatly', reference: 'Matthew 13:31-32' },
            { parable: 'The Lost Sheep', teaching: 'God seeks the lost', reference: 'Luke 15:3-7' },
            { parable: 'The Talents', teaching: 'Use your gifts faithfully', reference: 'Matthew 25:14-30' }
        ];

        const shuffledTeachings = [...parables.map(p => p.teaching)].sort(() => Math.random() - 0.5);

        const content = `
            <div class="parables-matching">
                <div class="instructions">
                    <p>🎯 <strong>Instructions:</strong> Click on a parable, then click on its matching teaching to make a pair.</p>
                </div>
                <div class="matching-grid">
                    <div class="parables-list">
                        <h3>Parables</h3>
                        ${parables.map((item, index) => `
                            <div class="parable-item" data-id="${index}" onclick="window.SealMiniGames.selectParable(${index})">
                                <strong>${item.parable}</strong>
                                <small>${item.reference}</small>
                            </div>
                        `).join('')}
                    </div>
                    <div class="teachings-list">
                        <h3>Teachings</h3>
                        ${shuffledTeachings.map((teaching, index) => `
                            <div class="teaching-item" data-teaching="${teaching}" onclick="window.SealMiniGames.selectTeaching('${teaching}')">
                                ${teaching}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="matches-display" id="matchesDisplay"></div>
            </div>
        `;

        this.setGameContent(content);
        this.parableGame = { selectedParable: null, matches: 0, parables };
    }

    // Select parable for matching
    selectParable(parableId) {
        // Clear previous selections
        document.querySelectorAll('.parable-item').forEach(item => item.classList.remove('selected'));
        document.querySelectorAll('.teaching-item').forEach(item => item.classList.remove('selected'));

        const parableItem = document.querySelector(`[data-id="${parableId}"]`);
        parableItem.classList.add('selected');
        this.parableGame.selectedParable = parableId;
    }

    // Select teaching for matching
    selectTeaching(teaching) {
        if (this.parableGame.selectedParable === null) {
            alert('Please select a parable first!');
            return;
        }

        const selectedParable = this.parableGame.parables[this.parableGame.selectedParable];
        const teachingItem = document.querySelector(`[data-teaching="${teaching}"]`);
        
        if (selectedParable.teaching === teaching) {
            // Correct match
            teachingItem.classList.add('matched');
            document.querySelector(`[data-id="${this.parableGame.selectedParable}"]`).classList.add('matched');
            
            this.parableGame.matches++;
            this.updateScore(this.currentGame.score + 20);

            // Display the match
            const matchDisplay = document.getElementById('matchesDisplay');
            matchDisplay.innerHTML += `
                <div class="successful-match">
                    ✅ <strong>${selectedParable.parable}</strong> teaches us about <em>${teaching}</em>
                </div>
            `;

            if (this.parableGame.matches === this.parableGame.parables.length) {
                this.completeGame('Wonderful! You understand the deep teachings of Jesus\' parables!');
            }
        } else {
            // Incorrect match
            teachingItem.classList.add('incorrect');
            setTimeout(() => teachingItem.classList.remove('incorrect'), 1000);
        }

        // Reset selection
        this.parableGame.selectedParable = null;
        document.querySelectorAll('.selected').forEach(item => item.classList.remove('selected'));
    }

    // SEAL 5: Church Letters Quiz
    async launchChurchLettersQuiz() {
        this.setGameTitle('📜 Letters to the Churches', 'Test your knowledge of Paul\'s epistles');

        const sealContent = window.BibleService ? window.BibleService.getSealContent(5) : null;
        const churchQuestions = sealContent && sealContent.churchQuestions ? sealContent.churchQuestions : [
            {
                question: 'Which church was told "I can do all things through Christ who strengthens me"?',
                options: ['Ephesians', 'Philippians', 'Colossians', 'Thessalonians'],
                correct: 1,
                reference: 'Philippians 4:13'
            },
            {
                question: 'Which letter contains the "Love Chapter"?',
                options: ['Romans', 'Corinthians', 'Galatians', 'Ephesians'],
                correct: 1,
                reference: '1 Corinthians 13'
            },
            {
                question: 'Which church was reminded about the "armor of God"?',
                options: ['Romans', 'Colossians', 'Ephesians', 'Philippians'],
                correct: 2,
                reference: 'Ephesians 6:10-18'
            },
            {
                question: 'Which letter teaches about spiritual gifts?',
                options: ['Romans', 'Corinthians', 'Galatians', 'Timothy'],
                correct: 1,
                reference: '1 Corinthians 12'
            }
        ];

        const content = `
            <div class="church-quiz">
                <div class="instructions">
                    <p>✉️ <strong>Instructions:</strong> Answer these questions about Paul's letters to the early churches.</p>
                </div>
                <div class="quiz-container" id="churchQuizContainer">
                    ${churchQuestions.map((q, index) => `
                        <div class="quiz-card" data-question="${index}">
                            <div class="question-text">${q.question}</div>
                            <div class="options">
                                ${q.options.map((option, optIndex) => `
                                    <button class="option-btn" data-option="${optIndex}" onclick="window.SealMiniGames.answerChurchQuestion(${index}, ${optIndex})">
                                        ${option}
                                    </button>
                                `).join('')}
                            </div>
                            <div class="question-reference">${q.reference}</div>
                            <div class="answer-result"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.setGameContent(content);
        this.churchGame = { questions: churchQuestions, answered: 0 };
    }

    // Answer church question
    answerChurchQuestion(questionIndex, optionIndex) {
        const question = this.churchGame.questions[questionIndex];
        const questionCard = document.querySelector(`[data-question="${questionIndex}"]`);
        const buttons = questionCard.querySelectorAll('.option-btn');
        const result = questionCard.querySelector('.answer-result');

        // Disable all buttons
        buttons.forEach(btn => btn.disabled = true);

        if (optionIndex === question.correct) {
            buttons[optionIndex].classList.add('correct');
            result.innerHTML = '✅ Correct! Well done!';
            result.className = 'answer-result correct';
            this.updateScore(this.currentGame.score + 25);
        } else {
            buttons[optionIndex].classList.add('incorrect');
            buttons[question.correct].classList.add('correct');
            result.innerHTML = `❌ The correct answer is ${question.options[question.correct]}`;
            result.className = 'answer-result incorrect';
        }

        this.churchGame.answered++;
        
        if (this.churchGame.answered === this.churchGame.questions.length) {
            setTimeout(() => {
                this.completeGame('Great work! You have studied Paul\'s letters to the churches well!');
            }, 2000);
        }
    }

    // SEAL 6: Healing Stories Puzzle
    async launchHealingStoriesPuzzle() {
        this.setGameTitle('🙏 Stories of Healing', 'Complete these healing miracles');

        const sealContent = window.BibleService ? window.BibleService.getSealContent(6) : null;
        const healingStories = sealContent && sealContent.healingStories ? sealContent.healingStories : [
            {
                story: 'The blind man at Bethsaida',
                incomplete: 'Jesus took the _____ man by the hand and led him outside the village.',
                answer: 'blind',
                reference: 'Mark 8:22-26'
            },
            {
                story: 'The paralytic lowered through the roof',
                incomplete: 'When Jesus saw their _____, he said to the paralytic, "Son, your sins are forgiven."',
                answer: 'faith',
                reference: 'Mark 2:1-12'
            },
            {
                story: 'The woman with the issue of blood',
                incomplete: 'She said, "If I just _____ his clothes, I will be healed."',
                answer: 'touch',
                reference: 'Mark 5:25-34'
            },
            {
                story: 'The ten lepers',
                incomplete: 'One of them, when he saw he was healed, came back, praising God in a loud _____.',
                answer: 'voice',
                reference: 'Luke 17:11-19'
            }
        ];

        const content = `
            <div class="healing-puzzle">
                <div class="instructions">
                    <p>✨ <strong>Instructions:</strong> Complete these healing stories by filling in the missing words.</p>
                </div>
                <div class="healing-stories">
                    ${healingStories.map((story, index) => `
                        <div class="healing-story" data-story="${index}">
                            <h4>${story.story}</h4>
                            <p class="story-text">${story.incomplete}</p>
                            <div class="story-input">
                                <input type="text" class="healing-input" data-answer="${story.answer.toLowerCase()}" placeholder="Fill in the missing word">
                                <button class="check-story-btn" onclick="window.SealMiniGames.checkHealingAnswer(${index})">Check</button>
                            </div>
                            <div class="story-reference">${story.reference}</div>
                            <div class="story-feedback"></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.setGameContent(content);
        this.healingGame = { stories: healingStories, completed: 0 };
    }

    // Check healing story answer
    checkHealingAnswer(storyIndex) {
        const storyCard = document.querySelector(`[data-story="${storyIndex}"]`);
        const input = storyCard.querySelector('.healing-input');
        const feedback = storyCard.querySelector('.story-feedback');
        const correctAnswer = input.dataset.answer;
        const userAnswer = input.value.toLowerCase().trim();

        if (userAnswer === correctAnswer || this.isAnswerClose(userAnswer, correctAnswer)) {
            feedback.innerHTML = '✅ Perfect! God\'s healing power is amazing!';
            feedback.className = 'story-feedback correct';
            input.disabled = true;
            this.updateScore(this.currentGame.score + 25);
            this.healingGame.completed++;

            if (this.healingGame.completed === this.healingGame.stories.length) {
                setTimeout(() => {
                    this.completeGame('Blessed! You understand the power of God\'s healing love!');
                }, 1000);
            }
        } else {
            feedback.innerHTML = `❌ Not quite. Think about what makes sense in this healing context.`;
            feedback.className = 'story-feedback incorrect';
            // Give a hint after 2 wrong attempts
            const attempts = parseInt(input.dataset.attempts || '0') + 1;
            input.dataset.attempts = attempts;
            if (attempts >= 2) {
                feedback.innerHTML += ` <br><small>💡 Hint: It's a ${correctAnswer.length}-letter word starting with "${correctAnswer.charAt(0).toUpperCase()}"</small>`;
            }
        }
    }

    // SEAL 7: Revelation Symbols Puzzle
    async launchRevelationSymbols() {
        this.setGameTitle('🔮 Symbols of Revelation', 'Decode the symbolic language of Revelation');

        const sealContent = window.BibleService ? window.BibleService.getSealContent(7) : null;
        const symbols = sealContent && sealContent.symbols ? sealContent.symbols : [
            { symbol: '🐑 Lamb', meaning: 'Jesus Christ', reference: 'Revelation 5:6' },
            { symbol: '👑 24 Elders', meaning: 'Representatives of God\'s people', reference: 'Revelation 4:4' },
            { symbol: '🌟 Morning Star', meaning: 'Jesus as the bright hope', reference: 'Revelation 22:16' },
            { symbol: '🌆 New Jerusalem', meaning: 'The eternal dwelling with God', reference: 'Revelation 21:2' },
            { symbol: '⚡ Seven Thunders', meaning: 'God\'s powerful voice', reference: 'Revelation 10:3-4' }
        ];

        const shuffledMeanings = [...symbols.map(s => s.meaning)].sort(() => Math.random() - 0.5);

        const content = `
            <div class="revelation-symbols">
                <div class="instructions">
                    <p>🔍 <strong>Instructions:</strong> Match each symbol from Revelation with its correct meaning.</p>
                </div>
                <div class="symbols-matching">
                    <div class="symbols-column">
                        <h3>Symbols</h3>
                        ${symbols.map((item, index) => `
                            <div class="symbol-card" data-symbol="${index}" onclick="window.SealMiniGames.selectSymbol(${index})">
                                <div class="symbol">${item.symbol}</div>
                                <div class="reference">${item.reference}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="meanings-column">
                        <h3>Meanings</h3>
                        ${shuffledMeanings.map((meaning, index) => `
                            <div class="meaning-card" data-meaning="${meaning}" onclick="window.SealMiniGames.selectMeaning('${meaning}')">
                                ${meaning}
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="symbol-matches" id="symbolMatches"></div>
            </div>
        `;

        this.setGameContent(content);
        this.revelationGame = { selectedSymbol: null, matches: 0, symbols };
    }

    // Select symbol
    selectSymbol(symbolId) {
        document.querySelectorAll('.symbol-card').forEach(card => card.classList.remove('selected'));
        document.querySelectorAll('.meaning-card').forEach(card => card.classList.remove('selected'));
        
        const symbolCard = document.querySelector(`[data-symbol="${symbolId}"]`);
        symbolCard.classList.add('selected');
        this.revelationGame.selectedSymbol = symbolId;
    }

    // Select meaning
    selectMeaning(meaning) {
        if (this.revelationGame.selectedSymbol === null) {
            alert('Please select a symbol first!');
            return;
        }

        const selectedSymbol = this.revelationGame.symbols[this.revelationGame.selectedSymbol];
        const meaningCard = document.querySelector(`[data-meaning="${meaning}"]`);
        
        if (selectedSymbol.meaning === meaning) {
            // Correct match
            meaningCard.classList.add('matched');
            document.querySelector(`[data-symbol="${this.revelationGame.selectedSymbol}"]`).classList.add('matched');
            
            this.revelationGame.matches++;
            this.updateScore(this.currentGame.score + 20);

            // Display the match
            const matchDisplay = document.getElementById('symbolMatches');
            matchDisplay.innerHTML += `
                <div class="successful-match">
                    ✅ ${selectedSymbol.symbol} represents <strong>${meaning}</strong>
                </div>
            `;

            if (this.revelationGame.matches === this.revelationGame.symbols.length) {
                this.completeGame('Magnificent! You understand the prophetic symbols of Revelation!');
            }
        } else {
            meaningCard.classList.add('incorrect');
            setTimeout(() => meaningCard.classList.remove('incorrect'), 1000);
        }

        // Reset selection
        this.revelationGame.selectedSymbol = null;
        document.querySelectorAll('.selected').forEach(item => item.classList.remove('selected'));
    }

    // Helper methods
    setGameTitle(title, subtitle) {
        document.getElementById('miniGameTitle').innerHTML = `${title}<br><small>${subtitle}</small>`;
    }

    setGameContent(content) {
        document.getElementById('miniGameContent').innerHTML = content;
    }

    updateScore(newScore) {
        this.currentGame.score = newScore;
        document.getElementById('miniGameScore').textContent = `Score: ${newScore}`;
        
        if (this.gameCallbacks.onScoreUpdate) {
            this.gameCallbacks.onScoreUpdate(newScore);
        }
    }

    completeGame(message) {
        setTimeout(() => {
            alert(message);
            
            if (this.gameCallbacks.onComplete) {
                this.gameCallbacks.onComplete(this.currentGame.sealNumber, this.currentGame.score);
            }
            
            this.closeGame();
        }, 1000);
    }

    closeGame() {
        if (this.gameContainer) {
            this.gameContainer.style.display = 'none';
        }
        this.currentGame = null;
        this.isGameActive = false;
    }

    resetGame() {
        if (this.currentGame) {
            this.launchSealGame(this.currentGame.sealNumber, this.gameCallbacks);
        }
    }

    showHint() {
        if (this.currentGame && this.currentGame.hints > 0) {
            this.currentGame.hints--;
            // Implement seal-specific hints
            alert('💡 Hint: Read the scripture references carefully for context clues!');
        } else {
            alert('No more hints available!');
        }
    }

    // Helper function for flexible answer checking
    isAnswerClose(userAnswer, correctAnswer) {
        const similarity = this.stringSimilarity(userAnswer, correctAnswer);
        return similarity > 0.8; // 80% similarity threshold
    }

    // String similarity calculation
    stringSimilarity(a, b) {
        const longer = a.length > b.length ? a : b;
        const shorter = a.length > b.length ? b : a;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    // Levenshtein distance for string comparison
    levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // deletion
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }
}

// Global instance
window.SealMiniGames = new SealMiniGames();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.SealMiniGames.initialize();
    }, 500);
});
