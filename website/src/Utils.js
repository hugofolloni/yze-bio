import { Buffer } from 'buffer';

export const createStars = () => {
    var createStars = []
    for(let i = 0; i < 180; i++){
        const size = Math.ceil(Math.random() * 3) + 2
        const x = Math.ceil(Math.random() * window.innerWidth);
        const y = Math.ceil(Math.random() * window.innerHeight);
        createStars.push({x: x, y: y, size: `${size}px`})
    }
    return createStars
}

export const getToken = async () => {
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

export const getTrackInfo = async (access_token, songText) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${songText}&type=track&market=US`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + access_token },
    });
  
    return await response.json();
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

export const generateSocialLink = (type, username) => {
    const baseUrl = socialLinks[type];
    if (!baseUrl) {
        console.error(`Unknown social media type: ${type}`);
        return null;
    }
    return `${baseUrl}${username}`;
}