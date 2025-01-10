const hobbies = [
  { "interest": 'Acting', "emoji": '🎭' },
  { "interest": 'Archery', "emoji": '🏹' },
  { "interest": 'Astronomy', "emoji": '🔭' },
  { "interest": 'Baking', "emoji": '🥖' },
  { "interest": 'Basketball', "emoji": '🏀' },
  { "interest": 'Biking', "emoji": '🚴' },
  { "interest": 'Bingewatching', "emoji": '📺' },
  { "interest": 'Birdwatching', "emoji": '🐦' },
  { "interest": 'Blogging', "emoji": '📝' },
  { "interest": 'Blues Music', "emoji": '🎵' },
  { "interest": 'Board Games', "emoji": '🎲' },
  { "interest": 'Book Club', "emoji": '📚' },
  { "interest": 'Bowling', "emoji": '🎳' },
  { "interest": 'Camping', "emoji": '🏕️' },
  { "interest": 'Candle Making', "emoji": '🕯️' },
  { "interest": 'Card Games', "emoji": '🃏' },
  { "interest": 'Ceramics', "emoji": '🏺' },
  { "interest": 'Chess', "emoji": '♟️' },
  { "interest": 'Classical Music', "emoji": '🎻' },
  { "interest": 'Collecting', "emoji": '🗃️' },
  { "interest": 'Coding', "emoji": '💻' },
  { "interest": 'Coin Collecting', "emoji": '🪙' },
  { "interest": 'Comedy Movies', "emoji": '🎬' },
  { "interest": 'Comedy', "emoji": '🎙️' },
  { "interest": 'Cooking', "emoji": '🍳' },
  { "interest": 'Crafts', "emoji": '🎨' },
  { "interest": 'Crocheting', "emoji": '🧶' },
  { "interest": 'Cycling', "emoji": '🚴' },
  { "interest": 'Dancing', "emoji": '💃' },
  { "interest": 'Diving', "emoji": '🤿' },
  { "interest": 'Drawing', "emoji": '✏️' },
  { "interest": 'Drama Movies', "emoji": '🎬' },
  { "interest": 'Embroidery', "emoji": '🪡' },
  { "interest": 'Fantasy Movies', "emoji": '🎬' },
  { "interest": 'Fashion', "emoji": '👗' },
  { "interest": 'Fishing', "emoji": '🎣' },
  { "interest": 'Flower Arranging', "emoji": '💐' },
  { "interest": 'Gaming', "emoji": '🕹️' },
  { "interest": 'Gardening', "emoji": '🌱' },
  { "interest": 'Genealogy', "emoji": '🧬' },
  { "interest": 'Golf', "emoji": '⛳' },
  { "interest": 'Guitar', "emoji": '🎸' },
  { "interest": 'Hiking', "emoji": '🥾' },
  { "interest": 'Hip Hop', "emoji": '💃' },
  { "interest": 'Home Brewing', "emoji": '🍺' },
  { "interest": 'Horseback Riding', "emoji": '🐎' },
  { "interest": 'Horror Movies', "emoji": '🎬' },
  { "interest": 'Hunting', "emoji": '🏹' },
  { "interest": 'Ice Skating', "emoji": '⛸️' },
  { "interest": 'Jazz Music', "emoji": '🎷' },
  { "interest": 'Jewelry Making', "emoji": '💍' },
  { "interest": 'Journaling', "emoji": '📓' },
  { "interest": 'Juggling', "emoji": '🤹' },
  { "interest": 'Karaoke', "emoji": '🎤' },
  { "interest": 'Kayaking', "emoji": '🛶' },
  { "interest": 'Knitting', "emoji": '🧵' },
  { "interest": 'Lego Building', "emoji": '🧱' },
  { "interest": 'Martial Arts', "emoji": '🥋' },
  { "interest": 'Meditation', "emoji": '🧘‍♂️' },
  { "interest": 'Metal Detecting', "emoji": '🔍' },
  { "interest": 'Model Building', "emoji": '✈️' },
  { "interest": 'Mountain Climbing', "emoji": '🧗' },
  { "interest": 'Movie Watching', "emoji": '🎬' },
  { "interest": 'Mystery Movies', "emoji": '🎬' },
  { "interest": 'Origami', "emoji": '📄' },
  { "interest": 'Painting', "emoji": '🎨' },
  { "interest": 'Piano', "emoji": '🎹' },
  { "interest": 'Photography', "emoji": '📸' },
  { "interest": 'Ping Pong', "emoji": '🏓' },
  { "interest": 'Podcasting', "emoji": '🎙️' },
  { "interest": 'Pop Music', "emoji": '🎵' },
  { "interest": 'Pottery', "emoji": '🏺' },
  { "interest": 'Puzzles', "emoji": '🧩' },
  { "interest": 'Reading', "emoji": '📚' },
  { "interest": 'Reggae Music', "emoji": '🎵' },
  { "interest": 'Rock Climbing', "emoji": '🧗' },
  { "interest": 'Running', "emoji": '🏃' },
  { "interest": 'Sailing', "emoji": '⛵' },
  { "interest": 'Scrapbooking', "emoji": '📒' },
  { "interest": 'Scuba Diving', "emoji": '🤿' },
  { "interest": 'Sewing', "emoji": '🧵' },
  { "interest": 'Singing', "emoji": '🎤' },
  { "interest": 'Skateboarding', "emoji": '🛹' },
  { "interest": 'Skiing', "emoji": '⛷️' },
  { "interest": 'Snowboarding', "emoji": '🏂' },
  { "interest": 'Soap Making', "emoji": '🧼' },
  { "interest": 'Soccer', "emoji": '⚽' },
  { "interest": 'Stargazing', "emoji": '🌌' },
  { "interest": 'Surfing', "emoji": '🏄' },
  { "interest": 'Swimming', "emoji": '🏊' },
  { "interest": 'Table Tennis', "emoji": '🏓' },
  { "interest": 'Tennis', "emoji": '🎾' },
  { "interest": 'Theater', "emoji": '🎭' },
  { "interest": 'Traveling', "emoji": '✈️' },
  { "interest": 'Video Editing', "emoji": '🎬' },
  { "interest": 'Violin', "emoji": '🎻' },
  { "interest": 'Volleyball', "emoji": '🏐' },
  { "interest": 'Vlogging', "emoji": '📹' },
  { "interest": 'Watching Sports', "emoji": '🏅' },
  { "interest": 'Weightlifting', "emoji": '🏋️' },
  { "interest": 'Wine Tasting', "emoji": '🍷' },
  { "interest": 'Woodworking', "emoji": '🪚' },
  { "interest": 'Writing', "emoji": '✍️' },
  { "interest": 'Yoga', "emoji": '🧘' },
  { "interest": 'Adventure Movies', "emoji": '🎬' },
  { "interest": 'Animation Movies', "emoji": '🎬' },
  { "interest": 'Country Music', "emoji": '🎵' },
  { "interest": 'Documentary Movies', "emoji": '🎬' },
  { "interest": 'Electronic Music', "emoji": '🎵' },
  { "interest": 'Fantasy Books', "emoji": '📚' },
  { "interest": 'Horror Books', "emoji": '📚' },
  { "interest": 'Jazz Music', "emoji": '🎷' },
  { "interest": 'Metal Music', "emoji": '🎸' },
  { "interest": 'Non-fiction Books', "emoji": '📚' },
  { "interest": 'Painting', "emoji": '🎨' },
  { "interest": 'Photography', "emoji": '📸' },
  { "interest": 'Poetry', "emoji": '📖' },
  { "interest": 'Pop Music', "emoji": '🎵' },
  { "interest": 'Reggae Music', "emoji": '🎵' },
  { "interest": 'Rock Music', "emoji": '🎸' },
  { "interest": 'Romance Books', "emoji": '📚' },
  { "interest": 'Sci-fi Books', "emoji": '📚' },
  { "interest": 'Sci-fi Movies', "emoji": '🎬' },
  { "interest": 'Short Stories', "emoji": '📖' },
  { "interest": 'Soul Music', "emoji": '🎵' },
  { "interest": 'Thriller Books', "emoji": '📚' },
  { "interest": 'Thriller Movies', "emoji": '🎬' },
  { "interest": 'World Music', "emoji": '🌍' },
  { "interest": 'Zumba', "emoji": '💃' }
];

