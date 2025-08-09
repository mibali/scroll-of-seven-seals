// Enhanced Challenge Manager - Complete Implementation
// NO HINTS ALLOWED - Pure Biblical Knowledge and Reasoning

class EnhancedPuzzleManager {
    constructor() {
        this.currentPuzzles = {};
        this.teamInputs = {}; // Track team member inputs for communication challenges
        this.gameSessionId = null; // Track current game session for randomization
        this.hintsUsed = 0;
    }

    // Generate challenge content for a specific seal
    async generatePuzzleContent(sealId, puzzleType) {
        // Always try dynamic generation first if AI engine is available
        if (window.BibleGameAI && window.gameState?.complexity?.level) {
            const dynamicContent = await this.generateDynamicContent(sealId, puzzleType);
            if (dynamicContent) {
                console.log(`🤖 AI-Generated FRESH content for ${puzzleType} - Seal ${sealId}`);
                // Don't cache AI content - generate fresh each time for uniqueness
                return this.renderDynamicContent(dynamicContent, puzzleType);
            }
        }

        // Fallback to original system
        const variations = window.GameData.puzzleVariations[puzzleType];
        if (!variations || variations.length === 0) {
            return '<p>Challenge not available</p>';
        }

        // Select a random variation if not already selected for this game session
        if (!this.currentPuzzles[puzzleType] || this.gameSessionId !== this.getCurrentGameSession()) {
            const randomIndex = Math.floor(Math.random() * variations.length);
            this.currentPuzzles[puzzleType] = variations[randomIndex];
            console.log(`🎲 Randomized ${puzzleType} - selected variation ${randomIndex + 1}/${variations.length}`);
        }

        const variation = this.currentPuzzles[puzzleType];

        switch (puzzleType) {
            case 'bibleKnowledge':
                return this.generateBibleKnowledgeContent(variation);
            case 'logicalReasoning':
                return this.generateLogicalReasoningContent(variation);
            case 'teamCommunication':
                return this.generateTeamCommunicationContent(variation);
            case 'codeBreaking':
                return this.generateCodeBreakingContent(variation);
            case 'chronologicalOrder':
                return this.generateChronologicalOrderContent(variation);
            case 'scriptureTopics':
                return this.generateScriptureTopicsContent(variation);
            case 'biblicalWisdom':
                return this.generateBiblicalWisdomContent(variation);
            default:
                return '<p>Unknown challenge type</p>';
        }
    }

    // CHALLENGE 1: Bible Knowledge - Deep Scriptural Recall (Now Beginner-Friendly!)
    generateBibleKnowledgeContent(variation) {
        let questionsHtml = '';
        
        variation.questions.forEach((question, index) => {
            // Use the hint from the question data or create a kid-friendly hint
            const hintText = question.hint ? `💡 ${question.hint}` : '';
            
            questionsHtml += `
                <div class="knowledge-question">
                    <div class="question-header">
                        <span class="question-number">Question ${index + 1}:</span>
                    </div>
                    <div class="question-text">${question.question}</div>
                    ${hintText ? `<div class="question-hint" style="color: #17a2b8; font-style: italic; font-size: 0.9em; margin: 5px 0;">${hintText}</div>` : ''}
                    <div class="answer-input">
                        <input type="text" 
                               id="knowledge${index + 1}" 
                               placeholder="Enter your answer" 
                               class="knowledge-input"
                               maxlength="50">
                    </div>
                </div>
            `;
        });

        return `
            <div class="bible-knowledge-challenge">
                <h3>📖 SCRIPTURE KNOWLEDGE TRIAL</h3>
                <div class="challenge-info" style="background: rgba(0, 150, 0, 0.1); padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #009600;">
                    <p><strong>🎯 Beginner-Friendly Challenge!</strong></p>
                    <p>Answer questions about basic biblical knowledge. Look for the helpful hints below each question!</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="questions-container">
                    ${questionsHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkBibleKnowledge()">🔍 Check Answers</button>
                    <button class="btn secondary" onclick="resetChallenge('bibleKnowledge')">🔄 Reset</button>
                    <button class="btn hint-btn" onclick="showBibleKnowledgeHint()" style="background: #17a2b8; color: white;">💡 Show More Hints</button>
                </div>
                
                <div id="bibleKnowledgeResult" class="challenge-result"></div>
                <div id="bibleKnowledgeHint" class="challenge-hint" style="display: none;"></div>
            </div>
        `;
    }

    // CHALLENGE 2: Logical Reasoning - Biblical Deduction
    generateLogicalReasoningContent(variation) {
        let puzzlesHtml = '';
        
        variation.puzzles.forEach((puzzle, index) => {
            let optionsHtml = '';
            
            if (puzzle.options) {
                optionsHtml = `
                    <select id="logical${index + 1}" class="logical-select">
                        <option value="">Choose your answer...</option>
                        ${puzzle.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                `;
            } else {
                optionsHtml = `
                    <input type="text" 
                           id="logical${index + 1}" 
                           placeholder="Enter your deduction" 
                           class="logical-input"
                           maxlength="30">
                `;
            }

            puzzlesHtml += `
                <div class="logical-puzzle">
                    <div class="puzzle-type">${puzzle.type.toUpperCase()}</div>
                    <div class="puzzle-question">${puzzle.question}</div>
                    <div class="puzzle-input">
                        ${optionsHtml}
                    </div>
                </div>
            `;
        });

        return `
            <div class="logical-reasoning-challenge">
                <h3>🧠 LOGICAL REASONING TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ USE LOGIC & SCRIPTURE</strong></p>
                    <p>Apply biblical knowledge and logical deduction to solve these challenges.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="puzzles-container">
                    ${puzzlesHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkLogicalReasoning()">🎯 Submit Reasoning</button>
                    <button class="btn secondary" onclick="resetChallenge('logicalReasoning')">🔄 Reset</button>
                </div>
                
                <div id="logicalReasoningResult" class="challenge-result"></div>
            </div>
        `;
    }

    // CHALLENGE 3: Team Communication - Coordinated Biblical Knowledge  
    generateTeamCommunicationContent(variation) {
        let challengesHtml = '';
        
        variation.challenges.forEach((challenge, index) => {
            if (challenge.type === 'collaborative') {
                let partsHtml = '';
                challenge.parts.forEach((part, partIndex) => {
                    partsHtml += `
                        <div class="team-part">
                            <div class="role-label">${part.role}:</div>
                            <div class="task-description">${part.task}</div>
                            <input type="text" 
                                   id="team${index}_part${partIndex}" 
                                   placeholder="Enter your contribution"
                                   class="team-input"
                                   data-role="${part.role}">
                        </div>
                    `;
                });
                
                challengesHtml += `
                    <div class="collaborative-challenge">
                        <h4>${challenge.title}</h4>
                        <p class="challenge-description">${challenge.description}</p>
                        <div class="team-parts">
                            ${partsHtml}
                        </div>
                        <div class="completion-note">
                            <em>${challenge.completionRequirement}</em>
                        </div>
                    </div>
                `;
            } else if (challenge.type === 'chain') {
                let sequenceHtml = '';
                challenge.sequence.forEach((step, stepIndex) => {
                    sequenceHtml += `
                        <div class="chain-step">
                            <div class="step-number">${step.order}</div>
                            <div class="step-clue">${step.clue}</div>
                            <input type="text" 
                                   id="chain${index}_step${stepIndex}" 
                                   placeholder="Add your link"
                                   class="chain-input">
                        </div>
                    `;
                });
                
                challengesHtml += `
                    <div class="chain-challenge">
                        <h4>${challenge.title}</h4>
                        <p class="challenge-description">${challenge.description}</p>
                        <div class="chain-sequence">
                            ${sequenceHtml}
                        </div>
                    </div>
                `;
            }
        });

        return `
            <div class="team-communication-challenge">
                <h3>🤝 TEAM COORDINATION TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ REQUIRES TEAM COLLABORATION</strong></p>
                    <p>Each team member must contribute. Coordinate to unlock the keyword!</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="team-challenges">
                    ${challengesHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkTeamCommunication()">🔗 Verify Unity</button>
                    <button class="btn secondary" onclick="resetChallenge('teamCommunication')">🔄 Reset</button>
                </div>
                
                <div id="teamCommunicationResult" class="challenge-result"></div>
            </div>
        `;
    }

