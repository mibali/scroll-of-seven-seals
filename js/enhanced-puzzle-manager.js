// ENHANCED PUZZLE MANAGER WITH ANSWER FLEXIBILITY & AGE ADAPTATION
// Integrates with UniqueContentEngine for zero content repetition

class EnhancedPuzzleManager {
    constructor() {
        this.currentGameContent = null;
        this.currentGameSession = null;
        this.answerValidationEngine = new AnswerValidationEngine();
        this.visualEffectsEngine = new VisualEffectsEngine();
        this.audioFeedbackEngine = new AudioFeedbackEngine();
    }

    // MAIN: Start new game with completely unique content
    async startNewGame(difficulty = 'beginner', playerAge = null) {
        // Generate unique session ID for this game
        const sessionId = this.generateUniqueSessionId();
        
        console.log(`🎮 STARTING NEW GAME - Difficulty: ${difficulty}, Session: ${sessionId}`);
        
        // Generate completely unique content
        this.currentGameContent = await window.UniqueContentEngine.generateUniqueGameContent(difficulty, sessionId);
        this.currentGameSession = sessionId;
        
        // Initialize age-appropriate features
        this.initializeAgeAdaptation(difficulty, playerAge);
        
        console.log(`✅ UNIQUE GAME CONTENT READY - No repeated content guaranteed!`);
        
        return {
            sessionId: sessionId,
            difficulty: difficulty,
            contentHash: this.currentGameContent.uniqueContentHash,
            sealsGenerated: Object.keys(this.currentGameContent.seals).length
        };
    }

    // Generate puzzle content for specific seal using unique content
    async generatePuzzleContent(sealId, puzzleType) {
        if (!this.currentGameContent || !this.currentGameContent.seals[sealId]) {
            console.warn(`No unique content available for seal ${sealId}, generating fresh...`);
            return await this.generateFreshSealContent(sealId, puzzleType);
        }

        const sealContent = this.currentGameContent.seals[sealId];
        console.log(`🎯 Rendering UNIQUE content for Seal ${sealId} - ${puzzleType}`);

        // Render age-appropriate content
        return this.renderSealContent(sealContent, sealId);
    }

    // Render seal content with age-appropriate styling and answer flexibility
    renderSealContent(sealContent, sealId) {
        const profile = this.currentGameContent.profile;
        
        switch(sealContent.type) {
            case 'bibleKnowledge':
                return this.renderBibleKnowledge(sealContent, profile);
            case 'logicalReasoning':
                return this.renderLogicalReasoning(sealContent, profile);
            case 'teamCommunication':
                return this.renderTeamCommunication(sealContent, profile);
            case 'codeBreaking':
                return this.renderCodeBreaking(sealContent, profile);
            case 'chronologicalOrder':
                return this.renderChronologicalOrder(sealContent, profile);
            case 'scriptureTopics':
                return this.renderScriptureTopics(sealContent, profile);
            case 'biblicalWisdom':
                return this.renderBiblicalWisdom(sealContent, profile);
            default:
                return '<p>Unknown challenge type</p>';
        }
    }

    // SEAL 1: Bible Knowledge with flexible answers
    renderBibleKnowledge(content, profile) {
        const ageStyle = this.getAgeAppropriateStyles(profile.ageGroup);
        let questionsHtml = '';
        
        content.questions.forEach((question, index) => {
            const hintHtml = question.hint ? 
                `<div class="question-hint ${ageStyle.hintClass}">${this.getAgeIcon(profile.ageGroup)} ${question.hint}</div>` : '';
            
            questionsHtml += `
                <div class="knowledge-question ${ageStyle.questionClass}">
                    <div class="question-header ${ageStyle.headerClass}">
                        <span class="question-number">${this.getQuestionNumber(index + 1, profile.ageGroup)}:</span>
                    </div>
                    <div class="question-text ${ageStyle.textClass}">${question.question}</div>
                    ${hintHtml}
                    <div class="answer-input">
                        <input type="text" 
                               id="knowledge${index + 1}" 
                               placeholder="${this.getAgeAppropriatePlaceholder(profile.ageGroup)}" 
                               class="knowledge-input ${ageStyle.inputClass}"
                               data-flexibility="${question.type}"
                               data-correct-answer="${question.correctAnswer}"
                               maxlength="50">
                    </div>
                    <div class="answer-feedback" id="feedback${index + 1}" style="display: none;"></div>
                </div>
            `;
        });

        return `
            <div class="bible-knowledge-challenge ${ageStyle.containerClass}">
                <h3 class="${ageStyle.titleClass}">${this.getSealTitle(1, profile.ageGroup)}</h3>
                
                <div class="challenge-info ${ageStyle.infoClass}">
                    <p><strong>${this.getAgeAppropriateLabel(profile.ageGroup)}</strong></p>
                    <p>${this.getAgeAppropriateInstructions('bibleKnowledge', profile.ageGroup)}</p>
                    <p><strong>Target Word:</strong> <span class="keyword-target ${ageStyle.keywordClass}">${content.keyword}</span></p>
                    ${content.immersiveIntro ? `<div class="immersive-intro ${ageStyle.introClass}">${content.immersiveIntro}</div>` : ''}
                </div>
                
                <div class="questions-container">
                    ${questionsHtml}
                </div>
                
                <div class="challenge-controls ${ageStyle.controlsClass}">
                    <button class="btn primary ${ageStyle.buttonClass}" onclick="checkBibleKnowledgeFlexible()">
                        ${this.getAgeAppropriateButtonText('check', profile.ageGroup)}
                    </button>
                    <button class="btn secondary ${ageStyle.buttonClass}" onclick="resetChallenge('bibleKnowledge')">
                        ${this.getAgeAppropriateButtonText('reset', profile.ageGroup)}
                    </button>
                    ${profile.answerFlexibility !== 'exact' ? `
                        <button class="btn hint-btn ${ageStyle.hintButtonClass}" onclick="showAdaptiveHints('bibleKnowledge')">
                            ${this.getAgeAppropriateButtonText('hint', profile.ageGroup)}
                        </button>
                    ` : ''}
                </div>
                
                <div id="bibleKnowledgeResult" class="challenge-result ${ageStyle.resultClass}"></div>
                <div id="bibleKnowledgeHint" class="challenge-hint ${ageStyle.hintAreaClass}" style="display: none;"></div>
            </div>
        `;
    }

