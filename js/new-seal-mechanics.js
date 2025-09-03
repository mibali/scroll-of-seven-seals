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
        
        // Re-render seals to show current progress
        setTimeout(() => {
            if (window.renderSeals) {
                window.renderSeals();
                console.log('🎯 Re-rendered seals on exit to show current progress');
            }
        }, 200);
        
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
            
            // Exit after animation and re-render seals
            setTimeout(() => {
                this.exitSealFullScreen();
                
                // Re-render seals to show newly unlocked ones
                setTimeout(() => {
                    if (window.renderSeals) {
                        window.renderSeals();
                        console.log('🎯 Re-rendered seals after seal completion');
                    }
                }, 500);
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
        
        // Clear previous content if any
        if (slotContent.dataset.eventId) {
            // Return previous event to pool
            this.returnEventToPool(slotContent.dataset.eventId);
        }
        
        slotContent.textContent = eventTitle;
        slotContent.dataset.eventId = eventElement.dataset.eventId;
        slot.classList.add('filled');
        
        // Remove from events pool
        eventElement.style.opacity = '0.3';
        eventElement.draggable = false;
    }

    returnEventToPool(eventId) {
        const eventElement = document.querySelector(`[data-event-id="${eventId}"]`);
        if (eventElement) {
            eventElement.style.opacity = '1';
            eventElement.draggable = true;
        }
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

// SEAL 4: Kingdom Parables Interactive Story
class SealFourMechanic extends BaseSealMechanic {
    constructor() {
        super(4, 'Kingdom Parables');
        this.currentParable = null;
        this.playerChoices = [];
        this.wisdomScore = 0;
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = this.generateParableHTML();
        
        this.setupKingdomParable();
    }

    generateParableHTML() {
        return `
            <div class="seal-four-parables">
                <h2>🏰 KINGDOM PARABLES CHALLENGE</h2>
                <p class="instruction">Experience Jesus' parables through interactive choices. Choose wisely to unlock kingdom wisdom!</p>
                
                <div id="parableStory" class="parable-story"></div>
                
                <div class="wisdom-score">
                    <span>Kingdom Wisdom: <span id="wisdomScore">0</span>/15</span>
                </div>
                
                <div id="parableResult" class="parable-result"></div>
            </div>
        `;
    }

    setupKingdomParable() {
        this.currentParable = {
            title: "The Parable of the Sower",
            story: "A farmer went out to sow his seed. As he was scattering the seed, some fell along the path, some on rocky places, some among thorns, and some on good soil.",
            stages: [
                {
                    question: "The seed that fell on the path was eaten by birds. What does this represent?",
                    choices: [
                        { text: "People who hear God's word but don't understand it", wisdom: 3 },
                        { text: "People who are too busy to listen", wisdom: 1 },
                        { text: "People who reject God completely", wisdom: 2 }
                    ],
                    explanation: "The path represents hearts hardened by sin, where Satan quickly takes away God's word before it can take root."
                },
                {
                    question: "The seed on rocky ground grew quickly but had no root. What does this teach us?",
                    choices: [
                        { text: "Some people have shallow, temporary faith", wisdom: 3 },
                        { text: "Rocky soil is bad for farming", wisdom: 1 },
                        { text: "Quick growth is always better", wisdom: 1 }
                    ],
                    explanation: "Rocky ground represents those who receive God's word with joy but have no deep commitment, falling away during trials."
                },
                {
                    question: "The seed among thorns was choked. What are the 'thorns' in our spiritual lives?",
                    choices: [
                        { text: "Worries, wealth, and worldly pleasures", wisdom: 3 },
                        { text: "Other people's opinions", wisdom: 2 },
                        { text: "Lack of education", wisdom: 1 }
                    ],
                    explanation: "Thorns represent life's distractions - worry about money, pursuit of pleasure, and other concerns that choke out spiritual growth."
                },
                {
                    question: "The good soil produced a crop 30, 60, or 100 times what was sown. How can you be 'good soil'?",
                    choices: [
                        { text: "Listen to God's word, understand it, and obey it", wisdom: 3 },
                        { text: "Go to church regularly", wisdom: 2 },
                        { text: "Be a good person", wisdom: 2 }
                    ],
                    explanation: "Good soil represents hearts that hear, understand, and act on God's word, producing spiritual fruit in their lives."
                },
                {
                    question: "What is the main lesson of the Parable of the Sower?",
                    choices: [
                        { text: "Our hearts determine how we respond to God's word", wisdom: 3 },
                        { text: "Farming is important in Jesus' time", wisdom: 1 },
                        { text: "Not everyone will become a Christian", wisdom: 2 }
                    ],
                    explanation: "Jesus teaches that the condition of our hearts determines how we receive and respond to God's word."
                }
            ],
            currentStage: 0
        };

        this.showCurrentStage();
    }

    showCurrentStage() {
        const stage = this.currentParable.stages[this.currentParable.currentStage];
        const storyContainer = document.getElementById('parableStory');
        
        if (this.currentParable.currentStage === 0) {
            // Show initial story
            storyContainer.innerHTML = `
                <div class="parable-intro">
                    <h3>${this.currentParable.title}</h3>
                    <p class="story-text">"${this.currentParable.story}"</p>
                    <p class="story-reference">- Matthew 13:3-8 (Jesus speaking)</p>
                </div>
            `;
        }
        
        setTimeout(() => {
            storyContainer.innerHTML += `
                <div class="parable-question">
                    <h4>Question ${this.currentParable.currentStage + 1}:</h4>
                    <p>${stage.question}</p>
                    
                    <div class="parable-choices">
                        ${stage.choices.map((choice, index) => `
                            <button class="parable-choice-btn" onclick="sealMechanicsManager.mechanicsRegistry[4].makeChoice(${index})">
                                ${choice.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }, this.currentParable.currentStage === 0 ? 2000 : 500);
    }

    makeChoice(choiceIndex) {
        const stage = this.currentParable.stages[this.currentParable.currentStage];
        const choice = stage.choices[choiceIndex];
        
        this.playerChoices.push({
            stage: this.currentParable.currentStage,
            choice: choiceIndex,
            wisdom: choice.wisdom
        });
        
        this.wisdomScore += choice.wisdom;
        this.updateWisdomScore();
        
        // Show explanation
        this.showStageResult(stage.explanation, choice.wisdom);
        
        // Move to next stage
        setTimeout(() => {
            this.currentParable.currentStage++;
            
            if (this.currentParable.currentStage >= this.currentParable.stages.length) {
                this.completeParableChallenge();
            } else {
                this.showCurrentStage();
            }
        }, 3000);
    }

    updateWisdomScore() {
        document.getElementById('wisdomScore').textContent = this.wisdomScore;
    }

    showStageResult(explanation, wisdomGained) {
        const result = document.getElementById('parableResult');
        const wisdomMessages = {
            3: '✨ Excellent wisdom! You understand the kingdom principle!',
            2: '👍 Good insight! You\'re growing in understanding.',
            1: '🤔 Consider this more deeply. The kingdom often works differently than we expect.'
        };

        result.innerHTML = `
            <div class="stage-result">
                <p class="wisdom-feedback">${wisdomMessages[wisdomGained]}</p>
                <p class="explanation"><strong>Kingdom Truth:</strong> ${explanation}</p>
                <p class="wisdom-gained">+${wisdomGained} Kingdom Wisdom</p>
            </div>
        `;
    }

    completeParableChallenge() {
        const storyContainer = document.getElementById('parableStory');
        const finalWisdomLevel = this.getFinalWisdomLevel();
        
        // Require minimum wisdom score to pass (at least 10/15)
        if (this.wisdomScore < 10) {
            storyContainer.innerHTML = `
                <div class="parable-retry">
                    <h3>🤔 More Kingdom Understanding Needed</h3>
                    <p><strong>Your Score:</strong> ${this.wisdomScore}/15</p>
                    <p class="retry-message">You need at least 10 wisdom points to unlock this seal. The kingdom requires deeper understanding!</p>
                    <p><strong>Lesson:</strong> <em>"But seek first his kingdom and his righteousness, and all these things will be given to you as well."</em> - Matthew 6:33</p>
                    
                    <div class="retry-controls">
                        <button class="btn-primary" onclick="sealMechanicsManager.mechanicsRegistry[4].retryParable()">
                            🔄 Try Again with New Parable
                        </button>
                        <button class="btn-secondary" onclick="sealMechanicsManager.exitSealFullScreen()">
                            ← Return to Seals
                        </button>
                    </div>
                </div>
            `;
            return;
        }
        
        storyContainer.innerHTML = `
            <div class="parable-completion">
                <h3>🎉 Kingdom Wisdom Unlocked!</h3>
                <p><strong>Your Kingdom Understanding:</strong> ${finalWisdomLevel.level}</p>
                <p class="wisdom-message">${finalWisdomLevel.message}</p>
                <p><strong>Final Wisdom Score:</strong> ${this.wisdomScore}/15</p>
                
                <div class="kingdom-lesson">
                    <h4>Kingdom Principle Learned:</h4>
                    <p><em>"The kingdom of heaven is like a treasure hidden in a field. When a man found it, he hid it again, and then in his joy went and sold all he had and bought that field."</em> - Matthew 13:44</p>
                    <p><strong>Truth:</strong> The kingdom of God is worth everything - it transforms how we see and respond to God's truth.</p>
                </div>
            </div>
        `;

        setTimeout(() => {
            this.complete('KINGDOM');
        }, 4000);
    }

    retryParable() {
        // Reset and try with a different parable
        this.currentParable.currentStage = 0;
        this.playerChoices = [];
        this.wisdomScore = 0;
        
        // Update score display
        document.getElementById('wisdomScore').textContent = '0';
        
        // Setup new parable content
        this.setupKingdomParable();
    }

    getFinalWisdomLevel() {
        const percentage = this.wisdomScore / 15;
        
        if (percentage >= 0.9) {
            return { level: 'Kingdom Scholar', message: '👑 You demonstrate deep kingdom wisdom!' };
        } else if (percentage >= 0.7) {
            return { level: 'Growing Disciple', message: '🌱 Your kingdom understanding is flourishing!' };
        } else if (percentage >= 0.5) {
            return { level: 'Seeking Student', message: '🔍 You\'re learning the ways of the kingdom!' };
        } else {
            return { level: 'New Believer', message: '🌱 Every kingdom journey begins with simple faith!' };
        }
    }
}

// SEAL 5: New Testament Letter Categorization
class SealFiveMechanic extends BaseSealMechanic {
    constructor() {
        super(5, 'New Testament Letters');
        this.letters = [];
        this.categories = [];
        this.correctMatches = 0;
        this.totalMatches = 8;
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = this.generateLetterSortingHTML();
        
        this.setupLetterSorting();
    }

    generateLetterSortingHTML() {
        return `
            <div class="seal-five-letters">
                <h2>✉️ NEW TESTAMENT LETTERS CHALLENGE</h2>
                <p class="instruction">Sort Paul's letters by matching them with their main themes and target audiences!</p>
                
                <div class="sorting-workspace">
                    <div id="lettersPool" class="letters-pool">
                        <h3>📜 Paul's Letters</h3>
                        <div class="letters-container"></div>
                    </div>
                    
                    <div id="categoryBoxes" class="category-boxes">
                        <h3>🎯 Letter Categories</h3>
                        <div class="categories-container"></div>
                    </div>
                </div>
                
                <div class="sorting-stats">
                    <div class="stat">
                        <span class="label">Correct Matches:</span>
                        <span id="correctMatches" class="value">0</span> / ${this.totalMatches}
                    </div>
                </div>
                
                <div class="sorting-controls">
                    <button id="checkSortingBtn" class="btn-primary" onclick="sealMechanicsManager.mechanicsRegistry[5].checkSorting()">
                        ✅ Check Sorting
                    </button>
                    <button id="resetSortingBtn" class="btn-secondary" onclick="sealMechanicsManager.mechanicsRegistry[5].resetSorting()">
                        🔄 Reset
                    </button>
                </div>
                
                <div id="sortingResult" class="sorting-result"></div>
            </div>
        `;
    }

    setupLetterSorting() {
        this.letters = [
            { id: 1, book: 'Romans', theme: 'Salvation by Faith', audience: 'Church in Rome', category: 'Doctrine' },
            { id: 2, book: '1 Corinthians', theme: 'Church Unity', audience: 'Corinthian Church', category: 'Community' },
            { id: 3, book: 'Galatians', theme: 'Freedom in Christ', audience: 'Galatian Churches', category: 'Liberation' },
            { id: 4, book: 'Ephesians', theme: 'Unity in Christ', audience: 'Ephesian Church', category: 'Community' },
            { id: 5, book: 'Philippians', theme: 'Joy in Christ', audience: 'Philippian Church', category: 'Experience' },
            { id: 6, book: 'Colossians', theme: 'Christ\'s Supremacy', audience: 'Colossian Church', category: 'Doctrine' },
            { id: 7, book: '1 Timothy', theme: 'Church Leadership', audience: 'Timothy (Pastor)', category: 'Leadership' },
            { id: 8, book: 'Philemon', theme: 'Christian Love', audience: 'Philemon (Individual)', category: 'Personal' }
        ];

        this.categories = [
            { id: 'doctrine', name: 'Doctrinal Teaching', description: 'Letters focused on core Christian beliefs', color: '#4169E1' },
            { id: 'community', name: 'Church Community', description: 'Letters about church unity and fellowship', color: '#32CD32' },
            { id: 'liberation', name: 'Christian Freedom', description: 'Letters about freedom from law and sin', color: '#FF6347' },
            { id: 'experience', name: 'Christian Experience', description: 'Letters about living the Christian life', color: '#FFD700' },
            { id: 'leadership', name: 'Church Leadership', description: 'Letters to church leaders and pastors', color: '#9370DB' },
            { id: 'personal', name: 'Personal Letters', description: 'Letters to individuals', color: '#20B2AA' }
        ];

        this.renderLetters();
        this.renderCategories();
        this.setupDragAndDrop();
    }

    renderLetters() {
        const container = document.querySelector('.letters-container');
        const shuffledLetters = [...this.letters].sort(() => Math.random() - 0.5);
        
        container.innerHTML = shuffledLetters.map(letter => `
            <div class="letter-card" draggable="true" data-letter-id="${letter.id}" data-category="${letter.category.toLowerCase()}">
                <div class="letter-book">${letter.book}</div>
                <div class="letter-theme">${letter.theme}</div>
                <div class="letter-audience">To: ${letter.audience}</div>
            </div>
        `).join('');
    }

    renderCategories() {
        const container = document.querySelector('.categories-container');
        
        container.innerHTML = this.categories.map(category => `
            <div class="category-box" data-category-id="${category.id}" style="border-color: ${category.color}">
                <div class="category-header" style="background-color: ${category.color}">
                    <h4>${category.name}</h4>
                </div>
                <div class="category-description">${category.description}</div>
                <div class="category-letters" data-category="${category.id}"></div>
            </div>
        `).join('');
    }

    setupDragAndDrop() {
        // Use document-level event delegation for better handling
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('letter-card')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.letterId);
                e.target.classList.add('dragging');
                console.log('🎯 Drag started for letter:', e.target.dataset.letterId);
            }
        });
        
        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('letter-card')) {
                e.target.classList.remove('dragging');
            }
        });
        
        // Set up drop zones for categories
        const categoryBoxes = document.querySelectorAll('.category-letters');
        categoryBoxes.forEach(box => {
            box.addEventListener('dragover', (e) => {
                e.preventDefault();
                box.classList.add('drag-over');
            });
            
            box.addEventListener('dragleave', (e) => {
                if (!box.contains(e.relatedTarget)) {
                    box.classList.remove('drag-over');
                }
            });
            
            box.addEventListener('drop', (e) => {
                e.preventDefault();
                box.classList.remove('drag-over');
                
                const letterId = e.dataTransfer.getData('text/plain');
                console.log('🎯 Dropping letter ID:', letterId, 'into category:', box.dataset.category);
                
                if (!letterId || isNaN(letterId)) {
                    console.error('Invalid letter ID:', letterId);
                    return;
                }
                
                const letterElement = document.querySelector(`[data-letter-id="${letterId}"]`);
                const categoryId = box.dataset.category;
                
                if (letterElement) {
                    this.placeLetter(letterElement, box, categoryId);
                } else {
                    console.error('Letter element not found for ID:', letterId);
                }
            });
        });
        
        // Set up return-to-pool functionality
        const lettersContainer = document.querySelector('.letters-container');
        if (lettersContainer) {
            lettersContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                lettersContainer.classList.add('returning-drag-over');
            });
            
            lettersContainer.addEventListener('dragleave', (e) => {
                if (!lettersContainer.contains(e.relatedTarget)) {
                    lettersContainer.classList.remove('returning-drag-over');
                }
            });
            
            lettersContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                lettersContainer.classList.remove('returning-drag-over');
                
                const letterId = e.dataTransfer.getData('text/plain');
                const letterElement = document.querySelector(`[data-letter-id="${letterId}"]`);
                
                if (letterElement && letterElement.classList.contains('placed')) {
                    console.log('🔄 Returning letter to pool:', letterId);
                    
                    // Update correct matches count if returning a correct answer
                    if (letterElement.classList.contains('correct')) {
                        this.correctMatches--;
                        this.updateStats();
                    }
                    
                    // Return to pool
                    lettersContainer.appendChild(letterElement);
                    letterElement.classList.remove('placed', 'correct', 'incorrect');
                    letterElement.draggable = true;
                    letterElement.style.cursor = 'grab';
                    
                    console.log('✅ Letter successfully returned to pool');
                }
            });
        }
    }

    placeLetter(letterElement, categoryBox, categoryId) {
        // Move letter to category
        categoryBox.appendChild(letterElement);
        letterElement.classList.remove('correct', 'incorrect');
        letterElement.classList.add('placed');
        
        // Check if correct
        const letterCategory = letterElement.dataset.category;
        const isCorrect = letterCategory === categoryId;
        
        if (isCorrect) {
            letterElement.classList.add('correct');
            this.correctMatches++;
            this.updateStats();
        } else {
            letterElement.classList.add('incorrect');
            // Show visual feedback for incorrect placement
            setTimeout(() => {
                letterElement.style.animation = 'shake 0.5s ease-in-out';
            }, 100);
        }
        
        // All letters remain draggable for corrections
        letterElement.draggable = true;
        letterElement.style.cursor = 'grab';
    }

    checkSorting() {
        const placedLetters = document.querySelectorAll('.letter-card.placed');
        
        if (placedLetters.length < this.totalMatches) {
            this.showResult('Please sort all letters into categories first!', 'warning');
            return;
        }

        if (this.correctMatches === this.totalMatches) {
            this.showResult('🎉 Perfect! You understand Paul\'s letter organization!', 'success');
            setTimeout(() => {
                this.completeLetterSorting();
            }, 2000);
        } else {
            this.showResult(`${this.correctMatches}/${this.totalMatches} correct. Review the incorrect letters and their themes.`, 'error');
            this.highlightErrors();
        }
    }

    updateStats() {
        document.getElementById('correctMatches').textContent = this.correctMatches;
    }

    highlightErrors() {
        // Already handled in placeLetter method with correct/incorrect classes
    }

    resetSorting() {
        // Move all letters back to pool
        const letters = document.querySelectorAll('.letter-card');
        const lettersContainer = document.querySelector('.letters-container');
        
        letters.forEach(letter => {
            lettersContainer.appendChild(letter);
            letter.classList.remove('placed', 'correct', 'incorrect');
            letter.draggable = true;
        });
        
        this.correctMatches = 0;
        this.updateStats();
        this.showResult('', 'info');
    }

    completeLetterSorting() {
        const storyContainer = document.getElementById('parableStory');
        
        storyContainer.innerHTML = `
            <div class="sorting-completion">
                <h3>🎉 Gospel Understanding Complete!</h3>
                <p>You have successfully organized Paul's letters by their themes and purposes!</p>
                
                <div class="gospel-lesson">
                    <h4>Gospel Truth Learned:</h4>
                    <p><em>"All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work."</em> - 2 Timothy 3:16-17</p>
                    <p><strong>Truth:</strong> Paul's letters provide comprehensive teaching for Christian living, addressing doctrine, community, freedom, experience, leadership, and personal relationships.</p>
                </div>
            </div>
        `;

        setTimeout(() => {
            this.complete('GOSPEL');
        }, 3000);
    }

    showResult(message, type) {
        const result = document.getElementById('sortingResult');
        result.textContent = message;
        result.className = `sorting-result ${type}`;
    }
}

