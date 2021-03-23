import Input from "../universal/Input"
import Button from "../universal/Button"
import Modal from "../universal/Modal"
import "./Modals.css"
import { useState } from "react"


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
        console.log(data);
        if (data.success) {
            setLogged(false)
            setTimeout(() => {alert("Account Deleted")}, 50)
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

    const [errMsg, setErrMsg] = useState("")

    const close = () => {
        setState(false)
    }
    
    
    const restorePassword = async() => {
        const username = document.cookie.split(";")[0].split("=")[1]
        const password = document.querySelector("[name=ch-acc-passwd]").value
        const newPassword = document.querySelector("[name=ch-new-acc-passwd]").value
        const confNewPassword = document.querySelector("[name=ch-conf-acc-passwd]").value
        if (password) {
        let response = await fetch("http://localhost:8000/user/changePassword.php", {
            method: "POST",
            body: `{"username": "${username}", "password": "${password}", "newPassword": "${newPassword}"}`
        })
        let data = await response.json();
        console.log(data);
        if (data.success) {

        }
        else {
            document.querySelector(".delete-account .msg").innerText = data.message
        }
        }
    }

    return (
        <Modal cName="delete-account" height="250px" setState={setState} width="400px">
            <div className="rest-passwd content">
            <div className="msg">Change Password<br /> <span className="err-msg">{errMsg}</span></div>
            <Input name="ch-acc-passwd" label="Password" width="340px" type="password" autoComplete="current-password" />
            <Input name="ch-new-acc-passwd" label="New Password" width="340px" type="password" autoComplete="new-password" />
            <Input name="ch-conf-acc-passwd" label="Confirm Password" width="340px" type="password" autoComplete="new-password" />
            <Button style={{width: "167px", marginRight: "6px", height: "35px", borderRadius: "2px"}} action={close}  type="secondary" text="Cancel" />
            <Button style={{width: "167px", marginTop: "10px", height: "35px", borderRadius: "2px"}} action={restorePassword} type="primary" text="Confirm" />
            </div>
        </Modal>
    )
}
export const RestorePasswordModal = () => {

    return (
        <div>
            
        </div>
    )
}