    // SEAL 4: Code Breaking with adaptive complexity
    renderCodeBreaking(content, profile) {
        const ageStyle = this.getAgeAppropriateStyles(profile.ageGroup);
        
        // Create category drop zones
        let categoriesHtml = '';
        Object.keys(content.categories).forEach(categoryKey => {
            const category = content.categories[categoryKey];
            categoriesHtml += `
                <div class="testament-category ${ageStyle.categoryClass}" data-category="${categoryKey}">
                    <h4 style="color: ${category.color}; margin-bottom: 10px;" class="${ageStyle.categoryTitle}">
                        ${this.getCategoryIcon(categoryKey, profile.ageGroup)} ${category.name}
                    </h4>
                    <p class="category-description ${ageStyle.categoryDesc}">${category.description}</p>
                    <div class="category-drop-zone" 
                         data-testament="${categoryKey}" 
                         style="border: 2px dashed ${category.color}; min-height: ${this.getDropZoneHeight(profile.ageGroup)}; padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.2);">
                        <p class="drop-instruction ${ageStyle.dropInstruction}">
                            ${this.getDropInstructions(category.name, profile.ageGroup)}
                        </p>
                    </div>
                </div>
            `;
        });

        // Create draggable items with age-appropriate styling
        let itemsHtml = '';
        content.items.forEach((item, index) => {
            itemsHtml += `
                <div class="draggable-item biblical-item ${ageStyle.draggableClass}" 
                     draggable="true" 
                     data-testament="${item.testament}" 
                     data-category="${item.category}"
                     data-item-id="${index}">
                    ${this.formatItemText(item.text, profile.ageGroup)}
                </div>
            `;
        });

        return `
            <div class="code-breaking-challenge ${ageStyle.containerClass}">
                <h3 class="${ageStyle.titleClass}">${this.getSealTitle(4, profile.ageGroup)}</h3>
                
                <div class="challenge-info ${ageStyle.infoClass}">
                    <p><strong>${content.title}</strong></p>
                    <p>${content.description}</p>
                    <p><strong>Target Word:</strong> <span class="keyword-target ${ageStyle.keywordClass}">${content.keyword}</span></p>
                    
                    <div class="adaptive-hint ${ageStyle.adaptiveHintClass}">
                        <strong>${this.getAgeIcon(profile.ageGroup)} ${this.getAgeAppropriateLabel(profile.ageGroup)}:</strong> 
                        <p>${this.getCodeBreakingInstructions(profile.ageGroup)}</p>
                        ${profile.ageGroup === 'kids' ? `<p><em>🎯 Remember: Old Testament = Before Jesus, New Testament = During/After Jesus</em></p>` : ''}
                    </div>
                </div>
                
                <div class="testament-categories" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    ${categoriesHtml}
                </div>
                
                <div class="items-pool ${ageStyle.poolClass}">
                    <h4 style="text-align: center; margin-bottom: 15px; color: #d4af37;" class="${ageStyle.poolTitle}">
                        ${this.getPoolTitle(profile.ageGroup)}
                    </h4>
                    <div class="draggable-items" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                        ${itemsHtml}
                    </div>
                </div>
                
                <div class="challenge-controls ${ageStyle.controlsClass}">
                    <button class="btn primary ${ageStyle.buttonClass}" onclick="checkCodeBreakingFlexible()">
                        ${this.getAgeAppropriateButtonText('check', profile.ageGroup)}
                    </button>
                    <button class="btn secondary ${ageStyle.buttonClass}" onclick="resetChallenge('codeBreaking')">
                        ${this.getAgeAppropriateButtonText('reset', profile.ageGroup)}
                    </button>
                    <button class="btn hint-btn ${ageStyle.hintButtonClass}" onclick="showAdaptiveHints('codeBreaking')">
                        ${this.getAgeAppropriateButtonText('hint', profile.ageGroup)}
                    </button>
                </div>
                
                <div id="codeBreakingResult" class="challenge-result ${ageStyle.resultClass}"></div>
                <div id="codeBreakingHint" class="challenge-hint ${ageStyle.hintAreaClass}" style="display: none;"></div>
            </div>
        `;
    }

