import { useState } from 'react'
import sha1 from "sha1";
import Space from "./Space";

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [errorMessage, setErrorMessage] = useState("")

    const saveAccount = () => {
        fetch(`https://yze-bio-production.up.railway.app/api/Account?key=${process.env.REACT_APP_API_KEY}`, {
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
        .then((data) => {
            window.localStorage.setItem("username", username)
            window.localStorage.setItem("hash", data.hash)
            window.location.href = "/manage"
        })
    }

    const handleRegister = () => {
        if(username === "" || email === "" || password === ""){
            return setErrorMessage("All fields are required to proceed!")
        }     
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)){
            return setErrorMessage("You have to set a valid email!")
        }
        fetch(`https://yze-bio-production.up.railway.app/api/AccountExists/${username},${email}`)
        .then(res => res.json())
        .then(exists => {
            console.log(exists)
            if(exists){
                return setErrorMessage("This username or email already exists!")
            }
            else {
                return saveAccount()
            }
        });
    }

    return ( 
        <div className="register-wrapper">
            <Space />
            <div className="register">
                <span className='form-title'>Create your account</span>
                <div className="input-fields-wrapper">
                    <span>Username</span>
                    <input required type="text" placeholder='Your account username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input-fields-wrapper">
                    <span>Email</span>
                    <input required type="email" placeholder='Your best email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-fields-wrapper">
                    <span>Password</span>
                    <input required type="password" placeholder='Your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="button-error-div">
                    <button onClick={() => handleRegister()}>Register</button>
                    <span className='error-form'>{errorMessage}</span>
                </div>
            </div>
            <div className="other-option-login">
                <a href="/login">Already have an acount?</a>
            </div>
        </div>
     );
}
 
export default Register;