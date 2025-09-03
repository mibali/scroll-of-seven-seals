/**
 * Unified Game Engine - Core Architecture for Scroll of Seven Seals
 * Handles state management, progression, and content generation across all modes
 */

// Observable GameState - Single source of truth
class UnifiedGameState {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.listeners = [];
        this.state = this.getInitialState();
        
        console.log('🎮 UnifiedGameState initialized with sessionId:', this.sessionId);
    }

    generateSessionId() {
        return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    getInitialState() {
        return {
            // Core game data
            sessionId: this.sessionId,
            mode: null, // 'single', 'ai', 'multiplayer'
            gameId: null,
            teamName: '',
            teamSize: 3,
            startTime: null,
            isGameActive: false,
            
            // Progression tracking
            currentSeal: null,
            completedSeals: [],
            keywords: [],
            availableSeals: [1], // Start with only seal 1 available
            
            // Teams (for AI and multiplayer modes)
            teams: [],
            currentTeam: null,
            
            // Content generation
            contentSeed: null,
            sealVariations: {}, // Per-session seal content variations
            
            // Progress tracking
            progress: {
                sealsCompleted: [],
                keywords: [],
                hintsUsed: 0,
                startTime: null,
                completionTime: null,
                perfectSeals: [] // Seals completed without hints
            },
            
            // Multiplayer specific
            roomCode: null,
            isHost: false,
            gameStatus: 'lobby' // 'lobby', 'playing', 'completed', 'paused'
        };
    }

    // Observable pattern - subscribe to state changes
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Update state and notify listeners
    patch(updates) {
        const previousState = { ...this.state };
        this.state = { ...this.state, ...updates };
        
        // Trigger progression updates if seals completed
        if (updates.completedSeals && updates.completedSeals !== previousState.completedSeals) {
            this.updateAvailableSeals();
        }
        
        this.notifyListeners(previousState);
    }

    // Get current state (read-only)
    getState() {
        return { ...this.state };
    }

    // Reset to initial state for new game
    reset() {
        const newState = this.getInitialState();
        this.sessionId = newState.sessionId;
        this.state = newState;
        this.notifyListeners({});
    }

    // Update available seals based on progression
    updateAvailableSeals() {
        const availableSeals = [1]; // Seal 1 is always available
        
        // Check which seals are unlocked based on completed seals
        window.GameData.seals.forEach(seal => {
            const hasRequiredSeals = seal.requiredSeals.every(required => 
                this.state.completedSeals.includes(required)
            );
            
            if (hasRequiredSeals && !availableSeals.includes(seal.id)) {
                availableSeals.push(seal.id);
            }
        });

        this.state.availableSeals = availableSeals.sort((a, b) => a - b);
    }

    notifyListeners(previousState) {
        this.listeners.forEach(listener => {
            try {
                listener(this.state, previousState);
            } catch (error) {
                console.error('Error in state listener:', error);
            }
        });
    }
}

// Seal Engine - Manages seal progression and validation
class SealEngine {
    constructor(gameState) {
        this.gameState = gameState;
        this.sealData = window.GameData.seals;
        
        console.log('🔐 SealEngine initialized');
    }

    // Check if a seal can be opened
    canOpenSeal(sealId) {
        const seal = this.getSeal(sealId);
        if (!seal) return false;

        // Check if all required seals are completed
        const hasRequiredSeals = seal.requiredSeals.every(required => 
            this.gameState.getState().completedSeals.includes(required)
        );

        return hasRequiredSeals;
    }

    // Get seal information
    getSeal(sealId) {
        return this.sealData.find(seal => seal.id === sealId);
    }

    // Open a seal (if allowed)
    openSeal(sealId) {
        if (!this.canOpenSeal(sealId)) {
            const seal = this.getSeal(sealId);
            const missingSeals = seal.requiredSeals.filter(required => 
                !this.gameState.getState().completedSeals.includes(required)
            );
            
            throw new Error(`Seal ${sealId} is locked. Complete seals ${missingSeals.join(', ')} first.`);
        }

        this.gameState.patch({ currentSeal: sealId });
        return this.getSeal(sealId);
    }

    // Complete a seal
    completeSeal(sealId, keyword) {
        const state = this.gameState.getState();
        
        if (state.completedSeals.includes(sealId)) {
            console.log(`Seal ${sealId} already completed`);
            return;
        }

        const newCompletedSeals = [...state.completedSeals, sealId];
        const newKeywords = [...state.keywords, keyword];

        this.gameState.patch({
            completedSeals: newCompletedSeals,
            keywords: newKeywords,
            currentSeal: null
        });

        // Check if all seals completed
        if (newCompletedSeals.length === this.sealData.length) {
            this.gameState.patch({ gameStatus: 'completed' });
        }

        console.log(`✅ Seal ${sealId} completed with keyword: ${keyword}`);
        return true;
    }