    // Age-appropriate styling and content methods
    getAgeAppropriateStyles(ageGroup) {
        const styles = {
            kids: {
                containerClass: 'kids-challenge rainbow-border',
                titleClass: 'kids-title rainbow-text bounce-animation',
                questionClass: 'kids-question bubble-style',
                headerClass: 'kids-header sparkle-background',
                textClass: 'kids-text large-friendly-font',
                inputClass: 'kids-input colorful-border',
                hintClass: 'kids-hint happy-background',
                buttonClass: 'kids-button big-rounded colorful-shadow',
                resultClass: 'kids-result celebration-style',
                infoClass: 'kids-info gentle-background',
                keywordClass: 'kids-keyword glowing-text',
                introClass: 'kids-intro magical-style'
            },
            teenagers: {
                containerClass: 'teen-challenge modern-design',
                titleClass: 'teen-title gradient-text',
                questionClass: 'teen-question sleek-card',
                headerClass: 'teen-header modern-accent',
                textClass: 'teen-text contemporary-font',
                inputClass: 'teen-input modern-border',
                hintClass: 'teen-hint cool-background',
                buttonClass: 'teen-button sleek-modern',
                resultClass: 'teen-result modern-feedback',
                infoClass: 'teen-info contemporary-style',
                keywordClass: 'teen-keyword modern-highlight',
                introClass: 'teen-intro dynamic-style'
            },
            adults: {
                containerClass: 'adult-challenge professional-design',
                titleClass: 'adult-title elegant-text',
                questionClass: 'adult-question clean-card',
                headerClass: 'adult-header professional-accent',
                textClass: 'adult-text readable-font',
                inputClass: 'adult-input clean-border',
                hintClass: 'adult-hint informative-background',
                buttonClass: 'adult-button professional-style',
                resultClass: 'adult-result clear-feedback',
                infoClass: 'adult-info professional-info',
                keywordClass: 'adult-keyword professional-highlight',
                introClass: 'adult-intro meaningful-style'
            },
            scholars: {
                containerClass: 'scholar-challenge academic-design',
                titleClass: 'scholar-title scholarly-text',
                questionClass: 'scholar-question academic-card',
                headerClass: 'scholar-header academic-accent',
                textClass: 'scholar-text scholarly-font',
                inputClass: 'scholar-input academic-border',
                hintClass: 'scholar-hint academic-background',
                buttonClass: 'scholar-button academic-style',
                resultClass: 'scholar-result scholarly-feedback',
                infoClass: 'scholar-info academic-info',
                keywordClass: 'scholar-keyword academic-highlight',
                introClass: 'scholar-intro profound-style'
            }
        };

        return styles[ageGroup] || styles['adults'];
    }

    getAgeIcon(ageGroup) {
        const icons = {
            kids: '🌈',
            teenagers: '🔥',
            adults: '📖',
            scholars: '🎓'
        };
        return icons[ageGroup] || '📖';
    }

    getSealTitle(sealId, ageGroup) {
        const titles = {
            kids: {
                1: '🌟 Bible Fun Time!',
                4: '🧩 Sort the Bible Stories!',
                7: '👑 You\'re a Bible Champion!'
            },
            teenagers: {
                1: '🔥 Scripture Challenge',
                4: '⚡ Biblical Classification',
                7: '🏆 Ultimate Bible Mastery'
            },
            adults: {
                1: '📖 Scripture Knowledge Trial',
                4: '🔐 Biblical Classification Challenge',
                7: '👑 Biblical Wisdom Assessment'
            },
            scholars: {
                1: '🎓 Advanced Biblical Examination',
                4: '📚 Hermeneutical Classification Analysis',
                7: '⚖️ Comprehensive Theological Synthesis'
            }
        };

        return titles[ageGroup]?.[sealId] || titles['adults'][sealId] || 'Challenge';
    }

    getAgeAppropriateInstructions(challengeType, ageGroup) {
        const instructions = {
            bibleKnowledge: {
                kids: 'Answer fun questions about Bible stories! Use the hints to help you! 🌈',
                teenagers: 'Show your Bible knowledge! Multiple answer formats accepted. 🔥',
                adults: 'Demonstrate scriptural understanding. Various answer formats are accepted.',
                scholars: 'Apply comprehensive biblical knowledge with precision and scholarly accuracy.'
            }
        };

        return instructions[challengeType]?.[ageGroup] || instructions[challengeType]?.['adults'] || 'Complete the challenge.';
    }

