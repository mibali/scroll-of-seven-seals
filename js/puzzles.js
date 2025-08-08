// Enhanced Challenge Manager - Complete Implementation
// NO HINTS ALLOWED - Pure Biblical Knowledge and Reasoning

class EnhancedPuzzleManager {
    constructor() {
        this.currentPuzzles = {};
        this.teamInputs = {}; // Track team member inputs for communication challenges
    }

    // Generate challenge content for a specific seal
    generatePuzzleContent(sealId, puzzleType) {
        const variations = window.GameData.puzzleVariations[puzzleType];
        if (!variations || variations.length === 0) {
            return '<p>Challenge not available</p>';
        }

        // Select a random variation if not already selected
        if (!this.currentPuzzles[puzzleType]) {
            const randomIndex = Math.floor(Math.random() * variations.length);
            this.currentPuzzles[puzzleType] = variations[randomIndex];
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
            case 'metaphoricalScripture':
                return this.generateMetaphoricalScriptureContent(variation);
            case 'prophethicLogic':
                return this.generateProphethicLogicContent(variation);
            case 'revelationCode':
                return this.generateRevelationCodeContent(variation);
            default:
                return '<p>Unknown challenge type</p>';
        }
    }

    // CHALLENGE 1: Bible Knowledge - Deep Scriptural Recall
    generateBibleKnowledgeContent(variation) {
        let questionsHtml = '';
        
        variation.questions.forEach((question, index) => {
            questionsHtml += `
                <div class="knowledge-question">
                    <div class="question-header">
                        <span class="question-number">Question ${index + 1}:</span>
                    </div>
                    <div class="question-text">${question.question}</div>
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
                <div class="challenge-warning">
                    <p><strong>⚠️ NO HINTS PROVIDED</strong></p>
                    <p>Answer all questions correctly using only your biblical knowledge.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="questions-container">
                    ${questionsHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkBibleKnowledge()">🔍 Verify Answers</button>
                    <button class="btn secondary" onclick="resetChallenge('bibleKnowledge')">🔄 Reset</button>
                </div>
                
                <div id="bibleKnowledgeResult" class="challenge-result"></div>
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

    // CHALLENGE 4: Code-Breaking - Biblical Ciphers
    generateCodeBreakingContent(variation) {
        let codesHtml = '';
        
        variation.codes.forEach((code, index) => {
            codesHtml += `
                <div class="code-breaking-puzzle">
                    <div class="cipher-type">${code.type.replace('_', ' ').toUpperCase()}</div>
                    <div class="cipher-name">${code.cipher}</div>
                    <div class="encrypted-message">
                        <strong>Encrypted:</strong> "${code.message}"
                    </div>
                    ${code.hint ? `<div class="cipher-hint">💡 ${code.hint}</div>` : ''}
                    <div class="decryption-input">
                        <input type="text" 
                               id="code${index + 1}" 
                               placeholder="Enter decrypted answer"
                               class="code-input">
                    </div>
                </div>
            `;
        });

        return `
            <div class="code-breaking-challenge">
                <h3>🔐 CODE-BREAKING TRIAL</h3>
                <div class="challenge-warning">
                    <p><strong>⚠️ ADVANCED CIPHERS</strong></p>
                    <p>Decrypt biblical codes using ancient and modern cipher techniques.</p>
                    <p><strong>Target Keyword:</strong> <span class="keyword-target">${variation.keyword}</span></p>
                </div>
                
                <div class="codes-container">
                    ${codesHtml}
                </div>
                
                <div class="challenge-controls">
                    <button class="btn primary" onclick="checkCodeBreaking()">🔓 Decrypt Codes</button>
                    <button class="btn secondary" onclick="resetChallenge('codeBreaking')">🔄 Reset</button>
                </div>
                
                <div id="codeBreakingResult" class="challenge-result"></div>
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

    // Reset a challenge to initial state
    resetChallenge(challengeType) {
        const challengeContent = document.getElementById('puzzleContent');
        if (challengeContent) {
            const sealData = window.gameState.currentSeal;
            if (sealData) {
                challengeContent.innerHTML = this.generatePuzzleContent(sealData.id, challengeType);
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

    // Clear all puzzle selections
    clearPuzzles() {
        this.currentPuzzles = {};
        this.teamInputs = {};
    }
}

// Initialize enhanced puzzle manager
const enhancedPuzzleManager = new EnhancedPuzzleManager();

// Enhanced validation functions - NO HINTS ALLOWED
function checkBibleKnowledge() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('bibleKnowledge');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    variation.questions.forEach((question, index) => {
        const userAnswer = document.getElementById(`knowledge${index + 1}`).value.trim().toUpperCase();
        const correctAnswer = question.correctAnswer.toUpperCase();
        
        if (userAnswer === correctAnswer) {
            results.push(`✅ Q${index + 1}: Correct`);
        } else {
            results.push(`❌ Q${index + 1}: Incorrect`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('bibleKnowledgeResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🎉 <strong>SCRIPTURE MASTERY ACHIEVED!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(1), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                📚 <strong>Study Required</strong><br>
                Some answers are incorrect. Review Scripture carefully.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkLogicalReasoning() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('logicalReasoning');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    variation.puzzles.forEach((puzzle, index) => {
        const userAnswer = document.getElementById(`logical${index + 1}`).value.trim().toUpperCase();
        const correctAnswer = puzzle.correctAnswer.toUpperCase();
        
        if (userAnswer === correctAnswer) {
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
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    variation.codes.forEach((code, index) => {
        const userAnswer = document.getElementById(`code${index + 1}`).value.trim().toUpperCase();
        const correctAnswer = code.solution.toUpperCase();
        
        if (userAnswer === correctAnswer) {
            results.push(`✅ Code ${index + 1}: Decrypted`);
        } else {
            results.push(`❌ Code ${index + 1}: Still encrypted`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('codeBreakingResult');
    if (allCorrect) {
        resultDiv.innerHTML = `
            <div style="color: #228b22;">
                🔓 <strong>CODES BROKEN!</strong><br>
                Keyword unlocked: <strong>${variation.keyword}</strong><br>
                Ancient mysteries revealed!<br>
                ${results.join('<br>')}
            </div>
        `;
        setTimeout(() => window.completeSeal(4), 1500);
    } else {
        resultDiv.innerHTML = `
            <div style="color: #dc3545;">
                🔐 <strong>Cipher Resistance</strong><br>
                Some codes remain unbroken. Study the patterns more carefully.<br>
                ${results.join('<br>')}
            </div>
        `;
    }
}

function checkMetaphoricalScripture() {
    const variation = enhancedPuzzleManager.getPuzzleVariation('metaphoricalScripture');
    if (!variation) return;
    
    let allCorrect = true;
    const results = [];
    
    variation.interpretations.forEach((interpretation, index) => {
        const userAnswer = document.getElementById(`metaphor${index + 1}`).value.trim().toUpperCase();
        const correctAnswer = interpretation.answer.toUpperCase();
        
        if (userAnswer === correctAnswer) {
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
    
    variation.logic_chains.forEach((chain, index) => {
        const userAnswer = document.getElementById(`prophetic${index + 1}`).value.trim().toUpperCase();
        const correctAnswer = chain.answer.toUpperCase();
        
        if (userAnswer === correctAnswer) {
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
        const userAnswer = document.getElementById(`revelation${index + 1}`).value.trim().toUpperCase();
        const correctAnswer = code.answer.toUpperCase();
        
        if (userAnswer === correctAnswer) {
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

// Reset functions
function resetChallenge(challengeType) {
    enhancedPuzzleManager.resetChallenge(challengeType);
}

// Export enhanced manager
window.PuzzleManager = enhancedPuzzleManager;

// Make validation functions globally available
window.checkBibleKnowledge = checkBibleKnowledge;
window.checkLogicalReasoning = checkLogicalReasoning;
window.checkTeamCommunication = checkTeamCommunication;
window.checkCodeBreaking = checkCodeBreaking;
window.checkMetaphoricalScripture = checkMetaphoricalScripture;
window.checkProphethicLogic = checkProphethicLogic;
window.checkRevelationCode = checkRevelationCode;
window.resetChallenge = resetChallenge;
