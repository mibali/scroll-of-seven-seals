// Game Data - Seals and Puzzle Variations
const seals = [
    {
        id: 1,
        title: "The Garden Cipher",
        theme: "Creation & Fall",
        description: "Decode the sequence of creation events in the Garden of Eden. Arrange the events in chronological order to reveal the hidden keyword.",
        puzzle: "gardenCipher",
        requiredSeals: []
    },
    {
        id: 2,
        title: "The Blood Trail",
        theme: "Sacrifice & Redemption", 
        description: "Follow the trail of sacrificial blood through the Old Testament. Solve riddles about biblical sacrifices to unlock the keyword.",
        puzzle: "bloodTrail",
        requiredSeals: [1]
    },
    {
        id: 3,
        title: "The Prophecy Scroll",
        theme: "Prophets & Fulfillment",
        description: "Match Old Testament prophecies with their New Testament fulfillments. Correct matching reveals the prophetic keyword.",
        puzzle: "prophetsPuzzle", 
        requiredSeals: [2]
    },
    {
        id: 4,
        title: "The Parable Labyrinth",
        theme: "Teachings & Parables",
        description: "Navigate through Jesus' parables by answering questions correctly. Each correct path leads closer to the truth.",
        puzzle: "parableLabyrinth",
        requiredSeals: [3]
    },
    {
        id: 5,
        title: "The Upper Room Lockbox",
        theme: "Last Supper & Betrayal",
        description: "Unlock the mysterious lockbox using clues from the Last Supper. Numbers and symbols hold the key to the combination.",
        puzzle: "upperRoomLockbox",
        requiredSeals: [4]
    },
    {
        id: 6,
        title: "The Church Underground",
        theme: "Early Church & Persecution",
        description: "Decode secret messages from the persecuted early church. Break the cipher to read the apostolic letters.",
        puzzle: "churchUnderground", 
        requiredSeals: [5]
    },
    {
        id: 7,
        title: "The Apocalypse Map",
        theme: "Revelation & End Times",
        description: "Decipher the symbolic language of Revelation. Solve the final mysteries to unlock the ultimate truth.",
        puzzle: "apocalypseMap",
        requiredSeals: [6]
    }
];