    getAgeAppropriateButtonText(action, ageGroup) {
        const texts = {
            check: {
                kids: '🌟 Check My Answers!',
                teenagers: '🔥 Submit Challenge',
                adults: '✅ Check Answers',
                scholars: '📝 Submit Analysis'
            },
            reset: {
                kids: '🔄 Try Again!',
                teenagers: '🔄 Reset Challenge',
                adults: '🔄 Reset',
                scholars: '🔄 Reset Analysis'
            },
            hint: {
                kids: '💡 Help Me Please!',
                teenagers: '💡 Show Hints',
                adults: '💡 Show Guidance',
                scholars: '📚 Reference Materials'
            }
        };

        return texts[action]?.[ageGroup] || texts[action]?.['adults'] || action;
    }

    // Generate session ID with timestamp
    generateUniqueSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Initialize age adaptation features
    initializeAgeAdaptation(difficulty, playerAge) {
        const profile = this.currentGameContent.profile;
        
        // Set global CSS variables for age-appropriate styling
        document.documentElement.style.setProperty('--age-primary-color', this.getAgePrimaryColor(profile.ageGroup));
        document.documentElement.style.setProperty('--age-font-size', this.getAgeFontSize(profile.ageGroup));
        document.documentElement.style.setProperty('--age-animation-speed', this.getAgeAnimationSpeed(profile.ageGroup));
        
        // Initialize audio feedback for age group
        this.audioFeedbackEngine.setAgeGroup(profile.ageGroup);
        
        // Initialize visual effects for age group
        this.visualEffectsEngine.setAgeGroup(profile.ageGroup);
        
        console.log(`🎨 Age adaptation initialized for: ${profile.ageGroup}`);
    }

    getAgePrimaryColor(ageGroup) {
        const colors = {
            kids: '#ff6b6b',      // Bright red-pink
            teenagers: '#4ecdc4',  // Teal
            adults: '#45b7d1',     // Blue
            scholars: '#96ceb4'    // Sage green
        };
        return colors[ageGroup] || colors['adults'];
    }

    getAgeFontSize(ageGroup) {
        const sizes = {
            kids: '1.2em',
            teenagers: '1.1em',
            adults: '1em',
            scholars: '0.95em'
        };
        return sizes[ageGroup] || sizes['adults'];
    }

    getAgeAnimationSpeed(ageGroup) {
        const speeds = {
            kids: '0.3s',      // Fast and fun
            teenagers: '0.4s',  // Quick but smooth
            adults: '0.5s',     // Measured
            scholars: '0.6s'    // Deliberate
        };
        return speeds[ageGroup] || speeds['adults'];
    }

    // Export manager methods
    getPuzzleVariation(puzzleType) {
        if (!this.currentGameContent || !this.currentGameContent.seals) {
            return null;
        }

        // Find the seal with matching puzzle type
        for (const sealId in this.currentGameContent.seals) {
            const seal = this.currentGameContent.seals[sealId];
            if (seal.type === puzzleType) {
                return seal;
            }
        }

        return null;
    }

    resetChallenge(challengeType) {
        // Clear any previous state for this challenge
        const resultDiv = document.getElementById(`${challengeType}Result`);
        const hintDiv = document.getElementById(`${challengeType}Hint`);
        
        if (resultDiv) resultDiv.innerHTML = '';
        if (hintDiv) {
            hintDiv.innerHTML = '';
            hintDiv.style.display = 'none';
        }

        // Reset all input fields for this challenge
        const inputs = document.querySelectorAll(`[id^="${challengeType}"], [id*="${challengeType}"]`);
        inputs.forEach(input => {
            if (input.type === 'text' || input.type === 'number') {
                input.value = '';
            } else if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = false;
            }
        });

        // Reset drag and drop if applicable
        if (challengeType === 'codeBreaking' || challengeType === 'chronologicalOrder' || challengeType === 'scriptureTopics') {
            this.resetDragAndDrop();
        }

        // Clear visual feedback for drop zones
        this.clearVisualFeedback(challengeType);