const colors = [
  {
    "name": "Neutral",
    "cardBackgroundColor": "#2e2e2e",
    "pageBackgroundColor": "#1c1c1c",
    "fontColor": "#ffffff",
    "titleColor": "#aaaaaa"
  },
  {
    "name": "Deep Crimson",
    "cardBackgroundColor": "#490000",
    "pageBackgroundColor": "#2f0000",
    "fontColor": "#ffffff",
    "titleColor": "#134632"
  },
  {
    "name": "Midnight Ember",
    "cardBackgroundColor": "#0D0024",
    "pageBackgroundColor": "#090015",
    "fontColor": "#ffffff",
    "titleColor": "#ff5f00"
  },
  {
    "name": "Midnight Blue",
    "cardBackgroundColor": "#1a1a2e",
    "pageBackgroundColor": "#16213e",
    "fontColor": "#ffffff",
    "titleColor": "#0f3460"
  },
  {
    "name": "Sunny Meadow",
    "cardBackgroundColor": "#f8f3d4",
    "pageBackgroundColor": "#e8e8a6",
    "fontColor": "#444444",
    "titleColor": "#556b2f"
  },{
    "name": "Gotham",
    "cardBackgroundColor": "#000000",
    "pageBackgroundColor": "#000000",
    "fontColor": "#ffffff",
    "titleColor": "#ffffff"
  },
  {
    "name": "Warm Sand",
    "cardBackgroundColor": "#ffe4c4",
    "pageBackgroundColor": "#deb887",
    "fontColor": "#000000",
    "titleColor": "#8b4513"
  },
  {
    "name": "Twilight Rose",
    "cardBackgroundColor": "#4b4e6d",
    "pageBackgroundColor": "#1b1b2f",
    "fontColor": "#ffffff",
    "titleColor": "#e43f5a"
  },
  {
    "name": "Romantic Blush",
    "cardBackgroundColor": "#f67280",
    "pageBackgroundColor": "#c06c84",
    "fontColor": "#ffffff",
    "titleColor": "#6c5b7b"
  },
  {
    "name": "Royal Purple",
    "cardBackgroundColor": "#8e44ad",
    "pageBackgroundColor": "#5e3370",
    "fontColor": "#ffffff",
    "titleColor": "#ecf0f1"
  },
  {
    "name": "Ocean Depths",
    "cardBackgroundColor": "#34495e",
    "pageBackgroundColor": "#2c3e50",
    "fontColor": "#ecf0f1",
    "titleColor": "#3498db"
  },
  {
    "name": "Summer Sunrise",
    "cardBackgroundColor": "#ff7675",
    "pageBackgroundColor": "#d63031",
    "fontColor": "#ffffff",
    "titleColor": "#ffeaa7"
  },
  {
    "name": "Mint Fresh",
    "cardBackgroundColor": "#55efc4",
    "pageBackgroundColor": "#00b894",
    "fontColor": "#2d3436",
    "titleColor": "#dfe6e9"
  },
  {
    "name": "Lavender Dream",
    "cardBackgroundColor": "#6c5ce7",
    "pageBackgroundColor": "#2d3436",
    "fontColor": "#dfe6e9",
    "titleColor": "#a29bfe"
  },
  {
    "name": "Autumn Spice",
    "cardBackgroundColor": "#e17055",
    "pageBackgroundColor": "#d63031",
    "fontColor": "#ffffff",
    "titleColor": "#fdcb6e"
  },
  {
    "name": "Sky Blue",
    "cardBackgroundColor": "#0984e3",
    "pageBackgroundColor": "#74b9ff",
    "fontColor": "#ffffff",
    "titleColor": "#636e72"
  },
  {
    "name": "Pink Passion",
    "cardBackgroundColor": "#fd79a8",
    "pageBackgroundColor": "#e84393",
    "fontColor": "#ffffff",
    "titleColor": "#6c5ce7"
  },
  {
    "name": "Slate Grey",
    "cardBackgroundColor": "#636e72",
    "pageBackgroundColor": "#2d3436",
    "fontColor": "#dfe6e9",
    "titleColor": "#00cec9"
  },
  {
    "name": "Golden Sun",
    "cardBackgroundColor": "#f39c12",
    "pageBackgroundColor": "#e67e22",
    "fontColor": "#ffffff",
    "titleColor": "#e74c3c"
  },
  {
    "name": "Teal Serenity",
    "cardBackgroundColor": "#16a085",
    "pageBackgroundColor": "#1abc9c",
    "fontColor": "#ffffff",
    "titleColor": "#f1c40f"
  },
  {
    "name": "Crimson Flame",
    "cardBackgroundColor": "#c0392b",
    "pageBackgroundColor": "#e74c3c",
    "fontColor": "#ecf0f1",
    "titleColor": "#2c3e50"
  },
  {
    "name": "Lavender Bliss",
    "cardBackgroundColor": "#8e44ad",
    "pageBackgroundColor": "#9b59b6",
    "fontColor": "#ecf0f1",
    "titleColor": "#2c3e50"
  },
  {
    "name": "Emerald Forest",
    "cardBackgroundColor": "#27ae60",
    "pageBackgroundColor": "#2ecc71",
    "fontColor": "#ecf0f1",
    "titleColor": "#3498db"
  },
  {
    "name": "Cinnamon Spice",
    "cardBackgroundColor": "#d35400",
    "pageBackgroundColor": "#e67e22",
    "fontColor": "#ffffff",
    "titleColor": "#f39c12"
  },
  {
    "name": "Scarlet Blaze",
    "cardBackgroundColor": "#c0392b",
    "pageBackgroundColor": "#e74c3c",
    "fontColor": "#ecf0f1",
    "titleColor": "#2980b9"
  },
  {
    "name": "Blue Lagoon",
    "cardBackgroundColor": "#2980b9",
    "pageBackgroundColor": "#3498db",
    "fontColor": "#ecf0f1",
    "titleColor": "#2ecc71"
  },
  {
    "name": "Golden Fields",
    "cardBackgroundColor": "#f1c40f",
    "pageBackgroundColor": "#f39c12",
    "fontColor": "#2c3e50",
    "titleColor": "#27ae60"
  },
  {
    "name": "Aqua Harmony",
    "cardBackgroundColor": "#16a085",
    "pageBackgroundColor": "#1abc9c",
    "fontColor": "#ffffff",
    "titleColor": "#e74c3c"
  },
  {
    "name": "Sunset Glow",
    "cardBackgroundColor": "#ff4500",
    "pageBackgroundColor": "#ff6347",
    "fontColor": "#ffffff",
    "titleColor": "#2e8b57"
  },
  {
    "name": "Vibrant Plum",
    "cardBackgroundColor": "#800080",
    "pageBackgroundColor": "#9400d3",
    "fontColor": "#ffffff",
    "titleColor": "#ffff00"
  },
  {
    "name": "Coral Reef",
    "cardBackgroundColor": "#ff7f50",
    "pageBackgroundColor": "#ff6347",
    "fontColor": "#000000",
    "titleColor": "#4682b4"
  },
  {
    "name": "Forest Whisper",
    "cardBackgroundColor": "#228b22",
    "pageBackgroundColor": "#006400",
    "fontColor": "#ffffff",
    "titleColor": "#ffa07a"
  },
  {
    "name": "Berry Mix",
    "cardBackgroundColor": "#8b008b",
    "pageBackgroundColor": "#ff00ff",
    "fontColor": "#ffffff",
    "titleColor": "#ffd700"
  },
  {
    "name": "Cool Mint",
    "cardBackgroundColor": "#00fa9a",
    "pageBackgroundColor": "#00ff7f",
    "fontColor": "#000000",
    "titleColor": "#8b0000"
  },
  {
    "name": "Tropical Sunset",
    "cardBackgroundColor": "#ff4500",
    "pageBackgroundColor": "#ff6347",
    "fontColor": "#ffffff",
    "titleColor": "#008080"
  },
  {
    "name": "Lush Green",
    "cardBackgroundColor": "#006400",
    "pageBackgroundColor": "#228b22",
    "fontColor": "#ffffff",
    "titleColor": "#00ff7f"
  },
  {
    "name": "Icy Blue",
    "cardBackgroundColor": "#00ced1",
    "pageBackgroundColor": "#4682b4",
    "fontColor": "#ffffff",
    "titleColor": "#ff69b4"
  }
];