// SEAL 6: Biblical Health & Wellness Principles  
class SealSixMechanic extends BaseSealMechanic {
    constructor() {
        super(6, 'Health & Vitality');
        this.healthPrinciples = [];
        this.situations = [];
        this.currentSituation = 0;
        this.wellnessScore = 0;
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = this.generateWellnessHTML();
        
        this.setupWellnessChallenge();
    }

    generateWellnessHTML() {
        return `
            <div class="seal-six-wellness">
                <h2>💪 BIBLICAL HEALTH & VITALITY CHALLENGE</h2>
                <p class="instruction">Apply biblical wisdom to modern wellness situations. Choose the most biblically sound approach!</p>
                
                <div class="wellness-progress">
                    <div class="progress-bar">
                        <div id="wellnessProgress" class="progress-fill"></div>
                    </div>
                    <div class="situation-indicator">Situation <span id="currentSituationNum">1</span> of 6</div>
                </div>
                
                <div id="wellnessSituation" class="wellness-situation"></div>
                
                <div class="wellness-score">
                    <span>Wellness Wisdom: <span id="wellnessScore">0</span>/18</span>
                </div>
                
                <div id="wellnessResult" class="wellness-result"></div>
            </div>
        `;
    }

    setupWellnessChallenge() {
        this.situations = [
            {
                title: 'Physical Health',
                scenario: 'You\'re feeling exhausted from overwork and poor eating habits. How do you apply biblical wisdom?',
                verse: '"Do you not know that your bodies are temples of the Holy Spirit?" - 1 Corinthians 6:19',
                choices: [
                    { text: 'Rest properly and nourish your body as God\'s temple', wisdom: 3, principle: 'Stewardship of body' },
                    { text: 'Push through with coffee and fast food', wisdom: 1, principle: 'Neglecting God\'s temple' },
                    { text: 'Take some vitamins and keep working', wisdom: 2, principle: 'Partial care' }
                ]
            },
            {
                title: 'Mental Rest',
                scenario: 'You\'re overwhelmed with anxiety and racing thoughts. What biblical approach brings peace?',
                verse: '"Cast all your anxiety on him because he cares for you." - 1 Peter 5:7',
                choices: [
                    { text: 'Pray, meditate on Scripture, and trust God with your worries', wisdom: 3, principle: 'Spiritual peace' },
                    { text: 'Distract yourself with entertainment', wisdom: 1, principle: 'Avoidance' },
                    { text: 'Talk to friends but keep worrying', wisdom: 2, principle: 'Partial release' }
                ]
            },
            {
                title: 'Emotional Health',
                scenario: 'Someone has deeply hurt you and you\'re struggling with anger and bitterness.',
                verse: '"Be kind and compassionate, forgiving each other." - Ephesians 4:32',
                choices: [
                    { text: 'Choose to forgive and release the anger to God', wisdom: 3, principle: 'Biblical forgiveness' },
                    { text: 'Hold onto the anger because it\'s justified', wisdom: 1, principle: 'Justified resentment' },
                    { text: 'Forgive but keep bringing it up', wisdom: 2, principle: 'Incomplete forgiveness' }
                ]
            },
            {
                title: 'Spiritual Discipline',
                scenario: 'You want to grow spiritually but struggle with consistent prayer and Bible reading.',
                verse: '"Like newborn babies, crave pure spiritual milk." - 1 Peter 2:2',
                choices: [
                    { text: 'Start small with daily habits and grow gradually', wisdom: 3, principle: 'Sustainable growth' },
                    { text: 'Make huge commitments you can\'t keep', wisdom: 1, principle: 'Unsustainable effort' },
                    { text: 'Wait until you feel more motivated', wisdom: 1, principle: 'Procrastination' }
                ]
            },
            {
                title: 'Social Wellness',
                scenario: 'You\'re in conflict with a fellow believer over a disagreement.',
                verse: '"If your brother sins against you, go and show him his fault." - Matthew 18:15',
                choices: [
                    { text: 'Approach them privately with love and humility', wisdom: 3, principle: 'Biblical conflict resolution' },
                    { text: 'Tell everyone else about the problem first', wisdom: 1, principle: 'Gossip and division' },
                    { text: 'Avoid them and hope it goes away', wisdom: 1, principle: 'Avoidance' }
                ]
            },
            {
                title: 'Holistic Balance',
                scenario: 'You\'re trying to balance work, family, church, and personal time in a godly way.',
                verse: '"Seek first his kingdom and righteousness." - Matthew 6:33',
                choices: [
                    { text: 'Prioritize according to God\'s will and trust Him with the results', wisdom: 3, principle: 'Kingdom priorities' },
                    { text: 'Try to do everything perfectly in your own strength', wisdom: 1, principle: 'Self-reliance' },
                    { text: 'Focus only on what pays the most money', wisdom: 1, principle: 'Materialism' }
                ]
            }
        ];

        this.showCurrentSituation();
    }