        console.log(`🔄 Challenge ${challengeType} reset`);
    }

    clearVisualFeedback(challengeType) {
        // Reset drop zone background colors
        const dropZones = document.querySelectorAll('.drop-zone, .topic-drop, .chronological-drop');
        dropZones.forEach(zone => {
            zone.style.backgroundColor = '';
            zone.style.borderColor = '';
        });

        // Reset any success/error styling on draggable items
        const dragItems = document.querySelectorAll('.drag-item, .draggable-item');
        dragItems.forEach(item => {
            item.style.backgroundColor = '';
            item.style.borderColor = '';
            item.classList.remove('correct', 'incorrect', 'success', 'error');
        });
    }

    resetDragAndDrop() {
        // Move all draggable items back to their pool
        const draggableItems = document.querySelectorAll('.draggable-item, .drag-item');
        const itemsPool = document.querySelector('.draggable-items') || document.querySelector('.items-pool');
        
        if (itemsPool) {
            draggableItems.forEach(item => {
                // Only move items that are currently in drop zones back to the pool
                if (!itemsPool.contains(item)) {
                    itemsPool.appendChild(item);
                }
            });
        }
        
        // Clear all drop zones
        const dropZones = document.querySelectorAll('.drop-zone, .topic-drop');
        dropZones.forEach(zone => {
            const items = zone.querySelectorAll('.draggable-item, .drag-item');
            items.forEach(item => {
                if (itemsPool) {
                    itemsPool.appendChild(item);
                }
            });
        });
    }

    // Get complexity hint for puzzles
    getComplexityHint(puzzleType) {
        if (!this.currentGameContent || this.currentGameContent.profile.complexity <= 2) {
            return `<div class="complexity-hint" id="${puzzleType}Hint" style="display: none;"></div>`;
        }
        return '';
    }

    // SEAL 5: Chronological Order with enhanced UX
    renderChronologicalOrder(content, profile) {
        const ageStyle = this.getAgeAppropriateStyles(profile.ageGroup);
        
        let eventsHtml = '';
        content.events.forEach((event, index) => {
            eventsHtml += `
                <div class="drag-item" draggable="true" data-event-id="${event.id}">
                    ${event.text}
                </div>
            `;
        });

        let dropZonesHtml = '';
        content.events.forEach((event, index) => {
            dropZonesHtml += `
                <div class="drop-zone chronological-drop" data-position="${index + 1}">
                    Drop event ${index + 1} here
                </div>
            `;
        });

        return `
            <div class="chronological-challenge">
                <h3>📜 ${this.getChronologicalTitle(profile.ageGroup)}</h3>
                <div class="challenge-description" style="margin-bottom: 20px;">
                    <p><strong>⏰ CHRONOLOGICAL CHALLENGE</strong></p>
                    <p>Arrange these biblical events in the correct historical order.</p>
                    <p><strong>Timeline:</strong> <span class="keyword-target">${content.timeline}</span></p>
                </div>
                
                <div class="items-pool">
                    <div class="pool-title">📚 Biblical Events (Drag to Timeline)</div>
                    ${eventsHtml}
                </div>
                
                <div class="timeline-container">
                    <div class="timeline-title">⏳ Historical Timeline</div>
                    <div class="drop-zones-container">
                        ${dropZonesHtml}
                    </div>
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary ${ageStyle.buttonClass}" onclick="checkChronologicalOrder()">📅 Verify Timeline</button>
                    <button class="btn secondary ${ageStyle.buttonClass}" onclick="resetChallenge('chronologicalOrder')">🔄 ${this.getResetButtonText(profile.ageGroup)}</button>
                    ${this.getComplexityHint('chronologicalOrder')}
                </div>
                
                <div id="chronologicalOrderResult" class="challenge-result"></div>
            </div>
        `;
    }

    // SEAL 6: Scripture Topics with enhanced UX
    renderScriptureTopics(content, profile) {
        const ageStyle = this.getAgeAppropriateStyles(profile.ageGroup);
        
        // Combine all verses and shuffle them
        let allVerses = [];
        content.topics.forEach(topic => {
            topic.correctVerses.forEach(verse => {
                allVerses.push({
                    text: verse,
                    topicName: topic.name,
                    isCorrect: true
                });
            });
        });
        
        // Add distractor verses
        content.distractorVerses.forEach(verse => {
            allVerses.push({
                text: verse,
                topicName: 'distractor',
                isCorrect: false
            });
        });
        
        // Shuffle all verses
        allVerses.sort(() => Math.random() - 0.5);
        
        let versesHtml = '';
        allVerses.forEach((verse, index) => {
            versesHtml += `
                <div class="drag-item" draggable="true" data-verse-topic="${verse.topicName}" data-verse-text="${verse.text}">
                    ${verse.text}
                </div>
            `;
        });

        let topicsHtml = '';
        content.topics.forEach((topic, index) => {
            topicsHtml += `
                <div class="topic-section">
                    <div class="topic-title">${topic.name}</div>
                    <div class="topic-description" style="font-size: 0.9em; color: #b8a082; margin-bottom: 10px;">
                        ${topic.description}
                    </div>
                    <div class="drop-zone topic-drop" data-topic="${topic.name}">
                        Drop ${topic.name.toLowerCase()} verses here
                    </div>
                </div>
            `;
        });

        return `
            <div class="scripture-topics-challenge">
                <h3>📚 ${this.getScriptureTopicsTitle(profile.ageGroup)}</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ ORGANIZE BY TOPIC</strong></p>
                    <p>Drag Bible verses to their correct thematic categories.</p>
                    <p><strong>Topic Theme:</strong> <span class="keyword-target">${content.topicName}</span></p>
                </div>
                
                <div class="items-pool">
                    <div class="pool-title">📖 Bible Verses (Drag to Categories)</div>
                    ${versesHtml}
                </div>
                
                <div class="scripture-topics">
                    ${topicsHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary ${ageStyle.buttonClass}" onclick="checkScriptureTopics()">🗂️ Verify Organization</button>
                    <button class="btn secondary ${ageStyle.buttonClass}" onclick="resetChallenge('scriptureTopics')">🔄 ${this.getResetButtonText(profile.ageGroup)}</button>
                    ${this.getComplexityHint('scriptureTopics')}
                </div>
                
                <div id="scriptureTopicsResult" class="challenge-result"></div>
            </div>
        `;
    }

    // Helper methods for chronological titles
    getChronologicalTitle(ageGroup) {
        const titles = {
            kids: 'BIBLE STORY TIMELINE',
            teenagers: 'HISTORICAL SEQUENCE CHALLENGE', 
            adults: 'CHRONOLOGICAL ORDER VERIFICATION',
            scholars: 'HISTORICAL CHRONOLOGY ANALYSIS'
        };
        return titles[ageGroup] || titles['adults'];
    }

    getScriptureTopicsTitle(ageGroup) {
        const titles = {
            kids: 'BIBLE VERSE SORTING',
            teenagers: 'SCRIPTURE ORGANIZATION TRIAL',
            adults: 'THEMATIC VERSE CLASSIFICATION', 
            scholars: 'SCRIPTURAL TAXONOMY EXERCISE'
        };
        return titles[ageGroup] || titles['adults'];
    }

    getResetButtonText(ageGroup) {
        const texts = {
            kids: '🔄 Try Again',
            teenagers: '🔄 Reset Challenge',
            adults: '🔄 Reset',
            scholars: '🔄 Reset Analysis'
        };
        return texts[ageGroup] || texts['adults'];
    }
}

