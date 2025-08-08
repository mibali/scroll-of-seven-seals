// Game Data - Enhanced Seal Challenges
const seals = [
    {
        id: 1,
        title: "The Scripture Knowledge Trial",
        theme: "Biblical Foundation",
        description: "BIBLE KNOWLEDGE CHALLENGE: Answer precise scriptural questions requiring deep biblical recall. No hints provided - pure knowledge test.",
        puzzle: "bibleKnowledge",
        challengeType: "Bible Knowledge",
        requiredSeals: []
    },
    {
        id: 2,
        title: "The Covenant Logic Puzzle",
        theme: "Divine Reasoning",
        description: "LOGICAL REASONING CHALLENGE: Solve complex deduction problems based on biblical principles and logical patterns. Use Scripture-based clues to reach the solution.",
        puzzle: "logicalReasoning",
        challengeType: "Logical Reasoning",
        requiredSeals: [1]
    },
    {
        id: 3,
        title: "The Unity Communication Matrix",
        theme: "Team Coordination",
        description: "TEAM COMMUNICATION CHALLENGE: Coordinate with your team to solve interconnected puzzles. Each member must contribute specific biblical knowledge to unlock the seal.",
        puzzle: "teamCommunication",
        challengeType: "Team Communication",
        requiredSeals: [2]
    },
    {
        id: 4,
        title: "The Ancient Cipher of Solomon",
        theme: "Hidden Wisdom",
        description: "CODE-BREAKING CHALLENGE: Decipher complex biblical codes and ancient ciphers. Break encrypted messages using scriptural patterns and numerical systems.",
        puzzle: "codeBreaking",
        challengeType: "Code-Breaking",
        requiredSeals: [3]
    },
    {
        id: 5,
        title: "The Parable Interpretation Challenge",
        theme: "Spiritual Insight",
        description: "METAPHORICAL SCRIPTURE CHALLENGE: Interpret deep spiritual meanings hidden within parables and symbolic passages. Uncover the non-literal truths.",
        puzzle: "metaphoricalScripture",
        challengeType: "Interpreting Metaphorical Scripture",
        requiredSeals: [4]
    },
    {
        id: 6,
        title: "The Prophecy Logic Network",
        theme: "Prophetic Reasoning",
        description: "LOGICAL REASONING CHALLENGE: Connect prophetic timelines and logical sequences. Use deductive reasoning to solve complex biblical mysteries.",
        puzzle: "prophethicLogic",
        challengeType: "Logical Reasoning",
        requiredSeals: [5]
    },
    {
        id: 7,
        title: "The Revelation Code Matrix",
        theme: "End Times Mystery",
        description: "CODE-BREAKING CHALLENGE: Decrypt the ultimate biblical mystery using advanced symbolic patterns and numerical codes from Revelation.",
        puzzle: "revelationCode",
        challengeType: "Code-Breaking",
        requiredSeals: [6]
    }
];

