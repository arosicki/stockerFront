import Panel from "../universal/Panel"
import Input from "../universal/Input"
import Button from "../universal/Button"
import "./SidePanels.css"
import logInImg from "../img/logIn.png"
import registerImg from "../img/register.png"
import {useState, useEffect} from "react"
import Loading from "../universal/Loading"
import Tabs from "../tabs/Tabs"
import { ChangePasswordModal, DeleteAccountModal, RestorePasswordModal, CancelSellModal } from "../modals/Modals"


export const LogInPanel = ({setLogged, setUser}) => {

    const [loginErrMsg, setLoginErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [restPasswdDispModal, setRestPasswdDispModal] = useState(false);

    const restorePassword = () => {
        setRestPasswdDispModal(true)
    }


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
            document.cookie = `expires=${data.expires} GMT+0`
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
        <>
        {restPasswdDispModal ? <RestorePasswordModal setLogged={setLogged} setState={setRestPasswdDispModal} /> : ""}
        <Panel side="right" cName="log-in">
            <div className="container">
            {loading ? 
            <Loading size="100px" />
             : 
            <>
            <img style={{width: "340px"}} src={logInImg} alt="login" />
            <Input name="login-username" label="Username" width="340px" type="text" autoComplete="username" />
            <Input name="login-password" label="Password" width="340px" type="password" autoComplete="current-password" />
            <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={LogIn} type="primary" text="Sign In" />
            <div className="restore-password"><span  onClick={restorePassword} className="restore-text">Restore Password</span></div>
            <div className="err-msg">{loginErrMsg}</div>
            </>
            }           
            </div>
        </Panel>
        </>
    )
}

