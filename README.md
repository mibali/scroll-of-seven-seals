# 🔮 The Scroll of Seven Seals - Real-Time Firebase Multiplayer Bible Mystery Adventure

A real-time multiplayer Bible adventure game with three exciting game modes, built with Firebase and vanilla JavaScript. Challenge teams worldwide to unlock the seven seals through biblical puzzles!

<img width="1261" height="433" alt="image" src="https://github.com/user-attachments/assets/10e76405-5ad7-48cd-80cd-5e6d133a5dff" />

🌐 **Live Demo:** [scroll-of-seven-seals.onrender.com](https://scroll-of-seven-seals.onrender.com)  
🔗 **Repository:** [github.com/mibali/scroll-of-seven-seals](https://github.com/mibali/scroll-of-seven-seals)

## 🎮 Game Modes

### 1. 🏠 Single Group Mode
- **Local team play** - Perfect for small groups and families
- **Practice mode** - Learn the puzzles without pressure
- **Progress tracking** - Save and resume your quest
- **No time limits** - Take your time to solve each seal

### 2. 🤖 VS Computer Teams Mode  
- **AI Competition** - Face off against intelligent computer opponents
- **Adjustable difficulty** - Choose your challenge level
- **Strategic gameplay** - Watch AI teams solve puzzles in real-time
- **Dynamic leaderboards** - See live progress of all competitors

### 3. 🌐 Real Multiplayer Mode
- **Cross-device gameplay** - Teams join from any device
- **Room-based sessions** - Create or join 6-character room codes
- **Live synchronization** - Real-time updates via Firebase
- **Global competition** - Challenge teams from around the world
- **Winner detection** - Instant celebration when seals are unlocked

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

### ⚡ Real-Time Features

- **🔥 Firebase Integration**: Live database updates and user authentication
- **⚡ Instant Synchronization**: Real-time game state across all devices  
- **🏆 Live Winner Detection**: Immediate victory celebration when seals are unlocked
- **📊 Dynamic Leaderboards**: See team progress update in real-time
- **🎛️ Room Management**: Create, join, and manage multiplayer game rooms
- **💡 Hint System**: Optional clues available for challenging puzzles
- **📱 Cross-Platform**: Seamless experience on desktop, tablet, and mobile
- **🔄 Puzzle Variations**: Multiple question sets for replayability

## 🚀 Getting Started

### Quick Play (Live Demo)

1. **Visit**: [scroll-of-seven-seals.onrender.com](https://scroll-of-seven-seals.onrender.com)
2. **Choose Mode**: Single Group, VS Computer Teams, or Real Multiplayer
3. **Create/Join Game**: Get a room code for multiplayer or start solo
4. **Solve Seals**: Work through biblical puzzles to unlock each seal
5. **Win**: Complete all 7 seals first to claim victory!

### Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/mibali/scroll-of-seven-seals.git
   cd scroll-of-seven-seals
   ```

2. **Firebase Configuration** (Optional for custom deployment)
   ```javascript
   // The game includes Firebase config embedded in game.html
   // For custom deployment, update the firebaseConfig object:
   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-domain.firebaseapp.com", 
       databaseURL: "https://your-db.firebaseio.com",
       projectId: "your-project-id"
       // Add your Firebase credentials
   };
   ```

3. **Local Development**
   ```bash
   # Start a local server (Python 3)
   python3 -m http.server 8000
   
   # Or use any static file server
   # Then open: http://localhost:8000/game.html
   ```

4. **Deploy Options**
   ```bash
   # Render: Connect GitHub repo for automatic deployments
   # Netlify: Drag & drop project folder
   # Firebase Hosting: firebase deploy
   # Vercel: vercel --prod
   ```

## 🎲 How to Play

### 🏠 Single Group Mode
1. **Setup**: Enter your team name and team size (3-6 players)
2. **Begin**: Click "Start Quest" to begin your adventure
3. **Solve**: Work through the 7 seals in order (some seals unlock others)
4. **Win**: Complete all seals and solve the final biblical message
5. **Celebrate**: Your completion time becomes your personal best!

### 🤖 VS Computer Teams Mode  
1. **Setup**: Choose team name and select AI difficulty level
2. **Compete**: Race against AI teams to solve seals first
3. **Strategy**: Watch AI progress while solving your own puzzles
4. **Victory**: First team to complete all 7 seals wins the match

### 🌐 Real Multiplayer Mode

#### Creating a Game
1. Choose "Real Multiplayer" from the main menu
2. Enter your team name and team size
3. Get a unique 6-character room code (e.g., "ABC123")
4. Share the room code with other teams via text/email
5. Wait for teams to join, then start the game

#### Joining a Game  
1. Choose "Real Multiplayer" from the main menu
2. Enter the room code provided by the game host
3. Input your team name and size
4. Wait in the lobby until the host starts the game
5. Race to solve all 7 seals before other teams!

### 🧩 Puzzle Types

Each seal features different puzzle mechanics:

- **Drag & Drop**: Arrange events chronologically
- **Multiple Choice**: Select correct answers
- **Text Input**: Type decoded messages or answers
- **Matching**: Connect related biblical concepts
- **Code Breaking**: Solve numerical puzzles

## 🏗️ Technical Architecture

### Stack Overview
- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript (ES6+)
- **Backend**: Firebase Realtime Database with Authentication
- **Hosting**: Render (production) with GitHub integration
- **Version**: v1.3.1 - Stable release with fixed winner detection

### Core Technologies
- **Firebase SDK 9.22.1** - Real-time database and anonymous auth
- **Vanilla JavaScript** - No frameworks, pure ES6+ modules
- **CSS Grid & Flexbox** - Responsive design for all devices
- **WebSocket-like** - Real-time sync via Firebase listeners

### Architecture Features
- **Monolithic Design** - Single `game.html` file with embedded JavaScript
- **Real-time State** - Live game synchronization across all clients
- **Modular Code** - Organized JavaScript sections for maintainability
- **Room-based System** - Isolated game sessions with unique codes
- **Firebase Rules** - Secure database access with proper permissions

### Current File Structure  
```
├── game.html               # Complete game application (main entry)
├── index.html              # Simple redirect to game.html
├── firebase-rules.json     # Database security rules
├── js/                     # Modular JavaScript components
│   ├── firebase-config.js  # Firebase initialization
│   ├── game-data.js        # Seals, puzzles, and constants
│   ├── game.js             # Core game logic controller
│   ├── multiplayer.js      # Room management & synchronization
│   ├── leaderboard.js      # Live rankings and global scores
│   └── puzzles.js          # Puzzle generation & validation
├── styles.css              # Global styling (if needed)
└── README.md               # Project documentation
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

## 🚀 Deployment Status

### Live Production  
- **URL**: [scroll-of-seven-seals.onrender.com](https://scroll-of-seven-seals.onrender.com)
- **Platform**: Render.com with automatic GitHub deployments
- **Status**: ✅ Active and stable (v1.3.1)
- **Firebase**: Live database with real-time synchronization

### Version History
- **v1.3.1** - Current: Fixed winner detection and null error handling
- **v1.3.0** - Added VS Computer Teams mode with AI opponents  
- **v1.2.0** - Enhanced multiplayer with room management
- **v1.1.0** - Global leaderboards and ranking system
- **v1.0.0** - Initial release with basic multiplayer

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. **🐛 Report Issues** - Found a bug? Create a GitHub issue
2. **💡 Feature Ideas** - Suggest new game modes or puzzles
3. **🧩 Add Content** - More biblical puzzle variations  
4. **🎨 UI Improvements** - Enhanced styling and animations
5. **🌍 Translations** - Multi-language support
6. **📱 Mobile UX** - Better mobile experience optimizations

### Development Workflow
```bash
git clone https://github.com/mibali/scroll-of-seven-seals.git
cd scroll-of-seven-seals
# Make your changes
git add .
git commit -m "Your feature description"
git push origin main  # Automatically deploys to Render
```

## 📄 License

MIT License - Feel free to use this project for educational or commercial purposes.

## 🙏 Acknowledgments

- **📖 Biblical Content** - Public domain scriptures and study materials
- **🎨 Design** - Google Fonts (Cinzel, Uncial Antiqua) for authentic feel  
- **🔥 Infrastructure** - Firebase for reliable real-time multiplayer
- **☁️ Hosting** - Render.com for seamless deployment and scaling
- **👥 Community** - Beta testers, churches, and players worldwide

---

**🔓 Ready to unlock the seven seals? Begin your biblical adventure today!** ⚡✨
