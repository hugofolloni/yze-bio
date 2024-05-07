import { useState } from "react"
import sha1 from "sha1";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const tryLogin = () => {
        if(username === "" || password === ""){
            return setErrorMessage("All fields are required to proceed!")
        }     
        fetch(`https://localhost:7041/api/Login/${username}`)
        .then(res => res.json())
        .then(data => {
            if(username === data.username && sha1(password) === data.password){
                console.log("Logado!")
                window.localStorage.setItem("username", username)
                window.localStorage.setItem("password", sha1(password))
                window.location.href = "/manage"
            }
            else {
                setErrorMessage("Credentials not found!");
                setUsername("")
                setPassword("")
            }
        })
    }

    return ( 
        <div className="login-wrapper">
            <div className="login">
                <span className='form-title'>Sign in</span>
                <div className="input-fields-wrapper">
                    <span>Username</span>
                    <input className="login-input" placeholder="Username" type="text" value={ username } onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input-fields-wrapper">
                    <span>Password</span>
                    <input className="login-input" placeholder="Password" type="password" value={ password } onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="button-error-div">
                    <button onClick={() => tryLogin()}>Sign in</button>
                    <span className='error-form'>{errorMessage}</span>            
                </div>
            </div>
            <div className="other-option-login">
                <a href="/login">Don't have an acount?</a>
            </div>
        </div>
     );
}
 
export default Login;