    showCurrentSituation() {
        if (this.currentSituation >= this.situations.length) {
            this.completeWellnessChallenge();
            return;
        }

        const situation = this.situations[this.currentSituation];
        const situationContainer = document.getElementById('wellnessSituation');
        
        situationContainer.innerHTML = `
            <div class="situation-content">
                <h3>${situation.title}</h3>
                <p class="situation-scenario">${situation.scenario}</p>
                <div class="bible-verse">📖 ${situation.verse}</div>
                
                <div class="situation-choices">
                    ${situation.choices.map((choice, index) => `
                        <button class="wellness-choice-btn" onclick="sealMechanicsManager.mechanicsRegistry[6].makeWellnessChoice(${index})">
                            ${choice.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Update progress
        const progress = (this.currentSituation / this.situations.length) * 100;
        document.getElementById('wellnessProgress').style.width = `${progress}%`;
        document.getElementById('currentSituationNum').textContent = this.currentSituation + 1;
    }

    makeWellnessChoice(choiceIndex) {
        const situation = this.situations[this.currentSituation];
        const choice = situation.choices[choiceIndex];
        
        this.wellnessScore += choice.wisdom;
        this.updateWellnessScore();
        
        // Show result
        this.showSituationResult(choice.principle, choice.wisdom);
        
        // Move to next situation
        setTimeout(() => {
            this.currentSituation++;
            this.showCurrentSituation();
        }, 3000);
    }

    updateWellnessScore() {
        document.getElementById('wellnessScore').textContent = this.wellnessScore;
    }

    showSituationResult(principle, wisdom) {
        const result = document.getElementById('wellnessResult');
        const wisdomMessages = {
            3: '✨ Excellent biblical wisdom! This honors God and promotes true wellness.',
            2: '👍 Good approach with room for deeper biblical understanding.',
            1: '🤔 Consider how biblical principles could guide a better choice.'
        };

        result.innerHTML = `
            <div class="situation-result">
                <p class="wisdom-feedback">${wisdomMessages[wisdom]}</p>
                <p class="principle-learned"><strong>Principle:</strong> ${principle}</p>
                <p class="wisdom-points">+${wisdom} Wellness Wisdom</p>
            </div>
        `;
    }

    completeWellnessChallenge() {
        const situationContainer = document.getElementById('wellnessSituation');
        const finalLevel = this.getWellnessLevel();
        
        situationContainer.innerHTML = `
            <div class="wellness-completion">
                <h3>🎉 Biblical Wellness Mastered!</h3>
                <p><strong>Your Wellness Wisdom Level:</strong> ${finalLevel.level}</p>
                <p class="level-message">${finalLevel.message}</p>
                <p><strong>Final Score:</strong> ${this.wellnessScore}/18</p>
                
                <div class="wellness-lesson">
                    <h4>Holistic Health Truth:</h4>
                    <p><em>"Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well."</em> - 3 John 1:2</p>
                    <p><strong>Truth:</strong> Biblical wellness encompasses spirit, soul, and body - true health requires alignment with God\'s design for human flourishing.</p>
                </div>
            </div>
        `;

        // Update progress to 100%
        document.getElementById('wellnessProgress').style.width = '100%';

        setTimeout(() => {
            this.complete('HEALING');
        }, 4000);
    }

    getWellnessLevel() {
        const percentage = this.wellnessScore / 18;
        
        if (percentage >= 0.9) {
            return { level: 'Wellness Master', message: '🌟 You demonstrate comprehensive biblical wellness wisdom!' };
        } else if (percentage >= 0.7) {
            return { level: 'Growing in Health', message: '🌱 Your wellness understanding is growing strong!' };
        } else if (percentage >= 0.5) {
            return { level: 'Learning Balance', message: '⚖️ You\'re learning biblical balance for health!' };
        } else {
            return { level: 'Beginning Journey', message: '🌱 Every wellness journey begins with God\'s wisdom!' };
        }
    }
}

// SEAL 7: Revelation Final Challenge - Ultimate Biblical Knowledge
class SealSevenMechanic extends BaseSealMechanic {
    constructor() {
        super(7, 'Revelation Final Challenge');
        this.revelationPhases = [];
        this.currentPhase = 0;
        this.apocalypseScore = 0;
        this.playerAnswers = [];
    }