// ANSWER VALIDATION ENGINE - Flexible answer checking
class AnswerValidationEngine {
    constructor() {
        this.flexibilityLevels = {
            very_forgiving: {
                caseSensitive: false,
                allowPartialMatches: true,
                synonymsAccepted: true,
                typoTolerance: 2,
                encouragement: 'high'
            },
            forgiving: {
                caseSensitive: false,
                allowPartialMatches: true,
                synonymsAccepted: false,
                typoTolerance: 1,
                encouragement: 'medium'
            },
            strict: {
                caseSensitive: false,
                allowPartialMatches: false,
                synonymsAccepted: false,
                typoTolerance: 0,
                encouragement: 'low'
            },
            exact: {
                caseSensitive: true,
                allowPartialMatches: false,
                synonymsAccepted: false,
                typoTolerance: 0,
                encouragement: 'minimal'
            }
        };

        this.biblicalSynonyms = {
            'NOAH': ['NOE'],
            'JESUS': ['CHRIST', 'MESSIAH', 'SAVIOR', 'LORD'],
            'MOSES': ['MOSHE'],
            'DAVID': ['KING DAVID'],
            'ABRAHAM': ['ABRAM'],
            'PETER': ['SIMON', 'SIMON PETER', 'CEPHAS'],
            'PAUL': ['SAUL', 'SAUL OF TARSUS'],
            'JOHN': ['JOHN THE BAPTIST', 'JOHN THE APOSTLE'],
            'JERUSALEM': ['ZION', 'CITY OF DAVID'],
            'BETHLEHEM': ['CITY OF DAVID', 'HOUSE OF BREAD']
        };
    }

    validateAnswer(userAnswer, correctAnswer, flexibility = 'forgiving') {
        const rules = this.flexibilityLevels[flexibility] || this.flexibilityLevels['forgiving'];
        
        let processedUser = userAnswer.trim();
        let processedCorrect = correctAnswer.trim();

        // Case sensitivity
        if (!rules.caseSensitive) {
            processedUser = processedUser.toUpperCase();
            processedCorrect = processedCorrect.toUpperCase();
        }

        // Exact match first
        if (processedUser === processedCorrect) {
            return { 
                isCorrect: true, 
                confidence: 1.0, 
                feedback: 'Perfect answer!',
                encouragement: this.getEncouragement(rules.encouragement, 'perfect')
            };
        }

        // Synonym checking
        if (rules.synonymsAccepted && this.checkSynonyms(processedUser, processedCorrect)) {
            return { 
                isCorrect: true, 
                confidence: 0.9, 
                feedback: 'Great answer! That\'s another way to say it.',
                encouragement: this.getEncouragement(rules.encouragement, 'synonym')
            };
        }

        // Partial match checking
        if (rules.allowPartialMatches && this.checkPartialMatch(processedUser, processedCorrect)) {
            return { 
                isCorrect: true, 
                confidence: 0.8, 
                feedback: 'Close enough! You got the key part right.',
                encouragement: this.getEncouragement(rules.encouragement, 'partial')
            };
        }

        // Typo tolerance
        if (rules.typoTolerance > 0 && this.checkTypoTolerance(processedUser, processedCorrect, rules.typoTolerance)) {
            return { 
                isCorrect: true, 
                confidence: 0.7, 
                feedback: 'Good answer! Just a small spelling difference.',
                encouragement: this.getEncouragement(rules.encouragement, 'typo')
            };
        }

        // Not correct
        return { 
            isCorrect: false, 
            confidence: 0, 
            feedback: 'Not quite right. Try again!',
            encouragement: this.getEncouragement(rules.encouragement, 'incorrect'),
            hint: this.generateHint(correctAnswer, flexibility)
        };
    }