    // Get seals view model for UI
    getSealsViewModel() {
        const state = this.gameState.getState();
        
        return this.sealData.map(seal => ({
            ...seal,
            status: this.getSealStatus(seal.id, state),
            canOpen: this.canOpenSeal(seal.id),
            isActive: state.currentSeal === seal.id
        }));
    }

    getSealStatus(sealId, state) {
        if (state.completedSeals.includes(sealId)) {
            return 'completed';
        } else if (state.availableSeals.includes(sealId)) {
            return 'available';
        } else {
            return 'locked';
        }
    }
}

// Content Generator - Handles dynamic Bible content generation
class BibleContentEngine {
    constructor(gameState) {
        this.gameState = gameState;
        this.contentCache = {}; // Session-based cache
        
        console.log('📖 BibleContentEngine initialized');
    }

    // Generate fresh content for a seal
    async generateSealContent(sealId, puzzleType) {
        const state = this.gameState.getState();
        const cacheKey = `${state.sessionId}_${sealId}_${puzzleType}`;
        
        // Check if content already generated for this session
        if (this.contentCache[cacheKey]) {
            console.log(`🔄 Using cached content for ${puzzleType} - Seal ${sealId}`);
            return this.contentCache[cacheKey];
        }

        // Try AI generation first if available
        if (window.BibleGameAI && state.complexity?.level) {
            try {
                const aiContent = await this.generateAIContent(sealId, puzzleType);
                if (aiContent) {
                    this.contentCache[cacheKey] = aiContent;
                    console.log(`🤖 Generated fresh AI content for ${puzzleType} - Seal ${sealId}`);
                    return aiContent;
                }
            } catch (error) {
                console.warn('AI content generation failed, falling back to variations:', error);
            }
        }

        // Fallback to randomized variations
        const variation = this.selectVariation(puzzleType, state.sessionId + sealId);
        this.contentCache[cacheKey] = variation;
        
        console.log(`🎲 Generated variation content for ${puzzleType} - Seal ${sealId}`);
        return variation;
    }

    // Select a pseudorandom variation based on session + seal
    selectVariation(puzzleType, seed) {
        const variations = window.GameData.puzzleVariations[puzzleType];
        if (!variations || variations.length === 0) {
            return null;
        }

        // Use seed to deterministically select variation
        const hash = this.simpleHash(seed);
        const index = Math.abs(hash) % variations.length;
        
        return variations[index];
    }

    // Simple hash function for deterministic randomness
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }

    // Generate AI content (placeholder for future implementation)
    async generateAIContent(sealId, puzzleType) {
        // This would call the actual AI service
        // For now, return null to use fallback
        return null;
    }

    // Clear content cache (for new game)
    clearCache() {
        this.contentCache = {};
    }
}

// Game Mode Strategy Interface
class GameModeStrategy {
    constructor(gameState, sealEngine) {
        this.gameState = gameState;
        this.sealEngine = sealEngine;
    }

    async initialize() {
        throw new Error('initialize() must be implemented by subclass');
    }

    async startGame() {
        throw new Error('startGame() must be implemented by subclass');
    }

    async onSealCompleted(sealId, keyword) {
        throw new Error('onSealCompleted() must be implemented by subclass');
    }

    async updateProgress() {
        throw new Error('updateProgress() must be implemented by subclass');
    }

    cleanup() {
        // Default cleanup - can be overridden
    }
}

// Single Player Strategy
class SinglePlayerStrategy extends GameModeStrategy {
    constructor(gameState, sealEngine) {
        super(gameState, sealEngine);
        this.mode = 'single';
    }

    async initialize(teamName = 'Solo Player') {
        this.gameState.patch({
            mode: this.mode,
            teamName,
            teamSize: 1,
            teams: [{ 
                name: teamName, 
                score: 0, 
                completedSeals: [], 
                isAI: false,
                isCurrentTeam: true 
            }],
            gameStatus: 'playing'
        });

        console.log(`🎮 Single Player mode initialized: ${teamName}`);
    }

    async startGame() {
        const startTime = Date.now();
        this.gameState.patch({
            startTime,
            isGameActive: true,
            progress: {
                ...this.gameState.getState().progress,
                startTime
            }
        });

        console.log('🚀 Single Player game started');
    }

