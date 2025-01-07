import { useEffect, useState } from "react";
import Header from "./Header";

const Manage = () => {

    const [cards, setCards] = useState([])
    const [username, setUsername] = useState()

    useEffect(() => {
        const username = localStorage.getItem("username")
        setUsername(username)

        if(username === null) return window.location.href = "/login"

        fetch(`https://localhost:7041/api/Projects/${username}?key=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setCards(data.users);
        })

    }, [])

    const handleLogout = () => {
        new Promise((resolve, reject) => {    
            window.localStorage.removeItem('username')
            window.localStorage.removeItem('password')
            resolve()
        })
        .then(() => {
            window.location.href = "/"
        })
        
    }



    const handleDelete = (nickname) => {
        fetch(`https://localhost:7041/api/User/${nickname}?key=${process.env.REACT_APP_API_KEY}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            console.log(`${nickname} deleted!`)
        })
    }

    return ( 
        <div className="manage-wrapper">
            <Header/>
            <div className="welcome-div">
                <h2>Welcome, {username}</h2>
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
            <div className="projects-wrapper">
                <div className="projects-bar">
                    <span className="projects-title">Profiles</span>
                    <a href="/create">Create</a>
                </div>
                <div className="projects">
                    {cards.length > 0 && cards.reverse().map(item => (
                        <div className="preview-card-background" style={{backgroundColor: item.layout.pageBackgroundColor }}>
                            <div className="preview-card" onClick={() => window.location.href = `/${item.nickname}`} style={{backgroundColor: item.layout.cardBackgroundColor}}>
                                <span className="title"  style={{color: item.layout.titleColor, fontFamily: item.layout.fontFamily, fontSize: '32px', fontWeight: '700'}}>{item.title}</span>
                                <span className="subtitle" style={{fontWeight: '600', color: item.fontColor, padding: '5px'}}>{item.subtitle}</span>
                                <span className="subtitle" style={{fontWeight: '500', color: item.fontColor, padding: '5px'}}>{item.layout.baseLayout}</span>
                                <span className="nickname" style={{fontWeight: '500', color: item.fontColor, padding: '5px'}}>yze.bio/{item.nickname}</span>
                            </div>
                            <div className="manage-card-buttons">
                                <div className="delete-card" onClick={() => handleDelete(item.nickname)}>Delete</div>
                                <a className="edit-button" href={`/edit/${item.nickname}`}>Edit</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Manage;