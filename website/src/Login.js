import { useState } from "react"
import sha1 from "sha1";
import Space from "./Space";

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const tryLogin = () => {
        if(username === "" || password === ""){
            return setErrorMessage("All fields are required to proceed!")
        }     
        fetch(`https://localhost:7041/api/Login/${username}&key=${process.env.REACT_APP_API_KEY}`)
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
            <Space />
            <div className="login">
                <span className='form-title'>Sign in</span>
                <div className="input-fields-wrapper">
                    <span>Username</span>
                    <input className="login-input" placeholder="Username" type="text" value={ username } onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ tryLogin() }}}/>
                </div>
                <div className="input-fields-wrapper">
                    <span>Password</span>
                    <input className="login-input" placeholder="Password" type="password" value={ password } onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ tryLogin() }}}/>
                </div>
                <div className="button-error-div">
                    <button onClick={() => tryLogin()}>Sign in</button>
                    <span className='error-form'>{errorMessage}</span>            
                </div>
                <a href="/reset">Forgot your password?</a>
            </div>
            <div className="other-option-login">
                <a href="/register">Don't have an account?</a>
            </div>
        </div>
     );
}
 
export default Login;