const fonts = [
  {"display": "Poppins", "css": "Poppins"},
  {"display": "Roboto", "css": "Roboto"},
  {"display": "Montserrat", "css": "Montserrat"},
  {"display": "Nunito", "css": "Nunito"},
  {"display": "Raleway", "css": "Raleway"},
  {"display": "Merriweather", "css": "Merriweather"},
  {"display": "Lora", "css": "Lora"},
]

const borders = ['0', '3', '6', '9']

const availableLinks = [
  { type: 'twitter', label: 'Twitter', placeholder: 'URL' },
  { type: 'github', label: 'GitHub', placeholder: 'URL' },
  { type: 'instagram', label: 'Instagram', placeholder: 'URL' },
  { type: 'tiktok', label: 'TikTok', placeholder: 'URL' },
  { type: 'discord', label: 'Discord', placeholder: 'Tag' },
  { type: 'lastfm', label: 'Last.fm', placeholder: 'URL' },
  { type: 'steam', label: 'Steam', placeholder: 'Tag' },
  { type: 'pinterest', label: 'Pinterest', placeholder: 'URL' },
  { type: 'letterboxd', label: 'Letterboxd', placeholder: 'URL' },
  { type: 'twitch', label: 'Twitch', placeholder: 'URL' },
  { type: 'spotify', label: 'Spotify', placeholder: 'URL' },
  { type: 'youtube', label: 'YouTube', placeholder: 'URL' },
  { type: 'tumblr', label: 'Tumblr', placeholder: 'URL' },
  { type: 'reddit', label: 'Reddit', placeholder: 'URL' }
];

export { hobbies, colors, fonts, borders, availableLinks }