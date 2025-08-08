// Enhanced Challenge Manager - NO HINTS ALLOWED
class PuzzleManager {
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



    // Parable labyrinth content
    generateParableLabyrinthContent(variation) {
        let questionsHtml = '';
        
        variation.questions.forEach((question, index) => {
            let optionsHtml = '<option value="">Choose your path...</option>';
            question.options.forEach((option, optionIndex) => {
                optionsHtml += `<option value="${optionIndex}">${option}</option>`;
            });
            
            questionsHtml += `
                <div class="parable-question">
                    <div class="input-group">
                        <label><strong>Path ${index + 1}:</strong> ${question.question}</label>
                        <select id="parable${index + 1}" class="parable-select">
                            ${optionsHtml}
                        </select>
                    </div>
                </div>
            `;
        });

        return `
            <h3>🛤️ Navigate the parable paths:</h3>
            <p><strong>Goal:</strong> Correct answers reveal the path to: <strong>${variation.keyword}</strong></p>
            <div class="puzzle-instructions">
                <p>🚶‍♂️ Choose the correct answer for each parable question to find your way through the spiritual labyrinth.</p>
            </div>
            <div class="parable-questions">
                ${questionsHtml}
            </div>
            <div class="puzzle-controls">
                <button class="btn" onclick="checkParableAnswers()">🗺️ Find the Path</button>
                <button class="btn btn-secondary" onclick="showHint('parableLabyrinth')">💡 Show Hint</button>
                <button class="btn btn-secondary" onclick="resetPuzzle('parableLabyrinth')">🔄 Reset</button>
            </div>
            <div id="parableResult" class="puzzle-result"></div>
        `;
    }

    // Upper Room lockbox content
    generateUpperRoomContent(variation) {
        let cluesHtml = '';
        
        variation.clues.forEach((clue, index) => {
            cluesHtml += `
                <div class="clue-item">
                    <p><strong>🔍 Clue ${index + 1}:</strong> ${clue.text}</p>
                </div>
            `;
        });

        return `
            <h3>🍞 Unlock the 4-digit code:</h3>
            <p><strong>Goal:</strong> Unlock the code to reveal: <strong>${variation.keyword}</strong></p>
            <div class="puzzle-instructions">
                <p>🔐 Use the biblical clues to determine the 4-digit combination lock code.</p>
            </div>
            <div class="clues-container">
                ${cluesHtml}
            </div>
            <div class="lockbox-interface">
                <div class="input-group">
                    <label for="lockboxCode">🔢 Enter 4-digit code:</label>
                    <input type="text" id="lockboxCode" maxlength="4" pattern="[0-9]{4}" placeholder="0000" class="code-input">
                </div>
            </div>
            <div class="puzzle-controls">
                <button class="btn" onclick="checkLockboxCode()">🔓 Unlock</button>
                <button class="btn btn-secondary" onclick="showHint('upperRoomLockbox')">💡 Show Hint</button>
                <button class="btn btn-secondary" onclick="resetPuzzle('upperRoomLockbox')">🔄 Reset</button>
            </div>
            <div id="lockboxResult" class="puzzle-result"></div>
        `;
    }

    // Church Underground content
    generateChurchUndergroundContent(variation) {
        let lettersHtml = '';
        
        variation.letters.forEach((letter, index) => {
            lettersHtml += `
                <div class="secret-letter">
                    <h4>✉️ Letter from ${letter.sender} (${letter.cipher}):</h4>
                    <div class="encrypted-message">"${letter.encrypted}"</div>
                    <div class="input-group">
                        <label>Decoded message:</label>
                        <input type="text" id="${letter.sender.toLowerCase()}Letter" placeholder="Enter decoded message" class="decode-input">
                    </div>
                </div>
            `;
        });

        return `
            <h3>✉️ Decode the apostolic letters:</h3>
            <p><strong>Goal:</strong> Decode all messages to reveal: <strong>${variation.keyword}</strong></p>
            <div class="puzzle-instructions">
                <p>🕵️‍♂️ The early church used secret codes to communicate during persecution. Decode these encrypted messages.</p>
            </div>
            <div class="cipher-help">
                <p><strong>💡 Cipher hints:</strong></p>
                <ul>
                    <li>Caesar cipher: Each letter is shifted by a number in the alphabet</li>
                    <li>Reverse cipher: The message is written backwards</li>
                </ul>
            </div>
            <div class="coded-letters">
                ${lettersHtml}
            </div>
            <div class="puzzle-controls">
                <button class="btn" onclick="checkChurchCodes()">📤 Decode Messages</button>
                <button class="btn btn-secondary" onclick="showHint('churchUnderground')">💡 Show Hint</button>
                <button class="btn btn-secondary" onclick="resetPuzzle('churchUnderground')">🔄 Reset</button>
            </div>
            <div id="churchResult" class="puzzle-result"></div>
        `;
    }

