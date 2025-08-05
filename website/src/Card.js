import { useEffect, useState } from 'react';
import Curtain from './Curtain';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faGithub, faInstagram, faTiktok, faDiscord, faSquareLastfm, faSteam, faPinterest, faLetterboxd, faTwitch, faSpotify, faYoutube, faTumblr, faReddit } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Fade } from "react-awesome-reveal";


const Card = () => {

    const username = window.location.href.split('/')[3].toLowerCase()

    const [data, setData] = useState({status: 999})
    const [pageBackgroundColor, setPageBackgroundColor] = useState("#eaeaea")

    useEffect(() => {
        fetch(`https://yze-bio-production.up.railway.app/api/Nickname?nickname=${username}&key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if(data.status !== 400 && data.status !== 404){
                setPageBackgroundColor(data.layout.pageBackgroundColor)
                setData(data);  
                document.title = data.layout ? data.title : "Not found" ;
            }   
            else{
                console.log("NOT FOUND")
            }
        })
    }, [username])


    return ( 
        <div className='card-wrapper' style={{backgroundColor: pageBackgroundColor}}>
            <Curtain />
            {(
                data.layout
                    &&
                    (
                        (data.layout.baseLayout === "Omen" && <Basic data={data}/>)
                    ||
                        (<Basic data={data}/>)
                    )
                ) 
                    || 
                <div className="sorry">
                    <span style={{color:'#1c1c1c'}}>Sorry, this card does not exist. You can create this page right <a style={{color: 'black', fontWeight: 700}} href="/create">here.</a></span>
                </div>
            }
            <div className="footer">
                <span>Created with <a href="/">yze.bio</a></span>
            </div>
        </div>
     );
}

const Basic = (props) => {

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")

    return (  
        <div className='card-div' style={{fontFamily: props.data.layout.fontFamily}}>
            <div className='layout-styled' style={{ backgroundColor: props.data.layout.cardBackgroundColor, borderRadius: `${props.data.layout.borderRadius}px`}}>
                <span className='card-title' style={{color: props.data.layout.titleColor}}>{props.data.title}</span>
                <span className='card-subtitle' style={{ color: props.data.layout.fontColor }}>{props.data.subtitle}</span>
                <DescriptionWithMentions text={props.data.description} color={props.data.layout.fontColor} />

                <div className='interest-wrapper'>                
                    { props.data.interests !== null && ( props.data.interests.map(item => (
                        <span className='interest-span' style={{backgroundColor: props.data.layout.pageBackgroundColor, color: props.data.layout.fontColor }}>{item.emoji} {item.interest}</span>
                    )))}
                </div>

                <div className='gif-div'>
                    { props.data.gif !== "" && (
                        <img className='gif-img' style={{borderRadius: `${props.data.layout.borderRadius}px`}} src={`https://i.giphy.com/${props.data.gif}.webp`} alt='gif'/>
                    )}
                </div>

                <div className='song-div'>                
                    { props.data.song !== "" && (
                            <iframe title='spotify' className="song-iframe" src={`https://open.spotify.com/embed/track/${props.data.song}?utm_source=generator&theme=1`}  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                        )}
                </div>

                <div className='card-links'>
                    {props.data.links.map(item => {
                        if(item.action === "redirect") return (
                            <a style={{margin:'8px', cursor: 'pointer'}}  href={item.value} target="_blank" rel='noreferrer'>
                                {item.type === 'twitter' && <FontAwesomeIcon icon={faXTwitter} size="2x" color="white" className='icon' />}
                                {item.type === 'github' && <FontAwesomeIcon icon={faGithub} size="2x" color="white" className='icon' />}
                                {item.type === 'instagram' && <FontAwesomeIcon icon={faInstagram} size="2x" color="white" className='icon' />}
                                {item.type === 'tiktok' && <FontAwesomeIcon icon={faTiktok} size="2x" color="white" className='icon' />}
                                {item.type === 'discord' && <FontAwesomeIcon icon={faDiscord} size="2x" color="white" className='icon' />}
                                {item.type === 'lastfm' && <FontAwesomeIcon icon={faSquareLastfm} size="2x" color="white" className='icon' />}
                                {item.type === 'steam' && <FontAwesomeIcon icon={faSteam} size="2x" color="white" className='icon' />}
                                {item.type === 'pinterest' && <FontAwesomeIcon icon={faPinterest} size="2x" color="white" className='icon' />}
                                {item.type === 'letterboxd' && <FontAwesomeIcon icon={faLetterboxd} size="2x" color="white" className='icon' />}
                                {item.type === 'twitch' && <FontAwesomeIcon icon={faTwitch} size="2x" color="white" className='icon' />}
                                {item.type === 'spotify' && <FontAwesomeIcon icon={faSpotify} size="2x" color="white" className='icon' />}
                                {item.type === 'youtube' && <FontAwesomeIcon icon={faYoutube} size="2x" color="white" className='icon' />}
                                {item.type === 'tumblr' && <FontAwesomeIcon icon={faTumblr} size="2x" color="white" className='icon' />}
                                {item.type === 'reddit' && <FontAwesomeIcon icon={faReddit} size="2x" color="white" className='icon' />}
                                {item.type === 'site' && <FontAwesomeIcon icon={faLink} size="2x" color="white" className='icon' />}
                            </a>
                        )
                    else return (
                        <div style={{margin:'8px', cursor: 'pointer'}}  onClick={() => {navigator.clipboard.writeText(item.value); setShowMessage(true); setMessage(`${item.value} copied to clipboard`); setTimeout(() => setShowMessage(false), 3000)}} target="_blank" rel='noreferrer'>
                            {item.type === 'twitter' && <FontAwesomeIcon icon={faXTwitter} size="2x" color="white" className='icon' />}
                            {item.type === 'github' && <FontAwesomeIcon icon={faGithub} size="2x" color="white" className='icon' />}
                            {item.type === 'instagram' && <FontAwesomeIcon icon={faInstagram} size="2x" color="white" className='icon' />}
                            {item.type === 'tiktok' && <FontAwesomeIcon icon={faTiktok} size="2x" color="white" className='icon' />}
                            {item.type === 'discord' && <FontAwesomeIcon icon={faDiscord} size="2x" color="white" className='icon' />}
                            {item.type === 'lastfm' && <FontAwesomeIcon icon={faSquareLastfm} size="2x" color="white" className='icon' />}
                            {item.type === 'steam' && <FontAwesomeIcon icon={faSteam} size="2x" color="white" className='icon' />}
                            {item.type === 'pinterest' && <FontAwesomeIcon icon={faPinterest} size="2x" color="white" className='icon' />}
                            {item.type === 'letterboxd' && <FontAwesomeIcon icon={faLetterboxd} size="2x" color="white" className='icon' />}
                            {item.type === 'twitch' && <FontAwesomeIcon icon={faTwitch} size="2x" color="white" className='icon' />}
                            {item.type === 'spotify' && <FontAwesomeIcon icon={faSpotify} size="2x" color="white" className='icon' />}
                            {item.type === 'youtube' && <FontAwesomeIcon icon={faYoutube} size="2x" color="white" className='icon' />}
                            {item.type === 'tumblr' && <FontAwesomeIcon icon={faTumblr} size="2x" color="white" className='icon' />}
                            {item.type === 'reddit' && <FontAwesomeIcon icon={faReddit} size="2x" color="white" className='icon' />}
                        </div>
                    )
                    })}
                    </div>

            </div>

            { showMessage && (
                <div className="clipboard-div">
                    <Fade direction='right' distance={"30px"}>
                        <div onClick={() => setShowMessage(false)} style={{padding: '12px', backgroundColor: props.data.layout.fontColor, borderRadius: `${props.data.layout.borderRadius}px`, cursor: 'pointer'}}>
                            <span style={{color: props.data.layout.cardBackgroundColor, fontWeight: 700}}>{message}</span>
                        </div>
                    </Fade>
                </div>
            )}

        </div>
    );
}

const DescriptionWithMentions = ({ text, color }) => {
  const mentionRegex = /(@\w+)/g;

  const parts = text.split(mentionRegex);

  return (
    <span className='card-description' style={{ color: color }}>
      {parts.map((part, index) => {
        if (mentionRegex.test(part)) {
          const username = part.substring(1);
          return (
            <a  key={index} href={`/${username}`} style={{ fontWeight: 'bold', cursor: 'pointer',  textDecoration: 'none' }}>{part}</a>
          );
        }
        return part;
      })}
    </span>
  );
};


export default Card;