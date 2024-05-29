import React, { useEffect, useState } from "react";
import {colors, hobbies} from './assets'
import styled from "styled-components"
import Add from "@mui/icons-material/Add";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const FocusInput = styled.input`
  border-bottom: 2px solid ${props => props.palette[1]};
  &:focus {
    border-bottom: 2px solid ${props => props.palette[2]};
  }
`

const TextAreaInput = styled.textarea`
  border-bottom: 2px solid ${props => props.palette[1]};
  border-left: 2px solid ${props => props.palette[1]};
  &:focus {
    border-bottom: 2px solid ${props => props.palette[2]};
    border-left: 2px solid ${props => props.palette[2]};
  }
`
const Placeholders = styled.div`
  &:hover {
    border: 1px solid ${props => props.palette[2]};
  }
`

const PaletteSpan = styled.span`
  color: ${props => props.palette[0]};
`

const PalettePreview = styled.div`
  background-color: ${props => props.palette[0]};
`

const CreateButton = styled.div`
  background-color: ${props => props.palette[2]};
  border: 2px solid ${props => props.palette[2]};
  &:hover {
    background-color: ${props => props.palette[1]};
    color: ${props => props.palette[2]};
  }
`

const Create = () => {

  useEffect(() => {
    const username = window.localStorage.getItem("username")
    fetch(`https://localhost:7041/api/Account/GetId/${username}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data === -1){
        return window.location.href = '/login'
      }
      setUserId(data)
    })
  }, [])

  const [nickname, setNickname] = useState("")

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Search");

  const filteredHobbies = hobbies.filter(hobby => hobby.interest.toLowerCase().includes(searchTerm.toLowerCase()));

  const [palette, setPalette] = useState([colors[0].pageBackgroundColor, colors[0].cardBackgroundColor, colors[0].titleColor, colors[0].fontColor])
  const [borderRadius, setBorderRadius] = useState("10")
  
  const [fontFamily, setFontFamily] = useState("sans-serif")

  const [title, setTitle] = useState("Your title")
  const [subtitle, setSubtitle] = useState("Subtitle")
  const [description, setDescription] = useState("Description")

  const [gif, setGif] = useState("")
  const [song, setSong] = useState("")

  const [links, setLinks] = useState([])

  const [paletteShowcase, setPaletteShowcase] = useState(true);
  const [interestChooser, setInterestChooser] = useState(false);
  const [addingLink, setAddingLink] = useState(false)
  
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  const handlePalettePicking = (item) => {
    setPalette([item.pageBackgroundColor, item.cardBackgroundColor, item.titleColor, item.fontColor])
    setPaletteShowcase(false)
  }

  const [userId, setUserId] = useState(null);

  const createCard = () => {
    if(nickname === "") {
      setAlertText("The name can't be empty.")  
      return setAlert(true)
    }
    if(title === ""){
      setAlertText("The title can't be empty.")  
      return setAlert(true)
    }

    fetch(`https://localhost:7041/api/UserExists/${nickname}`)
    .then(res => res.json())
    .then(data => {
      if(data) {
        setAlertText("This name is already taken!")  
        setNickname("")
        return setAlert(true)
      }
    })

    const layout = {
      borderRadius: borderRadius,
      pageBackgroundColor: palette[0],
      cardBackgroundColor: palette[1],
      titleColor: palette[2],
      fontFamily: fontFamily,
      baseLayout: "Omen"
    }
    
    const body =  { 
      accountId: userId,
      nickname: nickname,
      title: title,
      subtitle: subtitle,
      description: description,
      song: song,
      gif: gif, 
      layout: layout,
      interests: selectedHobbies
    }

    console.log(body)

    fetch(`https://localhost:7041/api/User/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',                                                              
            body: JSON.stringify(body) 
        })
        .then(res => res.json())
        .then(data => {
          if(data.status === 400){
            setAlertText("An error occurred.")  
            return setAlert(true)
          }
        }
        )        
        .then(() => window.location.href = `/${nickname}`)
  }

  return (  
    <div className="card-wrapper" style={{backgroundColor: palette[0]}}>

      <div className="palette-picker" onClick={() => setPaletteShowcase(true)}>
        <PalettePreview palette={palette} />
        <PaletteSpan palette={palette}>Pick the palette</PaletteSpan>
      </div>

      <div className="creating-card-div" style={{backgroundColor: palette[1]}}>
        <h4>Name your page:</h4>
        <FocusInput palette={palette} className='naming-page' style={{color: palette[3], backgroundColor: palette[1], borderBottomColor: palette[2]}} type="text"  placeholder="Your card name" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <CreateButton palette={palette} className="create-button" onClick={() => createCard()}>Create</CreateButton>
      </div>

      <div className='edit-card-div'>
        <div style={{backgroundColor: palette[1], borderRadius: `${borderRadius}px`}} className='layout-styled'>

            <FocusInput palette={palette} className='card-title-input' style={{color: palette[2], backgroundColor: palette[1]}} placeholder="Your title" maxLength='16' value={title} onChange={(e) => setTitle(e.target.value)} onClick={() => {if(title === "Your title") setTitle("")}} onBlur={() => {if(title === "") setTitle("Your title")}}/>
            <FocusInput palette={palette} className='card-subtitle-input'  style={{color: palette[3], backgroundColor: palette[1]}} placeholder="Subtitle"  maxLength='40' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} onClick={() => {if(subtitle === "Subtitle") setSubtitle("")}} onBlur={() => {if(subtitle === "") setSubtitle("Subtitle")}} />
            <TextAreaInput palette={palette} className='card-description-input' style={{color: palette[3], backgroundColor: palette[1]}} placeholder="Description"  maxLength='250'  value={description} onChange={(e) => setDescription(e.target.value)} onClick={() => {if(description === "Description") setDescription("")}} onBlur={() => {if(description === "") setDescription("Description")}}/>

            <div className='interest-wrapper'>  
              { (selectedHobbies.length !== 0 && ( selectedHobbies.map((item) => (
                    <span className='interest-span' style={{backgroundColor: palette[0]}} >{item.emoji} {item.interest}
                      <div onClick={() => setSelectedHobbies(selectedHobbies.filter(curr => curr !== item))} className="deleter"></div>
                    </span>
                ))))
                ||
                <span className="interest-calling" style={{color: palette[3]}}>Interests</span>
              }
              { selectedHobbies.length < 6 && (
                <div className="adder">
                  <Add onClick={() => setInterestChooser(true)} />
                </div>
              )}
            </div>

            <div style={{ position: 'absolute', top: 0, right: 0, marginRight: '30px'}}>
                {
                    (gif !== "" && (
                        <img src={`https://i.giphy.com/${gif}.webp`} style={{width: '200px', marginTop: '20px', maxHeight: '300px'}} alt='gif'/>
                    ))
                    ||
                    <Placeholders palette={palette} className='gif-placeholder'><span>GIF</span><Add fontSize="large" className='icon'/></Placeholders>
                }
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, marginLeft: '15px', marginBottom: '10px' }}>                
                {
                    (song !== "" && (
                        <iframe title='spotify' className="song-iframe" src={`https://open.spotify.com/embed/track/${song}?utm_source=generator&theme=0`}  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                    ))
                    ||
                    <Placeholders palette={palette} className='song-placeholder'><span>Spotify Song</span><Add fontSize="large" className='icon'/></Placeholders>
                }
            </div>

           
            <div className='card-links'>
              { (links > 0 && links.map(item => (
                        (item.type === 'twitter' && <a href={item.value} style={{marginTop: '5px'}} target="_blank" rel='noreferrer'><XIcon fontSize="large" className='icon'/></a> )
                        ||
                        (item.type === 'github' && <a href={item.value} style={{marginTop: '5px'}} target="_blank" rel='noreferrer'><GitHubIcon fontSize="large" className='icon'/></a> )
                    )))
                ||
                    <div className="empty-links">
                      <span style={{color: palette[3]}}>Links</span>
                      <div className="adder">
                        <Add onClick={() => setAddingLink(true)} />
                      </div>
                    </div>
              }
                { links.length < 6 && links.length > 0 && (
                  <div className="adder">
                    <Add onClick={() => setAddingLink(true)} />
                  </div>
                )}

            </div>

        </div>
      </div>

      { paletteShowcase && (
        <div className="palette-showcase">
          <span>Choose your palette</span>
          <div className="palettes-area">
            { colors.map(item => (
              <div className='palette-item' onClick={() => handlePalettePicking(item)}>
                <span>{item.name}</span>
                <div className="showcase">
                  <Showcasing color={item.pageBackgroundColor}  text="page"/>
                  <Showcasing color={item.cardBackgroundColor}  text="card"/>
                  <Showcasing color={item.titleColor}  text="title"/>
                  <Showcasing color={item.fontColor}  text="texts"/>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      )}

      { interestChooser && (
        <div className="interest-chooser" style={{backgroundColor: palette[1]}}>
          <FocusInput palette={palette} className='search-interest' onClick={() => setSearchTerm("")} style={{color: palette[3], backgroundColor: palette[1], borderBottomColor: palette[0]}} type="text"  placeholder="Search interests..."  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          {searchTerm !== "Search" && (
            <ul className="interest-list">
              {filteredHobbies.map((hobby, index) => (
                <li className='interest-picking' key={index} onClick={() => { if (!selectedHobbies.includes(hobby)) { setSelectedHobbies([...selectedHobbies, hobby]);setSearchTerm(""); setInterestChooser(false)}}}>
                  {hobby.emoji} {hobby.interest}
                </li>
              ))}
              
            </ul>
          )}
        </div>
      )}

      { alert && (
        <div className="alert-box" style={{backgroundColor: palette[3]}}>
          <span style={{color: palette[0]}}>{alertText}</span>
          <button style={{backgroundColor: palette[2]}} onClick={() => setAlert(false)}>Got it</button>
        </div>
      )}

      { (interestChooser || paletteShowcase || addingLink || alert) && (
        <div className="translucent-background" onClick={() => {setInterestChooser(false); setPaletteShowcase(false); setAddingLink(false); setAlert(false)}}/>
      )}

    </div>
    );
}

const Showcasing = (props) => {
  return (
    <div className="showcase">
      <div className="group">
       <div className="parallelogram" style={{backgroundColor: props.color}} />
      </div>
    </div>
  )
}

// const UploadPhoto = () => {

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [nickname, setNickname] = useState("");


//   const handlePhotoUpload = async (event) => {
//     event.preventDefault();
//     if (!selectedImage) return;

//     const formData = new FormData();
//     formData.append("nickname", nickname); 
//     formData.append("profileImage", selectedImage);

//     await axios.patch(`https://localhost:7041/api/Photo/${nickname}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handlePhotoUpload}>
//         <div>
//           <label htmlFor="profileImage">Profile Photo:</label>
//           <input type="file" id="profileImage" name="profileImage" onChange={(e) => setSelectedImage(e.target.files[0])} />
//         </div>
//         <div>
//           <label htmlFor="nickname">Nickname:</label>
//           <input type="text" id="nickname" name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
//         </div>
      
//         <button type="submit">Create card</button>
//       </form>
//     </div>
//   );
// }

export default Create;