    async start() {
        const content = document.getElementById('sealContent');
        content.innerHTML = this.generateRevelationHTML();
        
        this.setupRevelationChallenge();
    }

    generateRevelationHTML() {
        return `
            <div class="seal-seven-revelation">
                <h2>🔥 REVELATION ULTIMATE CHALLENGE</h2>
                <p class="instruction">Complete the final trial by demonstrating your mastery of all biblical knowledge!</p>
                
                <div class="revelation-progress">
                    <div class="progress-bar">
                        <div id="revelationProgress" class="progress-fill"></div>
                    </div>
                    <div class="phase-indicator">Phase <span id="currentPhaseNum">1</span> of 4</div>
                </div>
                
                <div id="revelationPhase" class="revelation-phase"></div>
                
                <div class="apocalypse-score">
                    <span>Revelation Mastery: <span id="apocalypseScore">0</span>/20</span>
                </div>
                
                <div id="revelationResult" class="revelation-result"></div>
            </div>
        `;
    }

    setupRevelationChallenge() {
        this.revelationPhases = [
            {
                title: 'The Seven Churches',
                description: 'John writes to seven churches in Revelation. Match each church with its main issue.',
                type: 'matching',
                items: [
                    { church: 'Ephesus', issue: 'Lost their first love', correct: true },
                    { church: 'Laodicea', issue: 'Lukewarm faith', correct: true },
                    { church: 'Smyrna', issue: 'Facing persecution', correct: true },
                    { church: 'Pergamum', issue: 'Compromised with world', correct: true }
                ],
                scripture: 'Revelation 2-3'
            },
            {
                title: 'The Seven Seals Symbolism',
                description: 'What does the breaking of the seven seals represent in Revelation?',
                type: 'multiple_choice',
                question: 'The seven seals in Revelation represent:',
                choices: [
                    { text: 'God\'s judgments and the unfolding of end times', correct: true, points: 5 },
                    { text: 'Seven different churches in Asia', correct: false, points: 1 },
                    { text: 'Seven virtues Christians should have', correct: false, points: 2 },
                    { text: 'Seven books of prophecy in the Bible', correct: false, points: 1 }
                ],
                explanation: 'The seven seals represent God\'s progressive revelation of end-time events and divine judgment.',
                scripture: 'Revelation 6-8'
            },
            {
                title: 'The New Heaven and Earth',
                description: 'Complete this promise from Revelation about the eternal state.',
                type: 'fill_blanks',
                verse: '"Then I saw a new heaven and a new earth... And I heard a loud voice from the throne saying, \'Look! God\'s dwelling place is now among the people... He will wipe every ____ from their eyes. There will be no more ____ or mourning or crying or ____, for the old order of things has passed away.\'"',
                blanks: [
                    { word: 'TEAR', hint: 'What God wipes from our eyes' },
                    { word: 'DEATH', hint: 'The last enemy to be defeated' },
                    { word: 'PAIN', hint: 'Physical and emotional suffering' }
                ],
                scripture: 'Revelation 21:1-4'
            },
            {
                title: 'The Ultimate Victory',
                description: 'What is the final message and promise of the Bible?',
                type: 'comprehensive',
                question: 'Based on all seven seals of knowledge you\'ve unlocked, what is God\'s ultimate plan for humanity?',
                keyPoints: [
                    'Creation → Fall → Redemption → Restoration',
                    'God\'s love demonstrated through Christ',
                    'Eternal life with God in perfection',
                    'Victory over sin, death, and evil'
                ],
                scripture: 'Revelation 22:1-5'
            }
        ];

        this.showCurrentPhase();
    }