    async onSealCompleted(sealId, keyword) {
        // Update team progress
        const state = this.gameState.getState();
        const updatedTeams = state.teams.map(team => {
            if (!team.isAI) {
                return {
                    ...team,
                    completedSeals: [...team.completedSeals, sealId],
                    score: team.completedSeals.length + 1
                };
            }
            return team;
        });

        this.gameState.patch({ teams: updatedTeams });
        
        // Save progress to localStorage
        this.saveProgress();
    }

    async updateProgress() {
        // Update leaderboard if available
        if (window.LeaderboardManager) {
            window.LeaderboardManager.updateSinglePlayerProgress(this.gameState.getState());
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('scrollGameProgress', JSON.stringify(this.gameState.getState()));
            console.log('💾 Single player progress saved');
        } catch (error) {
            console.error('❌ Error saving progress:', error);
        }
    }
}

// AI vs Computer Strategy
class AIArenaStrategy extends GameModeStrategy {
    constructor(gameState, sealEngine) {
        super(gameState, sealEngine);
        this.mode = 'ai';
        this.aiUpdateInterval = null;
    }

    async initialize(teamName = 'Player Team') {
        // Create player team and AI competitors
        const teams = [
            { name: teamName, score: 0, completedSeals: [], isAI: false, isCurrentTeam: true },
            { name: 'Scripture Scholars 📚', score: 0, completedSeals: [], isAI: true },
            { name: 'Holy Hunters 🗡️', score: 1, completedSeals: [1], isAI: true },
            { name: 'Gospel Guardians 🛡️', score: 0, completedSeals: [], isAI: true }
        ];

        this.gameState.patch({
            mode: this.mode,
            teamName,
            teamSize: 3,
            teams,
            gameStatus: 'playing'
        });

        console.log(`🤖 AI Arena mode initialized: ${teamName} vs AI competitors`);
    }

    async startGame() {
        const startTime = Date.now();
        this.gameState.patch({
            startTime,
            isGameActive: true,
            progress: {
                ...this.gameState.getState().progress,
                startTime
            }
        });

        // Start AI simulation
        this.startAISimulation();
        console.log('🚀 AI Arena game started with competition');
    }

    startAISimulation() {
        // Simulate AI team progress
        this.aiUpdateInterval = setInterval(() => {
            this.simulateAIProgress();
        }, 45000); // AI teams progress every 45 seconds
    }

    simulateAIProgress() {
        const state = this.gameState.getState();
        if (!state.isGameActive) return;

        const updatedTeams = state.teams.map(team => {
            if (team.isAI && Math.random() < 0.3) { // 30% chance AI completes a seal
                const availableSeals = [1, 2, 3, 4, 5, 6, 7].filter(sealId => 
                    !team.completedSeals.includes(sealId) && 
                    this.sealEngine.canOpenSeal(sealId)
                );
                
                if (availableSeals.length > 0) {
                    const newSeal = availableSeals[0]; // AI takes next available seal
                    return {
                        ...team,
                        completedSeals: [...team.completedSeals, newSeal],
                        score: team.completedSeals.length + 1
                    };
                }
            }
            return team;
        });

        this.gameState.patch({ teams: updatedTeams });
    }

    async onSealCompleted(sealId, keyword) {
        const state = this.gameState.getState();
        const updatedTeams = state.teams.map(team => {
            if (!team.isAI && team.isCurrentTeam) {
                return {
                    ...team,
                    completedSeals: [...team.completedSeals, sealId],
                    score: team.completedSeals.length + 1
                };
            }
            return team;
        });

        this.gameState.patch({ teams: updatedTeams });
        this.saveProgress();
    }

    async updateProgress() {
        if (window.LeaderboardManager) {
            window.LeaderboardManager.updateSinglePlayerProgress(this.gameState.getState());
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('scrollGameProgress', JSON.stringify(this.gameState.getState()));
            console.log('💾 AI Arena progress saved');
        } catch (error) {
            console.error('❌ Error saving progress:', error);
        }
    }

    cleanup() {
        if (this.aiUpdateInterval) {
            clearInterval(this.aiUpdateInterval);
            this.aiUpdateInterval = null;
        }
    }
}

// Firebase Multiplayer Strategy
class MultiplayerStrategy extends GameModeStrategy {
    constructor(gameState, sealEngine) {
        super(gameState, sealEngine);
        this.mode = 'multiplayer';
        this.firebaseListeners = [];
    }

    async initialize() {
        this.gameState.patch({
            mode: this.mode,
            gameStatus: 'lobby'
        });

        console.log('🌐 Multiplayer mode initialized');
    }