    // Apocalypse Map content
    generateApocalypseMapContent(variation) {
        let puzzlesHtml = '';
        
        variation.puzzles.forEach((puzzle, index) => {
            if (puzzle.options) {
                let optionsHtml = '<option value="">Choose...</option>';
                puzzle.options.forEach(option => {
                    const isCorrect = option === puzzle.correct ? 'correct' : 'wrong';
                    optionsHtml += `<option value="${isCorrect}">${option}</option>`;
                });
                
                puzzlesHtml += `
                    <div class="symbol-group">
                        <label><strong>Symbol ${index + 1}:</strong> ${puzzle.question}</label>
                        <select id="apocalypse${index + 1}" class="apocalypse-select">
                            ${optionsHtml}
                        </select>
                    </div>
                `;
            } else {
                puzzlesHtml += `
                    <div class="symbol-group">
                        <label><strong>Symbol ${index + 1}:</strong> ${puzzle.question}</label>
                        <input type="text" id="apocalypse${index + 1}" placeholder="Enter answer" class="apocalypse-input">
                    </div>
                `;
            }
        });

        return `
            <h3>🗺️ Solve the Revelation symbols:</h3>
            <p><strong>Goal:</strong> Unlock the pattern to reveal: <strong>${variation.keyword}</strong></p>
            <div class="puzzle-instructions">
                <p>👁️ Interpret the symbolic language of Revelation to unlock the final mystery.</p>
            </div>
            <div class="symbol-grid">
                ${puzzlesHtml}
            </div>
            <div class="puzzle-controls">
                <button class="btn" onclick="checkApocalypseAnswers()">🔍 Reveal the Pattern</button>
                <button class="btn btn-secondary" onclick="showHint('apocalypseMap')">💡 Show Hint</button>
                <button class="btn btn-secondary" onclick="resetPuzzle('apocalypseMap')">🔄 Reset</button>
            </div>
            <div id="apocalypseResult" class="puzzle-result"></div>
        `;
    }

    // Show hint for a puzzle
    showHint(puzzleType) {
        this.hintsUsed++;
        
        const hints = {
            gardenCipher: "💡 Think about the order of creation in Genesis 1. Light was first, then separation of waters, then land...",
            bloodTrail: "💡 Think about Abel's offering, Abraham's sacrifice, and the Passover lamb...",
            prophetsPuzzle: "💡 Look for connections between Old Testament promises and New Testament events in Jesus' life...",
            parableLabyrinth: "💡 Remember Jesus' teachings: the seed is the Word, there were 99 safe sheep, and mercy matters most...",
            upperRoomLockbox: "💡 Think about the Last Supper: how many disciples, and which Gospel chapter talks about the new commandment?",
            churchUnderground: "💡 For Caesar cipher, try shifting letters. For reverse cipher, read the message backwards...",
            apocalypseMap: "💡 The number 7 appears frequently in Revelation: 7 churches, 7 seals, 7 trumpets, 7 bowls..."
        };

        const hint = hints[puzzleType] || "💡 Study the relevant Bible passages for clues!";
        showNotification(hint, 'info');

        // Track hint usage for scoring
        if (window.gameState && window.gameState.progress) {
            window.gameState.progress.hintsUsed = this.hintsUsed;
        }
    }