    showCurrentPhase() {
        if (this.currentPhase >= this.revelationPhases.length) {
            this.completeRevelationChallenge();
            return;
        }

        const phase = this.revelationPhases[this.currentPhase];
        const phaseContainer = document.getElementById('revelationPhase');
        
        phaseContainer.innerHTML = `
            <div class="phase-content">
                <h3>${phase.title}</h3>
                <p class="phase-description">${phase.description}</p>
                <div class="scripture-reference">📖 ${phase.scripture}</div>
                
                <div id="phaseChallenge" class="phase-challenge">
                    ${this.renderPhaseChallenge(phase)}
                </div>
            </div>
        `;

        // Update progress
        const progress = (this.currentPhase / this.revelationPhases.length) * 100;
        document.getElementById('revelationProgress').style.width = `${progress}%`;
        document.getElementById('currentPhaseNum').textContent = this.currentPhase + 1;
    }

    renderPhaseChallenge(phase) {
        switch (phase.type) {
            case 'multiple_choice':
                return `
                    <div class="revelation-question">
                        <p>${phase.question}</p>
                        <div class="revelation-choices">
                            ${phase.choices.map((choice, index) => `
                                <button class="revelation-choice-btn" onclick="sealMechanicsManager.mechanicsRegistry[7].makeChoice(${index})">
                                    ${choice.text}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            case 'fill_blanks':
                return `
                    <div class="verse-completion">
                        <p>${phase.verse.replace(/__+/g, (match, offset) => {
                            const blankIndex = (phase.verse.substring(0, offset).match(/__+/g) || []).length;
                            const blank = phase.blanks[blankIndex];
                            return `<input type="text" class="blank-input" data-answer="${blank.word}" placeholder="${blank.hint}" maxlength="10">`;
                        })}</p>
                        <button class="btn-primary" onclick="sealMechanicsManager.mechanicsRegistry[7].checkBlanks()">
                            ✅ Check Verse
                        </button>
                    </div>
                `;
            case 'comprehensive':
                return `
                    <div class="final-question">
                        <p>${phase.question}</p>
                        <div class="key-points">
                            <h4>Consider these key elements:</h4>
                            <ul>
                                ${phase.keyPoints.map(point => `<li>${point}</li>`).join('')}
                            </ul>
                        </div>
                        <textarea class="comprehensive-answer" placeholder="Write your understanding of God's ultimate plan..." rows="4"></textarea>
                        <button class="btn-primary" onclick="sealMechanicsManager.mechanicsRegistry[7].submitFinalAnswer()">
                            🏆 Submit Final Answer
                        </button>
                    </div>
                `;
            default:
                return `<p>Challenge type not implemented: ${phase.type}</p>`;
        }
    }

