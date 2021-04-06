import Input from "../universal/Input"
import Button from "../universal/Button"
import Modal from "../universal/Modal"
import "./Modals.css"
import { useState, useEffect } from "react"


export const DeleteAccountModal = ({setState, setLogged}) => {

    const close = () => {
        setState(false)
    }
    
    const deleteAccount = async() => {
        const username = document.cookie.split(";")[0].split("=")[1]
        const password = document.querySelector("[name=del-acc-passwd]").value
        if (password) {
        let response = await fetch("http://localhost:8000/user/delete.php", {
            method: "POST",
            body: `{"username": "${username}", "password": "${password}"}`
        })
        let data = await response.json();
        if (data.success) {
            setLogged(false)
            document.cookie = "username=;token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            setTimeout(() => {
                alert("Account Deleted")
            }, 50);
        }
        else {
            document.querySelector(".delete-account .msg").innerText = data.message
        }
        }
    }

    return (
        <Modal cName="delete-account" height="250px" setState={setState} width="400px">
            <div className="del-acc content">
            <div className="msg">After deleting your account you won't be able to recover it.</div>
            <Input name="del-acc-passwd" label="Password" width="340px" type="password" autoComplete="current-password" />
            <Button style={{width: "167px", marginRight: "6px", marginTop: "25px", height: "35px", borderRadius: "2px"}} action={deleteAccount} type="secondary" text="Confirm" />
            <Button style={{width: "167px", height: "35px", borderRadius: "2px"}} action={close}  type="primary" text="Cancel" />
            </div>
        </Modal>
    )
}
export const ChangePasswordModal = ({setState}) => {

    const [newPassword, setNewPassword] = useState("")
    const [displayInfo, setdisplayInfo] = useState(false)
    const [displayText, setdisplayText] = useState("")
    const [confNewPassword, setConfNewPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")


    useEffect(() => {
        let errField = document.querySelector(".err-msg")
        const newPassword = document.querySelector("[name=ch-new-acc-passwd]").value
        const confNewPassword = document.querySelector("[name=ch-conf-acc-passwd]").value
        setErrMsg("")
        if (newPassword) {
            if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*([!@$%&*?#])).+$/g)) {
                setErrMsg("Password does not meet requirements.");
            }
            else if(newPassword.length < 7) {
                setErrMsg("Password is too short.");
            }
            else if(newPassword.length > 32) {
                setErrMsg("Password is too long.");
            }
            else {
                setErrMsg("");
            }
        }
        if (confNewPassword && !errField.innerText.match(/password\b/g)) {
            if (confNewPassword !== newPassword) {
                setErrMsg("Passwords do not match.");
            }
            else {
                setErrMsg("");
            }    
        }

    }, [newPassword, confNewPassword])

    const close = () => {
        setState(false)
    }
    
    
    const changePassword = async() => {
        const username = document.cookie.split(";")[0].split("=")[1]
        const password = document.querySelector("[name=ch-acc-passwd]").value
        const newPassword = document.querySelector("[name=ch-new-acc-passwd]").value
        const confNewPassword = document.querySelector("[name=ch-conf-acc-passwd]").value
        if (password && newPassword && confNewPassword) {
        let response = await fetch("http://localhost:8000/user/changePassword.php", {
            method: "POST",
            body: `{"username": "${username}", "password": "${password}", "newPassword": "${newPassword}"}`
        })
        let data = await response.json();
        if (data.success) {
            setdisplayText("Password Changed.")
            setdisplayInfo(true)
        }
        else {
            document.querySelector(".delete-account .msg").innerText = data.message
        }
        }
    }

    return (
        <Modal cName="change-password" height="250px" setState={setState} width="400px">
            {displayInfo ? 
            <div className="info-modal">
            <div className="ultra-useful-container">
            <div>{displayText}</div>
            </div>
            <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={close}  type="primary" text="Close" />
            </div>
             : 
            <div className="chg-passwd content">
            <div className="msg">Change Password<br /> <span className="err-msg">{errMsg}</span></div>
            <Input name="ch-acc-passwd" label="Password" width="340px" type="password" autoComplete="current-password" />
            <Input name="ch-new-acc-passwd" label="New Password" value={newPassword} doOnChange={setNewPassword} width="340px" type="password" autoComplete="new-password" />
            <Input name="ch-conf-acc-passwd" label="Confirm Password" value={confNewPassword} doOnChange={setConfNewPassword} width="340px" type="password" autoComplete="new-password" />
            <Button style={{width: "167px", marginRight: "6px", height: "35px", borderRadius: "2px"}} action={close}  type="secondary" text="Cancel" />
            <Button style={{width: "167px", marginTop: "10px", height: "35px", borderRadius: "2px"}} action={changePassword} type="primary" text="Confirm" />
            </div>
            }
        </Modal>
    )
}
export const RestorePasswordModal = ({setState}) => {

    const [displayInfo, setdisplayInfo] = useState(false)
    const [displayText, setdisplayText] = useState("")

    const close = () => {
        setState(false)
    }

    const restorePassword = async() => {
        const username = document.querySelector("[name=rest-uname]").value
        if (username) {
        let response = await fetch("http://localhost:8000/user/restorePassword.php", {
            method: "POST",
            body: `{"username": "${username}"}`
        })
        let data = await response.json();
        if (data.success) {
            setdisplayText("New Password: " + data.NewPassword)
            setdisplayInfo(true)
        }
        else {
            document.querySelector(".rest-passwd .err-msg").innerText = data.message
        }
        }
    }

    return (
        <Modal cName="change-password" height="250px" setState={setState} width="400px">
            {displayInfo ? 
            <div className="info-modal">
            <div className="ultra-useful-container">
            <div>{displayText}</div>
            </div>
            <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={close}  type="primary" text="Close" />
            </div>
             : 
            <div className="rest-passwd content">
            <div className="msg">Change Password<br /> <div className="err-msg"></div></div>
            <Input name="rest-uname" label="Username" width="340px" type="username" autoComplete="username" />
            <Button style={{width: "167px", marginRight: "6px", height: "35px", borderRadius: "2px", marginTop: "50px"}} action={close}  type="secondary" text="Cancel" />
            <Button style={{width: "167px", marginTop: "10px", height: "35px", borderRadius: "2px"}} action={restorePassword} type="primary" text="Confirm" />
            </div>
            }
        </Modal>
    )
}
export const CancelSellModal = ({setState, selectedSellCancelation}) => {

    const [displayInfo, setdisplayInfo] = useState(false)
    const [displayText, setdisplayText] = useState("")

    const close = () => {
        setState(false)
    }

    const cancelSell = async() => {
        const cookie = document.cookie.split(";")
        let response = await fetch("http://localhost:8000/restricted/stocks/cancelSell.php", {
            method: "POST",
            body: `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}", "id": "${selectedSellCancelation}"}`
        })
        let data = await response.json();
        if (data.success) {
            close()
        }
        else {
            document.querySelector(".cancel-sell .err-msg").innerText = data.message
        }
    }

    return (
        <Modal cName="change-password" height="250px" setState={setState} width="400px">
            {displayInfo ? 
            <div className="info-modal">
            <div className="ultra-useful-container">
            <div>{displayText}</div>
            </div>
            <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={close}  type="primary" text="Close" />
            </div>
             : 
            <div className="cancel-sell content">
            <div className="msg">Cancel stock sell offer?<br /> <div className="err-msg"></div></div>
            <Button style={{width: "167px", marginRight: "6px", height: "35px", borderRadius: "2px", marginTop: "50px"}} action={close}  type="secondary" text="Cancel" />
            <Button style={{width: "167px", marginTop: "10px", height: "35px", borderRadius: "2px"}} action={cancelSell} type="primary" text="Confirm" />
            </div>
            }
        </Modal>
    )
}