export const RegisterPanel = () => {

    const [registerErrMsg, setRegisterErrMsg] = useState("");
    const [registerErrClr, setRegisterErrClr] = useState("red");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    
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
            else if (username.length > 12) {
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

export const Userpanel = ({setLogged, setSelectedStock}) => {

    const [dispDelAccModal, setDispDelAccModal] = useState(false);
    const [dispDelSellModal, setDispDelSellModal] = useState(false);
    const [dispChPasswdModal, setDispChPasswdModal] = useState(false);
    const [selectedSellCancelation, setSelectedSellCancelation] = useState(1);


    let logOut = () => {
        document.cookie = "username=;token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setLogged(false)
    }
    let deleteAccount = () => {                     
        setDispDelAccModal(true)
    }
    let changePassword = () => {                     
        setDispChPasswdModal(true)
    }



    return (
        <>
        {dispDelAccModal ? <DeleteAccountModal setLogged={setLogged} setState={setDispDelAccModal} /> : ""}
        {dispChPasswdModal ? <ChangePasswordModal setLogged={setLogged} setState={setDispChPasswdModal} /> : ""}
        {dispDelSellModal ? <CancelSellModal selectedSellCancelation={selectedSellCancelation} setState={setDispDelSellModal} /> : ""}
        <Panel side="right" cName="userpanel">
            <div className="container">
                <Tabs setSelectedSellCancelation={setSelectedSellCancelation} setState={setDispDelSellModal} setSelectedStock={setSelectedStock} />
                <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={logOut} type="primary" text="Log Out" />
                <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={changePassword} type="primary" text="ChangePassword" />
                <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={deleteAccount} type="primary" text="Delete Account" />
            </div>
        </Panel>
        </>
    )
}

export const BuyStockPanel = ({selectedStock, logged}) => {

    const [prices, setPrices] = useState()
    const [stockName, setStockName] = useState()
    const [priceIsDisabled, setPriceIsDisabled] = useState(true)

    


    useEffect( () => {
        (async () => {
            const response = await fetch(`http://localhost:8000/stocks/view.php?id=${selectedStock}`, {
                method: "GET",
            })
            const data = await response.json();
            setStockName(data.result.name)
            let iter = 0;
            const prices = data.result.sells.map(({number, price}) => {
                iter++
                return (
                <tr key={iter}>
                    <td className="id">{number}</td>
                    <td className="medium">${price}</td>
                </tr>
                )
            })
            setPrices(prices)
        })();

    }, [selectedStock])

    const wasClicked = () => setPriceIsDisabled(!priceIsDisabled)

    const buyStock = async () => {
        const infoField = document.querySelector(".info-buy-msg")
        const cookie = document.cookie.split(";")
        const number = parseInt(document.querySelector("[name=buy-number]").value)
        const price = parseInt(document.querySelector("[name=buy-price]").value)
        const force = document.querySelector("[name=force]").checked
        const limitPrice = document.querySelector("[name=limit-price]").checked
        if (number && (price || !limitPrice)) {
            let req = `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}", ${limitPrice ? '"pricePerOne": "' + price + '", ' : ""} "number": ${number}, "stockId": ${selectedStock}, "force": ${force}}`
            const response = await fetch("http://localhost:8000/restricted/stocks/buy.php", {
                method: "POST",
                body: req
            })
            const data = await response.json();
            if (data.success) {
                infoField.innerText = "Success"
                infoField.style.color = "green"
            }
            else {
                infoField.innerText = data.message
                infoField.style.color = "red"
            }
        }
    }

    const checkNumber = () => {
        let numberField = document.querySelector("[name=buy-number]")
        if (numberField.value < 1) {
            numberField.value = 1
        }
    }
    const checkPrice = () => {
        let priceField = document.querySelector("[name=buy-price]")
        if (priceField.value < 1) {
            priceField.value = 1
        }
    }
    return (
        <Panel side="left" cName="buy-stock">
            <div className="top">
                <h2 style={{paddingBottom: "150px"}} className="buy-header">
                    Buy {stockName}
                </h2>
                <h3 style={{paddingBottom: "10px"}}>
                Current Offers:
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices}
                    </tbody>
                </table>
            </div>
            <div className="bottom">
                { logged ?
                <div className="form">
                <Input doOnChange={checkNumber} name="buy-number" label="Number"width="340px" type="number" />
                <input onClick={wasClicked} style={{float: "left", margin: "3px 5px 8px 3px"}} type="checkbox" name="limit-price"/>
                <label style={{float: "left", fontWeight: "normal", fontSize: "14px"}} htmlFor="limit-price">Limit Price</label>
                <Input doOnChange={checkPrice} name="buy-price" label="Price Per One" width="340px" type="number" disabled={priceIsDisabled} />
                <input style={{float: "left", margin: "3px 5px 8px 3px"}} type="checkbox" name="force"/>
                <label style={{float: "left", fontWeight: "normal", fontSize: "14px"}} htmlFor="force">Force</label>
                <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={buyStock} type="primary" text="Buy" />
                <div style={{paddingTop: "6px", height: "18px", fontSize: "18px"}} className="info-buy-msg"></div>
                </div>
                :
                <div>You must sign in to buy or sell stocks</div>
                }
            </div>
        </Panel>
    )
}

export const SellStockPanel = ({selectedStock, logged}) => {

    const [prices, setPrices] = useState()
    const [stockName, setStockName] = useState()


    


    useEffect( () => {(async () => {
            const response = await fetch(`http://localhost:8000/stocks/view.php?id=${selectedStock}`, {
                method: "GET",
            })
            const data = await response.json();
            setStockName(data.result.name)
            let iter = 0;
            const prices = data.result.sells.map(({number, price}) => {
                iter++
                return (
                <tr key={iter}>
                    <td className="id">{number}</td>
                    <td className="medium">${price}</td>
                </tr>
                )
            })
            setPrices(prices)
        })();}, [selectedStock])

    const sellStock = async () => {
        const infoField = document.querySelector(".info-sell-msg")
        const cookie = document.cookie.split(";")
        const number = parseInt(document.querySelector("[name=sell-number]").value)
        const price = parseInt(document.querySelector("[name=sell-price]").value)
        if (number && price) {
        const response = await fetch("http://localhost:8000/restricted/stocks/sell.php", {
                method: "POST",
                body: `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}", "pricePerOne": ${price}, "number": ${number}, "stockId": ${selectedStock}}`
            })
            const data = await response.json();
            if (data.success) {
                infoField.innerText = "Success"
                infoField.style.color = "green"
            }
            else {
                infoField.innerText = data.message
                infoField.style.color = "red"
            }
        }
    }


    const checkNumber = () => {
        let numberField = document.querySelector("[name=sell-number]")
        if (numberField.value < 1) {
            numberField.value = 1
        }
        
    }
    const checkPrice = () => {
        let priceField = document.querySelector("[name=sell-price]")
        if (priceField.value < 1) {
            priceField.value = 1
        }
    }
    return (
        <Panel side="left" cName="sell-stock">
            <div className="top">
                <h2 style={{paddingBottom: "150px"}} className="sell-header">
                    Sell {stockName}
                </h2>
                <h3 style={{paddingBottom: "10px"}}>
                Current Offers:
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices}
                    </tbody>
                </table>
            </div>
            <div className="bottom">
                { logged ?
                <div className="form">
                <Input doOnChange={checkNumber} name="sell-number" label="Number" width="340px" type="number" />
                <Input doOnChange={checkPrice} name="sell-price" label="Price Per One" width="340px" type="number" />
                <Button style={{width: "340px", height: "35px", borderRadius: "2px"}} action={sellStock} type="primary" text="Sell" />
                <div style={{paddingTop: "6px", height: "18px", fontSize: "18px"}} className="info-sell-msg"></div>
                </div>
                :
                <div>You must sign in to buy or sell stocks</div>
                }
            </div>
        </Panel>
    )
}