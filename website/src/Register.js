import { useState } from 'react'
import sha1 from "sha1";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const saveAccount = () => {
        fetch(`https://localhost:7041/api/Exists/${username},${email}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',                                                              
            body: JSON.stringify( { 
                "username": username,
                "password": sha1(password),
                "email": email,
                "confirmed": true,
            } )  
        })
        .then(res => res.json())
        .then()
    }

    const handleRegister = () => {
        setError(false)
        if(username === "" || email === "" || password === ""){
            setErrorMessage("You have to fill all fields!")
            return setError(true)
        }     
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)){
            setErrorMessage("You have to set a valid email!")
            return setError(true)
        }
        fetch(`https://localhost:7041/api/Exists/${username},${email}`)
        .then(res => res.json())
        .then(exists => {
            console.log(exists)
            if(exists){
                setErrorMessage("This username or email already exists!")
                setError(true)
            }
            else {
                saveAccount()
            }
        });
    }

    return ( 
        <div className="register-wrapper">
            <div className="register">
                <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={() => handleRegister()}>Register</button>
                { error && <span style={{color: 'red'}}>{errorMessage}</span>}
            </div>
        </div>
     );
}
 
export default Register;