    makeChoice(choiceIndex) {
        const phase = this.revelationPhases[this.currentPhase];
        const choice = phase.choices[choiceIndex];
        
        this.apocalypseScore += choice.points;
        this.updateScore();
        
        // Show explanation
        this.showPhaseResult(phase.explanation, choice.correct, choice.points);
        
        // Move to next phase
        setTimeout(() => {
            this.currentPhase++;
            this.showCurrentPhase();
        }, 3000);
    }

    checkBlanks() {
        const inputs = document.querySelectorAll('.blank-input');
        let correctBlanks = 0;
        
        inputs.forEach(input => {
            const userAnswer = input.value.trim().toUpperCase();
            const correctAnswer = input.dataset.answer.toUpperCase();
            
            if (userAnswer === correctAnswer) {
                input.classList.add('correct');
                correctBlanks++;
            } else {
                input.classList.add('incorrect');
            }
        });
        
        const points = Math.round((correctBlanks / inputs.length) * 5);
        this.apocalypseScore += points;
        this.updateScore();
        
        this.showPhaseResult(`You completed ${correctBlanks}/${inputs.length} blanks correctly.`, correctBlanks === inputs.length, points);
        
        setTimeout(() => {
            this.currentPhase++;
            this.showCurrentPhase();
        }, 3000);
    }

