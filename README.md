# 🔮 The Scroll of Seven Seals - Multiplayer Bible Mystery Game

An enhanced multiplayer web application featuring biblical puzzles, real-time competition, and global leaderboards.

## 🌟 Features

### Core Game Modes

#### 🏠 Single Team Mode
- Practice mode for individual teams
- Local progress tracking
- No time pressure
- Perfect for learning the puzzles

#### 🌍 Global Competition Mode
- Real-time multiplayer competition
- Live leaderboards during games
- Room-based game sessions
- Support for up to 16 teams per game

### 🎮 Seven Challenging Seals

1. **🌿 The Garden Cipher** - Arrange Genesis creation events in order
2. **🩸 The Blood Trail** - Solve biblical sacrifice riddles  
3. **🔮 The Prophecy Scroll** - Match prophecies with fulfillments
4. **🛤️ The Parable Labyrinth** - Navigate through Jesus' teachings
5. **🍞 The Upper Room Lockbox** - Crack the 4-digit biblical code
6. **✉️ The Church Underground** - Decode apostolic messages
7. **🗺️ The Apocalypse Map** - Interpret Revelation symbols

### 🏆 Leaderboard System

#### Live Competition Leaderboard
- Real-time rankings during active games
- Progress tracking (seals completed)
- Elapsed time display
- Team status indicators

#### Global Leaderboard
- **All Time**: Greatest teams ever
- **This Week**: Weekly champions  
- **Today**: Daily leaders
- Top 5 fastest completion times
- Country representation with flags

### 🎯 Advanced Features

- **🎛️ Admin Dashboard**: Game hosts can pause, resume, or end games
- **💡 Hint System**: Optional clues with scoring penalties
- **🔄 Puzzle Variations**: Multiple versions for replayability
- **📱 Responsive Design**: Works on mobile and desktop
- **⚡ Real-time Sync**: Live updates across all connected players
- **🏅 Achievement System**: Unlock rewards for special accomplishments

## 🚀 Getting Started

### Quick Start (Demo Mode)

1. Open `index.html` in your web browser
2. The game runs in demo mode without Firebase
3. Choose between single-player or multiplayer modes
4. Create or join a game room
5. Start solving the seven seals!

### Firebase Setup (Production)

1. **Create Firebase Project**
   ```
   - Go to https://console.firebase.google.com/
   - Create a new project
   - Enable Realtime Database
   - Enable Authentication (Anonymous)
   ```

2. **Update Configuration**
   ```javascript
   // Edit js/firebase-config.js
   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-domain.firebaseapp.com",
       databaseURL: "https://your-db.firebaseio.com",
       projectId: "your-project-id",
       // ... other config
   };
   ```

3. **Deploy**
   ```bash
   # Option 1: Firebase Hosting
   npm install -g firebase-tools
   firebase init hosting
   firebase deploy
   
   # Option 2: Any static hosting (Netlify, Vercel, etc.)
   # Upload all files to your hosting provider
   ```

## 🎲 How to Play

### Single Player Mode
1. Enter your team name and size
2. Click "Begin the Quest"
3. Solve seals in order (some require previous seals)
4. Complete all 7 seals to unlock the final challenge
5. Decipher the hidden biblical message to win

### Multiplayer Mode

#### Creating a Game
1. Choose "Global Competition"
2. Click "Create New Game"
3. Set game title and max teams
4. Share the 6-character room code with other teams
5. Start the game when ready

#### Joining a Game
1. Choose "Global Competition" 
2. Click "Join Existing Game"
3. Enter the room code provided by the host
4. Enter your team details
5. Wait for the host to start

### 🧩 Puzzle Types

Each seal features different puzzle mechanics:

- **Drag & Drop**: Arrange events chronologically
- **Multiple Choice**: Select correct answers
- **Text Input**: Type decoded messages or answers
- **Matching**: Connect related biblical concepts
- **Code Breaking**: Solve numerical puzzles

## 🏗️ Technical Architecture

### Frontend Stack
- **HTML5** - Semantic structure
- **CSS3** - Responsive design with custom themes
- **Vanilla JavaScript** - Modular ES6+ code
- **Firebase SDK** - Real-time database and auth

### Backend (Firebase)
- **Realtime Database** - Live game state sync
- **Authentication** - Anonymous user sessions  
- **Hosting** - Global CDN deployment

### File Structure
```
├── index.html              # Main application entry
├── styles.css              # Complete styling
├── js/
│   ├── firebase-config.js  # Firebase setup & demo mode
│   ├── game-data.js        # Seals, puzzles, constants
│   ├── multiplayer.js      # Game rooms & team management
│   ├── leaderboard.js      # Live & global rankings
│   ├── puzzles.js          # Puzzle generation & validation
│   └── game.js             # Main game controller
└── README.md               # This documentation
```

## 🔧 Configuration Options

### Game Constants
```javascript
const GAME_CONSTANTS = {
    MAX_TEAMS_PER_GAME: 16,     // Teams per game room
    MIN_TEAMS_TO_START: 2,      // Minimum to begin
    GAME_TIMEOUT_MINUTES: 120,  // Max game duration
    LEADERBOARD_TOP_COUNT: 5,   // Global leaderboard size
    NOTIFICATION_DURATION: 5000, // Alert display time
    AUTO_SAVE_INTERVAL: 30000   // Progress save frequency
};
```

### Puzzle Variations
Each seal has multiple puzzle variations for replayability:
- Garden Cipher: 3 keyword variations
- Blood Trail: 2 riddle sets  
- Prophecy Scroll: 2 matching sets
- Parable Labyrinth: 2 question sets
- Upper Room: 2 code combinations
- Church Underground: 2 cipher sets
- Apocalypse Map: 2 symbol sets

## 🌐 Browser Support

- **Chrome 80+** ✅
- **Firefox 75+** ✅  
- **Safari 13+** ✅
- **Edge 80+** ✅
- **Mobile browsers** ✅

## 🤝 Contributing

We welcome contributions! Here are ways to help:

1. **Report Bugs** - Create issues for any problems
2. **Suggest Features** - Ideas for new game modes
3. **Add Puzzles** - More biblical puzzle variations
4. **Improve UI** - Enhanced styling and animations
5. **Translations** - Multi-language support

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Biblical content sourced from public domain scriptures
- Font families: Cinzel and Uncial Antiqua (Google Fonts)
- Firebase for real-time infrastructure
- All the beta testers and churches who provided feedback

---

**Ready to unlock the mysteries? Start your quest today!** 🗝️✨
