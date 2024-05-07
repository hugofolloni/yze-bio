import { useState } from "react";
import {Cloudinary} from "@cloudinary/url-gen";

const Create = () => {

    const [nickname, setNickame] = useState("")
    const [photo, setPhoto] = useState("")
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [description, setDescription] = useState("")
    const [pronouns, setPronouns] = useState("")
    const [song, setSong] = useState("")
    const [gif, setGif] = useState("")
    const [links, setLinks] = useState([])
    const [interests, setInterests] = useState([])
    const [layout, setLayout] = useState({    
        "borderRadius": "12",
        "cardBackgroundColor": "#0D0024",
        "pageBackgroundColor": "#090015",
        "fontFamily": "sans-serif",
        "fontColor": "#ffffff",
        "titleColor": "#ff5f00",
        "baseLayout": "Omen"
    })    

    const [picture, setPicture] = useState({});

  const uploadPicture = (e) => {
    this.setState({
        /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
        picturePreview : URL.createObjectURL(e.target.files[0]),
        /* this contains the file we want to send */
        pictureAsFile : e.target.files[0]
    })
};

  const setImageAction = async () => {
    const formData = new FormData();
    formData.append(
        "file",
        this.state.pictureAsFile
    );

    console.log(picture.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch("http://localhost:3000/upload/post", {
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
    const uploadedImage = await data.json();
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };

  return (
    <div className="content landing">
      <form onSubmit={setImageAction}>
      <input type="file" name="image" onChange={this.uploadPicture}/>
              <br />
        <br />
        <button type="submit" name="upload">
          Upload
        </button>
      </form>
    </div>
  );
};
 
export default Create;