import Space from "./Space";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import Header from "./Header";

const Homepage = () => {
    return ( 
        <div className="homepage-wrapper">
            <Space />
            <Header/>
            <HeroSection />
        </div>
     );
}

const HeroSection = () => {

    const redirectTo = () => {
        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")

        console.log(username)
        if(username === null) return window.location.href = "/login"
        else window.location.href = '/manage'
    }

    return ( 
        <div className="homepage-wrapper">
            <Space />
            <div className="home-main">
                <div className="translucent-container">
                    <div className="texts">               
                        <span className="main-title-first">Express yourself</span>
                        <span className="main-title">on your own way</span>
                        <span className='main-subtitle'>Design your bio, add links, and let the anonymous questions begin!</span>
                        <div className='redirect-button' onClick={() => redirectTo()}>Create your cards</div>
                    </div>
                    <Cards />
                </div>
            </div>
            <div className="footer">
                <span>${} <a href="/hugo">hugofolloni</a></span>
            </div>
        </div>
     );
}

const Cards = () => {

    const songs = ["3lPn81PFyKvXiyHhlkwkQ4", "5UGAXwbA17bUC0K9uquGY2", "70L6nHORQsblY813yNqUR3", "4kjI1gwQZRKNDkw1nI475M", '5PyDJG7SQRgWXefgexqIge', '1cKHdTo9u0ZymJdPGSh6nq', '7Kohy4v3KLWfUXlv9N3feB', '5SjtAe7xzUgHDtNTmt8zS7', "2u0CelO5c81XS7z3dGpHbS", "5Xak5fmy089t0FYmh3VJiY", "0YJ9FWWHn9EfnN0lHwbzvV", '4PEGwWH4tL6H7dGl4uVSPg']
    const gifs = ["aqOUrkDo2fdyE", "4QxQgWZHbeYwM", "Sv0u46pW8t0UXUyysi", "ErZ8hv5eO92JW", "eG2uHSu6ZpIHu", "1zRdamA0f9ifJkfEGF", "1ZOGAxMaP72zzNC6Iq"]
    
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
                    <iframe title='spotify' style={{borderRadius: "12px", border: 'none', height: '150px', width: '100%'}} src={`https://open.spotify.com/embed/track/${songs[Math.floor(Math.random() * songs.length)]}?utm_source=generator&theme=0`}  allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                </div>
            </div>

            <div className="individual-card-2">
                <span className="title">Hi, I'm...</span>
                <iframe src={`https://giphy.com/embed/${gifs[Math.floor((Math.random() * gifs.length))]}`} width="220" height="130"  class="giphy-embed" allowFullScreen title='gif' style={{border: 'none', margin: '30px 0'}}/>
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