    // CHALLENGE 4: Code-Breaking - Biblical Classification (Testament Sorting)
    generateCodeBreakingContent(variation) {
        if (!variation || !variation.items) {
            console.error('Code breaking variation data is missing or malformed');
            return `
                <div class="code-breaking-challenge">
                    <h3>🔐 BIBLICAL CLASSIFICATION CHALLENGE</h3>
                    <p>Error loading challenge. Please try restarting the game.</p>
                </div>
            `;
        }

        // Create category drop zones
        const categories = variation.categories || {};
        let categoriesHtml = '';
        
        Object.keys(categories).forEach(categoryKey => {
            const category = categories[categoryKey];
            categoriesHtml += `
                <div class="testament-category" data-category="${categoryKey}">
                    <h4 style="color: ${category.color}; margin-bottom: 10px;">
                        📖 ${category.name}
                    </h4>
                    <p class="category-description">${category.description}</p>
                    <div class="category-drop-zone" data-testament="${categoryKey}" style="border: 2px dashed ${category.color}; min-height: 200px; padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.2);">
                        <p class="drop-instruction" style="text-align: center; opacity: 0.7; margin: 60px 0;">
                            Drop ${category.name} items here
                        </p>
                    </div>
                </div>
            `;
        });

        // Create draggable items
        let itemsHtml = '';
        variation.items.forEach((item, index) => {
            itemsHtml += `
                <div class="draggable-item biblical-item" 
                     draggable="true" 
                     data-testament="${item.testament}" 
                     data-category="${item.category}"
                     data-item-id="${index}">
                    ${item.text}
                </div>
            `;
        });

        return `
            <div class="code-breaking-challenge">
                <h3>🔐 BIBLICAL CLASSIFICATION CHALLENGE</h3>
                <div class="challenge-info">
                    <p><strong>📚 ${variation.title}</strong></p>
                    <p>${variation.description}</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                    
                    <div class="beginner-hint" style="background: rgba(0, 150, 0, 0.1); padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #009600;">
                        <strong>💡 Beginner Hint:</strong> 
                        <p>Drag each biblical event/teaching from the pool below into the correct Testament category above. Think about when each event happened in biblical history!</p>
                        <p><em>🎯 Old Testament = Before Jesus, New Testament = During/After Jesus</em></p>
                    </div>
                </div>
                
                <div class="testament-categories" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    ${categoriesHtml}
                </div>
                
                <div class="items-pool" style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; border: 2px solid #8b7355;">
                    <h4 style="text-align: center; margin-bottom: 15px; color: #d4af37;">📋 Biblical Events & Teachings Pool</h4>
                    <div class="draggable-items" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                        ${itemsHtml}
                    </div>
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkCodeBreaking()">✅ Check Classification</button>
                    <button class="btn secondary" onclick="resetChallenge('codeBreaking')">🔄 Reset</button>
                    <button class="btn hint-btn" onclick="showCodeBreakingHint()" style="background: #17a2b8; color: white;">💡 Show Hint</button>
                </div>
                
                <div id="codeBreakingResult" class="challenge-result"></div>
                <div id="codeBreakingHint" class="challenge-hint" style="display: none;"></div>
            </div>
        `;
    }

    // CHALLENGE 5: Metaphorical Scripture - Spiritual Interpretation
    generateMetaphoricalScriptureContent(variation) {
        let interpretationsHtml = '';
        
        variation.interpretations.forEach((interpretation, index) => {
            interpretationsHtml += `
                <div class="metaphor-interpretation">
                    <div class="scripture-passage">
                        <strong>Scripture:</strong> "${interpretation.passage}"
                    </div>
                    <div class="interpretation-levels">
                        <div class="surface-level">
                            <strong>Surface:</strong> ${interpretation.surface}
                        </div>
                        <div class="deeper-level">
                            <strong>Deeper:</strong> ${interpretation.deeper}
                        </div>
                    </div>
                    <div class="interpretation-question">
                        <strong>Question:</strong> ${interpretation.question}
                    </div>
                    <div class="interpretation-input">
                        <input type="text" 
                               id="metaphor${index + 1}" 
                               placeholder="Enter spiritual interpretation"
                               class="metaphor-input">
                    </div>
                </div>
            `;
        });

        return `
            <div class="metaphorical-scripture-challenge">
                <h3>🕊️ SPIRITUAL INTERPRETATION TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ REQUIRES SPIRITUAL INSIGHT</strong></p>
                    <p>Look beyond the literal meaning to understand deeper spiritual truths.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="interpretations-container">
                    ${interpretationsHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkMetaphoricalScripture()">✨ Submit Interpretations</button>
                    <button class="btn secondary" onclick="resetChallenge('metaphoricalScripture')">🔄 Reset</button>
                </div>
                
                <div id="metaphoricalScriptureResult" class="challenge-result"></div>
            </div>
        `;
    }

    // CHALLENGE 6: Prophetic Logic - Advanced Biblical Reasoning
    generateProphethicLogicContent(variation) {
        let logicChainsHtml = '';
        
        variation.logic_chains.forEach((chain, index) => {
            if (chain.premise1) {
                logicChainsHtml += `
                    <div class="logic-chain">
                        <div class="premises">
                            <div class="premise">Premise 1: ${chain.premise1}</div>
                            <div class="premise">Premise 2: ${chain.premise2}</div>
                            <div class="premise">Premise 3: ${chain.premise3}</div>
                        </div>
                        <div class="conclusion-question">
                            <strong>${chain.conclusion_question}</strong>
                        </div>
                        <div class="logic-input">
                            <input type="text" 
                                   id="prophetic${index + 1}" 
                                   placeholder="Enter logical conclusion"
                                   class="prophetic-input">
                        </div>
                    </div>
                `;
            } else if (chain.timeline) {
                let eventsHtml = '';
                chain.events.forEach((event, eventIndex) => {
                    eventsHtml += `
                        <div class="timeline-event">
                            <div class="stage">${event.stage}</div>
                            <div class="content">${event.content}</div>
                        </div>
                    `;
                });
                
                logicChainsHtml += `
                    <div class="timeline-logic">
                        <div class="timeline-title">${chain.timeline}</div>
                        <div class="timeline-events">
                            ${eventsHtml}
                        </div>
                        <div class="timeline-question">
                            <strong>${chain.question}</strong>
                        </div>
                        <div class="logic-input">
                            <input type="text" 
                                   id="prophetic${index + 1}" 
                                   placeholder="Enter principle"
                                   class="prophetic-input">
                        </div>
                    </div>
                `;
            } else if (chain.syllogism) {
                logicChainsHtml += `
                    <div class="syllogism-logic">
                        <div class="syllogism">${chain.syllogism}</div>
                        <div class="syllogism-question">
                            <strong>${chain.question}</strong>
                        </div>
                        <div class="logic-input">
                            <input type="text" 
                                   id="prophetic${index + 1}" 
                                   placeholder="Enter logical implication"
                                   class="prophetic-input">
                        </div>
                    </div>
                `;
            }
        });

        return `
            <div class="prophetic-logic-challenge">
                <h3>🔮 PROPHETIC LOGIC TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ ADVANCED REASONING</strong></p>
                    <p>Apply logical reasoning to prophetic and theological concepts.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="logic-chains-container">
                    ${logicChainsHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkProphethicLogic()">⚡ Submit Logic</button>
                    <button class="btn secondary" onclick="resetChallenge('prophethicLogic')">🔄 Reset</button>
                </div>
                
                <div id="prophethicLogicResult" class="challenge-result"></div>
            </div>
        `;
    }

    // CHALLENGE 7: Revelation Code - Ultimate Biblical Mysteries
    generateRevelationCodeContent(variation) {
        let ultimateCodesHtml = '';
        
        variation.ultimate_codes.forEach((code, index) => {
            if (code.type === 'symbolic_matrix') {
                let elementsHtml = code.elements.map(element => `<div class="matrix-element">${element}</div>`).join('');
                ultimateCodesHtml += `
                    <div class="symbolic-matrix">
                        <div class="matrix-title">${code.cipher}</div>
                        <div class="matrix-elements">
                            ${elementsHtml}
                        </div>
                        <div class="matrix-pattern">Pattern: ${code.pattern}</div>
                        <div class="matrix-question">
                            <strong>${code.question}</strong>
                        </div>
                        <div class="matrix-input">
                            <input type="text" 
                                   id="revelation${index + 1}" 
                                   placeholder="Enter symbolic meaning"
                                   class="revelation-input">
                        </div>
                    </div>
                `;
            } else if (code.type === 'numerical_prophecy') {
                ultimateCodesHtml += `
                    <div class="numerical-prophecy">
                        <div class="prophecy-title">${code.cipher}</div>
                        <div class="prophecy-sequence">${code.sequence}</div>
                        <div class="prophecy-meaning">Meaning: ${code.meaning}</div>
                        <div class="prophecy-input">
                            <input type="text" 
                                   id="revelation${index + 1}" 
                                   placeholder="Enter calculation result"
                                   class="revelation-input">
                        </div>
                    </div>
                `;
            } else if (code.type === 'alpha_omega') {
                ultimateCodesHtml += `
                    <div class="alpha-omega">
                        <div class="title-message">${code.message}</div>
                        <div class="title-question">
                            <strong>${code.question}</strong>
                        </div>
                        <div class="title-input">
                            <input type="text" 
                                   id="revelation${index + 1}" 
                                   placeholder="Enter divine attribute"
                                   class="revelation-input">
                        </div>
                    </div>
                `;
            } else {
                ultimateCodesHtml += `
                    <div class="ultimate-code">
                        <div class="code-message">${code.message}</div>
                        <div class="code-question">
                            <strong>${code.question}</strong>
                        </div>
                        <div class="code-input">
                            <input type="text" 
                                   id="revelation${index + 1}" 
                                   placeholder="Enter answer"
                                   class="revelation-input">
                        </div>
                    </div>
                `;
            }
        });

        return `
            <div class="revelation-code-challenge">
                <h3>🌟 REVELATION CODE TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ ULTIMATE MYSTERY</strong></p>
                    <p>Decrypt the deepest biblical mysteries and symbolic patterns.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="ultimate-codes-container">
                    ${ultimateCodesHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkRevelationCode()">🔥 Unlock Final Mystery</button>
                    <button class="btn secondary" onclick="resetChallenge('revelationCode')">🔄 Reset</button>
                </div>
                
                <div id="revelationCodeResult" class="challenge-result"></div>
            </div>
        `;
    }

