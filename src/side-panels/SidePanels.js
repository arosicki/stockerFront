import Panel from "../universal/Panel"
import Input from "../universal/Input"
import Button from "../universal/Button"
import "./SidePanels.css"
import logInImg from "../img/logIn.png"
import registerImg from "../img/register.png"
import {useState} from "react"
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
    return (
        <Panel side="right" cName="register">
            <div className="container">
            <img style={{width: "340px", marginBottom: "20px"}} src={registerImg} alt="register"/>
            <Input name="register-username" label="Username" width="340px" type="text" autoComplete="username" />
            <Input name="register-password" label="Password" width="340px" type="password" autoComplete="new-password" />
            <Input name="register-repeat-password" label="Confirm password" width="340px" type="password" autoComplete="new-password" />
            <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} type="primary" text="Sign Up" />
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
