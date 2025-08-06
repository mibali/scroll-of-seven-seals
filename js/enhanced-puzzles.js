// Enhanced Puzzle System with Bible Dataset Integration
class EnhancedPuzzleManager extends PuzzleManager {
    constructor() {
        super();
        this.currentGamePuzzles = [];
        this.sessionQuestions = new Map();
        this.answerValidation = new Map();
        this.educationalContent = new Map();
    }

    // Generate puzzle content using Bible dataset
    generatePuzzleContent(sealId, puzzleType) {
        // Check if we have game-specific puzzles
        if (this.currentGamePuzzles.length > 0) {
            const gamePuzzle = this.currentGamePuzzles[sealId - 1];
            if (gamePuzzle) {
                return this.generateBiblePuzzleContent(gamePuzzle);
            }
        }
        
        // Fallback to original puzzles
        return super.generatePuzzleContent(sealId, puzzleType);
    }

    // Generate content for Bible dataset puzzles
    generateBiblePuzzleContent(puzzle) {
        const question = puzzle.question;
        
        switch (question.type) {
            case 'fill_blank':
                return this.generateFillBlankContent(puzzle, question);
            case 'multiple_choice':
                return this.generateMultipleChoiceContent(puzzle, question);
            case 'true_false':
                return this.generateTrueFalseContent(puzzle, question);
            case 'reference':
                return this.generateReferenceContent(puzzle, question);
            case 'theme_reflection':
                return this.generateThemeReflectionContent(puzzle, question);
            default:
                return this.generateGenericPuzzleContent(puzzle, question);
        }
    }

