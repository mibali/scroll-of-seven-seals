// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9eQyqDeIjQvCRDtVVEsImhsfXNA9xMRc",
    authDomain: "scroll-of-seven-seals.firebaseapp.com",
    databaseURL: "https://scroll-of-seven-seals-default-rtdb.firebaseio.com",
    projectId: "scroll-of-seven-seals",
    storageBucket: "scroll-of-seven-seals.firebasestorage.app",
    messagingSenderId: "156760249212",
    appId: "1:156760249212:web:1bf31ad5f92b410f29caf9",
    measurementId: "G-DPY2ZJ7CSD"
};

// Initialize Firebase
let app, database, auth;

try {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        auth = firebase.auth();
        
        console.log('🔥 Firebase initialized successfully');
        
        // Set up authentication state listener
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('👤 User authenticated:', user.uid);
                window.currentUser = user;
            } else {
                // Sign in anonymously for game participation
                auth.signInAnonymously().catch((error) => {
                    console.error('Authentication error:', error);
                    showNotification('Authentication failed. Some features may not work.', 'error');
                });
            }
        });
        
    } else {
        console.warn('⚠️ Firebase not loaded - running in demo mode');
        // Demo mode - create mock Firebase-like objects
        createDemoFirebase();
    }
} catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    createDemoFirebase();
}

// Demo Firebase implementation for development/testing
function createDemoFirebase() {
    console.log('🎭 Running in demo mode - no real Firebase connection');
    
    // Mock database object
    window.database = {
        ref: (path) => ({
            push: (data) => {
                console.log('📝 Demo: Would push to', path, ':', data);
                return Promise.resolve({ key: 'demo-' + Date.now() });
            },
            set: (data) => {
                console.log('💾 Demo: Would set', path, ':', data);
                return Promise.resolve();
            },
            update: (data) => {
                console.log('🔄 Demo: Would update', path, ':', data);
                return Promise.resolve();
            },
            on: (event, callback) => {
                console.log('👂 Demo: Listening to', event, 'on', path);
                // Return some demo data after a short delay
                setTimeout(() => {
                    if (path.includes('games')) {
                        callback({ val: () => null });
                    } else if (path.includes('leaderboard')) {
                        callback({ 
                            val: () => ({
                                'demo-1': {
                                    teamName: 'Demo Champions',
                                    completionTime: 2460000,
                                    country: 'Demo Land',
                                    date: Date.now() - 86400000,
                                    sealsCompleted: 7
                                },
                                'demo-2': {
                                    teamName: 'Test Warriors',
                                    completionTime: 2580000,
                                    country: 'Test Kingdom',
                                    date: Date.now() - 172800000,
                                    sealsCompleted: 7
                                }
                            })
                        });
                    }
                }, 500);
            },
            off: () => console.log('🔇 Demo: Stopped listening to', path),
            once: (event) => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({ val: () => null });
                    }, 100);
                });
            },
            child: (childPath) => window.database.ref(path + '/' + childPath)
        })
    };
    
    // Mock auth object
    window.auth = {
        currentUser: { uid: 'demo-user-' + Date.now() },
        signInAnonymously: () => Promise.resolve(),
        onAuthStateChanged: (callback) => {
            setTimeout(() => callback({ uid: 'demo-user-' + Date.now() }), 100);
        }
    };
    
    window.currentUser = window.auth.currentUser;
}

// Utility functions for Firebase operations
const FirebaseUtils = {
    // Get a reference to a database path
    ref: (path) => {
        return window.database ? window.database.ref(path) : null;
    },
    
    // Generate a unique game room code
    generateRoomCode: () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    },
    
    // Get current timestamp
    timestamp: () => {
        return firebase?.database?.ServerValue?.TIMESTAMP || Date.now();
    },
    
    // Validate room code format
    isValidRoomCode: (code) => {
        return /^[A-Z0-9]{6}$/.test(code);
    }
};

// Global error handler for Firebase operations
window.addEventListener('error', (event) => {
    if (event.error && event.error.message.includes('firebase')) {
        console.error('🔥 Firebase error:', event.error);
        showNotification('Connection error. Some features may not work properly.', 'error');
    }
});

// Export for use in other modules
window.FirebaseUtils = FirebaseUtils;
