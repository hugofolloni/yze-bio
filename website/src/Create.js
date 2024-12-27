import React, { useEffect, useState } from "react";
import { colors, hobbies, fonts, borders, availableLinks } from './assets'
import styled from "styled-components"
import Add from "@mui/icons-material/Add";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';
import { faXTwitter, faGithub, faInstagram, faTiktok, faDiscord, faSquareLastfm, faSteam, faPinterest, faLetterboxd, faTwitch, faSpotify, faYoutube, faTumblr, faReddit } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons'

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
  color: ${props => props.palette[1]};
  &:hover {
    background-color: ${props => props.palette[1]};
    color: ${props => props.palette[2]};
  }
`

const SongsItem = styled.div`
  transition: 0.3s ease-in-out all;
  color: ${props => props.palette[2]};
  &:hover {
    background-color: ${props => props.palette[2]};
    color: ${props => props.palette[1]};
  }
`

const Create = () => {

  useEffect(() => {
    document.title = "Creating card" ;
    const username = window.localStorage.getItem("username")
    fetch(`https://localhost:7041/api/Account/GetId/${username}&key=abc123`)
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
  const [borderRadius, setBorderRadius] = useState("6")
  
  const [fontFamily, setFontFamily] = useState("sans-serif")

  const [title, setTitle] = useState("Your title")
  const [subtitle, setSubtitle] = useState("Subtitle")
  const [description, setDescription] = useState("Description")

  const [gif, setGif] = useState("")
  const [song, setSong] = useState("")

  const [links, setLinks] = useState([])
  const [searchLink, setSearchLink] = useState(availableLinks[0])
  const [newLinkUrl, setNewLinkUrl] = useState("")
  const [editingIndex, setEditingIndex] = useState(-1)

  const [paletteShowcase, setPaletteShowcase] = useState(true);
  const [interestChooser, setInterestChooser] = useState(false);
  const [addingLink, setAddingLink] = useState(false)
  
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState('')

  const [gifPicker, setGifPicker] = useState(false);
  const [gifText, setGifText] = useState("")
  const [gifResults, setGifResults] = useState([])

  const [songPicker, setSongPicker] = useState(false);
  const [songText, setSongText] = useState("");
  const [songsResult, setSongsResult] = useState([])

  const [styleShowcase, setStyleShowcase] = useState(false)

  const [hoveringDropdown, setHoveringDropdown] = useState(false)


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
          if(nickname !== window.location.href.split("/")[4]){
          setAlertText("This name is already taken!")  
          setNickname("")
          return setAlert(true)
        }
      }
    })

    const layout = {
      borderRadius: borderRadius,
      pageBackgroundColor: palette[0],
      cardBackgroundColor: palette[1],
      titleColor: palette[2],
      fontColor: palette[3],
      baseLayout: "Omen",
      fontFamily: fontFamily
    }
    
    const body =  { 
      accountId: userId,
      nickname: nickname,
      title: title,
      subtitle: subtitle !== "Subtitle" ? subtitle : "",
      description: description !== "Description" ? description : "",
      song: song,
      gif: gif, 
      layout: layout,
      interests: selectedHobbies,
      links: links
    }

    console.log(body)

    fetch(`https://localhost:7041/api/User?key=abc123`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',                                                              
            body: JSON.stringify(body) 
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.status === 400){
            setAlertText("An error occurred.")  
            return setAlert(true)
          }
        }
        )        
        .then(() => {if(!alert){window.location.href = `/${nickname}`}})
  }

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(process.env.REACT_APP_SPOTIFY_ID + ':' + process.env.REACT_APP_SPOTIFY_SECRET).toString('base64')),
      },
    });
  
    return await response.json();
  }

  const getTrackInfo = async (access_token) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${songText}&type=track&market=US`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
    });
  
    return await response.json();
  }

  const searchSong = () => {
    getToken().then(response => {
      getTrackInfo(response.access_token).then(profile => {
        const songs = []
        for(let i = 0; i < profile.tracks.items.length; i++){
          songs.push({name: profile.tracks.items[i].name, id: profile.tracks.items[i].id, artists: profile.tracks.items[i].artists[0].name, img: profile.tracks.items[i].album.images[0].url})
        }
        setSongsResult(songs)
      })
    });
  }

  const searchGif = () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=LXRVk5ZxdS86nOQ8OAKWQi5Kv5WAzGhM&q=${gifText.replace(" ", "+")}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => setGifResults(data.data))
  }

  const socialLinks = {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    instagram: "https://instagram.com/",
    tiktok: "https://www.tiktok.com/@",
    lastfm: "https://last.fm/user/",
    pinterest: "https://www.pinterest.com/",
    letterboxd: "https://letterboxd.com/",
    twitch: "https://www.twitch.tv/",
    spotify: "https://open.spotify.com/user/",
    youtube: "https://www.youtube.com/user/",
    tumblr: "https://",
    reddit: "https://www.reddit.com/user/"
};

  const generateSocialLink = (type, username) => {
    const baseUrl = socialLinks[type];
    if (!baseUrl) {
        console.error(`Unknown social media type: ${type}`);
        return null;
    }
    return `${baseUrl}${username}`;
}

  const handleAddLink = () => {
    var action = "redirect"
    var link = newLinkUrl
    if(searchLink.placeholder === "Tag"){
      action = "clipboard"
    }
    console.log('infos:', link)
    if(searchLink.placeholder === "URL" && newLinkUrl.indexOf("http") === -1){

      link = generateSocialLink(searchLink.type, newLinkUrl)
    }

    if(editingIndex === -1) {
      setLinks([...links, {type: searchLink.type, value: link, action: action}]); 
      setAddingLink(false); 
      setEditingIndex(-1)
      console.log([...links, {type: searchLink.type, value: link, action: action}]);
    }
    else {
      var currentLinks = links; 
      currentLinks[editingIndex] = {type: searchLink.type, value: link, action: action}; 
      setLinks(currentLinks);  
      setEditingIndex(-1); 
      setAddingLink(false);
    }

    console.log([...links, {type: searchLink.type, value: link, action: action}]);

  }

  return (  
    <div className="card-wrapper" style={{backgroundColor: palette[0], fontFamily: fontFamily}}>

      <div className="showcases">
        <div className="palette-picker" onClick={() => setPaletteShowcase(true)}>
          <PalettePreview palette={palette} />
          <PaletteSpan style={{fontFamily: fontFamily}} palette={palette}>Pick the palette</PaletteSpan>
        </div>

        <div className="style-picker" onClick={() => setStyleShowcase(true)}>
            <div className="border-overflowing" style={{ width: '30px', padding: '5px', height: '30px'}}>
              <div style={{border: `3px solid ${palette[2]}`, width: '50px', height: '50px', borderRadius: `${borderRadius}px`}}></div>
            </div>
          <PaletteSpan palette={palette}>Pick the style</PaletteSpan>
        </div>
      </div>

      <div className="creating-card-div" style={{backgroundColor: palette[1]}}>
        <h4 style={{fontFamily: fontFamily}}>Name your page:</h4>
        <FocusInput palette={palette} className='naming-page' style={{ color: palette[3], backgroundColor: palette[1], borderBottomColor: palette[2]}} type="text"  placeholder="Your card name" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <CreateButton palette={palette} style={{fontFamily: fontFamily}} className="create-button" onClick={() => createCard()}>Create</CreateButton>
      </div>

      <div className='edit-card-div'>
        <div style={{backgroundColor: palette[1], borderRadius: `${borderRadius}px`}} className='layout-styled'>

            <FocusInput palette={palette} className='card-title-input' style={{color: palette[2],   backgroundColor: palette[1]}} placeholder="Your title" maxLength='16' value={title} onChange={(e) => setTitle(e.target.value)} onClick={() => {if(title === "Your title") setTitle("")}} onBlur={() => {if(title === "") setTitle("Your title")}}/>
            <FocusInput palette={palette} className='card-subtitle-input'  style={{color: palette[3],  backgroundColor: palette[1]}} placeholder="Subtitle"  maxLength='40' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} onClick={() => {if(subtitle === "Subtitle") setSubtitle("")}} onBlur={() => {if(subtitle === "") setSubtitle("Subtitle")}} />
            <TextAreaInput palette={palette} className='card-description-input' style={{color: palette[3],  backgroundColor: palette[1]}} placeholder="Description"  maxLength='250'  value={description} onChange={(e) => setDescription(e.target.value)} onClick={() => {if(description === "Description") setDescription("")}} onBlur={() => {if(description === "") setDescription("Description")}}/>

            <div className='interest-wrapper'>  
              { (selectedHobbies.length !== 0 && ( selectedHobbies.map((item) => (
                    <span className='interest-span' style={{ backgroundColor: palette[0]}} >{item.emoji} {item.interest}
                      <div onClick={() => setSelectedHobbies(selectedHobbies.filter(curr => curr !== item))} className="deleter"><FontAwesomeIcon size='2xs' icon={faX} /></div>
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
                      <div style={{width: '100%', height:'100%'}}>
                        <img src={`https://i.giphy.com/${gif}.webp`} className='gif-img' alt='gif'/>
                        <div style={{width: '25px', height: '25px', margin: '-10px'}} onClick={() => setGif("")} className="deleter"><FontAwesomeIcon icon={faX} /></div>

                      </div>
                    ))
                    ||
                    <Placeholders onClick={() => setGifPicker(true)} palette={palette} className='gif-placeholder'><span style={{fontFamily: fontFamily}}>GIF</span><Add fontSize="large" className='icon'/></Placeholders>
                }
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, marginLeft: '15px', marginBottom: '10px' }}>                
                {
                    (song !== "" && (
                      <div style={{width: '100%', height:'100%'}}>
                        <iframe title='spotify' className="song-iframe" src={`https://open.spotify.com/embed/track/${song}?utm_source=generator&theme=1`}  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                        <div style={{width: '25px', height: '25px', margin: '-10px'}} onClick={() => setSong("")} className="deleter"><FontAwesomeIcon icon={faX} /></div>

                      </div>
                    ))
                    ||
                    <Placeholders onClick={() => setSongPicker(true)} palette={palette} className='song-placeholder'><span style={{fontFamily: fontFamily}}>Spotify Song</span><Add fontSize="large" className='icon'/></Placeholders>
                }
            </div>

           
            <div className='card-links'>
              { (links.length > 0 && links.map((item, index) => (
                  <div style={{margin:'8px'}} onClick={() => {setAddingLink(true); setEditingIndex(index); console.log(availableLinks.filter(link => link.type === item.type)[0]); setSearchLink(availableLinks.filter(link => link.type === item.type)[0]); setNewLinkUrl(item.value)}}>
                      {item.type === 'twitter' && <FontAwesomeIcon icon={faXTwitter} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'github' && <FontAwesomeIcon icon={faGithub} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'instagram' && <FontAwesomeIcon icon={faInstagram} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'tiktok' && <FontAwesomeIcon icon={faTiktok} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'discord' && <FontAwesomeIcon icon={faDiscord} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'lastfm' && <FontAwesomeIcon icon={faSquareLastfm} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'steam' && <FontAwesomeIcon icon={faSteam} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'pinterest' && <FontAwesomeIcon icon={faPinterest} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'letterboxd' && <FontAwesomeIcon icon={faLetterboxd} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'twitch' && <FontAwesomeIcon icon={faTwitch} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'spotify' && <FontAwesomeIcon icon={faSpotify} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'youtube' && <FontAwesomeIcon icon={faYoutube} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'tumblr' && <FontAwesomeIcon icon={faTumblr} size="2x" color={palette[3]}className='icon' />}
                      {item.type === 'reddit' && <FontAwesomeIcon icon={faReddit} size="2x" color={palette[3]}className='icon' />}
                  </div>
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
          {colors.map(item => (
            <div className='palette-item' onClick={() => handlePalettePicking(item)} key={item.name}>
              <span>{item.name}</span>
              <div className="showcase">
                <Showcasing color={item.pageBackgroundColor} text="page" />
                <Showcasing color={item.cardBackgroundColor} text="card" />
                <Showcasing color={item.titleColor} text="title" />
                <Showcasing color={item.fontColor} text="texts" />
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      { styleShowcase && (
        <div className="style-showcase">
          <div className="style-wrappers">
            <h3>Borders</h3>
            <div className="borders-showcase">
              { borders.map(item => {
                  if(item === borderRadius) return (
                        <div className="border-selector"style={{backgroundColor: palette[1]}}>
                          <div className="border-overflowing">
                            <div style={{border: `3px solid ${palette[2]}`, width: '100px', height: '100px', borderRadius: `${item}px`}}></div>
                          </div>
                      </div>
                      )
                    
                  else return (
                    <div className="border-selector" onClick={() => setBorderRadius(item)}>
                      <div className="border-overflowing">
                        <div style={{border: `3px solid ${palette[2]}`, width: '100px', height: '100px', borderRadius: `${item}px`}}></div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
          <div className="style-wrappers">
            <h3>Fonts</h3>
            <div className="fonts-area">
              {fonts.map(item => {
                  if(item.css === fontFamily) return (
                    <div className='font-item' style={{backgroundColor: palette[1]}} onClick={() => setFontFamily(item.css)} key={item.name}>
                      <span style={{color: palette[2], fontFamily: item.css}}>{item.display}</span>
                    </div>
                  )
                else return (
                  <div className='font-item' onClick={() => setFontFamily(item.css)} key={item.name}>
                    <span style={{color: palette[1], fontFamily: item.css}}>{item.display}</span>
                  </div>
                )
              })}
            </div>
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


      { songPicker && (
         <div className="songs-showcase" style={{backgroundColor: palette[1]}}>
            <div className='links-input'>
              <FocusInput palette={palette} className='link-url' onKeyDown={(e) => {if(e.key === "Enter"){searchSong()}}} style={{color: palette[3], backgroundColor: palette[1], borderBottomColor: palette[0]}} type="text"  placeholder="Song ID" value={songText} onChange={(e) => setSongText(e.target.value)}/>
              <CreateButton palette={palette} style={{marginTop: '10px'}} className="create-button" onClick={() => searchSong()}>Search</CreateButton>
            </div>
            <div className="songs-area">
            {songsResult.map(item => (
              <SongsItem palette={palette} className='songs-item' onClick={() => {setSong(item.id); setSongPicker(false)}}>
                <img src={item.img} width='80px' alt="" />
                <div className="infos">
                  <span style={{color: palette[3],fontWeight: 700}}>{item.name}</span>
                  <span style={{color: palette[3], marginLeft: '5px'}}>{item.artists}</span>
                </div>
              </SongsItem>
            ))}
            </div>
        </div>
      )}

      
    { gifPicker && (
       <div className="songs-showcase" style={{backgroundColor: palette[1]}}>
          <div className='links-input'>
            <FocusInput palette={palette} className='link-url' onKeyDown={(e) => {if(e.key === "Enter"){searchGif()}}} style={{color: palette[3], backgroundColor: palette[1], borderBottomColor: palette[0]}} type="text"  placeholder="Search a GIF" value={gifText} onChange={(e) => setGifText(e.target.value)}/>
            <CreateButton palette={palette} style={{marginTop: '10px'}} className="create-button" onClick={() => searchGif()}>Search</CreateButton>
          </div>
          <div className="songs-area">
          {gifResults.map(item => (
            <SongsItem palette={palette} className='songs-item' onClick={() => {setGif(item.id); setGifPicker(false)}}>
              <img src={item.images.fixed_width_small.webp} alt="" />
            </SongsItem>
          ))}
          </div>
      </div>
      )}

    { addingLink && (
      <div className="link-chooser" style={{backgroundColor: palette[1]}}>
          <h2 style={{color: palette[2]}}>Adding link</h2>
          <div className='links-input'>
            <div className='hovering-dropdown' onMouseOver={() => setHoveringDropdown(true)} onMouseOut={() => setHoveringDropdown(false)}>
              <div className='current-dropdown' style={{backgroundColor: palette[2]}} onClick={() => {setSearchLink(searchLink); setHoveringDropdown(false)}} >
                    {searchLink.type === 'twitter' && <FontAwesomeIcon icon={faXTwitter} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'github' && <FontAwesomeIcon icon={faGithub} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'instagram' && <FontAwesomeIcon icon={faInstagram} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'tiktok' && <FontAwesomeIcon icon={faTiktok} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'discord' && <FontAwesomeIcon icon={faDiscord} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'lastfm' && <FontAwesomeIcon icon={faSquareLastfm} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'steam' && <FontAwesomeIcon icon={faSteam} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'pinterest' && <FontAwesomeIcon icon={faPinterest} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'letterboxd' && <FontAwesomeIcon icon={faLetterboxd} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'twitch' && <FontAwesomeIcon icon={faTwitch} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'spotify' && <FontAwesomeIcon icon={faSpotify} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'youtube' && <FontAwesomeIcon icon={faYoutube} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'tumblr' && <FontAwesomeIcon icon={faTumblr} size="2x" color={palette[3]}className='icon' />}
                    {searchLink.type === 'reddit' && <FontAwesomeIcon icon={faReddit} size="2x" color={palette[3]}className='icon' />}              
                    <span style={{color: palette[3], fontWeight: 700}}>
                      {searchLink.label}
                    </span>
              </div>
              <div className='dropdown'>
              
              {hoveringDropdown && availableLinks.map((item) => {
                  if(item.label === searchLink.label) return (<div></div>)
                  else return (
                  <div className='hovering-item'  style={{backgroundColor: palette[1]}} onClick={() => {setSearchLink(item); setHoveringDropdown(false)}} >
                    {item.type === 'twitter' && <FontAwesomeIcon icon={faXTwitter} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'github' && <FontAwesomeIcon icon={faGithub} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'instagram' && <FontAwesomeIcon icon={faInstagram} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'tiktok' && <FontAwesomeIcon icon={faTiktok} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'discord' && <FontAwesomeIcon icon={faDiscord} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'lastfm' && <FontAwesomeIcon icon={faSquareLastfm} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'steam' && <FontAwesomeIcon icon={faSteam} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'pinterest' && <FontAwesomeIcon icon={faPinterest} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'letterboxd' && <FontAwesomeIcon icon={faLetterboxd} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'twitch' && <FontAwesomeIcon icon={faTwitch} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'spotify' && <FontAwesomeIcon icon={faSpotify} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'youtube' && <FontAwesomeIcon icon={faYoutube} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'tumblr' && <FontAwesomeIcon icon={faTumblr} size="2x" color={palette[3]}className='icon' />}
                    {item.type === 'reddit' && <FontAwesomeIcon icon={faReddit} size="2x" color={palette[3]}className='icon' />}              
                    <span style={{color: palette[3], fontWeight: 700}}>                      
                      {item.label}
                    </span>
                </div>
            )
            })}
              </div>
            </div>
            <FocusInput palette={palette} className='link-url' style={{color: palette[3], width: '300px', backgroundColor: palette[1], borderBottomColor: palette[0]}} type="text"  placeholder={searchLink.placeholder}  value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)}/>
            <CreateButton palette={palette} style={{marginTop: '10px'}} className="create-button" onClick={() => handleAddLink()}>Add</CreateButton>
          </div>
      </div>
    )}

      { (interestChooser || paletteShowcase || addingLink || alert || songPicker || gifPicker || styleShowcase) && (
        <div className="translucent-background" onClick={() => {setInterestChooser(false); setPaletteShowcase(false); setStyleShowcase(false); setAddingLink(false); setAlert(false); setSongPicker(false); setGifPicker(false);}}/>
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