    checkSynonyms(userAnswer, correctAnswer) {
        // Check if user answer is a synonym of correct answer
        const synonyms = this.biblicalSynonyms[correctAnswer] || [];
        return synonyms.includes(userAnswer);
    }

    checkPartialMatch(userAnswer, correctAnswer) {
        // Check if user answer contains the key part of correct answer
        const keyWords = correctAnswer.split(' ').filter(word => word.length > 2);
        return keyWords.some(keyword => userAnswer.includes(keyword));
    }

    checkTypoTolerance(userAnswer, correctAnswer, tolerance) {
        // Simple Levenshtein distance check
        const distance = this.levenshteinDistance(userAnswer, correctAnswer);
        return distance <= tolerance;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    getEncouragement(level, type) {
        const encouragements = {
            high: {
                perfect: ['🌟 Amazing!', '🎉 Fantastic!', '✨ Wonderful!', '🌈 Excellent!'],
                synonym: ['👍 Great job!', '🎈 Super!', '🌺 Beautiful!', '🦋 Marvelous!'],
                partial: ['😊 Good try!', '👏 Nice work!', '💪 Getting there!', '🌟 Almost perfect!'],
                typo: ['📝 So close!', '✏️ Almost there!', '🤗 Good effort!', '💫 Nearly perfect!'],
                incorrect: ['🤔 Try again!', '💪 Keep going!', '🌱 You can do it!', '🎯 Give it another shot!']
            },
            medium: {
                perfect: ['Excellent!', 'Well done!', 'Perfect!', 'Outstanding!'],
                synonym: ['Good answer!', 'Correct!', 'Nice work!', 'Well said!'],
                partial: ['Close!', 'Good try!', 'Almost there!', 'On the right track!'],
                typo: ['Nearly correct!', 'Close enough!', 'Good effort!', 'Almost perfect!'],
                incorrect: ['Try again!', 'Not quite!', 'Keep trying!', 'Consider the hint!']
            },
            low: {
                perfect: ['Correct.', 'Well done.', 'Accurate.', 'Precise.'],
                synonym: ['Acceptable.', 'Correct variation.', 'Valid answer.', 'Good.'],
                partial: ['Partially correct.', 'Incomplete.', 'Close.', 'Consider refinement.'],
                typo: ['Minor error.', 'Check spelling.', 'Nearly accurate.', 'Close.'],
                incorrect: ['Incorrect.', 'Try again.', 'Reconsider.', 'Not accurate.']
            },
            minimal: {
                perfect: ['Correct.', 'Accurate.', 'Precise.', 'Valid.'],
                synonym: ['Acceptable.', 'Valid.', 'Correct.', 'Accurate.'],
                partial: ['Incomplete.', 'Insufficient.', 'Partial.', 'Imprecise.'],
                typo: ['Error detected.', 'Inaccurate.', 'Incorrect spelling.', 'Invalid.'],
                incorrect: ['Incorrect.', 'Invalid.', 'Inaccurate.', 'Wrong.']
            }
        };

        const levelEncouragements = encouragements[level] || encouragements['medium'];
        const typeEncouragements = levelEncouragements[type] || levelEncouragements['incorrect'];
        
        return typeEncouragements[Math.floor(Math.random() * typeEncouragements.length)];
    }

    generateHint(correctAnswer, flexibility) {
        if (flexibility === 'exact') return null;
        
        const hints = [
            `The answer starts with "${correctAnswer.charAt(0)}"`,
            `The answer has ${correctAnswer.length} letters`,
            `Think about: ${correctAnswer.substring(0, Math.floor(correctAnswer.length / 2))}...`,
            `The answer rhymes with words that sound like "${correctAnswer}"`
        ];
        
        return hints[Math.floor(Math.random() * hints.length)];
    }
}

// VISUAL EFFECTS ENGINE - Age-appropriate animations and feedback
class VisualEffectsEngine {
    constructor() {
        this.ageGroup = 'adults';
        this.effectSettings = {
            kids: {
                successAnimation: 'bounce-celebration',
                errorAnimation: 'gentle-shake',
                transitionSpeed: 'fast',
                colorIntensity: 'bright',
                particleEffects: true
            },
            teenagers: {
                successAnimation: 'sleek-glow',
                errorAnimation: 'pulse-warning',
                transitionSpeed: 'medium',
                colorIntensity: 'vivid',
                particleEffects: true
            },
            adults: {
                successAnimation: 'subtle-highlight',
                errorAnimation: 'border-flash',
                transitionSpeed: 'measured',
                colorIntensity: 'moderate',
                particleEffects: false
            },
            scholars: {
                successAnimation: 'academic-checkmark',
                errorAnimation: 'professional-indication',
                transitionSpeed: 'deliberate',
                colorIntensity: 'subdued',
                particleEffects: false
            }
        };
    }