    async startGame() {
        // Firebase multiplayer logic will be handled by existing MultiplayerManager
        const startTime = Date.now();
        this.gameState.patch({
            startTime,
            isGameActive: true,
            gameStatus: 'playing',
            progress: {
                ...this.gameState.getState().progress,
                startTime
            }
        });

        console.log('🚀 Multiplayer game started');
    }

    async onSealCompleted(sealId, keyword) {
        // Sync with Firebase
        if (window.MultiplayerManager) {
            await window.MultiplayerManager.updateTeamProgress(
                this.gameState.getState().gameId,
                window.MultiplayerManager.currentTeam?.id,
                {
                    sealsCompleted: [...this.gameState.getState().completedSeals, sealId],
                    keywords: [...this.gameState.getState().keywords, keyword]
                }
            );
        }
    }

    async updateProgress() {
        // Firebase sync handled by MultiplayerManager
    }

    cleanup() {
        // Clean up Firebase listeners
        this.firebaseListeners.forEach(unsubscribe => unsubscribe());
        this.firebaseListeners = [];
    }
}

// Main Unified Game Controller
class UnifiedGameController {
    constructor() {
        this.gameState = new UnifiedGameState();
        this.sealEngine = new SealEngine(this.gameState);
        this.contentEngine = new BibleContentEngine(this.gameState);
        this.currentStrategy = null;
        this.timer = null;
        
        // Subscribe to state changes for UI updates
        this.gameState.subscribe((state, previousState) => {
            this.onStateChange(state, previousState);
        });

        console.log('🎮 UnifiedGameController initialized');
        
        // Expose globally for compatibility
        window.UnifiedGameController = this;
        window.unifiedGameController = this;
    }

    // State change handler
    onStateChange(state, previousState) {
        // Update UI elements
        this.updateUI(state, previousState);
        
        // Auto-save for single player mode
        if (state.mode === 'single' && state.isGameActive) {
            this.autoSave();
        }
    }

    // Initialize a specific game mode
    async initializeMode(mode, options = {}) {
        // Clean up previous mode
        if (this.currentStrategy) {
            this.currentStrategy.cleanup();
        }

        // Create new strategy
        switch (mode) {
            case 'single':
                this.currentStrategy = new SinglePlayerStrategy(this.gameState, this.sealEngine);
                break;
            case 'ai':
                this.currentStrategy = new AIArenaStrategy(this.gameState, this.sealEngine);
                break;
            case 'multiplayer':
                this.currentStrategy = new MultiplayerStrategy(this.gameState, this.sealEngine);
                break;
            default:
                throw new Error(`Unknown game mode: ${mode}`);
        }

        await this.currentStrategy.initialize(options.teamName);
        console.log(`🎮 Game mode ${mode} initialized`);
    }

    // Start the game
    async startGame() {
        if (!this.currentStrategy) {
            throw new Error('No game mode initialized');
        }

        await this.currentStrategy.startGame();
        this.startTimer();
    }

    // Open a seal
    async openSeal(sealId) {
        try {
            const seal = this.sealEngine.openSeal(sealId);
            
            // Generate fresh content for this seal
            const content = await this.contentEngine.generateSealContent(sealId, seal.puzzle);
            
            // Show puzzle modal (existing UI logic)
            this.showPuzzleModal(seal, content);
            
            return seal;
        } catch (error) {
            console.error('Error opening seal:', error);
            if (window.showNotification) {
                window.showNotification(error.message, 'error');
            }
            throw error;
        }
    }

    // Complete a seal
    async completeSeal(sealId, keyword) {
        try {
            this.sealEngine.completeSeal(sealId, keyword);
            
            if (this.currentStrategy) {
                await this.currentStrategy.onSealCompleted(sealId, keyword);
                await this.currentStrategy.updateProgress();
            }

            console.log(`✅ Seal ${sealId} completed with keyword: ${keyword}`);
            return true;
        } catch (error) {
            console.error('Error completing seal:', error);
            throw error;
        }
    }

    // Show puzzle modal (integrate with existing UI)
    showPuzzleModal(seal, content) {
        // This integrates with the existing puzzle modal system
        const modal = document.getElementById('puzzleModal');
        const puzzleContent = document.getElementById('puzzleContent');
        
        if (modal && puzzleContent) {
            // Set modal content
            puzzleContent.innerHTML = content;
            modal.style.display = 'flex';
            
            // Add full-screen class if needed
            if (this.gameState.getState().fullScreen) {
                modal.classList.add('full-screen');
            }
        }
    }