// Multiple puzzle variations for replayability
const puzzleVariations = {
    gardenCipher: [
        {
            keyword: "INNOCENCE",
            events: [
                {text: "In the beginning God created light", letter: "I", order: 1},
                {text: "Next God separated the waters above from below", letter: "N", order: 2},
                {text: "Now dry land appeared and was called Earth", letter: "N", order: 3},
                {text: "On the fourth day God made sun and moon", letter: "O", order: 4},
                {text: "Creatures of the sea were brought forth", letter: "C", order: 5},
                {text: "Every beast of the earth was created", letter: "E", order: 6},
                {text: "Now man was formed from dust of the ground", letter: "N", order: 7},
                {text: "Carefully God formed woman from man's rib", letter: "C", order: 8},
                {text: "Evil entered when serpent tempted Eve", letter: "E", order: 9}
            ]
        },
        {
            keyword: "BEGINNING",
            events: [
                {text: "Before anything existed, God was", letter: "B", order: 1},
                {text: "Earth was formless and empty", letter: "E", order: 2},
                {text: "God's Spirit moved over the waters", letter: "G", order: 3},
                {text: "Into darkness God spoke 'Let there be light'", letter: "I", order: 4},
                {text: "Night and day were separated", letter: "N", order: 5},
                {text: "Next came the expanse called Heaven", letter: "N", order: 6},
                {text: "Initially plants and trees were made", letter: "I", order: 7},
                {text: "Nature received the gift of man", letter: "N", order: 8},
                {text: "Grace was given through the breath of life", letter: "G", order: 9}
            ]
        },
        {
            keyword: "PARADISE",
            events: [
                {text: "Perfect harmony existed in the beginning", letter: "P", order: 1},
                {text: "All was very good in God's sight", letter: "A", order: 2},
                {text: "Rivers watered the garden of Eden", letter: "R", order: 3},
                {text: "Animals came to Adam to be named", letter: "A", order: 4},
                {text: "Deep sleep fell upon the man", letter: "D", order: 5},
                {text: "Into being came woman as helper", letter: "I", order: 6},
                {text: "Serpent was more cunning than any beast", letter: "S", order: 7},
                {text: "Eve saw the fruit was good for food", letter: "E", order: 8}
            ]
        }
    ],
    
    bloodTrail: [
        {
            keyword: "GRACE",
            riddles: [
                {question: "The offering that pleased God more than Cain's (Genesis 4)", answer: "GOAT", placeholder: "G___"},
                {question: "What Abraham almost sacrificed (Genesis 22)", answer: "RAM", placeholder: "R__"},
                {question: "The bronze serpent maker (Numbers 21)", answer: "AARON", placeholder: "A____"},
                {question: "David's sin offering location (2 Samuel 24)", answer: "CORNER", placeholder: "C_____"},
                {question: "What saved Israel's firstborn (Exodus 12)", answer: "EXODUS", placeholder: "E_____"}
            ]
        },
        {
            keyword: "MERCY",
            riddles: [
                {question: "The high priest who entered the holy of holies", answer: "MOSES", placeholder: "M____"},
                {question: "What covered the ark of the covenant", answer: "EPHOD", placeholder: "E____"},
                {question: "The place where blood was sprinkled yearly", answer: "ROOM", placeholder: "R___"},
                {question: "Offering for unintentional sin", answer: "CITIES", placeholder: "C_____"},
                {question: "Day of Atonement occurs in this month", answer: "YEAR", placeholder: "Y___"}
            ]
        }
    ],
    
    prophetsPuzzle: [
        {
            keyword: "TRUTH",
            prophecies: [
                {prophecy: "Born in Bethlehem (Micah 5:2)", fulfillment: "Jesus born in Bethlehem (Luke 2:4-7)", id: 1},
                {prophecy: "Born of a virgin (Isaiah 7:14)", fulfillment: "Jesus born of Mary (Luke 1:27-31)", id: 2},
                {prophecy: "Betrayed for 30 pieces (Zechariah 11:12)", fulfillment: "Judas' betrayal (Matthew 26:14-16)", id: 3},
                {prophecy: "Pierced hands and feet (Psalm 22:16)", fulfillment: "Jesus crucified (John 19:18)", id: 4},
                {prophecy: "Rise from the dead (Psalm 16:10)", fulfillment: "Jesus rises on third day (Luke 24:6-7)", id: 5}
            ]
        },
        {
            keyword: "LIGHT",
            prophecies: [
                {prophecy: "Suffering servant (Isaiah 53:3)", fulfillment: "Jesus despised and rejected (John 1:11)", id: 1},
                {prophecy: "Silent before accusers (Isaiah 53:7)", fulfillment: "Jesus silent before Pilate (Matthew 27:14)", id: 2},
                {prophecy: "Divided garments (Psalm 22:18)", fulfillment: "Soldiers cast lots for Jesus' clothes (John 19:24)", id: 3},
                {prophecy: "Given vinegar to drink (Psalm 69:21)", fulfillment: "Jesus given sour wine (John 19:29)", id: 4},
                {prophecy: "Ascended on high (Psalm 68:18)", fulfillment: "Jesus ascends to heaven (Acts 1:9)", id: 5}
            ]
        }
    ],
    
    parableLabyrinth: [
        {
            keyword: "WISDOM",
            questions: [
                {question: "In the Parable of the Sower, what represents the Word of God?", options: ["The sower", "The soil", "The birds", "The seed"], correct: 3},
                {question: "In the Parable of the Lost Sheep, how many sheep were safe?", options: ["98", "100", "99", "97"], correct: 2},
                {question: "In the Parable of the Talents, what happened to the servant who buried his talent?", options: ["Rewarded", "Punished", "Forgiven", "Promoted"], correct: 1}
            ]
        },
        {
            keyword: "KINGDOM",
            questions: [
                {question: "What is the Kingdom of Heaven like according to Jesus?", options: ["A mustard seed", "A treasure", "A pearl", "All of these"], correct: 3},
                {question: "In the parable of the wedding feast, who was invited first?", options: ["The poor", "The rich", "The invited guests", "Everyone"], correct: 2},
                {question: "What did the good Samaritan do that others didn't?", options: ["Prayed", "Gave money", "Showed mercy", "Called for help"], correct: 2}
            ]
        }
    ],
    
    upperRoomLockbox: [
        {
            keyword: "LOVE",
            code: "1312",
            clues: [
                {text: "The number of disciples present at the Last Supper", answer: "12"},
                {text: "The new commandment Jesus gave (John chapter)", answer: "13"},
                {text: "First digit: John chapter of the new commandment", hint: "13"},
                {text: "Last two digits: Number of disciples at the table", hint: "12"}
            ]
        },
        {
            keyword: "FAITH", 
            code: "3316",
            clues: [
                {text: "For God so loved the world (John 3:__)", answer: "16"},
                {text: "The most famous verse number in John 3", answer: "16"},
                {text: "First two digits: John chapter with famous verse", hint: "33"},
                {text: "Last two digits: The verse number", hint: "16"}
            ]
        }
    ],
    
    churchUnderground: [
        {
            keyword: "HOPE",
            letters: [
                {sender: "Paul", cipher: "Caesar +3", encrypted: "KROG RQWR IDLWK", decrypted: "HOLD ONTO FAITH"},
                {sender: "Peter", cipher: "Reverse", encrypted: "EPOH NI TSIRCH", decrypted: "HOPE IN CHRIST"},
                {sender: "John", cipher: "Caesar +5", encrypted: "QTAK NS QNAJ", decrypted: "LOVE IS LIFE"}
            ]
        },
        {
            keyword: "PEACE",
            letters: [
                {sender: "Paul", cipher: "Caesar +2", encrypted: "RGEEG KG EJTKUV", decrypted: "PEACE IN CHRIST"},
                {sender: "Peter", cipher: "Reverse", encrypted: "ECAEP EB HTIW UOY", decrypted: "PEACE BE WITH YOU"},
                {sender: "James", cipher: "Caesar +1", encrypted: "GBJUI CSVJHUT VT", decrypted: "FAITH BRINGS US"}
            ]
        }
    ],
    
    apocalypseMap: [
        {
            keyword: "VICTORY",
            puzzles: [
                {question: "How many churches received letters in Revelation?", options: ["5", "6", "7", "8"], correct: "7"},
                {question: "The number of seals on the scroll", answer: "7"},
                {question: "How many trumpets were blown?", options: ["6", "7", "8", "9"], correct: "7"},
                {question: "The number of bowls of wrath", answer: "7"},
                {question: "What number appears most in Revelation?", options: ["3", "7", "12", "666"], correct: "7"}
            ]
        },
        {
            keyword: "ETERNAL",
            puzzles: [
                {question: "The beast's number (Revelation 13:18)", answer: "666"},
                {question: "How many elders around the throne?", options: ["12", "24", "36", "48"], correct: "24"},
                {question: "The number of tribes sealed", answer: "12"},
                {question: "Dimensions of New Jerusalem (thousand stadia)", answer: "12"},
                {question: "Gates in the New Jerusalem", options: ["8", "10", "12", "16"], correct: "12"}
            ]
        }
    ]
};

