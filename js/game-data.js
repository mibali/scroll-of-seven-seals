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
        title: "The Chronological Order Challenge",
        theme: "Biblical Timeline",
        description: "CHRONOLOGICAL ORDERING: Arrange biblical events in their correct historical sequence. Test your knowledge of biblical history and timeline.",
        puzzle: "chronologicalOrder",
        challengeType: "Timeline Ordering",
        requiredSeals: [4]
    },
    {
        id: 6,
        title: "The Scripture Topic Network",
        theme: "Thematic Organization",
        description: "SCRIPTURE ORGANIZATION: Sort biblical verses by their topics and themes. Match scriptures to their appropriate categories.",
        puzzle: "scriptureTopics",
        challengeType: "Topic Organization",
        requiredSeals: [5]
    },
    {
        id: 7,
        title: "The Biblical Wisdom Challenge",
        theme: "Final Knowledge",
        description: "WISDOM ASSESSMENT: Apply your complete biblical knowledge to solve the ultimate challenge. Demonstrate mastery of all seven seals.",
        puzzle: "biblicalWisdom",
        challengeType: "Comprehensive Knowledge",
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
                {question: "How many days and nights did it rain during Noah's flood?", correctAnswer: "40", type: "exact", hint: "The same number of years Israel wandered in the desert"},
                {question: "In what city was Jesus born?", correctAnswer: "BETHLEHEM", type: "exact", hint: "This city is called the 'City of David'"},
                {question: "How many disciples did Jesus choose?", correctAnswer: "12", type: "exact", hint: "The same number as the tribes of Israel"},
                {question: "What was the name of Moses' brother who helped him?", correctAnswer: "AARON", type: "exact", hint: "He was the first high priest of Israel"},
                {question: "How many times did Peter deny knowing Jesus?", correctAnswer: "3", type: "exact", hint: "Jesus asked Peter to feed His sheep this many times"}
            ]
        },
        {
            keyword: "REDEMPTION",
            questions: [
                {question: "Who built the giant boat to save his family from the flood?", correctAnswer: "NOAH", type: "exact", hint: "God told him to take two of every animal"},
                {question: "What did David use to defeat the giant Goliath?", correctAnswer: "SLING", type: "exact", hint: "A simple shepherd's weapon with stones"},
                {question: "What sea did Moses part for the Israelites to cross?", correctAnswer: "RED SEA", type: "exact", hint: "It's named after its color"},
                {question: "How many years did the Israelites wander in the desert?", correctAnswer: "40", type: "exact", hint: "The same number of days it rained during the flood"},
                {question: "Who was thrown into a den of lions but was protected by God?", correctAnswer: "DANIEL", type: "exact", hint: "He was a prophet who refused to stop praying"}
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

    // SEAL 4: Testament Current Affairs - Old vs New Testament  
    codeBreaking: [
        {
            keyword: "TESTAMENT",
            title: "Old vs New Testament Events",
            description: "Sort these biblical events into Old Testament (before Jesus) or New Testament (Jesus' time and after)",
            categories: {
                oldTestament: {
                    name: "Old Testament",
                    color: "#8b4513",
                    description: "Before Jesus was born"
                },
                newTestament: {
                    name: "New Testament", 
                    color: "#1e90ff",
                    description: "Jesus' time and after"
                }
            },
            items: [
                { text: "Noah builds the ark", testament: "oldTestament", category: "History" },
                { text: "Jesus is born in Bethlehem", testament: "newTestament", category: "Gospel" },
                { text: "Moses parts the Red Sea", testament: "oldTestament", category: "Miracles" },
                { text: "Jesus feeds 5,000 people", testament: "newTestament", category: "Miracles" },
                { text: "David fights Goliath", testament: "oldTestament", category: "History" },
                { text: "Jesus dies on the cross", testament: "newTestament", category: "Gospel" },
                { text: "Daniel in the lion's den", testament: "oldTestament", category: "History" },
                { text: "Paul becomes a Christian", testament: "newTestament", category: "Church" },
                { text: "Solomon builds God's temple", testament: "oldTestament", category: "History" },
                { text: "Jesus rises from the dead", testament: "newTestament", category: "Gospel" }
            ]
        },
        {
            keyword: "COVENANT",
            title: "Old vs New Covenant Ways",
            description: "Sort these into Old Covenant (Old Testament way) or New Covenant (New Testament way)",
            categories: {
                oldCovenant: {
                    name: "Old Covenant Way",
                    color: "#cd853f", 
                    description: "Old Testament - Rules and Sacrifices"
                },
                newCovenant: {
                    name: "New Covenant Way",
                    color: "#4169e1",
                    description: "New Testament - Jesus and Grace"
                }
            },
            items: [
                { text: "Follow the Ten Commandments", testament: "oldCovenant", category: "Law" },
                { text: "Believe in Jesus for salvation", testament: "newCovenant", category: "Salvation" },
                { text: "Offer animal sacrifices for sins", testament: "oldCovenant", category: "Atonement" },
                { text: "Jesus died for our sins", testament: "newCovenant", category: "Atonement" },
                { text: "Worship at the temple in Jerusalem", testament: "oldCovenant", category: "Worship" },
                { text: "Worship God anywhere in spirit", testament: "newCovenant", category: "Worship" },
                { text: "Only priests can approach God", testament: "oldCovenant", category: "Priesthood" },
                { text: "All Christians can pray to God", testament: "newCovenant", category: "Priesthood" }
            ]
        }
    ],

    // SEAL 5: Chronological Order Challenge - Biblical Timeline
    chronologicalOrder: [
        {
            keyword: "ORDER",
            timeline: "Old Testament Timeline",
            events: [
                {id: "creation", text: "God creates the world and Adam & Eve", period: "Beginning"},
                {id: "fall", text: "The Fall of Man in the Garden of Eden", period: "Beginning"},
                {id: "flood", text: "Noah's Flood destroys the earth", period: "Early History"},
                {id: "abraham", text: "God calls Abraham to leave his homeland", period: "Patriarchs"},
                {id: "egypt", text: "Joseph sold into slavery, family moves to Egypt", period: "Patriarchs"},
                {id: "exodus", text: "Moses leads Israelites out of Egypt", period: "Exodus"},
                {id: "sinai", text: "God gives the Ten Commandments at Mount Sinai", period: "Exodus"},
                {id: "promised", text: "Joshua leads conquest of the Promised Land", period: "Conquest"}
            ],
            correctOrder: ["creation", "fall", "flood", "abraham", "egypt", "exodus", "sinai", "promised"]
        },
        {
            keyword: "HISTORY",
            timeline: "Kings and Prophets Timeline",
            events: [
                {id: "saul", text: "Saul becomes the first king of Israel", period: "Early Kingdom"},
                {id: "david", text: "David defeats Goliath and becomes king", period: "United Kingdom"},
                {id: "solomon", text: "Solomon builds the Temple in Jerusalem", period: "United Kingdom"},
                {id: "divided", text: "Kingdom divides into Israel and Judah", period: "Divided Kingdom"},
                {id: "assyria", text: "Assyria conquers the Northern Kingdom (Israel)", period: "Exile"},
                {id: "babylon", text: "Babylon conquers Judah and destroys Temple", period: "Exile"},
                {id: "return", text: "Jews return from Babylonian exile", period: "Return"},
                {id: "temple2", text: "Second Temple is rebuilt in Jerusalem", period: "Return"}
            ],
            correctOrder: ["saul", "david", "solomon", "divided", "assyria", "babylon", "return", "temple2"]
        }
    ],

    // SEAL 6: Scripture Topic Organization
    scriptureTopics: [
        {
            keyword: "ORGANIZATION",
            topicName: "Biblical Wisdom",
            topics: [
                {
                    name: "God's Promises",
                    description: "Verses about God's faithful promises",
                    correctVerses: [
                        "I will never leave you nor forsake you - Hebrews 13:5",
                        "All things work together for good - Romans 8:28",
                        "He will supply all your needs - Philippians 4:19",
                        "Cast your cares on him, for he cares for you - 1 Peter 5:7"
                    ]
                },
                {
                    name: "Christian Living",
                    description: "Verses about how to live as a Christian",
                    correctVerses: [
                        "Love your neighbor as yourself - Matthew 22:39",
                        "Trust in the Lord with all your heart - Proverbs 3:5",
                        "Be kind to one another - Ephesians 4:32",
                        "Walk by faith, not by sight - 2 Corinthians 5:7"
                    ]
                }
            ],
            distractorVerses: []
        },
        {
            keyword: "CATEGORIES",
            topicName: "Salvation and Faith",
            topics: [
                {
                    name: "Salvation by Grace",
                    description: "Verses about grace and salvation",
                    correctVerses: [
                        "For by grace you have been saved - Ephesians 2:8",
                        "The gift of God is eternal life - Romans 6:23",
                        "Whoever believes in him shall not perish - John 3:16"
                    ]
                },
                {
                    name: "Faith and Belief",
                    description: "Scriptures about faith and believing",
                    correctVerses: [
                        "Faith comes by hearing - Romans 10:17",
                        "Now faith is the substance of things hoped for - Hebrews 11:1",
                        "Without faith it is impossible to please God - Hebrews 11:6"
                    ]
                },
                {
                    name: "Forgiveness",
                    description: "Verses about God's forgiveness",
                    correctVerses: [
                        "If we confess our sins, he is faithful - 1 John 1:9",
                        "As far as the east is from the west - Psalm 103:12",
                        "Father, forgive them - Luke 23:34",
                        "Forgive us our debts, as we forgive our debtors - Matthew 6:12"
                    ]
                }
            ],
            distractorVerses: []
        }
    ],

    // SEAL 7: Biblical Wisdom Challenge - Comprehensive Knowledge
    biblicalWisdom: [
        {
            keyword: "MASTERY",
            challenges: [
                {
                    type: "multiple_choice",
                    question: "Which of these demonstrates the greatest biblical wisdom?",
                    options: [
                        "Knowing all the genealogies by heart",
                        "Understanding God's love and living it out",
                        "Memorizing entire books of the Bible",
                        "Winning biblical knowledge competitions"
                    ],
                    correctAnswer: "Understanding God's love and living it out",
                    explanation: "True biblical wisdom is not just knowledge, but understanding and applying God's love"
                },
                {
                    type: "completion",
                    question: "Complete this biblical principle: 'Faith without _____ is dead'",
                    answer: "WORKS",
                    context: "James 2:26",
                    explanation: "James teaches that genuine faith naturally produces good works"
                },
                {
                    type: "application",
                    question: "What is the greatest commandment according to Jesus?",
                    answer: "LOVE GOD",
                    alternates: [
                        "LOVE THE LORD", 
                        "LOVE GOD WITH ALL YOUR HEART", 
                        "LOVE",
                        "YOU SHALL LOVE THE LORD YOUR GOD",
                        "YOU SHALL LOVE THE LORD YOUR GOD WITH ALL YOUR HEART",
                        "LOVE THE LORD YOUR GOD",
                        "LOVE THE LORD YOUR GOD WITH ALL YOUR HEART",
                        "LOVE GOD WITH ALL YOUR HEART SOUL AND MIND",
                        "LOVE THE LORD WITH ALL YOUR HEART SOUL AND MIND"
                    ],
                    reference: "Matthew 22:37-39",
                    explanation: "Love God with all your heart, soul, and mind - and love your neighbor as yourself"
                }
            ]
        },
        {
            keyword: "WISDOM",
            challenges: [
                {
                    type: "synthesis",
                    question: "The Seven Seals teach us that biblical knowledge leads to what ultimate goal?",
                    options: [
                        "Academic achievement",
                        "Spiritual wisdom and relationship with God",
                        "Winning Bible competitions",
                        "Impressing others with knowledge"
                    ],
                    correctAnswer: "Spiritual wisdom and relationship with God",
                    explanation: "Knowledge serves the purpose of drawing us closer to God and understanding His love"
                },
                {
                    type: "reflection",
                    question: "What does it mean to 'unlock the seals' in your spiritual life?",
                    answer: "SPIRITUAL GROWTH",
                    alternates: ["GROWTH", "UNDERSTANDING", "MATURITY", "WISDOM"],
                    explanation: "Unlocking seals represents growing in spiritual understanding and maturity"
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