    // Update UI based on state changes
    updateUI(state, previousState) {
        // Update seal grid
        this.renderSeals();
        
        // Update team/score display
        this.updateScoreDisplay();
        
        // Update timer
        this.updateTimerDisplay();
        
        // Update leaderboard
        if (window.LeaderboardManager && typeof window.LeaderboardManager.refresh === 'function') {
            window.LeaderboardManager.refresh();
        } else if (window.LeaderboardManager) {
            console.log('⚠️ LeaderboardManager exists but refresh method not available');
        }
    }

    // Render seals with unified state
    renderSeals() {
        const sealsGrid = document.getElementById('sealsGrid');
        if (!sealsGrid) {
            console.warn('🎯 sealsGrid element not found - game screen may not be visible');
            return;
        }

        const sealsData = this.sealEngine.getSealsViewModel();
        console.log('🎯 Rendering seals data:', sealsData.map(s => ({id: s.id, status: s.status, canOpen: s.canOpen})));

        // Clear existing content first
        sealsGrid.innerHTML = '';
        
        // Use DOM creation like the original to maintain compatibility
        sealsData.forEach(seal => {
            const sealElement = document.createElement('div');
            const isCompleted = seal.status === 'completed';
            
            sealElement.className = `seal ${isCompleted ? 'opened' : ''}`;
            sealElement.setAttribute('data-challenge-type', seal.challengeType || 'Biblical Challenge');
            sealElement.setAttribute('data-seal-id', seal.id);
            
            if (seal.canOpen) {
                sealElement.onclick = () => window.unifiedGameController.openSeal(seal.id);
            }

            const completedBadgeHtml = isCompleted ? '<div class="completed-badge">✅ Completed</div>' : '';
            
            sealElement.innerHTML = `
                <div class="seal-number">${seal.id}</div>
                <div class="seal-title">${seal.title}</div>
                <div class="seal-theme">${seal.theme}</div>
                <div class="challenge-type-indicator">${seal.challengeType || 'Biblical Challenge'}</div>
                ${completedBadgeHtml}
            `;

            sealsGrid.appendChild(sealElement);
        });
    }

    // Update score/team display
    updateScoreDisplay() {
        const state = this.gameState.getState();
        
        // Update team display
        const teamNameElement = document.getElementById('teamName');
        if (teamNameElement) {
            teamNameElement.textContent = state.teamName || 'Unknown Team';
        }

        // Update score
        const scoreElement = document.getElementById('currentScore');
        if (scoreElement) {
            scoreElement.textContent = state.completedSeals.length;
        }

        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const progress = (state.completedSeals.length / 7) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // Timer management
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);
    }

    updateTimerDisplay() {
        const state = this.gameState.getState();
        if (!state.startTime) return;

        const elapsed = Date.now() - state.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    // Full-screen support
    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                this.gameState.patch({ fullScreen: true });
                document.body.classList.add('full-screen-mode');
            });
        } else {
            document.exitFullscreen().then(() => {
                this.gameState.patch({ fullScreen: false });
                document.body.classList.remove('full-screen-mode');
            });
        }
    }

    // Auto-save functionality
    autoSave() {
        if (this.currentStrategy && this.currentStrategy.saveProgress) {
            this.currentStrategy.saveProgress();
        }
    }

    // New game
    newGame() {
        if (confirm('Start a new game? This will reset all progress.')) {
            this.reset();
        }
    }

    // Reset game
    reset() {
        this.stopTimer();
        
        if (this.currentStrategy) {
            this.currentStrategy.cleanup();
            this.currentStrategy = null;
        }

        this.contentEngine.clearCache();
        this.gameState.reset();
        
        // Clear localStorage
        localStorage.removeItem('scrollGameProgress');
        
        console.log('🔄 Game reset completed');
    }

    // Load saved game
    loadSavedGame() {
        try {
            const saved = localStorage.getItem('scrollGameProgress');
            if (saved) {
                const savedState = JSON.parse(saved);
                
                // Restore state
                this.gameState.patch(savedState);
                
                // Restore appropriate strategy
                if (savedState.mode) {
                    this.initializeMode(savedState.mode, { teamName: savedState.teamName });
                    
                    if (savedState.isGameActive) {
                        this.startTimer();
                    }
                }
                
                console.log('📁 Saved game loaded successfully');
                return true;
            }
        } catch (error) {
            console.error('Error loading saved game:', error);
        }
        return false;
    }

    // Cleanup
    cleanup() {
        this.stopTimer();
        if (this.currentStrategy) {
            this.currentStrategy.cleanup();
        }
        this.gameState.listeners = [];
    }
}

// Export for global access
window.UnifiedGameController = UnifiedGameController;
window.UnifiedGameState = UnifiedGameState;
window.SealEngine = SealEngine;
window.BibleContentEngine = BibleContentEngine;

console.log('🎮 Unified Game Engine loaded successfully');
