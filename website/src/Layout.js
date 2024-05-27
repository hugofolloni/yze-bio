import styled from 'styled-components';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

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
    flex-direction: column;
    justify-content: flex-end;
    height: 50px;
    margin-top: 10px;
    width: 400px;
`

const Basic = (props) => {

    console.log(props.data.links)
    return (  
        <LayoutStyled layout={props.data.layout}>
            <Title layout={props.data.layout}>{props.data.title}</Title>
            <Subtitle layout={props.data.layout}>{props.data.subtitle}</Subtitle>
            <Description layout={props.data.layout}>{props.data.description}</Description>

            <Division>                
                {
                    props.data.interests !== null && (
                        props.data.interests.map(item => (
                            <span style={{ border: '2px solid white', padding: '3px 8px', borderRadius: '5px', width: 'fit-content' }} className="interest">{item.emoji} {item.interest}</span>
                        ))
                    )
                }
            </Division>

            <div style={{ position: 'absolute', top: 0, right: 0, marginRight: '30px'}}>
                {
                    props.data.gif !== null && (
                        <iframe src={`https://giphy.com/embed/${props.data.gif}`} width="220" height="130"  class="giphy-embed" allowFullScreen title='gif' style={{border: 'none', margin: '30px 0'}}/>
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
        );
}

 
export { Basic };