    setAgeGroup(ageGroup) {
        this.ageGroup = ageGroup;
        this.settings = this.effectSettings[ageGroup] || this.effectSettings['adults'];
    }

    showSuccessEffect(element, confidence = 1.0) {
        const settings = this.settings;
        
        // Remove any existing animation classes
        element.classList.remove('success-animation', 'error-animation');
        
        // Add success animation based on age group
        element.classList.add(settings.successAnimation);
        
        // Add confidence-based visual feedback
        if (confidence >= 0.9) {
            element.style.borderColor = '#28a745'; // Perfect green
        } else if (confidence >= 0.7) {
            element.style.borderColor = '#ffc107'; // Good yellow
        } else {
            element.style.borderColor = '#17a2b8'; // Acceptable blue
        }

        // Particle effects for younger audiences
        if (settings.particleEffects) {
            this.createParticleEffect(element, 'success');
        }

        // Auto-remove animation class
        setTimeout(() => {
            element.classList.remove(settings.successAnimation);
        }, 1000);
    }

    showErrorEffect(element) {
        const settings = this.settings;
        
        // Remove any existing animation classes
        element.classList.remove('success-animation', 'error-animation');
        
        // Add error animation based on age group
        element.classList.add(settings.errorAnimation);
        element.style.borderColor = '#dc3545'; // Error red

        // Gentle particle effects for kids
        if (settings.particleEffects && this.ageGroup === 'kids') {
            this.createParticleEffect(element, 'gentle');
        }

        // Auto-remove animation class
        setTimeout(() => {
            element.classList.remove(settings.errorAnimation);
            element.style.borderColor = '';
        }, 1000);
    }

    createParticleEffect(element, type) {
        if (this.ageGroup === 'adults' || this.ageGroup === 'scholars') return;

        // Simple particle effect for kids and teenagers
        const particle = document.createElement('div');
        particle.className = `particle ${type}`;
        
        const rect = element.getBoundingClientRect();
        particle.style.position = 'fixed';
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        if (type === 'success') {
            particle.innerHTML = this.ageGroup === 'kids' ? '🌟' : '✨';
        } else {
            particle.innerHTML = this.ageGroup === 'kids' ? '💫' : '💭';
        }
        
        document.body.appendChild(particle);
        
        // Animate particle
        setTimeout(() => {
            particle.style.transform = 'translateY(-50px)';
            particle.style.opacity = '0';
        }, 100);
        
        // Remove particle
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    }
}

// AUDIO FEEDBACK ENGINE - Age-appropriate sounds
class AudioFeedbackEngine {
    constructor() {
        this.ageGroup = 'adults';
        this.audioEnabled = true;
        this.sounds = {
            kids: {
                success: ['chime', 'ding', 'sparkle'],
                error: ['gentle-buzz', 'soft-beep'],
                encouragement: ['happy-tune', 'cheerful-note']
            },
            teenagers: {
                success: ['success-tone', 'achievement-sound'],
                error: ['error-tone', 'try-again-sound'],
                encouragement: ['motivational-beep', 'progress-tone']
            },
            adults: {
                success: ['subtle-chime', 'confirmation-tone'],
                error: ['soft-error-beep', 'gentle-correction'],
                encouragement: ['progress-indicator', 'achievement-note']
            },
            scholars: {
                success: ['academic-chime', 'scholarly-tone'],
                error: ['academic-correction', 'scholarly-notification'],
                encouragement: ['academic-progress', 'scholarly-achievement']
            }
        };
    }

    setAgeGroup(ageGroup) {
        this.ageGroup = ageGroup;
    }

    playFeedbackSound(type, confidence = 1.0) {
        if (!this.audioEnabled) return;

        const soundOptions = this.sounds[this.ageGroup]?.[type] || this.sounds['adults'][type];
        if (!soundOptions) return;

        // Select sound based on confidence for success sounds
        let selectedSound;
        if (type === 'success' && soundOptions.length > 1) {
            if (confidence >= 0.9) {
                selectedSound = soundOptions[0]; // Best sound
            } else if (confidence >= 0.7) {
                selectedSound = soundOptions[1] || soundOptions[0]; // Good sound
            } else {
                selectedSound = soundOptions[soundOptions.length - 1]; // Okay sound
            }
        } else {
            selectedSound = soundOptions[Math.floor(Math.random() * soundOptions.length)];
        }

        // Play the sound (simplified - in real implementation would use actual audio files)
        console.log(`🔊 Playing ${this.ageGroup} ${type} sound: ${selectedSound} (confidence: ${confidence})`);
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        console.log(`🔊 Audio feedback ${this.audioEnabled ? 'enabled' : 'disabled'}`);
    }
}

// Export the enhanced manager
window.EnhancedPuzzleManager = EnhancedPuzzleManager;
window.AnswerValidationEngine = AnswerValidationEngine;
window.VisualEffectsEngine = VisualEffectsEngine;
window.AudioFeedbackEngine = AudioFeedbackEngine;

console.log('🚀 Enhanced Puzzle Manager loaded with answer flexibility and age adaptation!');
