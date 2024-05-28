import React, { useState } from "react";
import axios from "axios";

const Create = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handlePhotoUpload = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      setUploadMessage("Please select an image");
      return;
    }

    if (!nickname) {
      setUploadMessage("Please enter your nickname");
      return;
    }

    const formData = new FormData();
    formData.append("nickname", nickname); // Add nickname to FormData
    formData.append("profileImage", selectedImage);

    try {
      const response = await axios.patch(`https://localhost:7041/api/Photo/${nickname}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type for FormData
        },
      });

      setUploadMessage("Profile photo uploaded successfully!");
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      setUploadMessage("An error occurred during upload. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handlePhotoUpload}>
        <div>
          <label htmlFor="profileImage">Profile Photo:</label>
          <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} />
        </div>
        <div>
          <label htmlFor="nickname">Nickname:</label>
          <input type="text" id="nickname" name="nickname" value={nickname} onChange={handleNicknameChange} />
        </div>
        <div>
          <interestSelect />
        </div>
        <button type="submit">Create card</button>
        {uploadMessage && <p>{uploadMessage}</p>}
      </form>
    </div>
  );
};

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
    "cardBackgroundColor": "#490000",
    "pageBackgroundColor": "#2f0000",
    "fontColor": "#ffffff",
    "titleColor": "#134632"
  },
  {
    "cardBackgroundColor": "#1a1a2e",
    "pageBackgroundColor": "#16213e",
    "fontColor": "#ffffff",
    "titleColor": "#0f3460"
  },
  {
    "cardBackgroundColor": "#f8f3d4",
    "pageBackgroundColor": "#e8e8a6",
    "fontColor": "#444444",
    "titleColor": "#556b2f"
  },
  {
    "cardBackgroundColor": "#ffe4c4",
    "pageBackgroundColor": "#deb887",
    "fontColor": "#000000",
    "titleColor": "#8b4513"
  },
  {
    "cardBackgroundColor": "#4b4e6d",
    "pageBackgroundColor": "#1b1b2f",
    "fontColor": "#ffffff",
    "titleColor": "#e43f5a"
  },
  {
    "cardBackgroundColor": "#f67280",
    "pageBackgroundColor": "#c06c84",
    "fontColor": "#ffffff",
    "titleColor": "#6c5b7b"
  },
  {
    "cardBackgroundColor": "#8e44ad",
    "pageBackgroundColor": "#5e3370",
    "fontColor": "#ffffff",
    "titleColor": "#ecf0f1"
  },
  {
    "cardBackgroundColor": "#34495e",
    "pageBackgroundColor": "#2c3e50",
    "fontColor": "#ecf0f1",
    "titleColor": "#3498db"
  },
  {
    "cardBackgroundColor": "#ff7675",
    "pageBackgroundColor": "#d63031",
    "fontColor": "#ffffff",
    "titleColor": "#ffeaa7"
  },
  {
    "cardBackgroundColor": "#55efc4",
    "pageBackgroundColor": "#00b894",
    "fontColor": "#2d3436",
    "titleColor": "#dfe6e9"
  },
  {
    "cardBackgroundColor": "#6c5ce7",
    "pageBackgroundColor": "#2d3436",
    "fontColor": "#dfe6e9",
    "titleColor": "#a29bfe"
  },
  {
    "cardBackgroundColor": "#e17055",
    "pageBackgroundColor": "#d63031",
    "fontColor": "#ffffff",
    "titleColor": "#fdcb6e"
  },
  {
    "cardBackgroundColor": "#0984e3",
    "pageBackgroundColor": "#74b9ff",
    "fontColor": "#ffffff",
    "titleColor": "#636e72"
  },
  {
    "cardBackgroundColor": "#fd79a8",
    "pageBackgroundColor": "#e84393",
    "fontColor": "#ffffff",
    "titleColor": "#6c5ce7"
  },
  {
    "cardBackgroundColor": "#636e72",
    "pageBackgroundColor": "#2d3436",
    "fontColor": "#dfe6e9",
    "titleColor": "#00cec9"
  },
  {
    "cardBackgroundColor": "#f39c12",
    "pageBackgroundColor": "#e67e22",
    "fontColor": "#ffffff",
    "titleColor": "#e74c3c"
  },
  {
    "cardBackgroundColor": "#16a085",
    "pageBackgroundColor": "#1abc9c",
    "fontColor": "#ffffff",
    "titleColor": "#f1c40f"
  },
  {
    "cardBackgroundColor": "#c0392b",
    "pageBackgroundColor": "#e74c3c",
    "fontColor": "#ecf0f1",
    "titleColor": "#2c3e50"
  },
  {
    "cardBackgroundColor": "#8e44ad",
    "pageBackgroundColor": "#9b59b6",
    "fontColor": "#ecf0f1",
    "titleColor": "#2c3e50"
  },
  {
    "cardBackgroundColor": "#27ae60",
    "pageBackgroundColor": "#2ecc71",
    "fontColor": "#ecf0f1",
    "titleColor": "#3498db"
  },
  {
    "cardBackgroundColor": "#d35400",
    "pageBackgroundColor": "#e67e22",
    "fontColor": "#ffffff",
    "titleColor": "#f39c12"
  },
  {
    "cardBackgroundColor": "#c0392b",
    "pageBackgroundColor": "#e74c3c",
    "fontColor": "#ecf0f1",
    "titleColor": "#2980b9"
  },
  {
    "cardBackgroundColor": "#2980b9",
    "pageBackgroundColor": "#3498db",
    "fontColor": "#ecf0f1",
    "titleColor": "#2ecc71"
  },
  {
    "cardBackgroundColor": "#f1c40f",
    "pageBackgroundColor": "#f39c12",
    "fontColor": "#2c3e50",
    "titleColor": "#27ae60"
  },
  {
    "cardBackgroundColor": "#16a085",
    "pageBackgroundColor": "#1abc9c",
    "fontColor": "#ffffff",
    "titleColor": "#e74c3c"
  }
]


const InterestSelect = () => {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (hobby) => {
    if (!selectedHobbies.includes(hobby)) {
      setSelectedHobbies([...selectedHobbies, hobby]);
      setSearchTerm("");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredHobbies = hobbies.filter(hobby =>
    hobby.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input type="text"  placeholder="Search hobbies..."  value={searchTerm} onChange={handleSearch}/>
      {searchTerm && (
        <ul style={{ listStyleType: "none", padding: 0, position: "absolute", backgroundColor: "white", zIndex: 3}}>
          {filteredHobbies.map((hobby, index) => (
            <li key={index} onClick={() => handleSelect(hobby)}>
              {hobby.emoji} {hobby.name}
            </li>
          ))}
        </ul>
      )}
      <h3>Selected Hobbies:</h3>
      <ul>
        {selectedHobbies.map((hobby, index) => (
          <li key={index}>
            {hobby.emoji} {hobby.name}
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Create;
