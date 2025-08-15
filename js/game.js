// Main Game Controller
class GameController {
    constructor() {
        // Always start with fresh state - only load saved progress when explicitly resuming
        this.gameState = {
            mode: null, // 'single' or 'multiplayer'
            teamName: '',
            teamSize: 3,
            completedSeals: [],
            keywords: [],
            startTime: null,
            currentSeal: null,
            gameId: null,
            isGameActive: false,
            progress: {
                sealsCompleted: [],
                keywords: [],
                currentSeal: null,
                startTime: null,
                completionTime: null,
                hintsUsed: 0
            }
        };
        
        console.log('🎮 GameController initialized with fresh state');
        
        this.gameTimer = null;
        this.autoSaveInterval = null;
        this.init();
        
        // Expose globally for other scripts (Oracle's fix)
        window.GameController = this;
    }

    // Initialize the game
    init() {
        this.showMainMenu();
        this.setupEventListeners();
        
        // Auto-save progress periodically
        this.autoSaveInterval = setInterval(() => {
            this.autoSaveProgress();
        }, window.GameData.GAME_CONSTANTS.AUTO_SAVE_INTERVAL);
    }

    // Setup global event listeners
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePuzzle();
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.screen) {
                this.showScreen(e.state.screen);
            } else {
                this.showMainMenu();
            }
        });

        // Handle page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseTimer();
            } else {
                this.resumeTimer();
            }
        });
    }

    // Show main menu
    showMainMenu() {
        this.showScreen('mainMenu');
        this.updatePageState('mainMenu');
        
        // Check if there's a saved game and show resume option
        this.checkForSavedGame();
    }

    // Check for saved game and show resume button if available
    checkForSavedGame() {
        const savedState = this.loadSavedProgress();
        const resumeButton = document.getElementById('resumeGameBtn');
        
        if (savedState && resumeButton) {
            resumeButton.style.display = 'block';
            resumeButton.textContent = `Resume Game (${savedState.completedSeals.length}/7 seals)`;
        } else if (resumeButton) {
            resumeButton.style.display = 'none';
        }
    }

    // Resume saved game
    resumeGame() {
        const savedState = this.loadSavedProgress();
        if (savedState) {
            this.gameState = savedState;
            console.log('🔄 Resuming saved game with', savedState.completedSeals.length, 'completed seals');
            this.showGameScreen();
            this.startGameTimer();
        } else {
            showNotification('No saved game found', 'error');
        }
    }

    // Show single player setup
    showSinglePlayerSetup() {
        this.showScreen('singlePlayerSetup');
        this.updatePageState('singlePlayerSetup');
    }

    // Show multiplayer setup
    showMultiPlayerSetup() {
        this.showScreen('multiPlayerSetup');
        this.updatePageState('multiPlayerSetup');
    }

    // Show create game screen
    showCreateGame() {
        this.showScreen('createGame');
        this.updatePageState('createGame');
    }

    // Show leaderboard
    showLeaderboard() {
        this.showScreen('leaderboardScreen');
        this.updatePageState('leaderboardScreen');
        window.LeaderboardManager.loadGlobalLeaderboard('all');
    }

    // Generic screen switcher
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    // Update browser history state
    updatePageState(screen) {
        history.pushState({ screen }, '', `#${screen}`);
    }

    // Start single player game
    async startSinglePlayerGame() {
        try {
            // Ensure PuzzleManager is available before starting
            if (!window.PuzzleManager || !window.PuzzleManager.generatePuzzleContent) {
                console.error('❌ PuzzleManager not ready! Available:', {
                    exists: !!window.PuzzleManager,
                    hasGenerateMethod: !!(window.PuzzleManager && window.PuzzleManager.generatePuzzleContent)
                });
                // Try a few more times before giving up
                const retryCount = this._retryCount || 0;
                if (retryCount < 5) {
                    this._retryCount = retryCount + 1;
                    setTimeout(() => this.startSinglePlayerGame(), 300);
                    return;
                } else {
                    console.error('❌ Giving up on PuzzleManager initialization after 5 attempts');
                    showNotification('Game initialization failed. Please refresh the page.', 'error');
                    return;
                }
            }
            
            // Reset retry count on success
            this._retryCount = 0;
            
            // Debug: Check if GameData is available
            console.log('🔧 GameData check:', {
                exists: !!window.GameData,
                hasSeals: !!(window.GameData && window.GameData.seals),
                sealsCount: window.GameData && window.GameData.seals ? window.GameData.seals.length : 0
            });
            
            // Try multiple possible team name inputs
            const teamNameElement = document.getElementById('teamName') || 
                                  document.getElementById('playerTeamName') || 
                                  document.getElementById('singleTeamName');
            
            if (!teamNameElement) {
                // Create a default team name if no input found
                const teamName = 'Solo Player';
                console.log('No team name input found, using default:', teamName);
                this.startGameWithTeam(teamName, 1);
                return;
            }
            
            const teamName = teamNameElement.value.trim() || 'Solo Player';
            const teamSize = 1; // Single player is always team size 1

            if (!teamName) {
                showNotification('Please enter a team name', 'error');
                return;
            }

            // Clear any previous saved progress and start fresh
            this.clearSavedProgress();
            
            this.gameState.mode = 'single';
            this.gameState.teamName = teamName;
            this.gameState.teamSize = parseInt(teamSize);
            this.gameState.startTime = Date.now();
            this.gameState.isGameActive = true;
            this.gameState.gameId = `single_${Date.now()}`;
            this.gameState.completedSeals = [];
            this.gameState.keywords = [];
            this.gameState.progress.sealsCompleted = [];
            this.gameState.progress.keywords = [];

            // Generate random puzzle variations
            this.generatePuzzleVariations();

            this.showGameScreen();
            this.startGameTimer();
            
            // CRITICAL: Don't initialize leaderboard for single player mode
            if (window.LeaderboardManager && this.gameState?.mode !== 'single') {
                window.LeaderboardManager.updateSinglePlayerProgress(this.gameState);
                console.log('🏆 Initialized leaderboard for non-single mode');
            } else {
                console.log('🚫 Single-player mode: Leaderboard disabled');
                if (window.LeaderboardManager) {
                    window.LeaderboardManager.hideLeaderboard();
                }
            }
            
            showNotification(`Welcome ${teamName}! Your quest begins now.`, 'success');

        } catch (error) {
            console.error('Error starting single player game:', error);
            showNotification('Failed to start game. Please try again.', 'error');
        }
    }
    
    // Helper method to start game with team
    startGameWithTeam(teamName, teamSize) {
        try {
            console.log(`🎮 Starting game for team: ${teamName} (size: ${teamSize})`);
            
            // Initialize game state
            this.gameState.currentTeam = teamName;
            this.gameState.mode = 'single';
            this.gameState.teams = [{ name: teamName, score: 0, completedSeals: [] }];
            
            // Hide setup and start game
            const modeSelection = document.getElementById('modeSelection');
            if (modeSelection) modeSelection.style.display = 'none';
            
            const multiplayerSetup = document.getElementById('multiplayerSetup');
            if (multiplayerSetup) multiplayerSetup.style.display = 'none';
            
            const aiSetup = document.getElementById('aiSetup');
            if (aiSetup) aiSetup.style.display = 'none';
            
            // Start the actual game
            if (window.startGame) {
                window.startGame();
            } else {
                console.log('Game started successfully');
                showNotification(`Welcome ${teamName}! Your quest begins now.`, 'success');
            }
            
        } catch (error) {
            console.error('Error in startGameWithTeam:', error);
            showNotification('Failed to start game. Please try again.', 'error');
        }
    }

    // Create new multiplayer game
    async createNewGame() {
        try {
            const gameTitle = document.getElementById('gameTitle').value.trim();
            const maxTeams = document.getElementById('maxTeams').value;
            const hostTeamName = document.getElementById('hostTeamName').value.trim();
            const hostTeamSize = document.getElementById('hostTeamSize').value;

            if (!gameTitle || !hostTeamName) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const result = await window.MultiplayerManager.createGame(
                gameTitle, maxTeams, hostTeamName, hostTeamSize
            );

            this.gameState.mode = 'multiplayer';
            this.gameState.teamName = hostTeamName;
            this.gameState.teamSize = parseInt(hostTeamSize);
            this.gameState.gameId = result.gameId;

            this.showGameLobby(result.roomCode, result.gameId);

        } catch (error) {
            console.error('Error creating game:', error);
        }
    }

    // Join existing multiplayer game
    async joinGame() {
        try {
            const roomCode = document.getElementById('gameRoomCode').value.trim().toUpperCase();
            
            if (!roomCode) {
                showNotification('Please enter a room code', 'error');
                return;
            }

            // Show team setup modal for joining
            this.showJoinGameModal(roomCode);

        } catch (error) {
            console.error('Error joining game:', error);
        }
    }

    // Show join game modal
    showJoinGameModal(roomCode) {
        const modalHtml = `
            <div class="modal-overlay" id="joinGameModal">
                <div class="modal-content">
                    <h3>Join Game: ${roomCode}</h3>
                    <div class="input-group">
                        <label for="joinTeamName">Team Name:</label>
                        <input type="text" id="joinTeamName" placeholder="Enter your team name">
                    </div>
                    <div class="input-group">
                        <label for="joinTeamSize">Team Size:</label>
                        <select id="joinTeamSize">
                            <option value="3">3 players</option>
                            <option value="4">4 players</option>
                            <option value="5">5 players</option>
                            <option value="6">6 players</option>
                        </select>
                    </div>
                    <div class="modal-buttons">
                        <button class="btn" onclick="confirmJoinGame('${roomCode}')">Join Game</button>
                        <button class="btn btn-secondary" onclick="closeJoinGameModal()">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Confirm join game
    async confirmJoinGame(roomCode) {
        try {
            const teamName = document.getElementById('joinTeamName').value.trim();
            const teamSize = document.getElementById('joinTeamSize').value;

            if (!teamName) {
                showNotification('Please enter a team name', 'error');
                return;
            }

            const result = await window.MultiplayerManager.joinGame(roomCode, teamName, teamSize);

            this.gameState.mode = 'multiplayer';
            this.gameState.teamName = teamName;
            this.gameState.teamSize = parseInt(teamSize);
            this.gameState.gameId = result.gameId;

            this.closeJoinGameModal();
            this.showGameLobby(roomCode, result.gameId);

        } catch (error) {
            console.error('Error confirming join:', error);
        }
    }

    // Close join game modal
    closeJoinGameModal() {
        const modal = document.getElementById('joinGameModal');
        if (modal) {
            modal.remove();
        }
    }

    // Show game lobby
    showGameLobby(roomCode, gameId) {
        this.showScreen('gameLobby');
        this.updatePageState('gameLobby');
        
        document.getElementById('displayRoomCode').textContent = roomCode;
        
        // Start listening for lobby updates
        window.MultiplayerManager.startGameListener(gameId, (gameData) => {
            this.updateLobby(gameData);
        });
    }

    // Update lobby display
    updateLobby(gameData) {
        const teams = Object.values(gameData.teams || {});
        const teamCount = teams.length;
        
        document.getElementById('teamCount').textContent = teamCount;
        document.getElementById('maxTeamCount').textContent = gameData.maxTeams;
        
        // Update teams list
        const teamsList = document.getElementById('teamsList');
        let teamsHtml = '';
        
        teams.forEach(team => {
            const hostBadge = team.isHost ? '👑 Host' : '';
            const statusClass = team.status === 'ready' ? 'ready' : 'waiting';
            
            teamsHtml += `
                <div class="team-card ${team.isHost ? 'host' : ''}">
                    <div class="team-name">${team.name} ${hostBadge}</div>
                    <div class="team-size">${team.size} players</div>
                    <div class="team-status ${statusClass}">${team.status}</div>
                </div>
            `;
        });
        
        teamsList.innerHTML = teamsHtml;
        
        // Update start button for host
        const startBtn = document.getElementById('startGameBtn');
        if (window.MultiplayerManager.isHost) {
            const canStart = teamCount >= window.GameData.GAME_CONSTANTS.MIN_TEAMS_TO_START;
            startBtn.disabled = !canStart;
            startBtn.textContent = canStart ? '🚀 Start Game' : `Need ${window.GameData.GAME_CONSTANTS.MIN_TEAMS_TO_START}+ teams`;
        } else {
            startBtn.style.display = 'none';
        }
        
        // Check if game started
        if (gameData.status === 'playing') {
            this.startMultiplayerGame();
        }
    }

    // Start multiplayer game
    async startMultiplayerGame() {
        try {
            if (window.MultiplayerManager.isHost) {
                await window.MultiplayerManager.startGame(this.gameState.gameId);
            }

            this.gameState.startTime = Date.now();
            this.gameState.isGameActive = true;

            // Sync puzzle variations in multiplayer
            this.generatePuzzleVariations();
            
            this.showGameScreen();
            this.startGameTimer();
            
            // Initialize leaderboard
            window.LeaderboardManager.initializeGameLeaderboard(this.gameState.gameId);
            
            showNotification('The quest has begun! May the fastest team win!', 'success');

        } catch (error) {
            console.error('Error starting multiplayer game:', error);
        }
    }

    // Generate puzzle variations
    generatePuzzleVariations() {
        // Use the enhanced puzzle manager's regeneration function
        if (window.PuzzleManager && window.PuzzleManager.regeneratePuzzles) {
            window.PuzzleManager.regeneratePuzzles();
        } else if (window.GameData && window.GameData.puzzleVariations && window.PuzzleManager && window.PuzzleManager.currentPuzzles) {
            // Fallback to manual generation
            const puzzleTypes = Object.keys(window.GameData.puzzleVariations);
            puzzleTypes.forEach(type => {
                const variations = window.GameData.puzzleVariations[type];
                if (variations && variations.length > 0) {
                    const randomIndex = Math.floor(Math.random() * variations.length);
                    window.PuzzleManager.currentPuzzles[type] = variations[randomIndex];
                }
            });
        } else {
            console.warn('⚠️ PuzzleManager or GameData not ready for variation generation');
        }
    }

    // Show main game screen
    showGameScreen() {
        // Force show the game container
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer) {
            gameContainer.style.display = 'block';
            console.log('🔧 Forced gameContainer to be visible');
        }
        
        this.showScreen('gameContainer');
        this.updatePageState('gameScreen');
        
        // team name display (make call safe - element may not exist)
        const teamNameEl = document.getElementById('currentTeamName');
        if (teamNameEl) {
            teamNameEl.textContent = this.gameState.teamName;
        }
        
        this.renderSeals();
        this.updateProgress();
        
        // Show admin panel for hosts
        if (window.MultiplayerManager.isHost) {
            document.getElementById('adminPanel').style.display = 'block';
        }
    }

    // Render seals grid
    renderSeals() {
        const container = document.getElementById('sealsGrid');
        if (!container) {
            console.warn('❌ sealsGrid element not found');
            return;
        }
        
        if (!window.GameData || !window.GameData.seals) {
            console.error('❌ GameData or GameData.seals not available');
            container.innerHTML = '<p style="color: white; text-align: center; padding: 20px;">Game data not loaded. Please refresh the page.</p>';
            return;
        }
        
        console.log('🎯 Rendering seals. GameData.seals:', window.GameData.seals.length);
        console.log('🎯 Current completedSeals:', this.gameState.completedSeals);
        let html = '';
        
        window.GameData.seals.forEach(seal => {
            const isCompleted = this.gameState.completedSeals.includes(seal.id);
            const isLocked = !this.canOpenSeal(seal);
            
            let statusClass = '';
            if (isCompleted) statusClass = 'completed';
            else if (isLocked) statusClass = 'locked';
            
            console.log(`🔧 Seal ${seal.id} (type: ${typeof seal.id}): completed=${isCompleted}, locked=${isLocked}`);
            if (seal.id <= 4) { // Only log for first 4 seals to avoid spam
                console.log(`🔧 Checking if ${seal.id} in [${this.gameState.completedSeals}] = ${this.gameState.completedSeals.includes(seal.id)}`);
            }
            
            html += `
                <div class="seal ${statusClass}" onclick="${isLocked ? '' : `openSeal(${seal.id})`}">
                    <div class="seal-number">${seal.id}</div>
                    <div class="seal-title">${seal.title}</div>
                    <div class="seal-theme">${seal.theme}</div>
                    <div class="seal-description">${seal.description}</div>
                    ${isCompleted ? '<div class="seal-completed">✅ Completed</div>' : ''}
                </div>
            `;
        });
        
        console.log('🔧 Generated HTML length:', html.length);
        console.log('🔧 Container before:', container.innerHTML.length);
        
        container.innerHTML = html;
        
        console.log('🔧 Container after:', container.innerHTML.length);
        console.log('🔧 sealsGrid element:', container, 'visible:', container.offsetWidth, 'x', container.offsetHeight);
        console.log('🔧 Container computed styles:', window.getComputedStyle(container).display, window.getComputedStyle(container).visibility);
        
        // Force make visible for debugging
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.minHeight = '200px';
        container.style.backgroundColor = 'rgba(255,0,0,0.1)'; // Red tint for debugging
        
        // Check parent element
        const parent = container.parentElement;
        console.log('🔧 Parent element:', parent, 'visible:', parent ? parent.offsetWidth + 'x' + parent.offsetHeight : 'none');
        if (parent) {
            console.log('🔧 Parent computed styles:', window.getComputedStyle(parent).display, window.getComputedStyle(parent).visibility);
            parent.style.display = 'block';
            parent.style.visibility = 'visible';
        }
    }

    // Check if seal can be opened
    canOpenSeal(seal) {
        if (seal.requiredSeals.length === 0) return true;
        return seal.requiredSeals.every(reqId => this.gameState.completedSeals.includes(reqId));
    }

    // Open a seal puzzle
    async openSeal(sealId) {
        const seal = window.GameData.seals.find(s => s.id === sealId);
        if (!seal || !this.canOpenSeal(seal)) return;
        
        this.gameState.currentSeal = seal;
        
        const titleEl = document.getElementById('puzzleTitle');
        const questionEl = document.getElementById('puzzleQuestion');
        const modalEl = document.getElementById('puzzleModal');
        
        if (titleEl) {
            titleEl.textContent = `Seal ${seal.id}: ${seal.title}`;
        }
        if (questionEl) {
            try {
                console.log(`🎯 Generating puzzle content for seal ${seal.id}, puzzle type: ${seal.puzzle}`);
                if (!window.PuzzleManager || !window.PuzzleManager.generatePuzzleContent) {
                    console.error('❌ PuzzleManager or generatePuzzleContent not available');
                    questionEl.innerHTML = '<p style="color: red; padding: 20px;">Puzzle system not available. Please refresh the page.</p>';
                    return;
                }
                const puzzleContent = await window.PuzzleManager.generatePuzzleContent(seal.id, seal.puzzle);
                console.log(`✅ Generated puzzle content length:`, puzzleContent?.length || 0);
                questionEl.innerHTML = puzzleContent || '<p style="color: red; padding: 20px;">Failed to generate puzzle content.</p>';
            } catch (error) {
                console.error('❌ Error generating puzzle content:', error);
                questionEl.innerHTML = `<p style="color: red; padding: 20px;">Error loading puzzle: ${error.message}</p>`;
            }
        }
        if (modalEl) {
            modalEl.style.display = 'block';
        }
    }

    // Close puzzle modal
    closePuzzle() {
        document.getElementById('puzzleModal').style.display = 'none';
        this.gameState.currentSeal = null;
    }

    // ---- UNIVERSAL seal-completion handler (Oracle's fix) ----
    async completeSeal(sealId, keyword = null) {
        console.log('🎯 GAMECONTROLLER.completeSeal called with:', sealId, keyword);
        
        // ignore duplicates
        if (this.gameState.completedSeals.includes(sealId)) {
            console.log('⚠️ Seal', sealId, 'already completed, skipping');
            return;
        }

        // Get keyword if not provided
        if (!keyword && window.GameData && window.PuzzleManager) {
            const seal = window.GameData.seals.find(s => s.id === sealId);
            if (seal) {
                const variation = window.PuzzleManager.getPuzzleVariation(seal.puzzle);
                keyword = variation?.keyword || `keyword${sealId}`;
            }
        }

        // 1. update local state
        console.log(`🎯 Adding seal ${sealId} (type: ${typeof sealId}) to completedSeals`);
        this.gameState.completedSeals.push(sealId);
        this.gameState.progress.sealsCompleted = [...this.gameState.completedSeals];

        if (keyword) {
            this.gameState.keywords.push(keyword);
            this.gameState.progress.keywords = [...this.gameState.keywords];
        }

        // 🔥 UNIVERSAL FIX: Update player team score in ALL modes
        if (this.gameState.teams) {
            console.log('🔍 DEBUG: Looking for player team in:', this.gameState.teams);
            console.log('🔍 DEBUG: currentTeam:', this.gameState.currentTeam);
            console.log('🔍 DEBUG: teamName:', this.gameState.teamName);
            
            // Try multiple ways to find the player team
            let playerTeam = this.gameState.teams.find(team => !team.isAI && (team.name === this.gameState.currentTeam || team.name === this.gameState.teamName));
            
            if (!playerTeam) {
                // Fallback: find team that's not AI and matches typical player names
                playerTeam = this.gameState.teams.find(team => !team.isAI);
            }
            
            if (!playerTeam) {
                // Last resort: find team named 'Player'
                playerTeam = this.gameState.teams.find(team => team.name === 'Player');
            }
            
            console.log('🔍 DEBUG: Found player team:', playerTeam);
            
            if (playerTeam) {
                // Ensure completedSeals array exists and is in sync
                if (!playerTeam.completedSeals) {
                    playerTeam.completedSeals = [];
                }
                if (!playerTeam.completedSeals.includes(sealId)) {
                    playerTeam.completedSeals.push(sealId);
                }
                playerTeam.score = playerTeam.completedSeals.length; // Score = seals completed
                console.log('🔥 UNIVERSAL: Updated player team:', {
                    name: playerTeam.name,
                    completedSeals: playerTeam.completedSeals,
                    score: playerTeam.score,
                    mode: this.gameState.mode
                });
                
                // Trigger the HTML leaderboard update
                if (typeof window.updateLeaderboard === 'function') {
                    setTimeout(() => {
                        window.updateLeaderboard();
                        console.log('🔥 UNIVERSAL: Triggered HTML updateLeaderboard()');
                    }, 100);
                }
            } else {
                console.log('🔥 WARNING: Could not find player team in teams array:', this.gameState.teams);
            }
        }

        console.log('✅ Updated gameState.completedSeals to:', this.gameState.completedSeals);

        // 2. Save state to localStorage for persistence
        this.saveProgress();

        // 3. refresh UI
        this.updateProgress();
        this.renderSeals();

        // 3. leaderboard / sync
        if (this.gameState.mode === 'ai') {
            console.log('🏆 Updating AI leaderboard...');
            if (window.LeaderboardManager && window.LeaderboardManager.updateSinglePlayerProgress) {
                window.LeaderboardManager.updateSinglePlayerProgress(this.gameState);
            }
        } else if (this.gameState.mode === 'single') {
            console.log('🚫 Single-player mode: Leaderboard update skipped');
            if (window.LeaderboardManager) {
                window.LeaderboardManager.hideLeaderboard();
            }
        } else if (this.gameState.mode === 'multiplayer' && window.MultiplayerManager.currentTeam) {
            await window.MultiplayerManager.updateTeamProgress(
                this.gameState.gameId,
                window.MultiplayerManager.currentTeam.id,
                this.gameState.progress
            );
        }

        // 4. notifications
        showNotification(`🎉 Seal ${sealId} broken! Keyword: ${keyword}`, 'success');

        // 5. final challenge?
        if (this.gameState.completedSeals.length === 7) {
            this.showFinalChallenge();
        }
    }



    // Update progress bar
    updateProgress() {
        const progress = (this.gameState.completedSeals.length / 7) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('progressText').textContent = 
            `${this.gameState.completedSeals.length}/7 Seals Broken`;
    }

    // Show final challenge - Completion celebration
    showFinalChallenge() {
        console.log('🎉 All 7 seals completed! Showing completion celebration');
        
        // Create completion modal
        this.showCompletionCelebration();
    }

    // Show completion celebration modal
    showCompletionCelebration() {
        const modal = document.createElement('div');
        modal.id = 'completionModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.5s ease-in;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            border: 3px solid #d4af37;
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
            animation: slideIn 0.5s ease-out;
        `;

        const completionTime = Date.now() - this.gameState.startTime;
        // Validate completion time to prevent display issues
        const validCompletionTime = Math.max(0, Math.min(completionTime, 86400000)); // Cap at 24 hours
        const timeString = this.formatTime(validCompletionTime);

        content.innerHTML = `
            <div style="font-size: 4em; margin-bottom: 20px;">🏆</div>
            <h1 style="color: #f4d03f; font-size: 2.5em; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                SCROLL OF SEVEN SEALS
            </h1>
            <h2 style="color: #f4d03f; font-size: 2em; margin-bottom: 30px;">
                MASTERY ACHIEVED!
            </h2>
            <div style="color: #ffffff; font-size: 1.3em; line-height: 1.6; margin-bottom: 30px;">
                <p><strong>🎉 Congratulations!</strong></p>
                <p>You have successfully broken all 7 seals and demonstrated mastery of biblical wisdom!</p>
                <p><strong>⏱️ Completion Time:</strong> ${timeString}</p>
                <p><strong>🗝️ Keywords Collected:</strong> ${this.gameState.keywords.length}</p>
            </div>
            <div style="background: rgba(212, 175, 55, 0.1); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                <h3 style="color: #d4af37; margin-bottom: 15px;">🗝️ Your Keywords:</h3>
                <p style="color: #f4f1e8; font-size: 1.1em; font-weight: bold;">${this.gameState.keywords.join(' • ')}</p>
            </div>
            <div style="color: #b8a082; font-style: italic; margin-bottom: 30px;">
                "Well done, good and faithful servant!" - Matthew 25:23
            </div>
            <button id="returnToSealsBtn" style="
                background: linear-gradient(135deg, #d4af37, #f4d03f);
                border: none;
                color: #1a1a1a;
                font-size: 1.2em;
                font-weight: bold;
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(212, 175, 55, 0.4)'"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 10px rgba(212, 175, 55, 0.3)'">
                🏠 Return to Seals
            </button>
        `;

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px) scale(0.9); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideInRight {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Add click handler for return button
        document.getElementById('returnToSealsBtn').addEventListener('click', () => {
            this.hideCompletionModal();
            this.returnToSealsAfterCompletion();
        });

        // Auto-return after 10 seconds
        setTimeout(() => {
            if (document.getElementById('completionModal')) {
                this.hideCompletionModal();
                this.returnToSealsAfterCompletion();
            }
        }, 10000);
    }

    // Hide completion modal
    hideCompletionModal() {
        const modal = document.getElementById('completionModal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // Return to seals after completion
    returnToSealsAfterCompletion() {
        console.log('🔄 Returning to seals after completion');
        
        // Close any open puzzle modal
        const puzzleModal = document.getElementById('puzzleModal');
        if (puzzleModal) {
            puzzleModal.style.display = 'none';
        }

        // Show the game screen
        this.showGameScreen();
        
        // Render seals to show completion badges
        this.renderSeals();
        
        // Show a brief success message
        setTimeout(() => {
            this.showBriefSuccessMessage();
        }, 500);
    }

    // Show brief success message
    showBriefSuccessMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #228b22, #32cd32);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(34, 139, 34, 0.3);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        message.textContent = '🎉 All seals mastered! Well done!';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Format time helper
    formatTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Check final answer
    async checkFinalAnswer() {
        const answer = document.getElementById('finalAnswer').value.toUpperCase().trim();
        
        const keywordString = this.gameState.keywords.join(' ');
        const possibleAnswers = [
            "THE KINGDOM IS WITHIN YOU",
            "GOD IS LOVE AND TRUTH", 
            "FAITH HOPE AND LOVE",
            keywordString,
            "JESUS IS LORD",
            "ETERNAL LIFE"
        ];
        
        const isCorrect = possibleAnswers.some(possible => answer === possible.toUpperCase());
        
        if (isCorrect) {
            const completionTime = Date.now() - this.gameState.startTime;
            this.gameState.progress.completionTime = completionTime;
            
            // Update final progress
            if (this.gameState.mode === 'multiplayer') {
                await window.MultiplayerManager.updateTeamProgress(
                    this.gameState.gameId,
                    window.MultiplayerManager.currentTeam.id,
                    this.gameState.progress
                );
            }
            
            this.showVictory(answer, completionTime);
        } else {
            showNotification('Not quite right. Use the collected keywords to find the hidden message in Scripture.', 'error');
        }
    }

    // Show victory screen
    showVictory(answer, completionTime) {
        const minutes = Math.round(completionTime / 1000 / 60);
        
        document.getElementById('hiddenWordResult').innerHTML = `
            <div style="color: #228b22;">
                🎉 VICTORY! 🎉<br>
                "${answer}"<br>
                <small>Completed in ${minutes} minutes</small><br>
                <small>Hints used: ${window.PuzzleManager.getHintsUsed()}</small><br>
                <small>Game ID: ${this.gameState.gameId}</small>
            </div>
        `;
        
        this.stopGameTimer();
        this.gameState.isGameActive = false;
        
        showNotification('🏆 Congratulations! You have unlocked all seven seals!', 'success');
    }

    // Start game timer
    startGameTimer() {
        this.gameTimer = setInterval(() => {
            this.updateGameTimer();
        }, 1000);
    }

    // Update game timer display
    updateGameTimer() {
        if (!this.gameState.startTime) return;
        
        const elapsed = Date.now() - this.gameState.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        const timerDisplay = document.getElementById('gameTimer');
        if (timerDisplay) {
            timerDisplay.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // Pause timer
    pauseTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    // Resume timer  
    resumeTimer() {
        if (!this.gameTimer && this.gameState.isGameActive) {
            this.startGameTimer();
        }
    }

    // Stop game timer
    stopGameTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    // Save progress to localStorage
    saveProgress() {
        try {
            localStorage.setItem('scrollGameProgress', JSON.stringify(this.gameState));
            console.log('💾 Progress saved to localStorage');
        } catch (error) {
            console.error('❌ Error saving progress:', error);
        }
    }

    // Clear saved progress from localStorage
    clearSavedProgress() {
        try {
            localStorage.removeItem('scrollGameProgress');
            console.log('🗑️ Cleared saved progress from localStorage');
        } catch (error) {
            console.error('❌ Error clearing saved progress:', error);
        }
    }

    // Auto-save progress
    autoSaveProgress() {
        if (this.gameState.isGameActive && this.gameState.mode === 'single') {
            this.saveProgress();
        }
    }

    // Load saved progress
    loadSavedProgress() {
        try {
            const saved = localStorage.getItem('scrollGameProgress');
            if (saved) {
                const savedState = JSON.parse(saved);
                // Only load if there's an active game in single player mode
                if (savedState.mode === 'single' && savedState.isGameActive && savedState.startTime) {
                    console.log('📁 Loading saved progress:', {
                        seals: savedState.completedSeals.length,
                        keywords: savedState.keywords.length
                    });
                    return savedState;
                } else {
                    console.log('📁 Found saved data but not loading (inactive or no start time)');
                }
            }
        } catch (error) {
            console.error('Error loading saved progress:', error);
        }
        return null;
    }

    // New game
    newGame() {
        if (confirm('Start a new game? This will reset all progress.')) {
            this.resetGame();
            this.showMainMenu();
        }
    }

    // Reset game state
    resetGame() {
        this.stopGameTimer();
        window.LeaderboardManager.cleanup();
        window.PuzzleManager.clearPuzzles();
        
        if (this.gameState.mode === 'multiplayer') {
            window.MultiplayerManager.leaveGame();
        }
        
        // Clear saved progress
        localStorage.removeItem('scrollGameProgress');
        
        // Reset state
        this.gameState = {
            mode: null,
            teamName: '',
            teamSize: 3,
            completedSeals: [],
            keywords: [],
            startTime: null,
            currentSeal: null,
            gameId: null,
            isGameActive: false,
            progress: {
                sealsCompleted: [],
                keywords: [],
                currentSeal: null,
                startTime: null,
                completionTime: null,
                hintsUsed: 0
            }
        };
        
        // Reset UI
        document.getElementById('finalChallenge').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'none';
    }

    // Copy room code to clipboard
    copyRoomCode() {
        const roomCode = document.getElementById('displayRoomCode').textContent;
        navigator.clipboard.writeText(roomCode).then(() => {
            showNotification('Room code copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy room code', 'error');
        });
    }

    // Leave lobby
    async leaveLobby() {
        if (confirm('Are you sure you want to leave the lobby?')) {
            await window.MultiplayerManager.leaveGame();
            this.showMultiPlayerSetup();
        }
    }

    // Admin controls
    async pauseGame() {
        await window.MultiplayerManager.pauseGame(this.gameState.gameId);
    }

    async resumeGame() {
        await window.MultiplayerManager.resumeGame(this.gameState.gameId);
    }

    async endGame() {
        if (confirm('Are you sure you want to end the game for all teams?')) {
            await window.MultiplayerManager.endGame(this.gameState.gameId);
        }
    }

    async resetGame() {
        if (confirm('Reset the entire game? This will clear all progress for all teams.')) {
            // Implementation for game reset
            showNotification('Game reset', 'success');
        }
    }

    // Toggle leaderboard visibility
    toggleLeaderboard() {
        window.LeaderboardManager.toggleLeaderboard();
    }

    // Show different leaderboard timeframes
    showGlobalLeaderboard() {
        this.updateLeaderboardTabs('global');
        window.LeaderboardManager.loadGlobalLeaderboard('all');
    }

    showWeeklyLeaderboard() {
        this.updateLeaderboardTabs('weekly');
        window.LeaderboardManager.loadGlobalLeaderboard('week');
    }

    showDailyLeaderboard() {
        this.updateLeaderboardTabs('daily');
        window.LeaderboardManager.loadGlobalLeaderboard('today');
    }

    // Update leaderboard tab styling
    updateLeaderboardTabs(active) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const tabMap = {
            'global': 0,
            'weekly': 1,
            'daily': 2
        };
        
        const tabs = document.querySelectorAll('.tab-btn');
        if (tabs[tabMap[active]]) {
            tabs[tabMap[active]].classList.add('active');
        }
    }

    // Cleanup when page unloads
    cleanup() {
        this.stopGameTimer();
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        window.LeaderboardManager.cleanup();
        window.MultiplayerManager.cleanup();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameController = new GameController();
    
    // Make functions globally available for onclick handlers
    window.showMainMenu = () => window.gameController.showMainMenu();
    window.showSinglePlayerSetup = () => window.gameController.showSinglePlayerSetup();
    window.showMultiPlayerSetup = () => window.gameController.showMultiPlayerSetup();
    window.showCreateGame = () => window.gameController.showCreateGame();
    window.showLeaderboard = () => window.gameController.showLeaderboard();
    window.resumeGame = () => window.gameController.resumeGame();
    
    // CRITICAL: Create hybrid renderSeals that preserves HTML functionality but uses correct state
    const originalRenderSeals = window.renderSeals;
    window.renderSeals = () => {
        console.log('🎯 Hybrid renderSeals called');
        
        // If GameController is available and we have a sealsGrid, use GameController for the grid
        if (window.gameController && document.getElementById('sealsGrid')) {
            console.log('🎯 Using GameController.renderSeals for seal grid');
            return window.gameController.renderSeals();
        } 
        // Otherwise, fall back to original HTML version but sync the state first
        else if (originalRenderSeals) {
            console.log('🎯 Using original renderSeals with synced state');
            // Sync global gameState with GameController state if available
            if (window.gameController && window.gameController.gameState) {
                const controllerState = window.gameController.gameState;
                if (window.gameState) {
                    window.gameState.completedSeals = [...controllerState.completedSeals];
                    window.gameState.mode = controllerState.mode;
                    window.gameState.teamName = controllerState.teamName;
                    console.log('🔄 Synced global gameState with controller state');
                }
            }
            return originalRenderSeals();
        } else {
            console.error('❌ No renderSeals function available');
        }
    };
    
    window.startSinglePlayerGame = () => window.gameController.startSinglePlayerGame();
    window.createNewGame = () => window.gameController.createNewGame();
    window.joinGame = () => window.gameController.joinGame();
    window.confirmJoinGame = (roomCode) => window.gameController.confirmJoinGame(roomCode);
    window.closeJoinGameModal = () => window.gameController.closeJoinGameModal();
    
    window.startMultiplayerGame = () => window.gameController.startMultiplayerGame();
    window.copyRoomCode = () => window.gameController.copyRoomCode();
    window.leaveLobby = () => window.gameController.leaveLobby();
    
    window.openSeal = (sealId) => window.gameController.openSeal(sealId);
    window.closePuzzle = () => window.gameController.closePuzzle();
    window.completeSeal = (sealId) => {
    console.log('🚀 GAME.JS completeSeal called with sealId:', sealId);
    console.log('🔍 gameController exists:', !!window.gameController);
    console.log('🔍 GameController exists:', !!window.GameController);
    
    if (!window.gameController && !window.GameController) {
        console.error('❌ Neither gameController nor GameController available!');
        return;
    }
    
    // Try both controller references
    const controller = window.gameController || window.GameController;
    if (controller && controller.completeSeal) {
        console.log('✅ Calling controller.completeSeal...');
        return controller.completeSeal(sealId);
    } else {
        console.error('❌ Controller has no completeSeal method!');
    }
};
    window.checkFinalAnswer = () => window.gameController.checkFinalAnswer();
    window.newGame = () => window.gameController.newGame();
    
    // 🔥 DEBUG FUNCTION - Manual seal completion for testing
    window.debugCompleteSeal = (sealId) => {
        console.log('🔥 DEBUG: Manually completing seal', sealId);
        const controller = window.gameController || window.GameController;
        if (controller) {
            console.log('🔥 DEBUG: Current gameState.completedSeals before:', controller.gameState.completedSeals);
            controller.gameState.completedSeals.push(sealId);
            console.log('🔥 DEBUG: Current gameState.completedSeals after:', controller.gameState.completedSeals);
            
            // Update AI mode player team
            if (controller.gameState.mode === 'ai' && controller.gameState.teams) {
                const playerTeam = controller.gameState.teams.find(team => !team.isAI);
                if (playerTeam) {
                    playerTeam.completedSeals.push(sealId);
                    playerTeam.score = playerTeam.completedSeals.length;
                    console.log('🔥 DEBUG: Updated player team:', playerTeam);
                }
            }
            
            // Force updates
            controller.updateProgress();
            controller.renderSeals();
            if (typeof window.updateLeaderboard === 'function') {
                window.updateLeaderboard();
            }
        }
    };
    
    // 🔥 DEBUG FUNCTION - Check teams array
    window.debugTeams = () => {
        const controller = window.gameController || window.GameController;
        if (controller && controller.gameState.teams) {
            console.log('🔥 DEBUG TEAMS:');
            controller.gameState.teams.forEach((team, index) => {
                console.log(`Team ${index}:`, {
                    name: team.name,
                    score: team.score,
                    completedSeals: team.completedSeals,
                    isAI: team.isAI
                });
            });
        } else {
            console.log('🔥 DEBUG: No teams found');
        }
    };
    
    window.toggleLeaderboard = () => window.gameController.toggleLeaderboard();
    window.showGlobalLeaderboard = () => window.gameController.showGlobalLeaderboard();
    window.showWeeklyLeaderboard = () => window.gameController.showWeeklyLeaderboard();
    window.showDailyLeaderboard = () => window.gameController.showDailyLeaderboard();
    
    // Admin functions
    window.pauseGame = () => window.gameController.pauseGame();
    window.resumeGame = () => window.gameController.resumeGame();
    window.endGame = () => window.gameController.endGame();
    window.resetGame = () => window.gameController.resetGame();
    
    // Puzzle functions (will be implemented in puzzles.js)
    window.showHint = (puzzleType) => window.PuzzleManager.showHint(puzzleType);
    window.resetPuzzle = (puzzleType) => window.PuzzleManager.resetPuzzle(puzzleType);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.gameController) {
        window.gameController.cleanup();
    }
});

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, window.GameData.GAME_CONSTANTS.NOTIFICATION_DURATION);
}

// Export notification function
window.showNotification = showNotification;