    submitFinalAnswer() {
        const answer = document.querySelector('.comprehensive-answer').value.trim();
        
        if (answer.length < 50) {
            this.showPhaseResult('Please provide a more detailed answer (at least 50 characters).', false, 0);
            return;
        }
        
        // Award points for thoughtful response
        this.apocalypseScore += 5;
        this.updateScore();
        
        this.showPhaseResult('Thank you for your thoughtful reflection on God\'s ultimate plan!', true, 5);
        
        setTimeout(() => {
            this.currentPhase++;
            this.showCurrentPhase();
        }, 3000);
    }

    updateScore() {
        document.getElementById('apocalypseScore').textContent = this.apocalypseScore;
    }

    showPhaseResult(explanation, isCorrect, points) {
        const result = document.getElementById('revelationResult');
        
        result.innerHTML = `
            <div class="phase-result">
                <p class="result-feedback">${isCorrect ? '✨ Excellent understanding!' : '🤔 Consider this more deeply.'}</p>
                <p class="explanation">${explanation}</p>
                <p class="points-earned">+${points} Revelation Mastery</p>
            </div>
        `;
    }

    completeRevelationChallenge() {
        const phaseContainer = document.getElementById('revelationPhase');
        const finalLevel = this.getRevelationLevel();
        
        phaseContainer.innerHTML = `
            <div class="revelation-completion">
                <h3>🎉 ALL SEVEN SEALS MASTERED!</h3>
                <p><strong>Your Biblical Mastery Level:</strong> ${finalLevel.level}</p>
                <p class="mastery-message">${finalLevel.message}</p>
                <p><strong>Final Revelation Score:</strong> ${this.apocalypseScore}/20</p>
                
                <div class="ultimate-truth">
                    <h4>The Ultimate Revelation:</h4>
                    <p><em>"And he who was seated on the throne said, 'Behold, I am making all things new.' Also he said, 'Write this down, for these words are trustworthy and true.'"</em> - Revelation 21:5</p>
                    <p><strong>The Final Victory:</strong> God's plan from creation to eternity is the restoration of perfect relationship between God and humanity through Jesus Christ. Every seal you've unlocked reveals part of this magnificent story!</p>
                </div>
                
                <div class="seven-seals-summary">
                    <h4>Your Journey Through the Seven Seals:</h4>
                    <ol>
                        <li><strong>Creation</strong> - God's perfect beginning</li>
                        <li><strong>Wisdom</strong> - Learning from Scripture</li>
                        <li><strong>Growth</strong> - Faith journey and development</li>
                        <li><strong>Kingdom</strong> - Understanding God's ways</li>
                        <li><strong>Gospel</strong> - The good news of salvation</li>
                        <li><strong>Healing</strong> - Wholeness in spirit, soul, and body</li>
                        <li><strong>Victory</strong> - Ultimate triumph over sin and death</li>
                    </ol>
                </div>
            </div>
        `;

        // Update progress to 100%
        document.getElementById('revelationProgress').style.width = '100%';

        setTimeout(() => {
            this.complete('VICTORY');
        }, 5000);
    }

    getRevelationLevel() {
        const percentage = this.apocalypseScore / 20;
        
        if (percentage >= 0.9) {
            return { level: 'Revelation Master', message: '👑 You have achieved complete biblical mastery! You understand the full scope of God\'s plan from Genesis to Revelation!' };
        } else if (percentage >= 0.7) {
            return { level: 'Biblical Scholar', message: '📚 Your biblical knowledge is extensive and deep!' };
        } else if (percentage >= 0.5) {
            return { level: 'Growing Disciple', message: '🌱 You are well on your way to biblical maturity!' };
        } else {
            return { level: 'Faithful Student', message: '🎓 You have completed an amazing journey of biblical learning!' };
        }
    }
}

// Initialize global seal mechanics manager
window.SealMechanicsManager = SealMechanicsManager;
window.sealMechanicsManager = new SealMechanicsManager();

console.log('🎯 New Seal Mechanics system loaded successfully');
