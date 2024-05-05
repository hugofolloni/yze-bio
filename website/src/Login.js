import { useState } from "react"
import sha1 from "sha1";

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const tryLogin = () => {
        setError(false)
        if(username === "" || password === ""){
            setErrorMessage("You have to fill all fields!")
            return setError(true)
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
                setErrorMessage("Usuário ou senha incorretos!");
                setError(true)
                setUsername("")
                setPassword("")
            }
        })
    }

    return ( 
        <div className="login-div">
            <div className="login-container">
                <div className="inputs">
                    <input className="login-input" placeholder="Usuário" type="text" value={ username } onChange={(e) => setUsername(e.target.value)} />
                    <input className="login-input" placeholder="Senha" type="password" value={ password } onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button onClick={() => tryLogin()}>Entrar</button>
                { error && <span style={{color: 'red'}}>{errorMessage}</span>}
            </div>
        </div>
     );
}
 
export default Login;