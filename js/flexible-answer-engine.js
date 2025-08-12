// FLEXIBLE ANSWER ENGINE - Smart answer validation with age-appropriate feedback
// Integrates with Enhanced Puzzle Manager for forgiving answer checking

// Enhanced validation functions for flexible answer checking
window.checkBibleKnowledgeFlexible = function() {
    const manager = window.enhancedPuzzleManager || window.PuzzleManager;
    const validation = new AnswerValidationEngine();
    const visual = new VisualEffectsEngine();
    const audio = new AudioFeedbackEngine();
    
    const variation = manager.getPuzzleVariation('bibleKnowledge');
    if (!variation || !variation.questions) {
        console.error('No bible knowledge variation found');
        return;
    }

    const profile = manager.currentGameContent?.profile || { answerFlexibility: 'forgiving', ageGroup: 'adults' };
    
    let allCorrect = true;
    const results = [];
    let totalConfidence = 0;
    
    // Set age group for effects
    visual.setAgeGroup(profile.ageGroup);
    audio.setAgeGroup(profile.ageGroup);
    
    variation.questions.forEach((question, index) => {
        const userAnswer = document.getElementById(`knowledge${index + 1}`).value.trim();
        const inputElement = document.getElementById(`knowledge${index + 1}`);
        const feedbackElement = document.getElementById(`feedback${index + 1}`);
        
        // Validate answer with flexibility
        const result = validation.validateAnswer(
            userAnswer, 
            question.correctAnswer, 
            profile.answerFlexibility
        );
        
        totalConfidence += result.confidence;
        
        // Show visual feedback
        if (result.isCorrect) {
            visual.showSuccessEffect(inputElement, result.confidence);
            audio.playFeedbackSound('success', result.confidence);
            results.push(`✅ Question ${index + 1}: ${result.feedback}`);
            
            // Show age-appropriate encouragement
            if (feedbackElement) {
                feedbackElement.innerHTML = `
                    <div style="color: #28a745; font-weight: 600; margin-top: 8px;">
                        ${result.encouragement} ${result.feedback}
                    </div>
                `;
                feedbackElement.style.display = 'block';
            }
        } else {
            visual.showErrorEffect(inputElement);
            audio.playFeedbackSound('error');
            results.push(`❌ Question ${index + 1}: ${result.feedback}`);
            allCorrect = false;
            
            // Show helpful feedback
            if (feedbackElement) {
                feedbackElement.innerHTML = `
                    <div style="color: #dc3545; font-weight: 600; margin-top: 8px;">
                        ${result.encouragement} ${result.hint ? `<br><small style="color: #6c757d;">💡 Hint: ${result.hint}</small>` : ''}
                    </div>
                `;
                feedbackElement.style.display = 'block';
            }
        }
    });
    
    const averageConfidence = totalConfidence / variation.questions.length;
    const resultDiv = document.getElementById('bibleKnowledgeResult');
    
    if (allCorrect) {
        // Age-appropriate success message
        const successMessage = getAgeAppropriateSuccessMessage(profile.ageGroup, averageConfidence);
        
        resultDiv.innerHTML = `
            <div style="color: #228b22; padding: 20px; border-radius: 12px; background: rgba(34, 139, 34, 0.1); border: 2px solid #228b22;">
                <div style="font-size: 1.5em; font-weight: 700; margin-bottom: 10px;">
                    ${successMessage.title}
                </div>
                <div style="font-size: 1.1em; margin-bottom: 15px;">
                    ${successMessage.description}
                </div>
                <div style="font-weight: 600;">
                    Keyword unlocked: <strong>${variation.keyword}</strong><br>
                    Accuracy Score: ${Math.round(averageConfidence * 100)}%<br>
                    ${successMessage.bonus}
                </div>
                <div style="margin-top: 15px; font-size: 0.9em; opacity: 0.8;">
                    ${results.join('<br>')}
                </div>
            </div>
        `;
        
        // Play celebration audio
        audio.playFeedbackSound('encouragement', averageConfidence);
        
        // Delay seal completion for celebration
        setTimeout(() => {
                window.completeSeal(1);
                // Auto-return to seal cards
                setTimeout(() => {
                    if (window.closePuzzle) window.closePuzzle();
                    if (window.renderSeals) window.renderSeals();
                }, 3000);
            }, 2000);
    } else {
        const encouragementMessage = getAgeAppropriateEncouragementMessage(profile.ageGroup);
        
        resultDiv.innerHTML = `
            <div style="color: #dc3545; padding: 20px; border-radius: 12px; background: rgba(220, 53, 69, 0.1); border: 2px solid #dc3545;">
                <div style="font-size: 1.3em; font-weight: 700; margin-bottom: 10px;">
                    ${encouragementMessage.title}
                </div>
                <div style="font-size: 1em; margin-bottom: 15px;">
                    ${encouragementMessage.description}
                </div>
                <div style="margin-top: 15px; font-size: 0.9em;">
                    ${results.join('<br>')}
                </div>
                ${profile.answerFlexibility !== 'exact' ? `
                    <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.1); border-radius: 8px;">
                        💡 <strong>Remember:</strong> I accept different ways of saying the same answer! Try synonyms or shorter versions.
                    </div>
                ` : ''}
            </div>
        `;
    }
};