// Enhanced Challenge Variations for replayability
const puzzleVariations = {
    // SEAL 1: Bible Knowledge Challenge - Deep Scriptural Recall
    bibleKnowledge: [
        {
            keyword: "SALVATION",
            questions: [
                {question: "How many days did it rain during Noah's flood?", correctAnswer: "40", type: "exact"},
                {question: "Who was the mother of Samuel the prophet?", correctAnswer: "HANNAH", type: "exact"},
                {question: "What mountain did Moses receive the Ten Commandments?", correctAnswer: "SINAI", type: "exact"},
                {question: "How many times did Peter deny Jesus?", correctAnswer: "3", type: "exact"},
                {question: "What was the name of Abraham's wife?", correctAnswer: "SARAH", type: "exact"},
                {question: "In which book is 'For God so loved the world' found?", correctAnswer: "JOHN", type: "exact"},
                {question: "How many plagues were sent upon Egypt?", correctAnswer: "10", type: "exact"},
                {question: "What was the name of the first high priest of Israel?", correctAnswer: "AARON", type: "exact"}
            ]
        },
        {
            keyword: "REDEMPTION",
            questions: [
                {question: "How many stones did David pick for his battle with Goliath?", correctAnswer: "5", type: "exact"},
                {question: "What was the name of the prophetess who spoke over baby Jesus?", correctAnswer: "ANNA", type: "exact"},
                {question: "Which king built the first temple in Jerusalem?", correctAnswer: "SOLOMON", type: "exact"},
                {question: "How many years did the Israelites wander in the desert?", correctAnswer: "40", type: "exact"},
                {question: "What was the name of Moses' brother?", correctAnswer: "AARON", type: "exact"},
                {question: "In what city was Jesus born?", correctAnswer: "BETHLEHEM", type: "exact"},
                {question: "How many disciples did Jesus choose?", correctAnswer: "12", type: "exact"},
                {question: "What was the name of the first martyr?", correctAnswer: "STEPHEN", type: "exact"}
            ]
        }
    ],
    
    // SEAL 2: Logical Reasoning Challenge - Biblical Deduction
    logicalReasoning: [
        {
            keyword: "COVENANT",
            puzzles: [
                {
                    type: "sequence",
                    question: "Complete the biblical number sequence: 7 (days of creation), 40 (flood), 12 (tribes), ?, 70 (years of captivity)",
                    options: ["144", "153", "50", "3"],
                    correctAnswer: "50",
                    explanation: "50 represents Pentecost (50 days after Passover)"
                },
                {
                    type: "logical",
                    question: "If David was a shepherd, king, and psalmist, and Solomon was a king, builder, and wise man, what role connects all Old Testament leaders mentioned?",
                    correctAnswer: "KING",
                    explanation: "The common thread is leadership/kingship"
                },
                {
                    type: "deduction",
                    question: "Three disciples were closest to Jesus. Peter denied Him, John stood at the cross. Using logical deduction, who was the third?",
                    correctAnswer: "JAMES",
                    explanation: "James was part of the inner circle with Peter and John"
                }
            ]
        },
        {
            keyword: "WISDOM", 
            puzzles: [
                {
                    type: "pattern",
                    question: "Pattern: Moses (Exodus), Joshua (Conquest), David (Kingdom), Solomon (?). What comes next logically?",
                    options: ["Division", "Temple", "Exile", "Peace"],
                    correctAnswer: "Division",
                    explanation: "The kingdom split after Solomon's reign"
                },
                {
                    type: "reasoning",
                    question: "If Abraham had faith, Isaac was promised, and Jacob was chosen, what logical attribute defines Joseph?",
                    correctAnswer: "PERSEVERANCE",
                    explanation: "Joseph persevered through trials to fulfill God's plan"
                }
            ]
        }
    ],

    // SEAL 3: Team Communication Challenge - Coordinated Biblical Knowledge
    teamCommunication: [
        {
            keyword: "UNITY",
            challenges: [
                {
                    type: "collaborative",
                    title: "The Trinity Formation",
                    description: "Each team member must provide one aspect of God's nature that works together",
                    parts: [
                        {role: "Member 1", task: "Name the Father's primary attribute", answer: "CREATOR"},
                        {role: "Member 2", task: "Name the Son's earthly mission", answer: "REDEEMER"},  
                        {role: "Member 3", task: "Name the Spirit's current work", answer: "COMFORTER"}
                    ],
                    completionRequirement: "All three answers must be provided by different team members"
                },
                {
                    type: "chain",
                    title: "The Covenant Chain",
                    description: "Build the covenant progression where each member adds one link",
                    sequence: [
                        {order: 1, clue: "Started with Adam", answer: "CREATION"},
                        {order: 2, clue: "Continued with Noah", answer: "PRESERVATION"},
                        {order: 3, clue: "Established with Abraham", answer: "PROMISE"},
                        {order: 4, clue: "Fulfilled through Christ", answer: "SALVATION"}
                    ]
                }
            ]
        },
        {
            keyword: "FELLOWSHIP",
            challenges: [
                {
                    type: "division",
                    title: "The Apostle Network",
                    description: "Each member must identify different apostles and their unique contributions",
                    parts: [
                        {role: "Leader", task: "The rock of the church", answer: "PETER"},
                        {role: "Scholar", task: "The apostle to the Gentiles", answer: "PAUL"},
                        {role: "Witness", task: "The beloved disciple", answer: "JOHN"}
                    ]
                }
            ]
        }
    ],

    // SEAL 4: Code-Breaking Challenge - Biblical Ciphers
    codeBreaking: [
        {
            keyword: "MYSTERY",
            codes: [
                {
                    type: "gematria",
                    cipher: "Hebrew Letter Values",
                    message: "י ה ו ה",
                    hint: "Add the values: Yod(10) + He(5) + Vav(6) + He(5)",
                    solution: "26",
                    verification: "The sacred name equals 26"
                },
                {
                    type: "atbash",
                    cipher: "Atbash Cipher (A=Z, B=Y, etc.)",
                    message: "SVOOL",
                    solution: "HELLO",
                    hint: "Biblical scribes used this cipher in Jeremiah"
                },
                {
                    type: "biblical_substitution",
                    cipher: "Book of Numbers Cipher",
                    message: "7 12 15 22 5",
                    hint: "Each number represents a Bible book position (Genesis=1, Exodus=2, etc.)",
                    solution: "GLORY",
                    explanation: "Judges(7)=G, Kings(12)=L, Proverbs(15)=O, Revelation(22)=R, Deuteronomy(5)=Y"
                }
            ]
        },
        {
            keyword: "REVELATION",
            codes: [
                {
                    type: "cross_reference",
                    cipher: "Scripture Cross-Reference Code",
                    message: "John 3:16, Romans 6:23, Ephesians 2:8-9",
                    hint: "What doctrine do these verses teach?",
                    solution: "SALVATION",
                    explanation: "All verses teach salvation by grace through faith"
                },
                {
                    type: "numerical",
                    cipher: "Biblical Number Code",
                    message: "3 (Trinity) + 12 (Disciples) + 40 (Testing) - 8 (New Beginning) = ?",
                    solution: "47",
                    hint: "Calculate the biblical significance sum"
                }
            ]
        }
    ],

    // SEAL 5: Metaphorical Scripture Challenge - Spiritual Interpretation
    metaphoricalScripture: [
        {
            keyword: "TRUTH",
            interpretations: [
                {
                    passage: "I am the vine, you are the branches",
                    surface: "Jesus uses agricultural metaphor",
                    deeper: "Spiritual connection and dependence on Christ for life",
                    question: "What does the 'fruit' represent in this metaphor?",
                    answer: "GOOD WORKS",
                    explanation: "The fruit represents the good works that flow from our connection to Christ"
                },
                {
                    passage: "The kingdom of heaven is like a mustard seed",
                    surface: "Small seed grows into large plant",
                    deeper: "Small beginnings can have great spiritual impact",
                    question: "What does the 'growth' symbolize?",
                    answer: "FAITH EXPANSION",
                    explanation: "The growth represents how faith spreads and influences others"
                },
                {
                    passage: "Be wise as serpents, innocent as doves",
                    surface: "Conflicting animal characteristics",
                    deeper: "Balance wisdom with purity in spiritual life",
                    question: "What is the spiritual balance being taught?",
                    answer: "DISCERNMENT WITH PURITY",
                    explanation: "Christians should be discerning yet maintain moral innocence"
                }
            ]
        },
        {
            keyword: "LIGHT",
            interpretations: [
                {
                    passage: "You are the light of the world",
                    surface: "Christians compared to light",
                    deeper: "Believers illuminate spiritual darkness for others",
                    question: "What does 'shining your light' mean spiritually?",
                    answer: "WITNESSING",
                    explanation: "Letting others see Christ through our actions and words"
                },
                {
                    passage: "I am the bread of life",
                    surface: "Jesus compared to food",
                    deeper: "Jesus provides spiritual sustenance for eternal life",
                    question: "What does 'eating this bread' represent?",
                    answer: "BELIEVING",
                    explanation: "Spiritual consumption means accepting and believing in Jesus"
                }
            ]
        }
    ],

    // SEAL 6: Advanced Logical Reasoning - Prophetic Logic
    prophethicLogic: [
        {
            keyword: "PROMISE",
            logic_chains: [
                {
                    premise1: "All of God's promises are Yes and Amen in Christ",
                    premise2: "Abraham was given a promise about his descendants",
                    premise3: "Christ is Abraham's ultimate descendant",
                    conclusion_question: "Therefore, what is fulfilled in Christ?",
                    answer: "ALL PROMISES",
                    explanation: "Christ fulfills all of God's promises to Abraham and beyond"
                },
                {
                    timeline: "Promise → Prophecy → Fulfillment",
                    events: [
                        {stage: "Promise", content: "Messiah promised to Adam and Eve"},
                        {stage: "Prophecy", content: "Details given through prophets"},
                        {stage: "Fulfillment", content: "Jesus fulfills all prophecies"}
                    ],
                    question: "What logical principle governs biblical prophecy?",
                    answer: "DIVINE FAITHFULNESS",
                    explanation: "God's faithfulness ensures all prophecies are fulfilled"
                }
            ]
        },
        {
            keyword: "ETERNAL",
            logic_chains: [
                {
                    syllogism: "If God is eternal, and Jesus is God, then Jesus is eternal",
                    question: "What does this mean for salvation?",
                    answer: "ETERNAL SECURITY",
                    explanation: "Salvation secured by an eternal Savior is itself eternal"
                }
            ]
        }
    ],

    // SEAL 7: Advanced Code-Breaking - Revelation Mysteries
    revelationCode: [
        {
            keyword: "VICTORY",
            ultimate_codes: [
                {
                    type: "symbolic_matrix",
                    cipher: "Seven-fold Pattern Cipher",
                    elements: ["7 Churches", "7 Seals", "7 Trumpets", "7 Bowls", "7 Spirits", "7 Stars", "7 Lampstands"],
                    pattern: "7x7=49",
                    question: "What does the completion of seven sevens represent?",
                    answer: "JUBILEE",
                    explanation: "Seven represents completion; seven sevens represents God's perfect completion"
                },
                {
                    type: "numerical_prophecy",
                    cipher: "Revelation Number Code",
                    sequence: "144,000 (sealed) ÷ 12 (tribes) ÷ 12 (foundations) = ?",
                    solution: "1000",
                    meaning: "Complete perfection in God's people",
                    verification: "1000 represents divine completeness"
                },
                {
                    type: "symbolic_interpretation",
                    cipher: "Beast Number Reverse",
                    message: "If 666 represents imperfection, what represents perfection?",
                    answer: "777",
                    explanation: "777 represents divine perfection as the opposite of 666"
                }
            ]
        },
        {
            keyword: "OMEGA",
            ultimate_codes: [
                {
                    type: "alpha_omega",
                    cipher: "Beginning and End Code",
                    message: "I am the Alpha and the Omega",
                    question: "What does this title reveal about Christ's nature?",
                    answer: "ETERNAL EXISTENCE",
                    explanation: "Christ exists from beginning to end of all things"
                }
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