    // Generate fill-in-the-blank puzzle content
    generateFillBlankContent(puzzle, question) {
        return `
            <div class="bible-puzzle-container">
                <h3>📖 ${puzzle.title}</h3>
                <div class="puzzle-theme">Theme: ${question.theme}</div>
                
                <div class="puzzle-instructions">
                    <p>💡 Complete the missing word from this Bible verse:</p>
                </div>
                
                <div class="verse-container">
                    <blockquote class="bible-verse">
                        "${question.question.replace('Complete this verse:', '').replace(/"/g, '').trim()}"
                    </blockquote>
                </div>
                
                <div class="input-group">
                    <label for="fillBlankAnswer">Missing word:</label>
                    <input type="text" id="fillBlankAnswer" placeholder="Enter the missing word" 
                           class="puzzle-input" autocomplete="off">
                </div>
                
                <div class="puzzle-controls">
                    <button class="btn" onclick="checkFillBlankAnswer('${puzzle.id}')">✅ Submit Answer</button>
                    <button class="btn btn-secondary" onclick="showBibleHint('${question.type}', '${question.theme}')">💡 Show Hint</button>
                    <button class="btn btn-secondary" onclick="resetBiblePuzzle('${puzzle.id}')">🔄 Reset</button>
                </div>
                
                <div id="fillBlankResult" class="puzzle-result"></div>
                
                <div class="learning-section" style="display: none;" id="learningSectionFill">
                    <h4>📚 Learn More:</h4>
                    <div class="reference-info">
                        <p><strong>Reference:</strong> <span id="verseReference"></span></p>
                        <p><strong>Full Verse:</strong> <span id="fullVerse"></span></p>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate multiple choice puzzle content
    generateMultipleChoiceContent(puzzle, question) {
        let optionsHtml = '';
        question.options.forEach((option, index) => {
            optionsHtml += `
                <div class="choice-option">
                    <input type="radio" id="choice${index}" name="multiChoice" value="${index}">
                    <label for="choice${index}">${option}</label>
                </div>
            `;
        });

        return `
            <div class="bible-puzzle-container">
                <h3>🤔 ${puzzle.title}</h3>
                <div class="puzzle-theme">Theme: ${question.theme}</div>
                
                <div class="puzzle-instructions">
                    <p>📝 Choose the correct answer:</p>
                </div>
                
                <div class="question-container">
                    <h4>${question.question}</h4>
                </div>
                
                <div class="choices-container">
                    ${optionsHtml}
                </div>
                
                <div class="puzzle-controls">
                    <button class="btn" onclick="checkMultipleChoiceAnswer('${puzzle.id}')">✅ Submit Answer</button>
                    <button class="btn btn-secondary" onclick="showBibleHint('${question.type}', '${question.theme}')">💡 Show Hint</button>
                    <button class="btn btn-secondary" onclick="resetBiblePuzzle('${puzzle.id}')">🔄 Reset</button>
                </div>
                
                <div id="multiChoiceResult" class="puzzle-result"></div>
                
                <div class="learning-section" style="display: none;" id="learningSectionMulti">
                    <h4>📚 Learn More:</h4>
                    <div class="explanation" id="answerExplanation"></div>
                </div>
            </div>
        `;
    }

    // Generate true/false puzzle content
    generateTrueFalseContent(puzzle, question) {
        return `
            <div class="bible-puzzle-container">
                <h3>⚖️ ${puzzle.title}</h3>
                <div class="puzzle-theme">Theme: ${question.theme}</div>
                
                <div class="puzzle-instructions">
                    <p>✅❌ Determine if this statement is true or false:</p>
                </div>
                
                <div class="statement-container">
                    <blockquote class="statement">
                        ${question.question.replace('True or False: ', '')}
                    </blockquote>
                </div>
                
                <div class="tf-choices">
                    <div class="tf-option">
                        <input type="radio" id="trueChoice" name="tfChoice" value="true">
                        <label for="trueChoice" class="true-label">✅ True</label>
                    </div>
                    <div class="tf-option">
                        <input type="radio" id="falseChoice" name="tfChoice" value="false">
                        <label for="falseChoice" class="false-label">❌ False</label>
                    </div>
                </div>
                
                <div class="puzzle-controls">
                    <button class="btn" onclick="checkTrueFalseAnswer('${puzzle.id}')">⚖️ Submit Answer</button>
                    <button class="btn btn-secondary" onclick="showBibleHint('${question.type}', '${question.theme}')">💡 Show Hint</button>
                    <button class="btn btn-secondary" onclick="resetBiblePuzzle('${puzzle.id}')">🔄 Reset</button>
                </div>
                
                <div id="tfResult" class="puzzle-result"></div>
                
                <div class="learning-section" style="display: none;" id="learningSectionTF">
                    <h4>📚 Scripture Reference:</h4>
                    <div class="reference-info">
                        <p><strong>Check:</strong> <span id="tfReference"></span></p>
                    </div>
                </div>
            </div>
        `;
    }

    // Generate reference puzzle content
    generateReferenceContent(puzzle, question) {
        return `
            <div class="bible-puzzle-container">
                <h3>📍 ${puzzle.title}</h3>
                <div class="puzzle-theme">Theme: ${question.theme}</div>
                
                <div class="puzzle-instructions">
                    <p>🔍 Find the Bible reference for this passage:</p>
                </div>
                
                <div class="passage-container">
                    <blockquote class="bible-passage">
                        "${question.question.replace(/^.*contains: "/, '').replace(/".*$/, '')}"
                    </blockquote>
                </div>
                
                <div class="input-group">
                    <label for="referenceAnswer">Bible Reference (e.g., John 3:16):</label>
                    <input type="text" id="referenceAnswer" placeholder="Book Chapter:Verse" 
                           class="puzzle-input" autocomplete="off">
                </div>
                
                <div class="puzzle-controls">
                    <button class="btn" onclick="checkReferenceAnswer('${puzzle.id}')">🔍 Submit Reference</button>
                    <button class="btn btn-secondary" onclick="showBibleHint('${question.type}', '${question.theme}')">💡 Show Hint</button>
                    <button class="btn btn-secondary" onclick="resetBiblePuzzle('${puzzle.id}')">🔄 Reset</button>
                </div>
                
                <div id="referenceResult" class="puzzle-result"></div>
                
                <div class="learning-section" style="display: none;" id="learningSectionRef">
                    <h4>📖 Full Context:</h4>
                    <div class="context-info" id="referenceContext"></div>
                </div>
            </div>
        `;
    }

    // Generate theme reflection puzzle content
    generateThemeReflectionContent(puzzle, question) {
        return `
            <div class="bible-puzzle-container">
                <h3>🤲 ${puzzle.title}</h3>
                <div class="puzzle-theme">Theme: ${question.theme}</div>
                
                <div class="puzzle-instructions">
                    <p>💭 Reflect on this Scripture and answer thoughtfully:</p>
                </div>
                
                <div class="verse-container">
                    <blockquote class="bible-verse">
                        "${question.verse}"
                    </blockquote>
                </div>
                
                <div class="reflection-question">
                    <h4>${question.question}</h4>
                </div>
                
                <div class="input-group">
                    <label for="reflectionAnswer">Your reflection (use keywords like: ${question.acceptableKeywords.join(', ')}):</label>
                    <textarea id="reflectionAnswer" rows="4" placeholder="Share your thoughts and insights..." 
                              class="puzzle-textarea"></textarea>
                </div>
                
                <div class="puzzle-controls">
                    <button class="btn" onclick="checkReflectionAnswer('${puzzle.id}')">🤲 Submit Reflection</button>
                    <button class="btn btn-secondary" onclick="showBibleHint('${question.type}', '${question.theme}')">💡 Show Hint</button>
                    <button class="btn btn-secondary" onclick="resetBiblePuzzle('${puzzle.id}')">🔄 Reset</button>
                </div>
                
                <div id="reflectionResult" class="puzzle-result"></div>
                
                <div class="learning-section" style="display: none;" id="learningSectionReflection">
                    <h4>🌟 Additional Insights:</h4>
                    <div class="insights" id="themeInsights"></div>
                </div>
            </div>
        `;
    }

    // Generate generic puzzle content for unknown types
    generateGenericPuzzleContent(puzzle, question) {
        return `
            <div class="bible-puzzle-container">
                <h3>📚 ${puzzle.title}</h3>
                <div class="puzzle-theme">Theme: ${question.theme}</div>
                
                <div class="question-container">
                    <h4>${question.question}</h4>
                </div>
                
                <div class="input-group">
                    <label for="genericAnswer">Your Answer:</label>
                    <input type="text" id="genericAnswer" placeholder="Enter your answer" 
                           class="puzzle-input" autocomplete="off">
                </div>
                
                <div class="puzzle-controls">
                    <button class="btn" onclick="checkGenericAnswer('${puzzle.id}')">✅ Submit Answer</button>
                    <button class="btn btn-secondary" onclick="showBibleHint('${question.type}', '${question.theme}')">💡 Show Hint</button>
                    <button class="btn btn-secondary" onclick="resetBiblePuzzle('${puzzle.id}')">🔄 Reset</button>
                </div>
                
                <div id="genericResult" class="puzzle-result"></div>
            </div>
        `;
    }

    // Load game-specific puzzles
    loadGamePuzzles(puzzles) {
        if (!puzzles || !Array.isArray(puzzles)) {
            console.warn('⚠️ Invalid puzzles provided, using empty array');
            this.currentGamePuzzles = [];
            return;
        }
        
        this.currentGamePuzzles = puzzles;
        console.log(`🧩 Loaded ${puzzles.length} Bible-based puzzles for this game`);
    }

    // Enhanced hint system with educational content
    showBibleHint(questionType, theme) {
        this.hintsUsed++;
        
        const hints = {
            fill_blank: {
                creation: "💡 Think about the order of God's creation in Genesis 1. What came first?",
                faith: "💡 Consider what gives us confidence in God's promises.",
                love: "💡 Remember that God's love is unconditional and sacrificial.",
                wisdom: "💡 True wisdom begins with reverence for the Lord.",
                salvation: "💡 Think about God's plan to rescue humanity from sin.",
                hope: "💡 Consider what God promises for our future.",
                courage: "💡 Remember that God's presence gives us strength.",
                miracles: "💡 Think about Jesus' display of divine power.",
                parables: "💡 Look for the spiritual truth in the story.",
                prophecy: "💡 Consider how Old Testament promises were fulfilled."
            },
            multiple_choice: {
                creation: "💡 Genesis chapters 1-2 contain the creation account.",
                faith: "💡 Hebrews 11 is known as the 'faith chapter'.",
                love: "💡 1 John 4:8 tells us that 'God is love'.",
                wisdom: "💡 Proverbs contains much wisdom literature.",
                salvation: "💡 John 3:16 is the most famous salvation verse.",
                hope: "💡 Romans 15:13 speaks of the God of hope.",
                courage: "💡 Joshua 1:9 contains God's command to be courageous.",
                miracles: "💡 The Gospels record many of Jesus' miracles.",
                parables: "💡 Matthew 13 contains several parables of Jesus.",
                prophecy: "💡 Isaiah 53 is a famous messianic prophecy."
            },
            true_false: {
                creation: "💡 Check Genesis 1 for the exact order of creation.",
                faith: "💡 Faith involves both belief and trust in God.",
                love: "💡 God's love is demonstrated through action, not just words.",
                wisdom: "💡 Worldly wisdom differs from godly wisdom.",
                salvation: "💡 Salvation is by grace through faith, not works.",
                hope: "💡 Christian hope is certain, not wishful thinking.",
                courage: "💡 True courage comes from trusting in God's strength.",
                miracles: "💡 Jesus' miracles demonstrated His divine authority.",
                parables: "💡 Parables use earthly stories to teach heavenly truths.",
                prophecy: "💡 Biblical prophecies were fulfilled exactly as written."
            },
            reference: {
                creation: "💡 Genesis is the book of beginnings.",
                faith: "💡 Look in the New Testament epistles for faith teachings.",
                love: "💡 1 John contains much about God's love.",
                wisdom: "💡 Proverbs and Ecclesiastes are wisdom books.",
                salvation: "💡 Romans explains the plan of salvation clearly.",
                hope: "💡 Check the epistles for hope and encouragement.",
                courage: "💡 Joshua received many encouragements to be brave.",
                miracles: "💡 The four Gospels record Jesus' miracles.",
                parables: "💡 Matthew, Mark, and Luke contain most parables.",
                prophecy: "💡 Check both major and minor prophets in the Old Testament."
            },
            theme_reflection: {
                creation: "💡 Consider God's power, design, and purpose in creation.",
                faith: "💡 Think about trust, belief, and confidence in God.",
                love: "💡 Reflect on God's character and how we should love others.",
                wisdom: "💡 Consider practical application of biblical principles.",
                salvation: "💡 Think about rescue, redemption, and new life.",
                hope: "💡 Reflect on God's promises and eternal perspective.",
                courage: "💡 Consider how God's presence gives us boldness.",
                miracles: "💡 Think about God's power over nature and circumstances.",
                parables: "💡 Look for the deeper spiritual lesson in the story.",
                prophecy: "💡 Consider God's faithfulness in keeping His promises."
            }
        };
        
        const hint = hints[questionType]?.[theme] || "💡 Study the relevant Bible passages for deeper insight!";
        showNotification(hint, 'info');
        
        // Track hint usage
        if (window.gameController && window.gameController.gameState) {
            window.gameController.gameState.progress.hintsUsed = this.hintsUsed;
        }
    }

    // Reset a specific Bible puzzle
    resetBiblePuzzle(puzzleId) {
        // Clear all inputs
        document.querySelectorAll('input, textarea, select').forEach(element => {
            if (element.type === 'radio' || element.type === 'checkbox') {
                element.checked = false;
            } else {
                element.value = '';
            }
        });
        
        // Hide result and learning sections
        document.querySelectorAll('.puzzle-result, .learning-section').forEach(element => {
            element.style.display = 'none';
        });
        
        showNotification('Puzzle reset!', 'info');
    }

    // Get current puzzle for validation
    getCurrentPuzzle(puzzleId) {
        if (!this.currentGamePuzzles || !Array.isArray(this.currentGamePuzzles)) {
            console.warn('⚠️ No current game puzzles available');
            return null;
        }
        
        if (this.currentGamePuzzles.length > 0 && puzzleId >= 1 && puzzleId <= this.currentGamePuzzles.length) {
            return this.currentGamePuzzles[puzzleId - 1];
        }
        return null;
    }

    // Enhanced completion with educational content
    completePuzzleWithLearning(puzzleId, userAnswer, isCorrect) {
        const puzzle = this.getCurrentPuzzle(puzzleId);
        if (!puzzle) return;
        
        if (isCorrect) {
            this.showEducationalContent(puzzle);
            setTimeout(() => {
                if (window.completeSeal) {
                    window.completeSeal(puzzleId);
                }
            }, 2000); // Give time to read educational content
        }
    }

    // Show educational content after correct answer
    showEducationalContent(puzzle) {
        const question = puzzle.question;
        const learningSection = document.querySelector('[id^="learningSection"]');
        
        if (learningSection) {
            learningSection.style.display = 'block';
            
            // Add reference information
            if (question.reference) {
                const refElement = document.getElementById('verseReference') || 
                                  document.getElementById('tfReference');
                if (refElement) {
                    refElement.textContent = question.reference;
                }
            }
            
            // Add full verse for context
            if (question.originalVerse) {
                const verseElement = document.getElementById('fullVerse');
                if (verseElement) {
                    verseElement.textContent = question.originalVerse;
                }
            }
        }
        
        showNotification('🎓 Great job! Check out the additional learning content below.', 'success');
    }
}

// Answer validation functions for Bible puzzles
window.checkFillBlankAnswer = function(puzzleId) {
    const userAnswer = document.getElementById('fillBlankAnswer').value.trim().toLowerCase();
    const puzzle = window.PuzzleManager.getCurrentPuzzle(puzzleId);
    
    if (!puzzle) return;
    
    const correctAnswer = puzzle.question.answer.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    
    const resultElement = document.getElementById('fillBlankResult');
    if (isCorrect) {
        resultElement.innerHTML = `<p style="color: #228b22;">✅ Correct! The answer is "${correctAnswer}"</p>`;
        window.PuzzleManager.completePuzzleWithLearning(puzzleId, userAnswer, true);
    } else {
        resultElement.innerHTML = `<p style="color: #dc3545;">❌ Not quite right. The answer was "${correctAnswer}". ${puzzle.question.showReferenceOnWrong ? 'Check ' + puzzle.question.reference : ''}</p>`;
    }
};

window.checkMultipleChoiceAnswer = function(puzzleId) {
    const selectedChoice = document.querySelector('input[name="multiChoice"]:checked');
    if (!selectedChoice) {
        showNotification('Please select an answer', 'warning');
        return;
    }
    
    const puzzle = window.PuzzleManager.getCurrentPuzzle(puzzleId);
    if (!puzzle) return;
    
    const selectedIndex = parseInt(selectedChoice.value);
    const isCorrect = selectedIndex === puzzle.question.correctIndex;
    
    const resultElement = document.getElementById('multiChoiceResult');
    if (isCorrect) {
        resultElement.innerHTML = `<p style="color: #228b22;">✅ Correct!</p>`;
        window.PuzzleManager.completePuzzleWithLearning(puzzleId, selectedIndex, true);
    } else {
        const correctAnswer = puzzle.question.options[puzzle.question.correctIndex];
        resultElement.innerHTML = `<p style="color: #dc3545;">❌ The correct answer was: "${correctAnswer}". ${puzzle.question.showReferenceOnWrong ? 'Study ' + puzzle.question.reference + ' for more insight.' : ''}</p>`;
    }
};

window.checkTrueFalseAnswer = function(puzzleId) {
    const selectedChoice = document.querySelector('input[name="tfChoice"]:checked');
    if (!selectedChoice) {
        showNotification('Please select True or False', 'warning');
        return;
    }
    
    const puzzle = window.PuzzleManager.getCurrentPuzzle(puzzleId);
    if (!puzzle) return;
    
    const userAnswer = selectedChoice.value === 'true';
    const isCorrect = userAnswer === puzzle.question.answer;
    
    const resultElement = document.getElementById('tfResult');
    if (isCorrect) {
        resultElement.innerHTML = `<p style="color: #228b22;">✅ Correct!</p>`;
        window.PuzzleManager.completePuzzleWithLearning(puzzleId, userAnswer, true);
    } else {
        const correctAnswer = puzzle.question.answer ? 'True' : 'False';
        resultElement.innerHTML = `<p style="color: #dc3545;">❌ The correct answer was: ${correctAnswer}. ${puzzle.question.showReferenceOnWrong ? 'Check ' + puzzle.question.reference : ''}</p>`;
    }
};

window.checkReferenceAnswer = function(puzzleId) {
    const userAnswer = document.getElementById('referenceAnswer').value.trim();
    const puzzle = window.PuzzleManager.getCurrentPuzzle(puzzleId);
    
    if (!puzzle) return;
    
    const correctAnswer = puzzle.question.answer;
    const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toLowerCase()) ||
                     correctAnswer.toLowerCase().includes(userAnswer.toLowerCase());
    
    const resultElement = document.getElementById('referenceResult');
    if (isCorrect) {
        resultElement.innerHTML = `<p style="color: #228b22;">✅ Correct! The reference is ${puzzle.question.fullReference}</p>`;
        window.PuzzleManager.completePuzzleWithLearning(puzzleId, userAnswer, true);
    } else {
        resultElement.innerHTML = `<p style="color: #dc3545;">❌ The correct reference is: ${puzzle.question.fullReference}</p>`;
    }
};

window.checkReflectionAnswer = function(puzzleId) {
    const userAnswer = document.getElementById('reflectionAnswer').value.trim().toLowerCase();
    const puzzle = window.PuzzleManager.getCurrentPuzzle(puzzleId);
    
    if (!puzzle) return;
    
    if (userAnswer.length < 10) {
        showNotification('Please provide a more thoughtful reflection (at least 10 characters)', 'warning');
        return;
    }
    
    // Check for acceptable keywords
    const hasKeywords = puzzle.question.acceptableKeywords.some(keyword => 
        userAnswer.includes(keyword.toLowerCase())
    );
    
    const resultElement = document.getElementById('reflectionResult');
    if (hasKeywords || userAnswer.length > 50) {
        resultElement.innerHTML = `<p style="color: #228b22;">✅ Thoughtful reflection! Your insights show understanding of the theme.</p>`;
        window.PuzzleManager.completePuzzleWithLearning(puzzleId, userAnswer, true);
    } else {
        resultElement.innerHTML = `<p style="color: #dc3545;">💭 Try including themes like: ${puzzle.question.acceptableKeywords.join(', ')} in your reflection.</p>`;
    }
};

window.checkGenericAnswer = function(puzzleId) {
    const userAnswer = document.getElementById('genericAnswer').value.trim();
    const puzzle = window.PuzzleManager.getCurrentPuzzle(puzzleId);
    
    if (!puzzle) return;
    
    // Simple validation - could be enhanced based on question type
    const isCorrect = userAnswer.length > 0;
    
    const resultElement = document.getElementById('genericResult');
    if (isCorrect) {
        resultElement.innerHTML = `<p style="color: #228b22;">✅ Answer submitted!</p>`;
        window.PuzzleManager.completePuzzleWithLearning(puzzleId, userAnswer, true);
    } else {
        resultElement.innerHTML = `<p style="color: #dc3545;">❌ Please provide an answer.</p>`;
    }
};

// Enhanced hint function
window.showBibleHint = function(questionType, theme) {
    window.PuzzleManager.showBibleHint(questionType, theme);
};

// Reset function
window.resetBiblePuzzle = function(puzzleId) {
    window.PuzzleManager.resetBiblePuzzle(puzzleId);
};

// Replace the existing puzzle manager
window.PuzzleManager = new EnhancedPuzzleManager();

console.log('📖 Enhanced Puzzle System loaded with Bible Dataset integration');