window.checkCodeBreakingFlexible = function() {
    const manager = window.enhancedPuzzleManager || window.PuzzleManager;
    const visual = new VisualEffectsEngine();
    const audio = new AudioFeedbackEngine();
    
    const variation = manager.getPuzzleVariation('codeBreaking');
    if (!variation || !variation.items) {
        console.error('No code breaking variation found');
        return;
    }

    const profile = manager.currentGameContent?.profile || { ageGroup: 'adults' };
    
    // Set age group for effects
    visual.setAgeGroup(profile.ageGroup);
    audio.setAgeGroup(profile.ageGroup);
    
    let allCorrect = true;
    const results = [];
    const categories = variation.categories || {};
    
    // Check each category drop zone with visual feedback
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
                // Visual feedback for correct items
                visual.showSuccessEffect(item, 1.0);
            } else {
                categoryCorrect = false;
                // Visual feedback for incorrect items
                visual.showErrorEffect(item);
            }
        });
        
        // Visual feedback for drop zone
        if (correctCount === totalExpected && categoryCorrect) {
            visual.showSuccessEffect(dropZone, 1.0);
            results.push(`✅ ${categories[categoryKey].name}: Perfect classification! (${correctCount}/${totalExpected})`);
        } else {
            visual.showErrorEffect(dropZone);
            results.push(`❌ ${categories[categoryKey].name}: Need to review (${correctCount}/${totalExpected} correct)`);
            allCorrect = false;
        }
    });
    
    const resultDiv = document.getElementById('codeBreakingResult');
    
    if (allCorrect) {
        const successMessage = getAgeAppropriateSuccessMessage(profile.ageGroup, 1.0);
        
        audio.playFeedbackSound('success', 1.0);
        
        resultDiv.innerHTML = `
            <div style="color: #228b22; padding: 20px; border-radius: 12px; background: rgba(34, 139, 34, 0.1); border: 2px solid #228b22;">
                <div style="font-size: 1.5em; font-weight: 700; margin-bottom: 10px;">
                    ${getCodeBreakingSuccessTitle(profile.ageGroup)}
                </div>
                <div style="font-size: 1.1em; margin-bottom: 15px;">
                    ${getCodeBreakingSuccessDescription(profile.ageGroup)}
                </div>
                <div style="font-weight: 600; margin-bottom: 15px;">
                    Keyword unlocked: <strong>${variation.keyword}</strong>
                </div>
                <div style="margin-top: 15px; font-size: 0.9em;">
                    ${results.join('<br>')}
                </div>
            </div>
        `;
        
        setTimeout(() => {
                window.completeSeal(4);
                // Auto-return to seal cards
                setTimeout(() => {
                    if (window.closePuzzle) window.closePuzzle();
                    if (window.renderSeals) window.renderSeals();
                }, 3000);
            }, 2000);
    } else {
        audio.playFeedbackSound('error');
        
        const encouragementMessage = getCodeBreakingEncouragementMessage(profile.ageGroup);
        
        resultDiv.innerHTML = `
            <div style="color: #dc3545; padding: 20px; border-radius: 12px; background: rgba(220, 53, 69, 0.1); border: 2px solid #dc3545;">
                <div style="font-size: 1.3em; font-weight: 700; margin-bottom: 10px;">
                    ${encouragementMessage.title}
                </div>
                <div style="font-size: 1em; margin-bottom: 15px;">
                    ${encouragementMessage.description}
                </div>
                <div style="margin-top: 15px; font-size: 0.9em;">
                    ${results.join('<br>')}
                </div>
                <div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.1); border-radius: 8px;">
                    ${getCodeBreakingHelpText(profile.ageGroup)}
                </div>
            </div>
        `;
    }
};

