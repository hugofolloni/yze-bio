const hobbies = [
    { "interest": "Painting", "emoji": "🎨" },
    { "interest": "Drawing", "emoji": "✏️" },
    { "interest": "Sculpting", "emoji": "🗿" },
    { "interest": "Ceramics", "emoji": "🏺" },
    { "interest": "Crocheting", "emoji": "🧶" },
    { "interest": "Knitting", "emoji": "🧵" },
    { "interest": "Embroidery", "emoji": "🪡" },
    { "interest": "Woodworking", "emoji": "🪚" },
    { "interest": "Origami", "emoji": "📄" },
    { "interest": "Scrapbooking", "emoji": "📒" },
    { "interest": "Photography", "emoji": "📸" },
    { "interest": "Guitar", "emoji": "🎸" },
    { "interest": "Piano", "emoji": "🎹" },
    { "interest": "Violin", "emoji": "🎻" },
    { "interest": "Singing", "emoji": "🎤" },
    { "interest": "Ballet", "emoji": "🩰" },
    { "interest": "HipHop", "emoji": "💃" },
    { "interest": "Salsa", "emoji": "🕺" },
    { "interest": "Theater", "emoji": "🎭" },
    { "interest": "Comedy", "emoji": "🎙️" },
    { "interest": "Hiking", "emoji": "🥾" },
    { "interest": "Cycling", "emoji": "🚴" },
    { "interest": "Running", "emoji": "🏃" },
    { "interest": "Swimming", "emoji": "🏊" },
    { "interest": "Yoga", "emoji": "🧘" },
    { "interest": "Meditation", "emoji": "🧘‍♂️" },
    { "interest": "Cooking", "emoji": "🍳" },
    { "interest": "Baking", "emoji": "🥖" },
    { "interest": "Gardening", "emoji": "🌱" },
    { "interest": "Reading", "emoji": "📚" },
    { "interest": "Writing", "emoji": "✍️" },
    { "interest": "Gaming", "emoji": "🎮" },
    { "interest": "Fishing", "emoji": "🎣" },
    { "interest": "Traveling", "emoji": "✈️" },
    { "interest": "Camping", "emoji": "🏕️" },
    { "interest": "Birdwatching", "emoji": "🐦" },
    { "interest": "Astronomy", "emoji": "🔭" },
    { "interest": "Chess", "emoji": "♟️" },
    { "interest": "Puzzles", "emoji": "🧩" },
    { "interest": "Collecting", "emoji": "🗃️" },
    { "interest": "Blogging", "emoji": "📝" },
    { "interest": "Vlogging", "emoji": "📹" },
    { "interest": "Diving", "emoji": "🤿" },
    { "interest": "Surfing", "emoji": "🏄" },
    { "interest": "Skateboarding", "emoji": "🛹" },
    { "interest": "Snowboarding", "emoji": "🏂" },
    { "interest": "Skiing", "emoji": "⛷️" },
    { "interest": "MartialArts", "emoji": "🥋" },
    { "interest": "Archery", "emoji": "🏹" },
    { "interest": "Crafts", "emoji": "🎨" },
    { "interest": "Pottery", "emoji": "🏺" },
    { "interest": "Coding", "emoji": "💻" }
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
    }
  ]

export {hobbies, colors}