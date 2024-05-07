import Space from "./Space";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Homepage = () => {
    return ( 
        <div className="homepage-wrapper">
            <Space />
            <HomepageHeader/>
            <HeroSection />
        </div>
     );
}
 
const HomepageHeader = () => {
    return (
        <div className="header-wrapper">
            <div className="header">
            <div className="nav">
                <span onClick={() => {window.scrollTo(0, 0)}}>yze.bio</span>
            </div>
            <div className="search-bar-div">
                
            </div>
            </div>
        </div>
    )
}
const HeroSection = () => {
    return ( 
        <div className="homepage-wrapper">
            <Space />
            <div className="home-main">
                <div className="translucent-container">
                    <div className="texts">               
                        <span className="main-title-first">Express yourself</span>
                        <span className="main-title">on your own way</span>
                        <span className='main-subtitle'>Design your bio, add links, and let the anonymous questions begin!</span>
                        <a href="/login">Create your cards</a>
                    </div>
                    <Cards />
                </div>
            </div>
        </div>
     );
}

const Cards = () => {


    return (
        <div className="cards">
            <div className="individual-card">
                <span className="title">Your name</span>
                <span className="subtitle">Tell the others about yourself. Be seen.</span>
                <div className="links">
                    <XIcon fontSize="large" className='icon'/>          
                    <InstagramIcon fontSize="large" className='icon'/>          
                    <GitHubIcon fontSize="large" className='icon'/>          
                </div>
                <div className="spotify-embed">
                    <iframe title='spotify' style={{borderRadius: "12px", border: 'none', height: '150px', width: '100%'}} src="https://open.spotify.com/embed/track/3lPn81PFyKvXiyHhlkwkQ4?utm_source=generator&theme=0"  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                </div>
            </div>

            <div className="individual-card-2">
                <span className="title">Hi, I'm...</span>
                <iframe src="https://giphy.com/embed/4QxQgWZHbeYwM" width="220" height="130"  class="giphy-embed" allowFullScreen title='gif' style={{border: 'none', margin: '30px 0'}}/>
                <div className="links">
                    <XIcon fontSize="large" className='icon'/>          
                    <GitHubIcon fontSize="large" className='icon'/>          
                    <InstagramIcon fontSize="large" className='icon'/>          
                </div>
              
            </div>
        </div>
    )
}
export default Homepage;