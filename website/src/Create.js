import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      setUploadMessage('Please select an image');
      return;
    }

    if (!nickname) {
      setUploadMessage('Please enter your nickname');
      return;
    }

    const formData = new FormData();
    formData.append('nickname', nickname); // Add nickname to FormData
    formData.append('profileImage', selectedImage);

    try {
      const response = await axios.patch(`https://localhost:7041/api/Photo/${nickname}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for FormData
        },
      });

      setUploadMessage('Profile photo uploaded successfully!');
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      setUploadMessage('An error occurred during upload. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="profileImage">Profile Photo:</label>
        <input type="file" id="profileImage" name="profileImage" onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor="nickname">Nickname:</label>
        <input type="text" id="nickname" name="nickname" value={nickname} onChange={handleNicknameChange} />
      </div>
      <button type="submit">Update Profile</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </form>
  );
};

export default Create;