// Show adaptive hints based on age group and difficulty
window.showAdaptiveHints = function(challengeType) {
    const manager = window.enhancedPuzzleManager || window.PuzzleManager;
    const variation = manager.getPuzzleVariation(challengeType);
    const profile = manager.currentGameContent?.profile || { ageGroup: 'adults' };
    
    if (!variation) return;
    
    const hintDiv = document.getElementById(`${challengeType}Hint`);
    if (!hintDiv) return;
    
    let hintsHtml = `<div style="background: ${getAgeHintBackground(profile.ageGroup)}; padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid ${getAgeHintColor(profile.ageGroup)};">`;
    hintsHtml += `<h4 style="color: ${getAgeHintColor(profile.ageGroup)}; margin-bottom: 10px;">${getAgeHintTitle(profile.ageGroup)}</h4>`;
    
    if (challengeType === 'bibleKnowledge' && variation.questions) {
        variation.questions.forEach((question, index) => {
            const hintText = getAgeAppropriateHint(question, profile.ageGroup);
            hintsHtml += `<p><strong>Question ${index + 1}:</strong> ${hintText}</p>`;
        });
    } else if (challengeType === 'codeBreaking' && variation.items) {
        hintsHtml += `<p>${getCodeBreakingHints(profile.ageGroup)}</p>`;
        
        if (profile.ageGroup === 'kids') {
            // Show specific hints for kids
            variation.items.forEach((item, index) => {
                const testament = item.testament === 'oldTestament' ? 'Old Testament (Before Jesus)' : 'New Testament (During/After Jesus)';
                hintsHtml += `<p><strong>"${item.text}"</strong> → ${testament}</p>`;
            });
        }
    }
    
    hintsHtml += '</div>';
    
    hintDiv.innerHTML = hintsHtml;
    hintDiv.style.display = 'block';
    
    // Scroll hint into view for better UX
    hintDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// Age-appropriate success messages
function getAgeAppropriateSuccessMessage(ageGroup, confidence) {
    const messages = {
        kids: {
            title: confidence >= 0.9 ? '🌟 WOW! You\'re a Bible Superstar!' : confidence >= 0.8 ? '🎉 Great Job, Bible Explorer!' : '😊 Nice Work, Bible Friend!',
            description: confidence >= 0.9 ? 'You knew all those Bible answers perfectly! God is so proud of you!' : 
                        confidence >= 0.8 ? 'You did really well! You\'re learning so much about God!' :
                        'Good job trying your best! Keep learning about Jesus!',
            bonus: confidence >= 0.9 ? '🏆 You get a PERFECT SCORE sticker!' : 
                   confidence >= 0.8 ? '⭐ You get a GREAT JOB sticker!' : 
                   '🌈 You get a GOOD EFFORT sticker!'
        },
        teenagers: {
            title: confidence >= 0.9 ? '🔥 Biblical Knowledge MASTERED!' : confidence >= 0.8 ? '⚡ Strong Bible Game!' : '💪 Solid Scripture Foundation!',
            description: confidence >= 0.9 ? 'Your biblical knowledge is on fire! Outstanding understanding of Scripture!' :
                        confidence >= 0.8 ? 'Impressive biblical knowledge! You\'re building a strong foundation!' :
                        'Good scriptural understanding! Keep growing in God\'s Word!',
            bonus: confidence >= 0.9 ? '🏆 Expert Level Achievement Unlocked!' :
                   confidence >= 0.8 ? '⭐ Advanced Knowledge Badge Earned!' :
                   '🎯 Scripture Student Badge Earned!'
        },
        adults: {
            title: confidence >= 0.9 ? 'Excellent Biblical Knowledge' : confidence >= 0.8 ? 'Strong Scripture Understanding' : 'Good Biblical Foundation',
            description: confidence >= 0.9 ? 'Demonstrated comprehensive understanding of biblical truth.' :
                        confidence >= 0.8 ? 'Showed solid grasp of scriptural knowledge.' :
                        'Displayed foundational biblical understanding.',
            bonus: confidence >= 0.9 ? 'Biblical Scholar Recognition' :
                   confidence >= 0.8 ? 'Scripture Student Certification' :
                   'Bible Knowledge Foundation'
        },
        scholars: {
            title: confidence >= 0.9 ? 'Scholarly Biblical Mastery' : confidence >= 0.8 ? 'Advanced Scriptural Analysis' : 'Academic Biblical Competency',
            description: confidence >= 0.9 ? 'Exhibited masterful comprehension of biblical hermeneutics and scriptural precision.' :
                        confidence >= 0.8 ? 'Demonstrated advanced biblical scholarship and interpretive accuracy.' :
                        'Showed competent biblical analysis and scriptural understanding.',
            bonus: confidence >= 0.9 ? 'Doctoral-Level Biblical Expertise' :
                   confidence >= 0.8 ? 'Graduate-Level Scripture Mastery' :
                   'Academic Biblical Proficiency'
        }
    };
    
    return messages[ageGroup] || messages['adults'];
}

function getAgeAppropriateEncouragementMessage(ageGroup) {
    const messages = {
        kids: {
            title: '🤗 Keep Trying, Bible Champion!',
            description: 'Learning about God takes practice! You\'re doing great - just try again and use the hints to help you!'
        },
        teenagers: {
            title: '💪 Level Up Your Bible Knowledge!',
            description: 'You\'re on the right track! Check the hints and show what you know about Scripture!'
        },
        adults: {
            title: 'Continue Building Biblical Understanding',
            description: 'Growing in scriptural knowledge is a journey. Review the feedback and apply biblical wisdom.'
        },
        scholars: {
            title: 'Refine Biblical Analysis',
            description: 'Scholarly precision requires careful examination. Consider the hermeneutical context and scriptural accuracy.'
        }
    };
    
    return messages[ageGroup] || messages['adults'];
}

function getCodeBreakingSuccessTitle(ageGroup) {
    const titles = {
        kids: '🧩 Awesome Bible Sorting!',
        teenagers: '🔥 Biblical Classification Mastered!',
        adults: 'Excellent Biblical Organization',
        scholars: 'Superior Hermeneutical Classification'
    };
    return titles[ageGroup] || titles['adults'];
}

function getCodeBreakingSuccessDescription(ageGroup) {
    const descriptions = {
        kids: 'You sorted all the Bible stories perfectly! You know when things happened in the Bible!',
        teenagers: 'Perfect biblical timeline knowledge! You understand the flow of Scripture!',
        adults: 'Demonstrated clear understanding of biblical chronology and Testament organization.',
        scholars: 'Exhibited comprehensive knowledge of biblical periodization and canonical structure.'
    };
    return descriptions[ageGroup] || descriptions['adults'];
}

function getCodeBreakingEncouragementMessage(ageGroup) {
    const messages = {
        kids: {
            title: '🤔 Let\'s Sort These Bible Stories!',
            description: 'Some Bible stories are in the wrong places. Remember: Old Testament is before Jesus was born, New Testament is when Jesus lived and after!'
        },
        teenagers: {
            title: '🎯 Biblical Timeline Challenge',
            description: 'Some events need to be moved to the correct Testament. Think about when each event happened in biblical history!'
        },
        adults: {
            title: 'Testament Classification Review',
            description: 'Some biblical events require proper Testament classification. Consider the chronological context of each event.'
        },
        scholars: {
            title: 'Canonical Organizational Analysis',
            description: 'Certain biblical pericopes require accurate Testament categorization. Apply chronological hermeneutical principles.'
        }
    };
    
    return messages[ageGroup] || messages['adults'];
}

function getCodeBreakingHints(ageGroup) {
    const hints = {
        kids: '🎯 Remember: Old Testament = Before Jesus was born, New Testament = When Jesus lived and after He went to heaven!',
        teenagers: '💡 Think about the timeline: Old Testament covers creation through prophecy, New Testament starts with Jesus\' birth!',
        adults: 'Consider the chronological division: Old Testament (pre-incarnation) vs New Testament (incarnation and early church).',
        scholars: 'Apply canonical periodization: Hebrew Scriptures (pre-messianic era) versus Apostolic writings (messianic fulfillment era).'
    };
    return hints[ageGroup] || hints['adults'];
}

function getCodeBreakingHelpText(ageGroup) {
    const helps = {
        kids: '💡 Tip: If you see Jesus, Mary, Paul, or disciples, it goes in New Testament! If you see Noah, Moses, or David, it goes in Old Testament!',
        teenagers: '🔍 Strategy: Look for key figures - Jesus, apostles, and early church = New Testament. Patriarchs, prophets, and kings = Old Testament.',
        adults: 'Guidance: Consider key indicators - messianic events and apostolic writings indicate New Testament classification.',
        scholars: 'Analytical approach: Examine christological and ecclesiological elements as indicators of Testament categorization.'
    };
    return helps[ageGroup] || helps['adults'];
}

function getAgeAppropriateHint(question, ageGroup) {
    if (!question.hint) {
        return ageGroup === 'kids' ? 'Think about the Bible stories you know!' :
               ageGroup === 'teenagers' ? 'Consider what you\'ve learned in church or Bible study!' :
               ageGroup === 'adults' ? 'Reflect on scriptural knowledge and biblical context.' :
               'Apply hermeneutical analysis and biblical scholarship.';
    }
    
    // Adapt existing hint to age group
    if (ageGroup === 'kids') {
        return `🌈 ${question.hint} (Think about fun Bible stories!)`;
    } else if (ageGroup === 'teenagers') {
        return `🔥 ${question.hint} (Connect it to your Bible knowledge!)`;
    } else if (ageGroup === 'adults') {
        return `📖 ${question.hint}`;
    } else {
        return `🎓 ${question.hint} (Consider biblical context and scholarship)`;
    }
}

function getAgeHintBackground(ageGroup) {
    const backgrounds = {
        kids: 'rgba(255, 193, 7, 0.1)',
        teenagers: 'rgba(102, 126, 234, 0.1)',
        adults: 'rgba(66, 153, 225, 0.1)',
        scholars: 'rgba(139, 115, 85, 0.1)'
    };
    return backgrounds[ageGroup] || backgrounds['adults'];
}

function getAgeHintColor(ageGroup) {
    const colors = {
        kids: '#ffc107',
        teenagers: '#667eea',
        adults: '#4299e1',
        scholars: '#8b7355'
    };
    return colors[ageGroup] || colors['adults'];
}

function getAgeHintTitle(ageGroup) {
    const titles = {
        kids: '🌟 Super Helpful Hints!',
        teenagers: '💡 Smart Study Tips!',
        adults: '📚 Guidance & Context',
        scholars: '🎓 Scholarly References'
    };
    return titles[ageGroup] || titles['adults'];
}

// Chronological order validation function
window.checkChronologicalOrder = function() {
    console.log('📅 Checking Chronological Order...');
    
    const dropZones = document.querySelectorAll('.drop-zone[data-position]');
    
    // CRITICAL: Check if drop zones exist
    if (dropZones.length === 0) {
        console.error('❌ No chronological drop zones found! Looking for alternative selectors...');
        const altDropZones = document.querySelectorAll('.chronological-drop');
        if (altDropZones.length > 0) {
            console.log('✅ Found alternative drop zones, redirecting to puzzles.js handler...');
            if (window.checkChronologicalOrder && window.checkChronologicalOrder !== arguments.callee) {
                return window.checkChronologicalOrder();
            }
        }
        
        const resultDiv = document.getElementById('chronologicalOrderResult');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="error-message">
                    <p>❌ Timeline interface not properly loaded. Please reset and try again.</p>
                    <button onclick="resetChallenge('chronologicalOrder')" class="btn secondary">🔄 Reset Challenge</button>
                </div>
            `;
        }
        return;
    }
    
    const droppedEvents = [];
    
    // Collect all dropped events in order
    dropZones.forEach((zone, index) => {
        const droppedItem = zone.querySelector('.drag-item');
        if (droppedItem) {
            droppedEvents[index] = droppedItem.dataset.eventId;
        }
    });
    
    // Check if we have all events placed
    if (droppedEvents.length !== dropZones.length || droppedEvents.includes(undefined)) {
        const resultDiv = document.getElementById('chronologicalOrderResult');
        if (resultDiv) {
            resultDiv.innerHTML = `
                <div class="warning-message">
                    <p>⚠️ Please place all events on the timeline before verifying!</p>
                    <p>You need to drag all ${dropZones.length} events to their correct positions.</p>
                </div>
            `;
        }
        return;
    }
    
    // Get the correct order (assuming events with id 1-N should be in order)
    const correctOrder = Array.from({length: dropZones.length}, (_, i) => String(i + 1));
    
    // Compare with placed order
    let correctCount = 0;
    droppedEvents.forEach((eventId, index) => {
        if (eventId === correctOrder[index]) {
            correctCount++;
            // Highlight correct placements
            dropZones[index].style.backgroundColor = '#4ade80';
        } else {
            // Highlight incorrect placements
            dropZones[index].style.backgroundColor = '#f87171';
        }
    });
    
    const resultDiv = document.getElementById('chronologicalOrderResult');
    if (resultDiv) {
        const percentage = Math.round((correctCount / dropZones.length) * 100);
        
        if (percentage === 100) {
            resultDiv.innerHTML = `
                <div class="success-message">
                    <h4>🎉 Perfect Timeline!</h4>
                    <p>You correctly ordered all ${correctCount}/${dropZones.length} events! (${percentage}%)</p>
                    <p>Your understanding of biblical history is excellent!</p>
                </div>
            `;
            
            // Trigger completion
            setTimeout(() => {
                if (window.completeSeal) {
                    window.completeSeal(5);
                    // Auto-return to seal cards
                    setTimeout(() => {
                        if (window.closePuzzle) window.closePuzzle();
                        if (window.renderSeals) window.renderSeals();
                    }, 3000);
                }
            }, 2000);
        } else if (percentage >= 70) {
            resultDiv.innerHTML = `
                <div class="partial-success">
                    <h4>📚 Good Progress!</h4>
                    <p>You got ${correctCount}/${dropZones.length} events correct (${percentage}%)</p>
                    <p>Review the historical context and try again. You're close!</p>
                    <button onclick="resetChallenge('chronologicalOrder')" class="btn secondary" style="margin-top: 10px;">🔄 Try Again</button>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="encouragement-message">
                    <h4>📖 Keep Learning!</h4>
                    <p>You got ${correctCount}/${dropZones.length} events correct (${percentage}%)</p>
                    <p>Study the biblical timeline more carefully. Each event has its proper place in God's plan!</p>
                    <button onclick="resetChallenge('chronologicalOrder')" class="btn secondary" style="margin-top: 10px;">🔄 Reset & Try Again</button>
                </div>
            `;
        }
    }
};

// Scripture topics validation function
window.checkScriptureTopics = function() {
    console.log('🗂️ Checking Scripture Topics organization...');
    
    const topicDrops = document.querySelectorAll('.topic-drop');
    let correctCount = 0;
    let totalTopics = topicDrops.length;
    
    topicDrops.forEach(drop => {
        const topicName = drop.dataset.topic;
        const droppedVerses = drop.querySelectorAll('.drag-item');
        
        let topicCorrect = true;
        droppedVerses.forEach(verse => {
            const verseTopicName = verse.dataset.verseTopic;
            if (verseTopicName !== topicName && verseTopicName !== 'distractor') {
                topicCorrect = false;
            }
        });
        
        if (topicCorrect && droppedVerses.length > 0) {
            correctCount++;
            drop.style.backgroundColor = '#4ade80';
        } else {
            drop.style.backgroundColor = '#f87171';
        }
    });
    
    const resultDiv = document.getElementById('scriptureTopicsResult');
    if (resultDiv) {
        const percentage = Math.round((correctCount / Math.max(1, totalTopics)) * 100);
        
        if (percentage >= 80) {
            resultDiv.innerHTML = `
                <div class="success-message">
                    <h4>🎉 Excellent Scripture Organization!</h4>
                    <p>You correctly organized ${correctCount}/${totalTopics} topics! ${percentage}%</p>
                    <p>Your understanding of biblical themes is growing strong!</p>
                </div>
            `;
            
            // Trigger completion
            setTimeout(() => {
            if (window.completeSeal) {
            window.completeSeal(6);
                // Auto-return to seal cards
                    setTimeout(() => {
                    if (window.closePuzzle) window.closePuzzle();
                    if (window.renderSeals) window.renderSeals();
                }, 3000);
            }
        }, 2000);
        } else if (percentage >= 50) {
            resultDiv.innerHTML = `
                <div class="partial-success">
                    <h4>📚 Good Progress!</h4>
                    <p>You got ${correctCount}/${totalTopics} topics correct (${percentage}%)</p>
                    <p>Review the verse themes and try reorganizing. You're getting there!</p>
                    <button onclick="resetChallenge('scriptureTopics')" class="btn secondary" style="margin-top: 10px;">🔄 Try Again</button>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="encouragement-message">
                    <h4>📖 Keep Learning!</h4>
                    <p>You got ${correctCount}/${totalTopics} topics correct (${percentage}%)</p>
                    <p>Study each verse carefully to understand its main theme. God's Word has perfect organization!</p>
                    <button onclick="resetChallenge('scriptureTopics')" class="btn secondary" style="margin-top: 10px;">🔄 Reset & Try Again</button>
                </div>
            `;
        }
    }
};

console.log('🎯 Flexible Answer Engine loaded - Age-appropriate validation ready!');
