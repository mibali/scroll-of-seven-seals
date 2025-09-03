/**
 * Enhanced Seal Mechanics - Unique Gameplay for Each Seal
 * Each seal has specialized interactive mechanics tied to biblical themes
 */

// Seal Mechanics Manager - Orchestrates unique seal experiences
class SealMechanicsManager {
    constructor() {
        this.activeMechanic = null;
        this.mechanicsRegistry = {};
        this.fullScreenMode = false;
        
        // Register all seal mechanics
        this.registerMechanics();
        
        console.log('🎯 SealMechanicsManager initialized with', Object.keys(this.mechanicsRegistry).length, 'mechanics');
    }

    registerMechanics() {
        // Seal 1: Old Testament Events - Interactive Timeline
        this.mechanicsRegistry[1] = new SealOneMechanic();
        
        // Seal 2: Psalms & Proverbs - Memory Match
        this.mechanicsRegistry[2] = new SealTwoMechanic();
        
        // Seal 3: Faith & Growth - Progressive Journey
        this.mechanicsRegistry[3] = new SealThreeMechanic();
        
        // Seal 4: Kingdom Parables - Story Choices
        this.mechanicsRegistry[4] = new SealFourMechanic();
        
        // Seal 5: New Testament - Letter Sorting
        this.mechanicsRegistry[5] = new SealFiveMechanic();
        
        // Seal 6: Health & Vitality - Wellness Principles
        this.mechanicsRegistry[6] = new SealSixMechanic();
        
        // Seal 7: Revelation - Final Challenge
        this.mechanicsRegistry[7] = new SealSevenMechanic();
    }

    // Launch a seal's unique mechanic
    async launchSealMechanic(sealId, contentVariation) {
        const mechanic = this.mechanicsRegistry[sealId];
        if (!mechanic) {
            throw new Error(`No mechanic found for seal ${sealId}`);
        }

        // Enter full-screen mode for seal
        await this.enterSealFullScreen();
        
        // Initialize and start the mechanic
        try {
            this.activeMechanic = mechanic;
            await mechanic.initialize(contentVariation);
            await mechanic.start();
            
            console.log(`🎮 Launched seal ${sealId} mechanic:`, mechanic.constructor.name);
            
        } catch (error) {
            console.error(`Error launching seal ${sealId} mechanic:`, error);
            this.exitSealFullScreen();
            throw error;
        }
    }