    // CHALLENGE 5: Chronological Order - Biblical Timeline
    generateChronologicalOrderContent(variation) {
        // Shuffle events for display
        const shuffledEvents = [...variation.events].sort(() => Math.random() - 0.5);
        
        let eventsHtml = '';
        shuffledEvents.forEach((event, index) => {
            eventsHtml += `
                <div class="drag-item" draggable="true" data-event-id="${event.id}">
                    <div class="event-text">${event.text}</div>
                    <div class="event-period" style="font-size: 0.8em; color: #b8a082; margin-top: 5px;">
                        Period: ${event.period}
                    </div>
                </div>
            `;
        });

        let timelineHtml = '';
        for (let i = 0; i < variation.events.length; i++) {
            timelineHtml += `
                <div class="drop-zone" data-position="${i}">
                    Drop event ${i + 1} here
                </div>
            `;
        }

        return `
            <div class="chronological-order-challenge">
                <h3>⏰ CHRONOLOGICAL ORDER TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ ARRANGE IN CORRECT ORDER</strong></p>
                    <p>Drag and drop the biblical events into their correct chronological sequence.</p>
                    <p><strong>Timeline:</strong> <span class="keyword-target">${variation.timeline}</span></p>
                </div>
                
                <div class="items-pool">
                    <div class="pool-title">📜 Biblical Events (Drag to Timeline)</div>
                    ${eventsHtml}
                </div>
                
                <div class="chronology-timeline">
                    <h4 style="color: #d4af37; text-align: center; margin-bottom: 15px;">⏳ Timeline (Earliest to Latest)</h4>
                    ${timelineHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkChronologicalOrder()">📅 Verify Timeline</button>
                    <button class="btn secondary" onclick="resetChallenge('chronologicalOrder')">🔄 Reset</button>
                    ${this.getComplexityHint('chronologicalOrder')}
                </div>
                
                <div id="chronologicalOrderResult" class="challenge-result"></div>
            </div>
        `;
    }

