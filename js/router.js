// Simple Router for Screen Navigation
// Handles proper page separation and state management

const Router = (() => {
    const screens = {};
    let currentScreen = null;
    
    // Register a screen element
    function register(screenId) {
        const element = document.getElementById(screenId);
        if (element) {
            screens[screenId] = element;
            console.log(`📱 Registered screen: ${screenId}`);
        } else {
            console.warn(`⚠️ Screen element not found: ${screenId}`);
        }
    }
    
    // Navigate to a screen
    function navigateTo(screenId, pushHistory = true) {
        if (currentScreen === screenId) {
            console.log(`📱 Already on screen: ${screenId}`);
            return;
        }
        
        if (!screens[screenId]) {
            console.error(`❌ Unknown screen: ${screenId}`);
            return;
        }
        
        console.log(`📱 Navigating from ${currentScreen} to ${screenId}`);
        
        // Hide all screens
        Object.values(screens).forEach(element => {
            element.classList.remove('active');
            element.classList.add('screen');
        });
        
        // Show target screen
        screens[screenId].classList.add('active');
        currentScreen = screenId;
        
        // Update browser history
        if (pushHistory && screenId !== 'homeScreen') {
            history.pushState({ screen: screenId }, '', `#${screenId}`);
        }
        
        // Trigger screen change event
        window.dispatchEvent(new CustomEvent('router:navigate', {
            detail: { 
                from: currentScreen,
                to: screenId 
            }
        }));
        
        console.log(`✅ Navigated to screen: ${screenId}`);
    }
    
    // Handle browser back/forward
    function handlePopState(event) {
        const screenId = event.state?.screen || 'homeScreen';
        navigateTo(screenId, false);
    }
    
    // Initialize router
    function init() {
        // Register default screens (matching HTML structure)
        const defaultScreens = [
            'homeScreen',
            'setupScreen', 
            'singleGameScreen',
            'aiGameScreen',
            'multiGameScreen'
        ];
        
        defaultScreens.forEach(register);
        
        // Set up browser navigation
        window.addEventListener('popstate', handlePopState);
        
        // Start on home screen
        navigateTo('homeScreen', false);
        
        console.log('🚀 Router initialized');
    }
    
    // Get current screen
    function getCurrentScreen() {
        return currentScreen;
    }
    
    // Public API
    return {
        register,
        navigateTo,
        init,
        getCurrentScreen
    };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', Router.init);
} else {
    Router.init();
}

// Global access
window.Router = Router;