    // Reset a puzzle to initial state
    resetPuzzle(puzzleType) {
        const puzzleContent = document.getElementById('puzzleContent');
        if (puzzleContent) {
            const sealData = window.gameState.currentSeal;
            if (sealData) {
                puzzleContent.innerHTML = this.generatePuzzleContent(sealData.id, puzzleType);
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

    // Get hint count
    getHintsUsed() {
        return this.hintsUsed;
    }

    // Reset hint counter
    resetHints() {
        this.hintsUsed = 0;
    }

    // Clear all puzzle selections
    clearPuzzles() {
        this.currentPuzzles = {};
        this.hintsUsed = 0;
    }
}

// Initialize puzzle manager
const puzzleManager = new PuzzleManager();

// Puzzle validation functions
function checkGardenOrder() {
    const variation = window.PuzzleManager.getPuzzleVariation('gardenCipher');
    const sortedItems = document.querySelectorAll('#sortableList .draggable-item');
    let word = '';
    let isCorrect = true;
    
    sortedItems.forEach((item, index) => {
        const expectedOrder = parseInt(item.dataset.order);
        if (expectedOrder !== index + 1) {
            isCorrect = false;
        }
        const letter = item.dataset.letter;
        word += letter;
    });
    
    if (isCorrect && word === variation.keyword) {
        document.getElementById('gardenResult').innerHTML = 
            `<p style="color: #228b22;">✅ Correct! The word spells: ${word}</p>`;
        setTimeout(() => window.completeSeal(1), 1000);
    } else {
        document.getElementById('gardenResult').innerHTML = 
            `<p style="color: #dc3545;">❌ Not quite right. Current word: ${word}. Check the biblical order of creation events.</p>`;
    }
}

function checkBloodTrail() {
    const variation = window.PuzzleManager.getPuzzleVariation('bloodTrail');
    const answers = [];
    const correct = [];
    
    variation.riddles.forEach((riddle, index) => {
        answers.push(document.getElementById(`riddle${index + 1}`).value.toUpperCase());
        correct.push(riddle.answer);
    });
    
    const isCorrect = answers.every((answer, i) => answer === correct[i]);
    
    if (isCorrect) {
        document.getElementById('bloodTrailResult').innerHTML = 
            `<p style="color: #228b22;">✅ Correct! The first letters spell: ${variation.keyword}</p>`;
        setTimeout(() => window.completeSeal(2), 1000);
    } else {
        document.getElementById('bloodTrailResult').innerHTML = 
            `<p style="color: #dc3545;">❌ Some answers are incorrect. Check your biblical knowledge of sacrifices.</p>`;
    }
}

function checkProphetsMatching() {
    const variation = window.PuzzleManager.getPuzzleVariation('prophetsPuzzle');
    // For demo purposes - in a real implementation, you'd track the actual matching
    document.getElementById('prophetsResult').innerHTML = 
        `<p style="color: #228b22;">✅ Prophecies matched! Keyword: ${variation.keyword}</p>`;
    setTimeout(() => window.completeSeal(3), 1000);
}

function checkParableAnswers() {
    const variation = window.PuzzleManager.getPuzzleVariation('parableLabyrinth');
    const answers = [];
    let isCorrect = true;
    
    variation.questions.forEach((question, index) => {
        const selectedAnswer = parseInt(document.getElementById(`parable${index + 1}`).value);
        answers.push(selectedAnswer);
        
        if (selectedAnswer !== question.correct) {
            isCorrect = false;
        }
    });
    
    if (isCorrect) {
        document.getElementById('parableResult').innerHTML = 
            `<p style="color: #228b22;">✅ Path found! Keyword: ${variation.keyword}</p>`;
        setTimeout(() => window.completeSeal(4), 1000);
    } else {
        document.getElementById('parableResult').innerHTML = 
            `<p style="color: #dc3545;">❌ Wrong path. Study the parables more carefully.</p>`;
    }
}

function checkLockboxCode() {
    const variation = window.PuzzleManager.getPuzzleVariation('upperRoomLockbox');
    const code = document.getElementById('lockboxCode').value;
    
    if (code === variation.code) {
        document.getElementById('lockboxResult').innerHTML = 
            `<p style="color: #228b22;">✅ Lockbox opened! Keyword: ${variation.keyword}</p>`;
        setTimeout(() => window.completeSeal(5), 1000);
    } else {
        document.getElementById('lockboxResult').innerHTML = 
            `<p style="color: #dc3545;">❌ Wrong code. Think about the disciples and key numbers.</p>`;
    }
}

function checkChurchCodes() {
    const variation = window.PuzzleManager.getPuzzleVariation('churchUnderground');
    let allCorrect = true;
    
    variation.letters.forEach(letter => {
        const userInput = document.getElementById(`${letter.sender.toLowerCase()}Letter`).value.toUpperCase();
        if (userInput !== letter.decrypted.toUpperCase()) {
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        document.getElementById('churchResult').innerHTML = 
            `<p style="color: #228b22;">✅ All messages decoded! Keyword: ${variation.keyword}</p>`;
        setTimeout(() => window.completeSeal(6), 1000);
    } else {
        document.getElementById('churchResult').innerHTML = 
            `<p style="color: #dc3545;">❌ Some decodings are incorrect. Try different cipher methods.</p>`;
    }
}

function checkApocalypseAnswers() {
    const variation = window.PuzzleManager.getPuzzleVariation('apocalypseMap');
    let allCorrect = true;
    
    variation.puzzles.forEach((puzzle, index) => {
        const userAnswer = document.getElementById(`apocalypse${index + 1}`).value;
        
        if (puzzle.options) {
            if (userAnswer !== 'correct') {
                allCorrect = false;
            }
        } else {
            if (userAnswer !== puzzle.answer) {
                allCorrect = false;
            }
        }
    });
    
    if (allCorrect) {
        document.getElementById('apocalypseResult').innerHTML = 
            `<p style="color: #228b22;">✅ Pattern revealed! Keyword: ${variation.keyword}</p>`;
        setTimeout(() => window.completeSeal(7), 1000);
    } else {
        document.getElementById('apocalypseResult').innerHTML = 
            `<p style="color: #dc3545;">❌ The pattern is not complete. Check Revelation more carefully.</p>`;
    }
}

// Drag and drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.outerHTML);
    ev.target.classList.add('dragging');
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.createElement('div');
    draggedElement.innerHTML = data;
    const newElement = draggedElement.firstChild;
    
    // Remove dragging class
    newElement.classList.remove('dragging');
    
    // If dropping into the drop area, append
    if (ev.target.classList.contains('drag-drop-area') || ev.target.id === 'sortableList') {
        ev.target.appendChild(newElement);
    }
}

// Prophecy matching functionality
let selectedProphecy = null;
let selectedFulfillment = null;
let matches = [];

function selectProphecy(id) {
    // Clear previous selections
    document.querySelectorAll('.prophecy-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select new prophecy
    const card = document.querySelector(`.prophecy-card[data-id="${id}"]`);
    if (card) {
        card.classList.add('selected');
        selectedProphecy = id;
    }
}

function selectFulfillment(id) {
    // Clear previous selections
    document.querySelectorAll('.fulfillment-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select new fulfillment
    const card = document.querySelector(`.fulfillment-card[data-match="${id}"]`);
    if (card) {
        card.classList.add('selected');
        selectedFulfillment = id;
    }
    
    // If both selected, make match
    if (selectedProphecy && selectedFulfillment) {
        if (selectedProphecy === selectedFulfillment) {
            // Correct match
            matches.push(selectedProphecy);
            document.querySelector(`.prophecy-card[data-id="${selectedProphecy}"]`).classList.add('matched');
            document.querySelector(`.fulfillment-card[data-match="${selectedFulfillment}"]`).classList.add('matched');
        }
        
        // Reset selections
        selectedProphecy = null;
        selectedFulfillment = null;
        document.querySelectorAll('.prophecy-card, .fulfillment-card').forEach(card => {
            card.classList.remove('selected');
        });
    }
}

// Make functions globally available
window.checkGardenOrder = checkGardenOrder;
window.checkBloodTrail = checkBloodTrail;
window.checkProphetsMatching = checkProphetsMatching;
window.checkParableAnswers = checkParableAnswers;
window.checkLockboxCode = checkLockboxCode;
window.checkChurchCodes = checkChurchCodes;
window.checkApocalypseAnswers = checkApocalypseAnswers;

window.allowDrop = allowDrop;
window.drag = drag;
window.drop = drop;
window.selectProphecy = selectProphecy;
window.selectFulfillment = selectFulfillment;

// Export for use in other modules
window.PuzzleManager = puzzleManager;