// Game constants
const GAME_CONSTANTS = {
    MAX_TEAMS_PER_GAME: 16,
    MIN_TEAMS_TO_START: 2,
    GAME_TIMEOUT_MINUTES: 120,
    LEADERBOARD_TOP_COUNT: 5,
    NOTIFICATION_DURATION: 5000,
    AUTO_SAVE_INTERVAL: 30000
};

// Country codes for leaderboard display
const COUNTRIES = {
    'US': '🇺🇸',
    'UK': '🇬🇧', 
    'CA': '🇨🇦',
    'AU': '🇦🇺',
    'DE': '🇩🇪',
    'FR': '🇫🇷',
    'NG': '🇳🇬',
    'KE': '🇰🇪',
    'ZA': '🇿🇦',
    'BR': '🇧🇷',
    'MX': '🇲🇽',
    'IN': '🇮🇳',
    'JP': '🇯🇵',
    'KR': '🇰🇷',
    'PH': '🇵🇭'
};

// Achievement system
const ACHIEVEMENTS = {
    SPEED_DEMON: {
        name: "Speed Demon",
        description: "Complete all seals in under 30 minutes",
        icon: "⚡",
        condition: (time) => time < 1800000
    },
    SCHOLAR: {
        name: "Biblical Scholar", 
        description: "Complete all puzzles without using hints",
        icon: "📚",
        condition: (hintsUsed) => hintsUsed === 0
    },
    FIRST_PLACE: {
        name: "Champion",
        description: "Finish first in a multiplayer game",
        icon: "🏆",
        condition: (rank) => rank === 1
    },
    TEAM_PLAYER: {
        name: "Team Player",
        description: "Play 5 multiplayer games",
        icon: "👥",
        condition: (gamesPlayed) => gamesPlayed >= 5
    }
};

// Export data for use in other modules
window.GameData = {
    seals,
    puzzleVariations,
    GAME_CONSTANTS,
    COUNTRIES,
    ACHIEVEMENTS
};
