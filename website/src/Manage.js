import { useEffect, useState } from "react";

const Manage = () => {

    const [cards, setCards] = useState([])

    useEffect(() => {
        const username = localStorage.getItem("username")
        const password = localStorage.getItem("password")

        console.log(username)
        if(username === null) return window.location.href = "/login"

        fetch(`https://localhost:7041/api/Projects/${username}`)
        .then(res => res.json())
        .then(data => {
            setCards(data[0].users);
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

    return ( 
        <div className="manage-wrapper">
            <div className="logout">
                <button onClick={() => handleLogout()}>Logout</button>
            </div>
            <div className="projects-wrapper">
                <div className="projects-bar">
                    <span className="projects-title">Projects</span>
                    <a href="/create">Create</a>
                </div>
                <div className="projects">
                    {cards.length > 0 && cards.reverse().map(item => (
                        <div className="preview-card">
                            <span className="nickname">/{item.nickname}</span>
                            <span className="title">{item.title}</span>
                            <a href={`/${item.nickname}`}>Go to</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Manage;