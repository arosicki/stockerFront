import Panel from "../universal/Panel"
import Input from "../universal/Input"
import Button from "../universal/Button"
import "./SidePanels.css"
import logInImg from "../img/logIn.png"
import registerImg from "../img/register.png"
import {useState, useEffect} from "react"
import Loading from "../universal/Loading"


export const LogInPanel = ({setLogged, setUser}) => {

    const [loginErrMsg, setLoginErrMsg] = useState("");
    const [loading, setLoading] = useState(false);


    const LogIn = async() => {
        setLoginErrMsg("")
        setLoading(true)
        let username = document.querySelector("[name=login-username]").value
        let password = document.querySelector("[name=login-password]").value
        let response = await fetch("http://localhost:8000/user/logIn.php", {
            method: "POST",
            body: `{"username": "${username}", "password": "${password}"}`
        })
        let data = await response.json();
        if (data.success) {
            document.cookie = `username=${username}`
            document.cookie = `token=${data.token}`
            document.cookie = `expires=${data.expires} GMT`
            let responseUser = await fetch("http://localhost:8000/restricted/getAccountProps.php", {
            method: "POST",
            body: `{"username": "${username}", "token": "${data.token}"}`
        })
            let data2 = await responseUser.json();
            if (data2.success) {
                setUser({username: username, money: data2.money, registerDate: data2.registerDate })
                setLogged(true)
                setLoading(false)
            }
        }
        else {
            setLoginErrMsg(data.message)
            setLoading(false)
            document.querySelector("[name=login-username]").value = username
        }
    }

    return (
        <Panel side="right" cName="log-in">
            <div className="container">
                {loading ? <Loading size="100px" /> : 
            <>
            <img style={{width: "340px"}} src={logInImg} alt="login"/>
            <Input name="login-username" label="Username" width="340px" type="text" autoComplete="username" />
            <Input name="login-password" label="Password" width="340px" type="password" autoComplete="current-password" />
            <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={LogIn} type="primary" text="Sign In" />
            <div className="err-msg">{loginErrMsg}</div>
            </>
}
            </div>
        </Panel>
    )
}

export const RegisterPanel = () => {

    const [registerErrMsg, setRegisterErrMsg] = useState("");
    const [registerErrClr, setRegisterErrClr] = useState("red");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    // const [loading, setLoading] = useState(false);
    
    const register = async () => {
        let errMsg = document.querySelector(".reg-err-msg").innerText
        if (!errMsg) {
            let usernameField = document.querySelector("[name=register-username]")
            let passwordField = document.querySelector("[name=register-password]")
            let confirmPasswordField = document.querySelector("[name=register-confirm-password]")
            let response = await fetch("http://localhost:8000/user/register.php", {
            method: "POST",
            body: `{"username": "${usernameField.value}", "password": "${passwordField.value}"}`
        })
        let data = await response.json();
        if (data.success) {
            setRegisterErrClr("green")
            setRegisterErrMsg("Success. Go ahead and Sign In.")
            usernameField.value = ""
            passwordField.value = ""
            confirmPasswordField.value = ""
        }
        else {
            setRegisterErrClr("red")
            setRegisterErrMsg(data.message)
        }
        }
    }

    useEffect( () => {
        setRegisterErrClr("red")
        let username = document.querySelector("[name=register-username]").value
        let password = document.querySelector("[name=register-password]").value
        let confPassword = document.querySelector("[name=register-confirm-password]").value
        let errField = document.querySelector(".reg-err-msg")
        if (username) {
            if (username.length < 4) {
                setRegisterErrMsg("Username is too short.");
            }
            else if (username.length > 26) {
                setRegisterErrMsg("Username is too long.");
            }
            else {
                setRegisterErrMsg("");
            }    
        }
        if (password && !errField.innerText.match(username)) {
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*([!@$%&*?#])).+$/g)) {
                setRegisterErrMsg("Password does not meet requirements (upper and lowercase letter, number and special character [!@$%&*?#])");
            }
            else if(password.length < 7) {
                setRegisterErrMsg("Password is too short (it should have at least 8 characters)");
            }
            else if(password.length > 32) {
                setRegisterErrMsg("Password is too long (it should have at most 32 characters)");
            }
            else {
                setRegisterErrMsg("");
            }
        }
        if (confPassword && !errField.innerText.match(/(username)|(password\b)/g)) {
            if (confPassword !== password) {
                setRegisterErrMsg("Passwords do not match.");
            }
            else {
                setRegisterErrMsg("");
            }    
        }

    }, [registerUsername, registerPassword, registerConfirmPassword])

    return (
        <Panel side="right" cName="register">
            <div className="container">
            <img style={{width: "340px", marginBottom: "20px"}} src={registerImg} alt="register"/>
            <Input name="register-username" label="Username"width="340px" value={registerUsername} doOnChange={setRegisterUsername} type="text" autoComplete="username" />
            <Input name="register-password" label="Password" width="340px" value={registerPassword} doOnChange={setRegisterPassword} type="password" autoComplete="new-password" />
            <Input name="register-confirm-password" label="Confirm password" value={registerConfirmPassword} doOnChange={setRegisterConfirmPassword} width="340px" type="password" autoComplete="new-password" />
            <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={register} type="primary" text="Sign Up" />
            <div className="err-msg reg-err-msg" style={{color: registerErrClr}}>{registerErrMsg}</div>
            </div>
        </Panel>
    )
    }

export const Userpanel = ({setLogged}) => {

    let logOut = () => {
        document.cookie = "username=;token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setLogged(false)
    }



    return (
        <Panel side="right" cName="userpanel">
            <div className="container">
                <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={logOut} type="primary" text="Log Out" />
            </div>
        </Panel>
    )
}
