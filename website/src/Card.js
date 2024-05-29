import { useEffect, useState } from 'react';
import Curtain from './Curtain';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';


const Card = () => {

    const username = window.location.href.split('3000/')[1]

    const [data, setData] = useState({status: 999})
    const [pageBackgroundColor, setPageBackgroundColor] = useState("#eaeaea")

    useEffect(() => {
        fetch(`https://localhost:7041/api/Nickname?nickname=${username}`)
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
                    <span style={{color:'#1c1c1c'}}>Sorry, this card does not exist. You can create this page right <a href="/create">here.</a></span>
                </div>
            }
            <div className="footer">
                <span>Created with <a href="/">yze.bio</a></span>
            </div>
        </div>
     );
}

const Basic = (props) => {

    return (  
        <div className='card-div'>
        <div className='layout-styled' style={{backgroundColor: props.data.layout.cardBackgroundColor, borderRadius: `${props.data.layout.borderRadius}px`}}>
            <span className='card-title' style={{color: props.data.layout.titleColor, fontFamily: props.data.layout.fontFamly}}>{props.data.title}</span>
            <span className='card-subtitle' styke={{color: props.data.layout.fontColor}}>{props.data.subtitle}</span>
            <span className='card-description' style={{ color: props.data.layout.fontColor}}>{props.data.description}</span>

            <div className='interest-wrapper'>                
                { props.data.interests !== null && ( props.data.interests.map(item => (
                    <span className='interest-span' style={{backgroundColor: props.data.layout.pageBackgroundColor }}>{item.emoji} {item.interest}</span>
                )))}
            </div>

            <div style={{ position: 'absolute', top: 0, right: 0, marginRight: '30px'}}>
                { props.data.gif !== "" && (
                    <img className='gif-img' src={`https://i.giphy.com/${props.data.gif}.webp`} alt='gif'/>
                )}
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, marginLeft: '15px', marginBottom: '10px' }}>                
                { props.data.song !== "" && (
                        <iframe title='spotify' className="song-iframe" src={`https://open.spotify.com/embed/track/${props.data.song}?utm_source=generator&theme=0`}  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                    )}
            </div>

            <div className='card-links'>
                {props.data.links.map(item => (
                    (item.type === 'twitter' && <a href={item.value} style={{marginTop: '5px'}} target="_blank" rel='noreferrer'><XIcon fontSize="large" className='icon'/></a> )
                    ||
                    (item.type === 'github' && <a href={item.value} style={{marginTop: '5px'}} target="_blank" rel='noreferrer'><GitHubIcon fontSize="large" className='icon'/></a> )
                ))}
            </div>

        </div>
        </div>
        );
}


export default Card;