    // CHALLENGE 6: Scripture Topics - Thematic Organization
    generateScriptureTopicsContent(variation) {
        // Combine all verses and shuffle them
        let allVerses = [];
        variation.topics.forEach(topic => {
            topic.correctVerses.forEach(verse => {
                allVerses.push({
                    text: verse,
                    topicName: topic.name,
                    isCorrect: true
                });
            });
        });
        
        // Add distractor verses
        variation.distractorVerses.forEach(verse => {
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
        variation.topics.forEach((topic, index) => {
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
                <h3>📚 SCRIPTURE ORGANIZATION TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ ORGANIZE BY TOPIC</strong></p>
                    <p>Drag Bible verses to their correct thematic categories.</p>
                    <p><strong>Topic Theme:</strong> <span class="keyword-target">${variation.topicName}</span></p>
                </div>
                
                <div class="items-pool">
                    <div class="pool-title">📖 Bible Verses (Drag to Categories)</div>
                    ${versesHtml}
                </div>
                
                <div class="scripture-topics">
                    ${topicsHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkScriptureTopics()">🗂️ Verify Organization</button>
                    <button class="btn secondary" onclick="resetChallenge('scriptureTopics')">🔄 Reset</button>
                    ${this.getComplexityHint('scriptureTopics')}
                </div>
                
                <div id="scriptureTopicsResult" class="challenge-result"></div>
            </div>
        `;
    }

    // CHALLENGE 7: Biblical Wisdom - Comprehensive Knowledge
    generateBiblicalWisdomContent(variation) {
        let challengesHtml = '';
        
        variation.challenges.forEach((challenge, index) => {
            if (challenge.type === 'multiple_choice' || challenge.type === 'synthesis') {
                let optionsHtml = '';
                challenge.options.forEach((option, optIndex) => {
                    optionsHtml += `
                        <label class="wisdom-option">
                            <input type="radio" name="wisdom${index}" value="${option}">
                            <span class="option-text">${option}</span>
                        </label>
                    `;
                });
                
                challengesHtml += `
                    <div class="wisdom-question">
                        <div class="question-header">
                            <span class="question-number">Question ${index + 1}:</span>
                        </div>
                        <div class="question-text">${challenge.question}</div>
                        <div class="wisdom-options">
                            ${optionsHtml}
                        </div>
                    </div>
                `;
            } else {
                challengesHtml += `
                    <div class="wisdom-question">
                        <div class="question-header">
                            <span class="question-number">Question ${index + 1}:</span>
                        </div>
                        <div class="question-text">${challenge.question}</div>
                        ${challenge.context ? `<div class="question-context" style="font-size: 0.9em; color: #b8a082; margin: 5px 0;">Reference: ${challenge.context || challenge.reference}</div>` : ''}
                        <div class="answer-input">
                            <input type="text" 
                                   id="wisdom${index + 1}" 
                                   placeholder="Enter your answer" 
                                   class="wisdom-input"
                                   maxlength="50">
                        </div>
                    </div>
                `;
            }
        });

        return `
            <div class="biblical-wisdom-challenge">
                <h3>👑 BIBLICAL WISDOM TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ DEMONSTRATE MASTERY</strong></p>
                    <p>Apply your complete biblical knowledge and spiritual understanding.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="wisdom-container">
                    ${challengesHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkBiblicalWisdom()">🎓 Submit Wisdom</button>
                    <button class="btn secondary" onclick="resetChallenge('biblicalWisdom')">🔄 Reset</button>
                    ${this.getComplexityHint('biblicalWisdom')}
                </div>
                
                <div id="biblicalWisdomResult" class="challenge-result"></div>
            </div>
        `;
    }

    // Reset a challenge to initial state
    async resetChallenge(challengeType) {
        const challengeContent = document.getElementById('puzzleContent');
        if (challengeContent) {
            const sealData = window.gameState.currentSeal;
            if (sealData) {
                challengeContent.innerHTML = await this.generatePuzzleContent(sealData.id, challengeType);
            }
        }
    }

    // Get current puzzle variation for a type
    getPuzzleVariation(puzzleType) {
        return this.currentPuzzles[puzzleType];
    }

    // Set puzzle variations (useful for multiplayer sync)
    setPuzzleVariations(variations) {
        this.currentPuzzles = { ...variations };
    }

    // Clear all puzzle selections and start new game session
    clearPuzzles() {
        this.currentPuzzles = {};
        this.teamInputs = {};
        this.gameSessionId = Date.now(); // New game session for randomization
        console.log('🎲 New game session started - puzzles will be randomized');
    }

    // Get current game session identifier
    getCurrentGameSession() {
        if (!this.gameSessionId) {
            this.gameSessionId = Date.now();
        }
        return this.gameSessionId;
    }

    // Force regenerate all puzzles for new game
    regeneratePuzzles() {
        console.log('🎲 Regenerating all puzzles for fresh game experience...');
        this.gameSessionId = Date.now();
        this.currentPuzzles = {};
        this.teamInputs = {};
        
        // Clear cached content to force AI regeneration if available
        if (window.BibleGameAI && window.gameState?.complexity?.level) {
            console.log('🤖 AI engine available - will generate fresh dynamic content for each seal');
            // Don't pre-cache anything - let AI generate fresh content each time
        } else {
            // Fallback: Pre-generate random variations from static content
            const puzzleTypes = Object.keys(window.GameData.puzzleVariations);
            puzzleTypes.forEach(type => {
                const variations = window.GameData.puzzleVariations[type];
                if (variations && variations.length > 0) {
                    const randomIndex = Math.floor(Math.random() * variations.length);
                    this.currentPuzzles[type] = variations[randomIndex];
                    console.log(`🎲 Pre-generated ${type} - variation ${randomIndex + 1}/${variations.length}`);
                }
            });
        }
        
        console.log('✅ All puzzles regenerated for fresh game experience!');
    }

    // Dynamic content generation using AI engine
    async generateDynamicContent(sealId, puzzleType) {
        try {
            const complexity = window.gameState?.complexity?.level || 'intermediate';
            const gameSession = {
                preferences: this.getPlayerPreferences(),
                strengths: this.getPlayerStrengths(),
                engagement: 'high'
            };
            
            return await window.BibleGameAI.generateDynamicSeal(sealId, complexity, gameSession);
        } catch (error) {
            console.log('Dynamic generation failed, using fallback', error);
            return null;
        }
    }

    // Render dynamically generated content
    renderDynamicContent(dynamicContent, puzzleType) {
        // Store the dynamic content for validation
        this.currentPuzzles[puzzleType] = dynamicContent;
        
        // Add immersive introduction
        const immersiveIntro = dynamicContent.immersiveIntro || '';
        
        switch (puzzleType) {
            case 'bibleKnowledge':
                return this.renderDynamicBibleKnowledge(dynamicContent, immersiveIntro);
            case 'chronologicalOrder':
                return this.renderDynamicChronological(dynamicContent, immersiveIntro);
            case 'scriptureTopics':
                return this.renderDynamicScriptureTopics(dynamicContent, immersiveIntro);
            case 'biblicalWisdom':
                return this.renderDynamicWisdom(dynamicContent, immersiveIntro);
            default:
                return this.generateBibleKnowledgeContent(dynamicContent);
        }
    }

    renderDynamicBibleKnowledge(content, intro) {
        let questionsHtml = '';
        
        content.questions.forEach((question, index) => {
            questionsHtml += `
                <div class="knowledge-question">
                    <div class="question-header">
                        <span class="question-number">Question ${index + 1}:</span>
                    </div>
                    <div class="question-text">${question.question}</div>
                    ${question.hints && question.hints.length > 0 ? `
                        <div class="question-hints" style="font-size: 0.9em; color: #b8a082; margin: 5px 0;">
                            ${question.hints.map(hint => `💡 ${hint}`).join('<br>')}
                        </div>
                    ` : ''}
                    <div class="answer-input">
                        <input type="text" 
                               id="knowledge${index + 1}" 
                               placeholder="Enter your answer" 
                               class="knowledge-input"
                               maxlength="50">
                    </div>
                </div>
            `;
        });

        return `
            <div class="bible-knowledge-challenge">
                <div class="immersive-intro" style="
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(255, 215, 0, 0.05));
                    border: 1px solid #d4af37;
                    border-radius: 10px;
                    padding: 15px;
                    margin-bottom: 20px;
                    color: #d4af37;
                    font-style: italic;
                    text-align: center;
                ">${intro}</div>
                
                <h3>📖 DYNAMIC SCRIPTURE KNOWLEDGE TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ AI-GENERATED CHALLENGE</strong></p>
                    <p>This unique challenge has been created specifically for your skill level.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${content.keyword}</span></p>
                </div>
                
                <div class="questions-container">
                    ${questionsHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkBibleKnowledge()">🔍 Verify Answers</button>
                    <button class="btn secondary" onclick="resetChallenge('bibleKnowledge')">🔄 Reset</button>
                    ${this.getComplexityHint('bibleKnowledge')}
                </div>
                
                <div id="bibleKnowledgeResult" class="challenge-result"></div>
            </div>
        `;
    }

    renderDynamicChronological(content, intro) {
        // Shuffle events for display
        const shuffledEvents = [...content.events].sort(() => Math.random() - 0.5);
        
        let eventsHtml = '';
        shuffledEvents.forEach((event, index) => {
            eventsHtml += `
                <div class="drag-item" draggable="true" data-event-id="${event.id}">
                    <div class="event-text">${event.text}</div>
                    <div class="event-period" style="font-size: 0.8em; color: #b8a082; margin-top: 5px;">
                        Period: ${event.period}
                    </div>
                </div>
            `;
        });

        let timelineHtml = '';
        for (let i = 0; i < content.events.length; i++) {
            timelineHtml += `
                <div class="drop-zone" data-position="${i}">
                    Drop event ${i + 1} here
                </div>
            `;
        }

        return `
            <div class="chronological-order-challenge">
                <div class="immersive-intro" style="
                    background: linear-gradient(135deg, rgba(147, 112, 219, 0.1), rgba(138, 43, 226, 0.05));
                    border: 1px solid #9370db;
                    border-radius: 10px;
                    padding: 15px;
                    margin-bottom: 20px;
                    color: #9370db;
                    font-style: italic;
                    text-align: center;
                ">${intro}</div>
                
                <h3>⏰ DYNAMIC CHRONOLOGICAL ORDER TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ AI-GENERATED TIMELINE</strong></p>
                    <p>This unique timeline has been crafted for your knowledge level.</p>
                    <p><strong>Timeline:</strong> <span class="keyword-target">${content.timeline}</span></p>
                </div>
                
                <div class="items-pool">
                    <div class="pool-title">📜 Biblical Events (Drag to Timeline)</div>
                    ${eventsHtml}
                </div>
                
                <div class="chronology-timeline">
                    <h4 style="color: #d4af37; text-align: center; margin-bottom: 15px;">⏳ Timeline (Earliest to Latest)</h4>
                    ${timelineHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkChronologicalOrder()">📅 Verify Timeline</button>
                    <button class="btn secondary" onclick="resetChallenge('chronologicalOrder')">🔄 Reset</button>
                    ${this.getComplexityHint('chronologicalOrder')}
                </div>
                
                <div id="chronologicalOrderResult" class="challenge-result"></div>
            </div>
        `;
    }

    getPlayerPreferences() {
        // Analyze player's previous choices to determine preferences
        const prefs = localStorage.getItem('playerPreferences');
        return prefs ? JSON.parse(prefs) : {};
    }

    getPlayerStrengths() {
        // Analyze completion patterns to identify strengths
        const strengths = localStorage.getItem('playerStrengths');
        return strengths ? JSON.parse(strengths) : [];
    }

    // Learning system tracking
    recordSealSuccess(sealType, variation, sealNumber) {
        try {
            const sessionData = {
                sealType,
                sealNumber,
                success: true,
                timestamp: Date.now(),
                difficulty: window.gameState?.complexity?.level || 'intermediate',
                variation: variation.keyword || 'unknown',
                timeTaken: this.getTimeTaken(sealNumber)
            };
            
            // Update player preferences based on success
            this.updatePlayerPreferences(sealType, true);
            
            // Update player strengths
            this.updatePlayerStrengths(sealType, true);
            
            // Record in AI learning system
            if (window.BibleGameAI) {
                const learningData = {
                    seal: sealNumber,
                    type: sealType,
                    success: true,
                    engagement: 'high',
                    timestamp: Date.now()
                };
                // Store for later batch processing
                this.addToLearningQueue(learningData);
            }
            
            console.log(`📊 Recorded success: Seal ${sealNumber} (${sealType})`);
        } catch (error) {
            console.log('Learning tracking error:', error);
        }
    }

    recordSealAttempt(sealType, variation, sealNumber, success) {
        try {
            const sessionData = {
                sealType,
                sealNumber,
                success,
                timestamp: Date.now(),
                difficulty: window.gameState?.complexity?.level || 'intermediate',
                variation: variation.keyword || 'unknown',
                attempt: true
            };
            
            // Update preferences and strengths
            this.updatePlayerPreferences(sealType, success);
            this.updatePlayerStrengths(sealType, success);
            
            console.log(`📊 Recorded attempt: Seal ${sealNumber} (${sealType}) - Success: ${success}`);
        } catch (error) {
            console.log('Learning tracking error:', error);
        }
    }

    updatePlayerPreferences(sealType, success) {
        try {
            let prefs = this.getPlayerPreferences();
            if (!prefs[sealType]) {
                prefs[sealType] = { attempts: 0, successes: 0, preference: 1 };
            }
            
            prefs[sealType].attempts++;
            if (success) {
                prefs[sealType].successes++;
                prefs[sealType].preference = Math.min(5, prefs[sealType].preference + 0.2);
            } else {
                prefs[sealType].preference = Math.max(0.2, prefs[sealType].preference - 0.1);
            }
            
            localStorage.setItem('playerPreferences', JSON.stringify(prefs));
        } catch (error) {
            console.log('Preference update error:', error);
        }
    }

    updatePlayerStrengths(sealType, success) {
        try {
            let strengths = this.getPlayerStrengths();
            const strengthIndex = strengths.findIndex(s => s.type === sealType);
            
            if (strengthIndex >= 0) {
                strengths[strengthIndex].level += success ? 1 : -0.5;
                strengths[strengthIndex].level = Math.max(0, Math.min(10, strengths[strengthIndex].level));
            } else {
                strengths.push({
                    type: sealType,
                    level: success ? 1 : 0.5,
                    firstSeen: Date.now()
                });
            }
            
            // Keep only top 20 strengths
            strengths.sort((a, b) => b.level - a.level);
            strengths = strengths.slice(0, 20);
            
            localStorage.setItem('playerStrengths', JSON.stringify(strengths));
        } catch (error) {
            console.log('Strengths update error:', error);
        }
    }

    addToLearningQueue(data) {
        try {
            let queue = JSON.parse(localStorage.getItem('learningQueue') || '[]');
            queue.push(data);
            
            // Keep queue manageable
            if (queue.length > 100) {
                queue = queue.slice(-50);
            }
            
            localStorage.setItem('learningQueue', JSON.stringify(queue));
            
            // Process queue periodically
            if (queue.length % 10 === 0) {
                this.processLearningQueue();
            }
        } catch (error) {
            console.log('Learning queue error:', error);
        }
    }

    processLearningQueue() {
        try {
            const queue = JSON.parse(localStorage.getItem('learningQueue') || '[]');
            if (queue.length === 0) return;
            
            // Analyze patterns
            const patterns = this.analyzeLearningPatterns(queue);
            
            // Update AI system if available
            if (window.BibleGameAI && patterns) {
                window.BibleGameAI.recordGameSession({
                    difficulty: window.gameState?.complexity?.level || 'intermediate',
                    completionTime: Date.now() - (window.gameState?.startTime || Date.now()),
                    sealsCompleted: window.gameState?.completedSeals?.length || 0,
                    strengths: patterns.strengths,
                    weaknesses: patterns.weaknesses,
                    engagement: patterns.engagement,
                    preferences: patterns.preferences
                });
            }
            
            // Clear processed queue
            localStorage.setItem('learningQueue', '[]');
            
            console.log('📊 Processed learning queue with', queue.length, 'items');
        } catch (error) {
            console.log('Learning processing error:', error);
        }
    }

    analyzeLearningPatterns(queue) {
        try {
            const sealTypes = {};
            const strengths = [];
            const weaknesses = [];
            let totalEngagement = 0;
            
            queue.forEach(item => {
                if (!sealTypes[item.type]) {
                    sealTypes[item.type] = { successes: 0, attempts: 0 };
                }
                sealTypes[item.type].attempts++;
                if (item.success) {
                    sealTypes[item.type].successes++;
                    totalEngagement += 2;
                } else {
                    totalEngagement += 1;
                }
            });
            
            // Determine strengths and weaknesses
            Object.keys(sealTypes).forEach(type => {
                const stats = sealTypes[type];
                const successRate = stats.successes / stats.attempts;
                
                if (successRate >= 0.8) {
                    strengths.push(type);
                } else if (successRate <= 0.4) {
                    weaknesses.push(type);
                }
            });
            
            return {
                strengths,
                weaknesses,
                engagement: totalEngagement / queue.length > 1.5 ? 'high' : 'medium',
                preferences: sealTypes
            };
        } catch (error) {
            console.log('Pattern analysis error:', error);
            return null;
        }
    }

    getTimeTaken(sealNumber) {
        // Calculate time taken for this seal (simplified)
        return Date.now() - (this.sealStartTime || Date.now());
    }

    // Get complexity-based hint for puzzle types
    getComplexityHint(puzzleType) {
        const complexity = window.gameState?.complexity?.settings || { hintsAvailable: false };
        
        if (!complexity.hintsAvailable) {
            return '';
        }
        
        const hints = {
            bibleKnowledge: 'Think about key figures, numbers, and places mentioned throughout Scripture.',
            logicalReasoning: 'Look for patterns in biblical narratives and theological connections.',
            teamCommunication: 'Consider the attributes and roles of the Trinity and biblical covenants.',
            codeBreaking: 'Ancient ciphers often use numerical values and letter substitutions.',
            metaphoricalScripture: 'Look beyond the literal meaning to find spiritual truths.',
            prophethicLogic: 'Consider how God\'s promises connect through Christ.',
            revelationCode: 'Numbers in Revelation often represent completion and perfection.'
        };
        
        const hint = hints[puzzleType] || '';
        
        return hint ? `
            <div class="complexity-hint" style="
                background: rgba(212, 175, 55, 0.1); 
                border: 1px solid #d4af37; 
                border-radius: 5px; 
                padding: 10px; 
                margin-top: 10px;
                color: #d4af37;
                font-size: 0.9em;
            ">
                💡 <strong>Hint:</strong> ${hint}
            </div>
        ` : '';
    }

    // Missing methods for compatibility
    regeneratePuzzles() {
        this.currentPuzzles = {};
        this.gameSessionId = null;
        console.log('🔄 Puzzles regenerated - fresh content will be generated');
    }

    getPuzzleVariation(puzzleType) {
        return this.currentPuzzles[puzzleType] || null;
    }

    getHintsUsed() {
        return this.hintsUsed || 0;
    }

    showHint(puzzleType) {
        this.hintsUsed++;
        console.log(`💡 Hint shown for ${puzzleType}, total hints used: ${this.hintsUsed}`);
    }

    resetPuzzle(puzzleType) {
        if (this.currentPuzzles[puzzleType]) {
            delete this.currentPuzzles[puzzleType];
            console.log(`🔄 Reset puzzle: ${puzzleType}`);
        }
    }

    clearPuzzles() {
        this.currentPuzzles = {};
        this.hintsUsed = 0;
        this.gameSessionId = null;
        console.log('🧹 All puzzles cleared');
    }

    recordSealSuccess(puzzleType, variation, sealNumber) {
        console.log(`✅ Recorded success for ${puzzleType} - Seal ${sealNumber}`);
    }

    recordSealAttempt(puzzleType, variation, sealNumber, success) {
        console.log(`📝 Recorded attempt for ${puzzleType} - Seal ${sealNumber}, Success: ${success}`);
    }
}

// Initialize enhanced puzzle manager
const enhancedPuzzleManager = new EnhancedPuzzleManager();

// Make it globally available as PuzzleManager
window.PuzzleManager = enhancedPuzzleManager;

// Enhanced validation functions with flexible answer matching
// Comprehensive synonym and equivalent answer system
const answerSynonyms = {
    // Biblical numbers
    '40': ['FORTY', '40', 'FOURTY'],
    '3': ['THREE', '3', 'III'],
    '10': ['TEN', '10', 'X'],
    '12': ['TWELVE', '12', 'XII'],
    '5': ['FIVE', '5', 'V'],
    '50': ['FIFTY', '50', 'L'],
    
    // Biblical names and places
    'HANNAH': ['HANNAH', 'HANNA'],
    'SINAI': ['SINAI', 'MOUNT SINAI', 'MT SINAI', 'HOREB', 'MT HOREB'],
    'SARAH': ['SARAH', 'SARA', 'SARAI'],
    'JOHN': ['JOHN', 'GOSPEL OF JOHN', 'JOHN\'S GOSPEL'],
    'AARON': ['AARON', 'ARON'],
    'ANNA': ['ANNA', 'ANNE'],
    'SOLOMON': ['SOLOMON', 'KING SOLOMON'],
    'BETHLEHEM': ['BETHLEHEM', 'BETHELEM', 'CITY OF DAVID'],
    'STEPHEN': ['STEPHEN', 'STEVEN', 'STEFANOS'],
    
    // Abstract concepts - Bible Knowledge
    'SALVATION': ['SALVATION', 'SAVED', 'REDEMPTION', 'DELIVERANCE', 'RESCUE'],
    'REDEMPTION': ['REDEMPTION', 'SALVATION', 'DELIVERANCE', 'RESCUE', 'SAVING'],
    
    // Logical Reasoning concepts
    'COVENANT': ['COVENANT', 'AGREEMENT', 'PROMISE', 'PACT', 'CONTRACT'],
    'WISDOM': ['WISDOM', 'KNOWLEDGE', 'UNDERSTANDING', 'INSIGHT', 'DISCERNMENT'],
    'KING': ['KING', 'RULER', 'LEADER', 'MONARCH', 'SOVEREIGN'],
    'JAMES': ['JAMES', 'JACOB', 'JAMES THE GREATER'],
    'DIVISION': ['DIVISION', 'SPLIT', 'SEPARATION', 'DIVIDED KINGDOM'],
    'PERSEVERANCE': ['PERSEVERANCE', 'PERSISTENCE', 'ENDURANCE', 'STEADFASTNESS', 'FAITHFULNESS'],
    
    // Team Communication concepts
    'UNITY': ['UNITY', 'ONENESS', 'TOGETHER', 'UNIFIED', 'HARMONY'],
    'FELLOWSHIP': ['FELLOWSHIP', 'COMMUNITY', 'BROTHERHOOD', 'COMMUNION', 'PARTNERSHIP'],
    'CREATOR': ['CREATOR', 'MAKER', 'FATHER', 'GOD', 'ALMIGHTY'],
    'REDEEMER': ['REDEEMER', 'SAVIOR', 'SAVIOUR', 'DELIVERER', 'RESCUER'],
    'COMFORTER': ['COMFORTER', 'HELPER', 'COUNSELOR', 'ADVOCATE', 'GUIDE', 'PARACLETE'],
    'PETER': ['PETER', 'SIMON PETER', 'SIMON', 'CEPHAS'],
    'PAUL': ['PAUL', 'SAUL', 'APOSTLE PAUL', 'SAUL OF TARSUS'],
    
    // Code Breaking concepts
    'MYSTERY': ['MYSTERY', 'SECRET', 'HIDDEN TRUTH', 'ENIGMA'],
    'REVELATION': ['REVELATION', 'APOCALYPSE', 'UNVEILING', 'DISCLOSURE'],
    'HELLO': ['HELLO', 'HI', 'GREETINGS'],
    'GLORY': ['GLORY', 'HONOR', 'PRAISE', 'MAJESTY'],
    '26': ['26', 'TWENTY-SIX', 'TWENTY SIX'],
    '47': ['47', 'FORTY-SEVEN', 'FORTY SEVEN'],
    
    // Metaphorical Scripture concepts
    'TRUTH': ['TRUTH', 'REALITY', 'FACT', 'VERITY'],
    'LIGHT': ['LIGHT', 'ILLUMINATION', 'BRIGHTNESS', 'LAMP'],
    'GOOD WORKS': ['GOOD WORKS', 'WORKS', 'DEEDS', 'FRUIT', 'SERVICE', 'MINISTRY', 'LOVE', 'ACTIONS'],
    'FAITH EXPANSION': ['FAITH EXPANSION', 'FAITH', 'GROWTH', 'EXPANSION', 'SPREAD', 'INFLUENCE', 'KINGDOM GROWTH', 'IMPACT'],
    'DISCERNMENT WITH PURITY': ['DISCERNMENT WITH PURITY', 'DISCERNMENT', 'WISDOM', 'BALANCE', 'PURITY', 'INNOCENT', 'WISE', 'SHREWD', 'CAREFUL', 'PRUDENT'],
    'WITNESSING': ['WITNESSING', 'WITNESS', 'TESTIMONY', 'SHARING', 'EVANGELISM', 'EXAMPLE', 'LIVING', 'SHOWING'],
    'BELIEVING': ['BELIEVING', 'BELIEF', 'FAITH', 'ACCEPTING', 'RECEIVING', 'TRUSTING', 'FOLLOWING'],
    
    // Prophetic Logic concepts
    'PROMISE': ['PROMISE', 'COVENANT', 'PLEDGE', 'VOW', 'ASSURANCE'],
    'ETERNAL': ['ETERNAL', 'EVERLASTING', 'FOREVER', 'INFINITE', 'TIMELESS'],
    'ALL PROMISES': ['ALL PROMISES', 'PROMISES', 'EVERYTHING', 'FULFILLED', 'COMPLETE', 'YES AND AMEN'],
    'DIVINE FAITHFULNESS': ['DIVINE FAITHFULNESS', 'FAITHFULNESS', 'FAITHFUL', 'RELIABLE', 'TRUSTWORTHY', 'DEPENDABLE', 'UNCHANGING', 'SURE'],
    'ETERNAL SECURITY': ['ETERNAL SECURITY', 'ETERNAL SALVATION', 'SECURITY', 'ETERNAL', 'PERMANENT', 'FOREVER', 'CANNOT BE LOST', 'SECURE', 'LASTING', 'UNCHANGING', 'GUARANTEED'],
    
    // Revelation Code concepts
    'VICTORY': ['VICTORY', 'TRIUMPH', 'CONQUEST', 'WIN', 'OVERCOME'],
    'OMEGA': ['OMEGA', 'END', 'LAST', 'FINAL'],
    'JUBILEE': ['JUBILEE', 'CELEBRATION', 'FREEDOM', 'COMPLETION', 'PERFECTION'],
    '1000': ['1000', 'THOUSAND', 'ONE THOUSAND'],
    '777': ['777', 'SEVEN SEVEN SEVEN', 'PERFECTION'],
    'ETERNAL EXISTENCE': ['ETERNAL EXISTENCE', 'ETERNAL', 'EXISTENCE', 'EVERLASTING', 'TIMELESS', 'WITHOUT BEGINNING OR END']
};

// Helper function to check if answer matches including synonyms
function isAnswerCorrect(userAnswer, correctAnswer) {
    const user = userAnswer.trim().toUpperCase();
    const correct = correctAnswer.toUpperCase();
    
    // Exact match is preferred
    if (user === correct) return true;
    
    // Simple variations for children/teens - help with common misspellings
    const acceptableVariations = {
        'RED SEA': ['REDSEA', 'THE RED SEA'],
        'NOAH': ['NOAH\'S'],
        'AARON': ['AARON\'S'],  
        'BETHLEHEM': ['BETHELEM', 'BETHLAHEM'],
        'DANIEL': ['DANIAL', 'DANNIEL'],
        'SLING': ['SLINGSHOT', 'STONE', 'ROCK', 'STONES'],
        '40': ['FORTY', 'FOURTY'],
        '12': ['TWELVE'],
        '3': ['THREE']
    };
    
    // Check if user's answer is an acceptable variation
    if (acceptableVariations[correct]) {
        return acceptableVariations[correct].includes(user);
    }
    
    return false;
}

function checkBibleKnowledge() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('bibleKnowledge');
    if (!variation) return;
    
    let correctCount = 0;
    const results = [];
    
    variation.questions.forEach((question, index) => {
        const userAnswer = document.getElementById(`knowledge${index + 1}`).value.trim();
        const correctAnswer = question.correctAnswer;
        
        if (isAnswerCorrect(userAnswer, correctAnswer)) {
            results.push(`✅ Q${index + 1}: Correct!`);
            correctCount++;
        } else {
            results.push(`❌ Q${index + 1}: Try "${correctAnswer}"`);
        }
    });
    
    // Make it beginner-friendly: only need 60% correct to pass
    const passThreshold = Math.ceil(variation.questions.length * 0.6);
    const allCorrect = correctCount >= passThreshold;
    
    const resultDiv = document.getElementById('bibleKnowledgeResult');
    if (allCorrect) {
        // Record success for learning system
        window.PuzzleManager.recordSealSuccess('bibleKnowledge', variation, 1);
        
        // Enhanced success message with immersion
        const successMessage = window.ImmersionEngine ? 
            window.BibleGameAI?.generateSuccessMessage(1, window.gameState?.complexity?.level || 'medium') :
            `🏆 <strong>GREAT JOB!</strong><br>Keyword unlocked: <strong>${variation.keyword}</strong>`;
            
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                ${successMessage}<br>
                You got ${correctCount}/${variation.questions.length} correct - that's enough to proceed!<br>
                ${results.join('<br>')}
            </div>
        `;
        
        // Trigger celebration effects
        if (window.ImmersionEngine) {
            window.ImmersionEngine.triggerSuccessCelebration(1);
        }
        
        setTimeout(() => window.completeSeal(1), 1500);
    } else {
        // Record attempt for learning
        window.PuzzleManager.recordSealAttempt('bibleKnowledge', variation, 1, false);
        
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                📚 <strong>Keep Trying!</strong><br>
                You got ${correctCount}/${variation.questions.length} correct. You need at least ${passThreshold} to proceed.<br>
                Look at the answers above and try again!<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

// Add hint function for Bible Knowledge
function showBibleKnowledgeHint() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('bibleKnowledge');
    if (!variation) return;
    
    const hintDiv = document.getElementById('bibleKnowledgeHint');
    
    let hintsHtml = '<div style="background: rgba(0, 150, 0, 0.1); padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #009600;">';
    hintsHtml += '<h4 style="color: #009600; margin-bottom: 10px;">🎯 Extended Hints:</h4>';
    
    variation.questions.forEach((question, index) => {
        // Show the correct answer as an extended hint for struggling children
        hintsHtml += `<p><strong>Q${index + 1}:</strong> The answer is "${question.correctAnswer}"</p>`;
    });
    
    hintsHtml += '</div>';
    
    hintDiv.innerHTML = hintsHtml;
    hintDiv.style.display = 'block';
}

function checkLogicalReasoning() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('logicalReasoning');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    variation.puzzles.forEach((puzzle, index) => {
        const userAnswer = document.getElementById(`logical${index + 1}`).value.trim();
        const correctAnswer = puzzle.correctAnswer;
        
        if (isAnswerCorrect(userAnswer, correctAnswer)) {
            results.push(`✅ Logic ${index + 1}: Sound reasoning`);
        } else {
            results.push(`❌ Logic ${index + 1}: Flawed reasoning`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('logicalReasoningResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🧠 <strong>LOGICAL MASTERY ACHIEVED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(2), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                🤔 <strong>Logic Error</strong><br>
                Review your reasoning. Apply biblical principles logically.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkTeamCommunication() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('teamCommunication');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    // Helper function to check if answer is theologically acceptable
    function isAcceptableAnswer(userAnswer, expectedAnswer, context) {
        const user = userAnswer.toUpperCase();
        const expected = expectedAnswer.toUpperCase();
        
        // Direct match
        if (user === expected) return true;
        
        // Context-specific flexible matching for Trinity attributes
        if (context === 'father_attribute') {
            return user.includes('CREATOR') || user.includes('LOVE') || user.includes('FATHER') || 
                   user.includes('ALMIGHTY') || user.includes('ETERNAL') || user === 'LOVE';
        } else if (context === 'son_mission') {
            return user.includes('REDEEMER') || user.includes('SAVIOR') || user.includes('SAVE') || 
                   user.includes('REDEEM') || user.includes('SACRIFICE') || user.includes('LOST');
        } else if (context === 'spirit_work') {
            return user.includes('COMFORTER') || user.includes('HELPER') || user.includes('COUNSELOR') || 
                   user.includes('GUIDE') || user.includes('ADVOCATE');
        }
        
        // Context-specific matching for covenant chain
        if (context === 'creation_covenant') {
            return user.includes('CREATION') || user.includes('CREATE') || user.includes('BEGINNING');
        } else if (context === 'noah_covenant') {
            return user.includes('PRESERVATION') || user.includes('PRESERVE') || user.includes('RAINBOW') || 
                   user.includes('NEVER DESTROY') || user.includes('PROTECT');
        } else if (context === 'abraham_covenant') {
            return user.includes('PROMISE') || user.includes('BLESSING') || user.includes('NATIONS') || 
                   user.includes('DESCENDANTS') || user.includes('BLESS');
        } else if (context === 'christ_covenant') {
            return user.includes('SALVATION') || user.includes('SAVE') || user.includes('ETERNAL LIFE') || 
                   user.includes('REDEMPTION') || user.includes('GRACE');
        }
        
        return false;
    }
    
    // Check collaborative challenges
    variation.challenges.forEach((challenge, challengeIndex) => {
        if (challenge.type === 'collaborative') {
            challenge.parts.forEach((part, partIndex) => {
                const userAnswer = document.getElementById(`team${challengeIndex}_part${partIndex}`).value.trim();
                
                let context = '';
                if (part.task.includes("Father's primary attribute")) context = 'father_attribute';
                else if (part.task.includes("Son's earthly mission")) context = 'son_mission';
                else if (part.task.includes("Spirit's current work")) context = 'spirit_work';
                
                if (isAcceptableAnswer(userAnswer, part.answer, context)) {
                    results.push(`✅ ${part.role}: United`);
                } else {
                    results.push(`❌ ${part.role}: Not synchronized`);
                    allCorrect = false;
                }
            });
        } else if (challenge.type === 'chain') {
            challenge.sequence.forEach((step, stepIndex) => {
                const userAnswer = document.getElementById(`chain${challengeIndex}_step${stepIndex}`).value.trim();
                
                let context = '';
                if (step.clue.includes('Started with Adam')) context = 'creation_covenant';
                else if (step.clue.includes('Continued with Noah')) context = 'noah_covenant';
                else if (step.clue.includes('Established with Abraham')) context = 'abraham_covenant';
                else if (step.clue.includes('Fulfilled through Christ')) context = 'christ_covenant';
                
                if (isAcceptableAnswer(userAnswer, step.answer, context)) {
                    results.push(`✅ Chain ${step.order}: Connected`);
                } else {
                    results.push(`❌ Chain ${step.order}: Broken link`);
                    allCorrect = false;
                }
            });
        }
    });
    
    const resultDiv = document.getElementById('teamCommunicationResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🤝 <strong>UNITY ACHIEVED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                Team coordination successful!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(3), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                💔 <strong>Team Disunity</strong><br>
                Coordination required. Work together to unlock the truth.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkCodeBreaking() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('codeBreaking');
    if (!variation || !variation.items) return;
    
    let allCorrect = true;
    const results = [];
    const categories = variation.categories || {};
    
    // Check each category drop zone
    Object.keys(categories).forEach(categoryKey => {
        const dropZone = document.querySelector(`[data-testament="${categoryKey}"]`);
        const droppedItems = dropZone.querySelectorAll('.draggable-item');
        
        let categoryCorrect = true;
        let correctCount = 0;
        let totalExpected = variation.items.filter(item => item.testament === categoryKey).length;
        
        droppedItems.forEach(item => {
            const itemTestament = item.getAttribute('data-testament');
            if (itemTestament === categoryKey) {
                correctCount++;
            } else {
                categoryCorrect = false;
            }
        });
        
        if (correctCount === totalExpected && categoryCorrect) {
            results.push(`✅ ${categories[categoryKey].name}: Correctly classified (${correctCount}/${totalExpected})`);
        } else {
            results.push(`❌ ${categories[categoryKey].name}: Incorrect classification (${correctCount}/${totalExpected})`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('codeBreakingResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🏆 <strong>PERFECT CLASSIFICATION!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                You've correctly sorted all biblical events by Testament!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(4), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                📚 <strong>Classification Incomplete</strong><br>
                Some events are in the wrong Testament category. Try the hint for guidance!<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

// Add hint function for code breaking
function showCodeBreakingHint() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('codeBreaking');
    if (!variation) return;
    
    const hintDiv = document.getElementById('codeBreakingHint');
    
    // Create specific hints for each item
    let hintsHtml = '<div style="background: rgba(0, 150, 0, 0.1); padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #009600;">';
    hintsHtml += '<h4 style="color: #009600; margin-bottom: 10px;">🎯 Classification Hints:</h4>';
    
    variation.items.forEach((item, index) => {
        const testament = item.testament === 'oldTestament' ? 'Old Testament' : 'New Testament';
        hintsHtml += `<p><strong>"${item.text}"</strong> → ${testament}</p>`;
    });
    
    hintsHtml += '</div>';
    
    hintDiv.innerHTML = hintsHtml;
    hintDiv.style.display = 'block';
}

function checkMetaphoricalScripture() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('metaphoricalScripture');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    // Helper function to check if spiritual interpretation is acceptable
    function isAcceptableInterpretation(userAnswer, expectedAnswer, passage) {
        const user = userAnswer.toUpperCase();
        const expected = expectedAnswer.toUpperCase();
        
        // Direct match
        if (user === expected) return true;
        
        // Flexible matching based on passage
        if (passage.includes('vine, you are the branches')) {
            // Fruit represents works/deeds that flow from connection to Christ
            return user.includes('GOOD WORKS') || user.includes('WORKS') || user.includes('DEEDS') || 
                   user.includes('FRUIT') || user.includes('BELIEVERS') || user.includes('ACTIONS') ||
                   user.includes('SERVICE') || user.includes('MINISTRY') || user.includes('LOVE');
        } else if (passage.includes('mustard seed')) {
            // Growth represents faith expanding and spreading
            return user.includes('FAITH EXPANSION') || user.includes('FAITH') || user.includes('GROWTH') ||
                   user.includes('EXPANSION') || user.includes('SPREAD') || user.includes('INFLUENCE') ||
                   user.includes('KINGDOM GROWTH') || user.includes('IMPACT');
        } else if (passage.includes('wise as serpents, innocent as doves')) {
            // Balance of wisdom and purity/innocence
            return user.includes('DISCERNMENT WITH PURITY') || user.includes('DISCERNMENT') || 
                   user.includes('WISDOM') || user.includes('BALANCE') || user.includes('PURITY') ||
                   user.includes('INNOCENT') || user.includes('WISE') || user.includes('SHREWD') ||
                   user.includes('CAREFUL') || user.includes('PRUDENT');
        } else if (passage.includes('light of the world')) {
            // Shining light means witnessing/testimony
            return user.includes('WITNESSING') || user.includes('WITNESS') || user.includes('TESTIMONY') ||
                   user.includes('SHARING') || user.includes('EVANGELISM') || user.includes('EXAMPLE') ||
                   user.includes('LIVING') || user.includes('SHOWING');
        } else if (passage.includes('bread of life')) {
            // Eating bread means believing/accepting Christ
            return user.includes('BELIEVING') || user.includes('BELIEF') || user.includes('FAITH') ||
                   user.includes('ACCEPTING') || user.includes('RECEIVING') || user.includes('TRUSTING') ||
                   user.includes('FOLLOWING');
        }
        
        return false;
    }
    
    variation.interpretations.forEach((interpretation, index) => {
        const userAnswer = document.getElementById(`metaphor${index + 1}`).value.trim();
        
        if (isAcceptableInterpretation(userAnswer, interpretation.answer, interpretation.passage)) {
            results.push(`✅ Metaphor ${index + 1}: Spiritually discerned`);
        } else {
            results.push(`❌ Metaphor ${index + 1}: Literal interpretation`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('metaphoricalScriptureResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🕊️ <strong>SPIRITUAL INSIGHT ACHIEVED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                Deep truths revealed!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(5), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                📖 <strong>Surface Reading</strong><br>
                Look deeper. The spiritual meaning transcends the literal.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkProphethicLogic() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('prophethicLogic');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    // Helper function to check if logical reasoning is acceptable
    function isAcceptableLogic(userAnswer, expectedAnswer, context) {
        const user = userAnswer.toUpperCase();
        const expected = expectedAnswer.toUpperCase();
        
        // Direct match
        if (user === expected) return true;
        
        // Context-specific flexible matching
        if (context.includes('salvation') && context.includes('eternal')) {
            // Eternal salvation security concepts
            return user.includes('ETERNAL SECURITY') || user.includes('ETERNAL SALVATION') || 
                   user.includes('SECURITY') || user.includes('ETERNAL') || user.includes('PERMANENT') ||
                   user.includes('FOREVER') || user.includes('CANNOT BE LOST') || user.includes('SECURE') ||
                   user.includes('LASTING') || user.includes('UNCHANGING') || user.includes('GUARANTEED');
        } else if (context.includes('promises') && context.includes('Christ')) {
            // All promises fulfilled in Christ
            return user.includes('ALL PROMISES') || user.includes('PROMISES') || user.includes('EVERYTHING') ||
                   user.includes('FULFILLED') || user.includes('COMPLETE') || user.includes('YES AND AMEN');
        } else if (context.includes('prophecy') && context.includes('faithfulness')) {
            // Divine faithfulness in prophecy
            return user.includes('DIVINE FAITHFULNESS') || user.includes('FAITHFULNESS') || user.includes('FAITHFUL') ||
                   user.includes('RELIABLE') || user.includes('TRUSTWORTHY') || user.includes('DEPENDABLE') ||
                   user.includes('UNCHANGING') || user.includes('SURE');
        }
        
        return false;
    }
    
    variation.logic_chains.forEach((chain, index) => {
        const userAnswer = document.getElementById(`prophetic${index + 1}`).value.trim();
        
        // Create context from the chain content
        let context = '';
        if (chain.syllogism) context = chain.syllogism + ' ' + chain.question;
        else if (chain.conclusion_question) context = chain.conclusion_question;
        else if (chain.question) context = chain.question;
        
        if (isAcceptableLogic(userAnswer, chain.answer, context)) {
            results.push(`✅ Logic Chain ${index + 1}: Valid reasoning`);
        } else {
            results.push(`❌ Logic Chain ${index + 1}: Invalid reasoning`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('prophethicLogicResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🔮 <strong>PROPHETIC LOGIC MASTERED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                Divine reasoning achieved!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(6), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                ⚡ <strong>Logic Fault</strong><br>
                Prophetic reasoning requires divine wisdom. Reconsider the connections.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkRevelationCode() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('revelationCode');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    variation.ultimate_codes.forEach((code, index) => {
        const inputElement = document.getElementById(`revelation${index + 1}`);
        if (!inputElement) {
            console.error(`Element revelation${index + 1} not found`);
            return;
        }
        
        const userAnswer = inputElement.value.trim();
        const correctAnswer = (code.answer || code.solution || '').toString();
        
        if (isAnswerCorrect(userAnswer, correctAnswer)) {
            results.push(`✅ Mystery ${index + 1}: Unlocked`);
        } else {
            results.push(`❌ Mystery ${index + 1}: Sealed`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('revelationCodeResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🌟 <strong>ULTIMATE MYSTERY REVEALED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                The deepest secrets of Revelation are yours!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(7), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                🔥 <strong>Mystery Remains</strong><br>
                The ultimate codes resist your attempts. Greater wisdom is needed.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkChronologicalOrder() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('chronologicalOrder');
    if (!variation) return;
    
    // Get current order from drop zones
    const dropZones = document.querySelectorAll('.drop-zone[data-position]');
    const userOrder = [];
    
    dropZones.forEach(zone => {
        const draggedItem = zone.querySelector('.drag-item');
        if (draggedItem) {
            userOrder.push(draggedItem.getAttribute('data-event-id'));
        } else {
            userOrder.push(null); // Empty slot
        }
    });
    
    // Check if all positions are filled
    if (userOrder.includes(null)) {
        document.getElementById('chronologicalOrderResult').innerHTML = `
            <div style="color: #dc3545;">
                ⏰ <strong>Incomplete Timeline</strong><br>
                Please place all events in the timeline before checking.
            </div>
        `;
        return;
    }
    
    // Check if order matches correct sequence
    const correctOrder = variation.correctOrder;
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    
    const resultDiv = document.getElementById('chronologicalOrderResult');
    if (isCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                ⏰ <strong>TIMELINE MASTERED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                Perfect chronological sequence achieved!
            </div>
        `;
        setTimeout(() => window.completeSeal(5), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                📅 <strong>Timeline Error</strong><br>
                The sequence is not correct. Study the historical context more carefully.
            </div>
        `;
    }
}

function checkScriptureTopics() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('scriptureTopics');
    if (!variation) return;
    
    // Check each topic section
    let allCorrect = true;
    const results = [];
    
    variation.topics.forEach((topic, index) => {
        const topicDrop = document.querySelector(`[data-topic="${topic.name}"]`);
        const droppedVerses = topicDrop.querySelectorAll('.drag-item');
        
        let topicCorrect = true;
        let verseCount = 0;
        
        droppedVerses.forEach(verse => {
            const verseTopicName = verse.getAttribute('data-verse-topic');
            if (verseTopicName === topic.name) {
                verseCount++;
            } else {
                topicCorrect = false;
            }
        });
        
        // Check if we have the right number of verses (should be 3 per topic)
        if (verseCount !== topic.correctVerses.length || !topicCorrect) {
            allCorrect = false;
            results.push(`❌ ${topic.name}: Incorrect verses`);
        } else {
            results.push(`✅ ${topic.name}: Correctly organized`);
        }
    });
    
    const resultDiv = document.getElementById('scriptureTopicsResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                📚 <strong>SCRIPTURE ORGANIZATION MASTERED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                All verses correctly categorized!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(6), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                🗂️ <strong>Organization Error</strong><br>
                Some verses are in the wrong categories. Review the topics carefully.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkBiblicalWisdom() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('biblicalWisdom');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    variation.challenges.forEach((challenge, index) => {
        if (challenge.type === 'multiple_choice' || challenge.type === 'synthesis') {
            const selectedOption = document.querySelector(`input[name="wisdom${index}"]:checked`);
            if (selectedOption && selectedOption.value === challenge.correctAnswer) {
                results.push(`✅ Question ${index + 1}: Wise choice`);
            } else {
                results.push(`❌ Question ${index + 1}: Needs reflection`);
                allCorrect = false;
            }
        } else {
            const userAnswer = document.getElementById(`wisdom${index + 1}`).value.trim();
            const isCorrect = isAnswerCorrect(userAnswer, challenge.answer) || 
                            (challenge.alternates && challenge.alternates.some(alt => isAnswerCorrect(userAnswer, alt)));
            
            if (isCorrect) {
                results.push(`✅ Question ${index + 1}: Spiritual wisdom shown`);
            } else {
                results.push(`❌ Question ${index + 1}: Seek deeper understanding`);
                allCorrect = false;
            }
        }
    });
    
    const resultDiv = document.getElementById('biblicalWisdomResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                👑 <strong>BIBLICAL WISDOM ACHIEVED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                You have demonstrated true spiritual understanding!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(7), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                🎓 <strong>Wisdom Growing</strong><br>
                Continue seeking understanding. True wisdom comes through study and application.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

// Reset functions
function resetChallenge(challengeType) {
    enhancedPuzzleManager.resetChallenge(challengeType);
}

// Export enhanced manager with all methods
window.PuzzleManager = enhancedPuzzleManager;

// Make regeneration function globally available for easy access
window.regeneratePuzzles = () => enhancedPuzzleManager.regeneratePuzzles();

// Make validation functions globally available
window.checkBibleKnowledge = checkBibleKnowledge;
window.checkLogicalReasoning = checkLogicalReasoning;
window.checkTeamCommunication = checkTeamCommunication;
window.checkCodeBreaking = checkCodeBreaking;
window.checkChronologicalOrder = checkChronologicalOrder;
window.checkScriptureTopics = checkScriptureTopics;
window.checkBiblicalWisdom = checkBiblicalWisdom;
window.resetChallenge = resetChallenge;

// Make hint functions globally available
window.showBibleKnowledgeHint = showBibleKnowledgeHint;
window.showCodeBreakingHint = showCodeBreakingHint;
