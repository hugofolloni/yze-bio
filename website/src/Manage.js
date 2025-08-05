import { useEffect, useState } from "react";
import Header from "./Header";

const Manage = () => {

    const [cards, setCards] = useState(null)
    const [username, setUsername] = useState()
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [deleteNick, setDeleteNick] = useState(null)
    const [deleteIndex, setDeleteIndex] = useState(null)

    useEffect(() => {
        const username = localStorage.getItem("username")
        const hash = localStorage.getItem('hash')
        setUsername(username)

        if(username === null) return window.location.href = "/login"

        fetch(`https://yze-bio-production.up.railway.app/api/Verification?username=${username}&hash=${hash}&key=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            if(res.status === 401) return window.location.href = "/login"
        })
        .then(() => {
            fetch(`https://yze-bio-production.up.railway.app/api/Projects/${username}?key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setCards(data.users);
            })
        })

    }, [])


    const handleDelete = (nickname, index) => {
        const updatedCards = cards.filter(item => item.nickname !== nickname)
        setCards(updatedCards); 

        fetch(`https://yze-bio-production.up.railway.app/api/User/${nickname}?key=${process.env.REACT_APP_API_KEY}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        setDeleteNick(null)
        setDeleteIndex(null)
        setShowDeleteAlert(false)
    }

    return ( 
        <div className="manage-wrapper">
            <Header logged={true} username={username}/>
            <div className="projects-wrapper">
                {!cards && (
                    <div className="loading-div">
                        <h3>Loading...</h3>
                    </div>
                )}
                <div className="projects">
                    {cards && cards.length > 0 && cards.reverse().map((item, index) => (
                        <div className="preview-card-background" style={{backgroundColor: item.layout.pageBackgroundColor }}>
                            <div className="preview-card" onClick={() => window.location.href = `/${item.nickname}`} style={{backgroundColor: item.layout.cardBackgroundColor}}>
                                <span className="title"  style={{color: item.layout.titleColor, fontFamily: item.layout.fontFamily, fontSize: '32px', fontWeight: '700'}}>{item.title}</span>
                                <span className="subtitle" style={{fontWeight: '600', color: item.layout.fontColor, padding: '5px'}}>{item.subtitle}</span>
                                <span className="subtitle" style={{fontWeight: '500', color: item.layout.fontColor, padding: '5px'}}>{item.layout.baseLayout}</span>
                                <span className="nickname" style={{fontWeight: '500', color: item.layout.fontColor, padding: '5px'}}>yze.bio/{item.nickname}</span>
                            </div>
                            <div className="manage-card-buttons">
                                <div className="delete-card" onClick={() => { setShowDeleteAlert(true); setDeleteNick(item.nickname); setDeleteIndex(index);}}>Delete</div>
                                <a className="edit-button" href={`/edit/${item.nickname}`}>Edit</a>
                            </div>
                        </div>
                    ))}
                    {cards && (
                        <div className="card-placeholder">
                            <a className='create-card-button' href="/create">+</a>
                        </div>
                    )}
                </div>
            </div>
            
            { showDeleteAlert && <div className="translucent-background" onClick={() => {setShowDeleteAlert()}}/> }
            { showDeleteAlert && (
                <div className="delete-modal"> 
                    <h3>Delete card?</h3>
                    <div className="delete-button" onClick={() => handleDelete(deleteNick, deleteIndex)}>Delete {deleteNick}</div>
                </div>
            )}
        </div>
     );
}
 
export default Manage;