    // Enter full-screen seal mode
    async enterSealFullScreen() {
        this.fullScreenMode = true;
        
        // Hide main game UI
        const gameContainer = document.getElementById('gameContainer');
        const mainUI = document.querySelector('.container');
        
        if (gameContainer) gameContainer.style.display = 'none';
        if (mainUI) mainUI.style.display = 'none';
        
        // Create full-screen seal container
        const sealContainer = document.createElement('div');
        sealContainer.id = 'sealFullScreenContainer';
        sealContainer.className = 'seal-fullscreen-container';
        sealContainer.innerHTML = `
            <div class="seal-overlay">
                <div id="sealContent" class="seal-content"></div>
                <div class="seal-controls">
                    <button id="sealExitBtn" class="seal-exit-btn" onclick="sealMechanicsManager.exitSealFullScreen()">
                        ✕ Exit Seal
                    </button>
                    <button id="sealFullScreenBtn" class="seal-fullscreen-btn" onclick="sealMechanicsManager.toggleBrowserFullScreen()">
                        ⛶ Full Screen
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(sealContainer);
        
        // Add fullscreen styles
        document.body.classList.add('seal-fullscreen-active');
    }

    // Exit full-screen seal mode
    exitSealFullScreen() {
        this.fullScreenMode = false;
        
        // Clean up active mechanic
        if (this.activeMechanic) {
            this.activeMechanic.cleanup();
            this.activeMechanic = null;
        }
        
        // Remove seal container
        const sealContainer = document.getElementById('sealFullScreenContainer');
        if (sealContainer) {
            sealContainer.remove();
        }
        
        // Restore main UI
        const gameContainer = document.getElementById('gameContainer');
        const mainUI = document.querySelector('.container');
        
        if (gameContainer) gameContainer.style.display = 'block';
        if (mainUI) mainUI.style.display = 'block';
        
        document.body.classList.remove('seal-fullscreen-active');
        
        console.log('🚪 Exited seal full-screen mode');
    }

    // Toggle browser full-screen
    toggleBrowserFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // Complete current seal
    completeSeal(keyword) {
        if (this.activeMechanic) {
            const sealId = this.activeMechanic.sealId;
            
            // Notify unified controller
            if (window.unifiedGameController) {
                window.unifiedGameController.completeSeal(sealId, keyword);
            }
            
            // Show completion animation
            this.showCompletionAnimation(sealId, keyword);
            
            // Exit after animation
            setTimeout(() => {
                this.exitSealFullScreen();
            }, 3000);
        }
    }

    // Show seal completion animation
    showCompletionAnimation(sealId, keyword) {
        const content = document.getElementById('sealContent');
        if (content) {
            content.innerHTML = `
                <div class="seal-completion-animation">
                    <div class="completion-glow"></div>
                    <div class="completion-content">
                        <h1 class="completion-title">🎉 SEAL ${sealId} UNLOCKED! 🎉</h1>
                        <div class="completion-keyword">Keyword: <span class="keyword">${keyword}</span></div>
                        <div class="completion-particles"></div>
                    </div>
                </div>
            `;
        }
    }
}

// Base Seal Mechanic Class
class BaseSealMechanic {
    constructor(sealId, theme) {
        this.sealId = sealId;
        this.theme = theme;
        this.isActive = false;
        this.contentVariation = null;
        this.completion = {
            keyword: null,
            score: 0,
            hintsUsed: 0
        };
    }

    async initialize(contentVariation) {
        this.contentVariation = contentVariation;
        this.isActive = true;
        console.log(`🔧 Initialized ${this.constructor.name}`);
    }

    async start() {
        throw new Error('start() must be implemented by subclass');
    }

    cleanup() {
        this.isActive = false;
        console.log(`🧹 Cleaned up ${this.constructor.name}`);
    }

    complete(keyword) {
        this.completion.keyword = keyword;
        this.isActive = false;
        
        if (window.sealMechanicsManager) {
            window.sealMechanicsManager.completeSeal(keyword);
        }
    }
}

// SEAL 1: Old Testament Interactive Timeline
class SealOneMechanic extends BaseSealMechanic {
    constructor() {
        super(1, 'Old Testament Events');
        this.timeline = [];
        this.userOrder = [];
        this.correctOrder = [];
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = this.generateTimelineHTML();
        
        this.setupTimelineInteraction();
        this.generateTimelineEvents();
    }

    generateTimelineHTML() {
        return `
            <div class="seal-one-timeline">
                <h2>📜 OLD TESTAMENT TIMELINE CHALLENGE</h2>
                <p class="instruction">Drag the events to arrange them in chronological order!</p>
                
                <div class="timeline-workspace">
                    <div id="eventsPool" class="events-pool">
                        <h3>📚 Biblical Events</h3>
                        <div class="events-container"></div>
                    </div>
                    
                    <div id="timelinePath" class="timeline-path">
                        <h3>⏰ Correct Timeline Order</h3>
                        <div class="timeline-slots"></div>
                    </div>
                </div>
                
                <div class="timeline-controls">
                    <button id="checkTimelineBtn" class="btn-primary" onclick="sealMechanicsManager.mechanicsRegistry[1].checkOrder()">
                        ✅ Check Order
                    </button>
                    <button id="resetTimelineBtn" class="btn-secondary" onclick="sealMechanicsManager.mechanicsRegistry[1].resetTimeline()">
                        🔄 Reset
                    </button>
                </div>
                
                <div id="timelineResult" class="timeline-result"></div>
            </div>
        `;
    }

    generateTimelineEvents() {
        // Old Testament events with approximate timeline order
        this.timeline = [
            { id: 1, event: 'Creation of the World', period: 'Beginning', hint: 'Genesis 1' },
            { id: 2, event: 'Noah\'s Flood', period: 'Ancient Times', hint: 'Genesis 6-9' },
            { id: 3, event: 'Abraham\'s Call', period: 'Patriarchs', hint: 'Genesis 12' },
            { id: 4, event: 'Exodus from Egypt', period: 'Liberation', hint: 'Exodus 12-14' },
            { id: 5, event: 'David becomes King', period: 'United Kingdom', hint: '2 Samuel 2' },
            { id: 6, event: 'Temple Built by Solomon', period: 'Golden Age', hint: '1 Kings 6' },
            { id: 7, event: 'Babylonian Exile', period: 'Judgment', hint: '2 Kings 25' }
        ];

        // Shuffle events for user to sort
        const shuffledEvents = [...this.timeline].sort(() => Math.random() - 0.5);
        this.correctOrder = this.timeline.map(e => e.id);
        
        this.renderEvents(shuffledEvents);
        this.renderTimelineSlots();
    }

    renderEvents(events) {
        const container = document.querySelector('.events-container');
        container.innerHTML = events.map(event => `
            <div class="timeline-event" draggable="true" data-event-id="${event.id}">
                <div class="event-title">${event.event}</div>
                <div class="event-period">${event.period}</div>
                <div class="event-hint">💡 ${event.hint}</div>
            </div>
        `).join('');
    }

    renderTimelineSlots() {
        const container = document.querySelector('.timeline-slots');
        container.innerHTML = Array(7).fill(0).map((_, index) => `
            <div class="timeline-slot" data-slot="${index + 1}">
                <div class="slot-number">${index + 1}</div>
                <div class="slot-content">Drop here</div>
            </div>
        `).join('');
    }

    setupTimelineInteraction() {
        // Drag and drop functionality
        const eventsContainer = document.querySelector('.events-container');
        const slotsContainer = document.querySelector('.timeline-slots');
        
        eventsContainer.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('timeline-event')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.eventId);
                e.target.classList.add('dragging');
            }
        });
        
        eventsContainer.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
        
        slotsContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.target.classList.add('drag-over');
        });
        
        slotsContainer.addEventListener('dragleave', (e) => {
            e.target.classList.remove('drag-over');
        });
        
        slotsContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            e.target.classList.remove('drag-over');
            
            if (e.target.classList.contains('timeline-slot') || e.target.parentElement.classList.contains('timeline-slot')) {
                const slot = e.target.classList.contains('timeline-slot') ? e.target : e.target.parentElement;
                const eventId = e.dataTransfer.getData('text/plain');
                const eventElement = document.querySelector(`[data-event-id="${eventId}"]`);
                
                if (eventElement) {
                    this.placeEventInSlot(eventElement, slot);
                }
            }
        });
    }

    placeEventInSlot(eventElement, slot) {
        const slotContent = slot.querySelector('.slot-content');
        const eventTitle = eventElement.querySelector('.event-title').textContent;
        
        slotContent.textContent = eventTitle;
        slotContent.dataset.eventId = eventElement.dataset.eventId;
        slot.classList.add('filled');
        
        // Remove from events pool
        eventElement.style.opacity = '0.3';
        eventElement.draggable = false;
    }

    checkOrder() {
        const slots = document.querySelectorAll('.timeline-slot');
        this.userOrder = Array.from(slots).map(slot => {
            const content = slot.querySelector('.slot-content');
            return content.dataset.eventId ? parseInt(content.dataset.eventId) : null;
        }).filter(id => id !== null);

        if (this.userOrder.length !== this.correctOrder.length) {
            this.showResult('Please fill all timeline slots!', 'warning');
            return;
        }

        const isCorrect = JSON.stringify(this.userOrder) === JSON.stringify(this.correctOrder);
        
        if (isCorrect) {
            this.showResult('🎉 Perfect! You\'ve arranged the Old Testament timeline correctly!', 'success');
            setTimeout(() => {
                this.complete('CREATION');
            }, 2000);
        } else {
            this.showResult('Not quite right. Check the biblical timeline order. Hint: Think about the age of each event.', 'error');
            this.highlightErrors();
        }
    }

    highlightErrors() {
        const slots = document.querySelectorAll('.timeline-slot');
        slots.forEach((slot, index) => {
            const content = slot.querySelector('.slot-content');
            const userEventId = content.dataset.eventId ? parseInt(content.dataset.eventId) : null;
            const correctEventId = this.correctOrder[index];
            
            if (userEventId !== correctEventId) {
                slot.classList.add('incorrect');
            } else {
                slot.classList.add('correct');
            }
        });
    }

    resetTimeline() {
        // Clear all slots
        const slots = document.querySelectorAll('.timeline-slot');
        slots.forEach(slot => {
            const slotContent = slot.querySelector('.slot-content');
            slotContent.textContent = 'Drop here';
            delete slotContent.dataset.eventId;
            slot.classList.remove('filled', 'correct', 'incorrect');
        });
        
        // Restore all events
        const events = document.querySelectorAll('.timeline-event');
        events.forEach(event => {
            event.style.opacity = '1';
            event.draggable = true;
        });
        
        this.userOrder = [];
        this.showResult('', 'info');
    }

    showResult(message, type) {
        const result = document.getElementById('timelineResult');
        result.textContent = message;
        result.className = `timeline-result ${type}`;
    }
}

// SEAL 2: Psalms & Proverbs Memory Match
class SealTwoMechanic extends BaseSealMechanic {
    constructor() {
        super(2, 'Psalms & Proverbs Wisdom');
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 6;
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = this.generateMemoryGameHTML();
        
        this.generateMemoryCards();
        this.setupMemoryGame();
    }

    generateMemoryGameHTML() {
        return `
            <div class="seal-two-memory">
                <h2>🧠 PSALMS & PROVERBS MEMORY CHALLENGE</h2>
                <p class="instruction">Match verses with their meanings. Find all pairs to unlock the seal!</p>
                
                <div class="memory-stats">
                    <div class="stat">
                        <span class="label">Pairs Found:</span>
                        <span id="pairsFound" class="value">0</span> / ${this.totalPairs}
                    </div>
                    <div class="stat">
                        <span class="label">Moves:</span>
                        <span id="moveCount" class="value">0</span>
                    </div>
                </div>
                
                <div id="memoryGrid" class="memory-grid"></div>
                
                <div class="memory-controls">
                    <button id="newGameBtn" class="btn-secondary" onclick="sealMechanicsManager.mechanicsRegistry[2].newGame()">
                        🎲 New Game
                    </button>
                </div>
                
                <div id="memoryResult" class="memory-result"></div>
            </div>
        `;
    }

    generateMemoryCards() {
        const wisdomPairs = [
            {
                verse: 'The Lord is my shepherd',
                meaning: 'Psalm 23 - God\'s care and guidance'
            },
            {
                verse: 'Trust in the Lord with all your heart',
                meaning: 'Proverbs 3:5 - Complete faith in God'
            },
            {
                verse: 'Be still and know that I am God',
                meaning: 'Psalm 46:10 - Peace in God\'s presence'
            },
            {
                verse: 'A gentle answer turns away wrath',
                meaning: 'Proverbs 15:1 - Wisdom in communication'
            },
            {
                verse: 'Create in me a clean heart',
                meaning: 'Psalm 51:10 - Prayer for purification'
            },
            {
                verse: 'Train up a child in the way he should go',
                meaning: 'Proverbs 22:6 - Godly parenting wisdom'
            }
        ];

        // Create card pairs
        this.cards = [];
        wisdomPairs.forEach((pair, index) => {
            this.cards.push({
                id: index * 2,
                pairId: index,
                type: 'verse',
                content: pair.verse,
                matched: false
            });
            this.cards.push({
                id: index * 2 + 1,
                pairId: index,
                type: 'meaning',
                content: pair.meaning,
                matched: false
            });
        });

        // Shuffle cards
        this.cards = this.cards.sort(() => Math.random() - 0.5);
    }

    setupMemoryGame() {
        const grid = document.getElementById('memoryGrid');
        grid.innerHTML = this.cards.map(card => `
            <div class="memory-card" data-card-id="${card.id}" data-pair-id="${card.pairId}">
                <div class="card-front">
                    <div class="card-icon">${card.type === 'verse' ? '📜' : '💡'}</div>
                </div>
                <div class="card-back">
                    <div class="card-content">${card.content}</div>
                </div>
            </div>
        `).join('');

        // Add click handlers
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
        });
    }

    flipCard(cardElement) {
        if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) {
            return;
        }

        if (this.flippedCards.length >= 2) {
            return;
        }

        cardElement.classList.add('flipped');
        this.flippedCards.push(cardElement);

        if (this.flippedCards.length === 2) {
            setTimeout(() => this.checkMatch(), 1000);
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const pairId1 = parseInt(card1.dataset.pairId);
        const pairId2 = parseInt(card2.dataset.pairId);

        if (pairId1 === pairId2) {
            // Match found
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.matchedPairs++;
            
            this.updateStats();
            
            if (this.matchedPairs === this.totalPairs) {
                setTimeout(() => {
                    this.showResult('🎉 Excellent! You\'ve found all wisdom pairs!', 'success');
                    setTimeout(() => {
                        this.complete('WISDOM');
                    }, 2000);
                }, 500);
            }
        } else {
            // No match
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        this.flippedCards = [];
        this.updateMoveCount();
    }

    updateStats() {
        document.getElementById('pairsFound').textContent = this.matchedPairs;
    }

    updateMoveCount() {
        const moveCount = document.getElementById('moveCount');
        const currentMoves = parseInt(moveCount.textContent);
        moveCount.textContent = currentMoves + 1;
    }

    newGame() {
        this.matchedPairs = 0;
        this.flippedCards = [];
        document.getElementById('moveCount').textContent = '0';
        this.generateMemoryCards();
        this.setupMemoryGame();
        this.updateStats();
        this.showResult('', 'info');
    }

    showResult(message, type) {
        const result = document.getElementById('memoryResult');
        result.textContent = message;
        result.className = `memory-result ${type}`;
    }
}

// SEAL 3: Faith Journey Progressive Challenge  
class SealThreeMechanic extends BaseSealMechanic {
    constructor() {
        super(3, 'Faith & Spiritual Growth');
        this.currentStage = 0;
        this.stages = [];
        this.userChoices = [];
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = this.generateJourneyHTML();
        
        this.setupFaithJourney();
        this.showCurrentStage();
    }

    generateJourneyHTML() {
        return `
            <div class="seal-three-journey">
                <h2>🌱 FAITH & GROWTH JOURNEY</h2>
                <p class="instruction">Navigate through the stages of spiritual growth by making faithful choices!</p>
                
                <div class="journey-progress">
                    <div class="progress-bar">
                        <div id="journeyProgress" class="progress-fill"></div>
                    </div>
                    <div class="stage-indicator">Stage <span id="currentStageNum">1</span> of 5</div>
                </div>
                
                <div id="journeyStage" class="journey-stage"></div>
                
                <div id="journeyResult" class="journey-result"></div>
            </div>
        `;
    }

    setupFaithJourney() {
        this.stages = [
            {
                id: 1,
                title: 'Hearing the Call',
                description: 'Like Abraham, you hear God calling you to something new. What is your response?',
                choices: [
                    { text: 'Step out in faith immediately', outcome: 'bold', points: 3 },
                    { text: 'Ask for confirmation and signs', outcome: 'cautious', points: 2 },
                    { text: 'Ignore the call and stay comfortable', outcome: 'resistant', points: 1 }
                ],
                lesson: 'Faith often requires stepping into the unknown with trust in God.'
            },
            {
                id: 2,
                title: 'Facing Trials',
                description: 'Like Job, you face unexpected challenges. How do you respond?',
                choices: [
                    { text: 'Maintain faith despite circumstances', outcome: 'steadfast', points: 3 },
                    { text: 'Question God but keep seeking Him', outcome: 'struggling', points: 2 },
                    { text: 'Blame God and turn away', outcome: 'bitter', points: 1 }
                ],
                lesson: 'Trials test and strengthen our faith when we persevere.'
            },
            {
                id: 3,
                title: 'Serving Others',
                description: 'Like Jesus washing the disciples\' feet, how do you serve others?',
                choices: [
                    { text: 'Serve humbly without seeking recognition', outcome: 'humble', points: 3 },
                    { text: 'Serve but hope others notice', outcome: 'mixed', points: 2 },
                    { text: 'Only serve when it benefits you', outcome: 'selfish', points: 1 }
                ],
                lesson: 'True faith expresses itself through humble service.'
            },
            {
                id: 4,
                title: 'Forgiveness Challenge',
                description: 'Like Joseph forgiving his brothers, someone has wronged you. Your response?',
                choices: [
                    { text: 'Forgive completely and seek reconciliation', outcome: 'forgiving', points: 3 },
                    { text: 'Forgive but maintain some distance', outcome: 'guarded', points: 2 },
                    { text: 'Hold onto resentment and seek revenge', outcome: 'vengeful', points: 1 }
                ],
                lesson: 'Forgiveness is a choice that frees both giver and receiver.'
            },
            {
                id: 5,
                title: 'Mature Faith',
                description: 'Like Paul near the end of his life, how do you view your faith journey?',
                choices: [
                    { text: 'I have fought the good fight and kept the faith', outcome: 'mature', points: 3 },
                    { text: 'I\'m still learning and growing in faith', outcome: 'growing', points: 2 },
                    { text: 'I feel like I haven\'t accomplished much', outcome: 'discouraged', points: 1 }
                ],
                lesson: 'Mature faith recognizes growth while remaining humble.'
            }
        ];
    }

    showCurrentStage() {
        if (this.currentStage >= this.stages.length) {
            this.completeJourney();
            return;
        }

        const stage = this.stages[this.currentStage];
        const stageContainer = document.getElementById('journeyStage');
        
        stageContainer.innerHTML = `
            <div class="stage-content">
                <h3>${stage.title}</h3>
                <p class="stage-description">${stage.description}</p>
                
                <div class="stage-choices">
                    ${stage.choices.map((choice, index) => `
                        <button class="choice-btn" onclick="sealMechanicsManager.mechanicsRegistry[3].makeChoice(${index})">
                            ${choice.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Update progress
        const progress = ((this.currentStage) / this.stages.length) * 100;
        document.getElementById('journeyProgress').style.width = `${progress}%`;
        document.getElementById('currentStageNum').textContent = this.currentStage + 1;
    }

    makeChoice(choiceIndex) {
        const stage = this.stages[this.currentStage];
        const choice = stage.choices[choiceIndex];
        
        this.userChoices.push({
            stage: this.currentStage,
            choice: choiceIndex,
            outcome: choice.outcome,
            points: choice.points
        });

        // Show lesson
        this.showStageResult(stage.lesson, choice.outcome);

        // Move to next stage
        setTimeout(() => {
            this.currentStage++;
            this.showCurrentStage();
        }, 3000);
    }

    showStageResult(lesson, outcome) {
        const result = document.getElementById('journeyResult');
        const outcomeMessages = {
            bold: '✨ Bold faith leads to great adventures!',
            cautious: '🤔 Thoughtful faith seeks wisdom.',
            resistant: '😔 Resistance limits spiritual growth.',
            steadfast: '💪 Steadfast faith overcomes all trials!',
            struggling: '🙏 Honest struggle deepens faith.',
            bitter: '😢 Bitterness blocks spiritual progress.',
            humble: '🌟 Humble service reflects Christ\'s heart!',
            mixed: '⚖️ Mixed motives need purification.',
            selfish: '💔 Selfishness hinders true service.',
            forgiving: '❤️ Forgiveness brings freedom and peace!',
            guarded: '🛡️ Guarded forgiveness is incomplete.',
            vengeful: '⚡ Vengeance destroys the soul.',
            mature: '👑 Mature faith bears eternal fruit!',
            growing: '🌱 Growing faith is always beautiful.',
            discouraged: '🌧️ Discouragement clouds God\'s work.'
        };

        result.innerHTML = `
            <div class="stage-result">
                <p class="outcome-message">${outcomeMessages[outcome]}</p>
                <p class="lesson"><strong>Lesson:</strong> ${lesson}</p>
            </div>
        `;
    }

    completeJourney() {
        const totalPoints = this.userChoices.reduce((sum, choice) => sum + choice.points, 0);
        const maxPoints = this.stages.length * 3;
        const faithLevel = this.getFaithLevel(totalPoints, maxPoints);

        const stageContainer = document.getElementById('journeyStage');
        stageContainer.innerHTML = `
            <div class="journey-completion">
                <h3>🎉 Faith Journey Complete!</h3>
                <p>Your faith journey score: <strong>${totalPoints}/${maxPoints}</strong></p>
                <p class="faith-level">${faithLevel.message}</p>
                
                <div class="growth-summary">
                    <h4>Your Spiritual Growth Pattern:</h4>
                    <ul>
                        ${this.userChoices.map((choice, index) => `
                            <li>${this.stages[index].title}: ${this.getOutcomeDescription(choice.outcome)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Update progress to 100%
        document.getElementById('journeyProgress').style.width = '100%';

        setTimeout(() => {
            this.complete('GROWTH');
        }, 4000);
    }

    getFaithLevel(points, maxPoints) {
        const percentage = points / maxPoints;
        
        if (percentage >= 0.9) {
            return { level: 'Mature Faith', message: '🌟 You demonstrate mature, Christ-like faith!' };
        } else if (percentage >= 0.7) {
            return { level: 'Growing Faith', message: '🌱 Your faith is growing strong and steady!' };
        } else if (percentage >= 0.5) {
            return { level: 'Developing Faith', message: '🌿 Your faith is developing - keep growing!' };
        } else {
            return { level: 'Beginning Faith', message: '🌱 Every faith journey starts with small steps!' };
        }
    }

    getOutcomeDescription(outcome) {
        const descriptions = {
            bold: 'Bold and courageous',
            cautious: 'Thoughtful and careful',
            resistant: 'Hesitant and resistant',
            steadfast: 'Steadfast and strong',
            struggling: 'Honest and wrestling',
            bitter: 'Bitter and resentful',
            humble: 'Humble and selfless',
            mixed: 'Mixed motives',
            selfish: 'Self-focused',
            forgiving: 'Forgiving and gracious',
            guarded: 'Cautiously forgiving',
            vengeful: 'Seeking revenge',
            mature: 'Mature and content',
            growing: 'Still growing',
            discouraged: 'Feeling discouraged'
        };
        
        return descriptions[outcome] || 'Unknown';
    }
}

// Placeholder classes for remaining seals (to be implemented)
class SealFourMechanic extends BaseSealMechanic {
    constructor() {
        super(4, 'Kingdom Parables');
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = `
            <div class="seal-placeholder">
                <h2>🏰 KINGDOM PARABLES CHALLENGE</h2>
                <p>Interactive parable story choices coming soon!</p>
                <button onclick="sealMechanicsManager.mechanicsRegistry[4].complete('KINGDOM')">
                    Complete (Placeholder)
                </button>
            </div>
        `;
    }
}

class SealFiveMechanic extends BaseSealMechanic {
    constructor() {
        super(5, 'New Testament Letters');
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = `
            <div class="seal-placeholder">
                <h2>✉️ NEW TESTAMENT LETTERS CHALLENGE</h2>
                <p>Letter sorting mechanic coming soon!</p>
                <button onclick="sealMechanicsManager.mechanicsRegistry[5].complete('GOSPEL')">
                    Complete (Placeholder)
                </button>
            </div>
        `;
    }
}

class SealSixMechanic extends BaseSealMechanic {
    constructor() {
        super(6, 'Health & Vitality');
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = `
            <div class="seal-placeholder">
                <h2>💪 HEALTH & VITALITY CHALLENGE</h2>
                <p>Wellness principles mechanic coming soon!</p>
                <button onclick="sealMechanicsManager.mechanicsRegistry[6].complete('HEALING')">
                    Complete (Placeholder)
                </button>
            </div>
        `;
    }
}

class SealSevenMechanic extends BaseSealMechanic {
    constructor() {
        super(7, 'Revelation Final Challenge');
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = `
            <div class="seal-placeholder">
                <h2>🔥 REVELATION FINAL CHALLENGE</h2>
                <p>Ultimate final challenge coming soon!</p>
                <button onclick="sealMechanicsManager.mechanicsRegistry[7].complete('VICTORY')">
                    Complete (Placeholder)
                </button>
            </div>
        `;
    }
}

// Initialize global seal mechanics manager
window.SealMechanicsManager = SealMechanicsManager;
window.sealMechanicsManager = new SealMechanicsManager();

console.log('🎯 New Seal Mechanics system loaded successfully');
