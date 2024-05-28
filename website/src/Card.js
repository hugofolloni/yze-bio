import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Curtain from './Curtain';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.pageBackgroundColor};
    position: relative;
    z-index: 1;
`

const CardDiv = styled.div`
    display: flex;
    width: 700px;
    height: 400px;
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    transition: 0.5s ease all;
    &:hover {
        transform: scale(1.01) rotate(0.001turn);
    }
`

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
        <Wrapper pageBackgroundColor={pageBackgroundColor}>
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
        </Wrapper>
     );
}

const LayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px;
    background-color: ${props => props.layout.cardBackgroundColor};
    border-radius: ${props => props.layout.borderRadius}px;
    position: relative;
`

const Title = styled.span`
    font-size: 32px;
    font-family: ${props => props.layout.fontFamily};
    color: ${props => props.layout.titleColor};
    font-weight: 700;
    margin-bottom: 10px;
`

const Subtitle = styled.span`
    margin-bottom: 20px;
    font-weight: 600;
    color: ${props => props.layout.fontColor};
`

const Description = styled.span`
    color: ${props => props.layout.fontColor};
    height: 110px;
    width: 400px;
    flex-wrap: wrap;
`

const Division = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center
    justify-content: flex-start;
    height: 50px;
    margin-top: 10px;
    width: 400px;
    flex-wrap: wrap;
`

const Basic = (props) => {

    return (  
        <CardDiv>
        <LayoutStyled layout={props.data.layout}>
            <Title layout={props.data.layout}>{props.data.title}</Title>
            <Subtitle layout={props.data.layout}>{props.data.subtitle}</Subtitle>
            <Description layout={props.data.layout}>{props.data.description}</Description>

            <Division>                
                {
                    props.data.interests !== null && (
                        props.data.interests.map(item => (
                            <span style={{ height: '30px', margin: '2px 5px', backgroundColor: props.data.layout.pageBackgroundColor, padding: '3px 7px', borderRadius: '5px', display: 'flex', width: 'fit-content', flexDirection:'row', alignItems: 'center', justifyContent: 'space-around' }} className="interest">{item.emoji} {item.interest}</span>
                        ))
                    )
                }
            </Division>

            <div style={{ position: 'absolute', top: 0, right: 0, marginRight: '30px'}}>
                {
                    props.data.gif !== null && (
                        <img src={`https://i.giphy.com/${props.data.gif}.webp`} style={{width: '200px', marginTop: '20px', maxHeight: '300px'}} alt='gif'/>
                    )
                }
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, marginLeft: '15px', marginBottom: '10px' }}>                
                {
                    props.data.song !== null && (
                        <iframe title='spotify' style={{borderRadius: "12px", border: 'none', height: '80px', width: '400px', margin: '0px'}} src={`https://open.spotify.com/embed/track/${props.data.song}?utm_source=generator&theme=0`}  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                    )
                }
            </div>

            <div style={{ position: 'absolute', bottom: 0, right: 0, marginRight: '30px', marginBottom: '20px', height: '200px', width: '200px', display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end', flexWrap: 'wrap'}}>
                {
                    props.data.links.map(item => (
                        (item.type === 'twitter' && <a href={item.value} style={{marginTop: '5px'}} target="_blank" rel='noreferrer'><XIcon fontSize="large" className='icon'/></a> )
                        ||
                        (item.type === 'github' && <a href={item.value} style={{marginTop: '5px'}} target="_blank" rel='noreferrer'><GitHubIcon fontSize="large" className='icon'/></a> )
                    ))
                }
            </div>

        </LayoutStyled>
        </CardDiv>
        );
}


export default Card;