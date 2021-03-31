import "./Tabs.css"
import { useState, useEffect } from 'react'
import Button from "./../universal/Button"
import Loading from "../universal/Loading"

const Owned = () => {

    const [stocks, setStocks] = useState(<div style={{position: "absolute", transform: "translate(-50%, -50%)", left: "50%", top: "50%"}}><Loading size="120px" /></div>)

    useEffect(() => {
        (async () => {
            const cookie = document.cookie.split(";")
            const response = await fetch("http://localhost:8000/restricted/stocks/owned.php", {
                method: "POST",
                body: `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}"}`
            })
            const data = await response.json();
            let iter = 0;
            const stocks = data.result.map(({id, name, short, number}) => {
                iter++
                return (
                <tr key={id}>
                    <td className="id">{iter}</td>
                    <td className="medium">{name}</td>
                    <td className="small">{short}</td>
                    <td className="small">{number}</td>
                    <td className="button" style={{padding: 0}}><Button text="Sell" for={[id, name]} action={""} type="primary" style={{width: "90px", height: "32px"}} /></td>
                </tr>
                )
            })
            setStocks(stocks)
        })();


    }, [])

    return (
        <tbody>{stocks}</tbody>
    )
}

const Selling = () => {

    const [stocks, setStocks] = useState(<div style={{position: "absolute", transform: "translate(-50%, -50%)", left: "50%", top: "50%"}}><Loading size="120px" /></div>)

    useEffect(() => {
        (async () => {
            const cookie = document.cookie.split(";")
            const response = await fetch("http://localhost:8000/restricted/stocks/beingSold.php", {
                method: "POST",
                body: `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}"}`
            })
            const data = await response.json();
            let iter = 0;
            const stocks = data.result.map(({id, name, short, number}) => {
                iter++
                return (
                <tr key={id}>
                    <td className="id">{iter}</td>
                    <td className="medium">{name}</td>
                    <td className="small">{short}</td>
                    <td className="small">{number}</td>
                    <td className="button" style={{padding: 0}}><Button text="Cancel" for={""} action={""} type="primary" style={{width: "90px", height: "32px"}} /></td>
                </tr>
                )
            })
            setStocks(stocks)
        })();


    }, [])

    return (
        <tbody>{stocks}</tbody>
    )
}



const Tabs = () => {

    const [displayedStocks, setDisplayedStocks] = useState(true)
    


    const changeTab = (event) => {
        const owned = document.querySelector(".user-stocks .owned")
        const selling = document.querySelector(".user-stocks .selling")
        if (event.target.parentElement === owned) {
            selling.classList.remove("active")
            owned.classList.add("active")
            setDisplayedStocks(true)
        }
        else {
            owned.classList.remove("active")
            selling.classList.add("active")
            setDisplayedStocks(false)
        }
    }

    return (
        <div className="user-stocks">
            <div className="tabs">
                <div className="tab owned active" onClick={changeTab}>
                    <h2>Owned</h2>
                </div>
                <div className="tab selling" onClick={changeTab}>
                    <h2>Selling</h2>
                </div>
            </div>
            <div className="stocks">
                <table>
                <thead>
                    <tr>
                        <th className="id">#</th>
                        <th className="large" colSpan="2">Name</th>
                        <th className="small">Num</th>
                        <th style={{width: "90px", paddingRight: "15px"}}>Action</th>
                    </tr>
                </thead>
                {displayedStocks ? <Owned /> : <Selling />}
                </table> 
            </div>
        </div>
    )
}

export default Tabs
