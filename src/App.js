import Navbar from './navbar/Navbar';
import Center from './center/Center';
import { useEffect, useState } from 'react'
import Button from './universal/Button'
import Loading from './universal/Loading'

const App = () => {

    const [stocks, setStocks] = useState(<Loading size="150px" />);
    const [stockData, setStockData] = useState([]);
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({username: "", money: "", registerDate: "" });
    const [selectedStock, setSelectedStock] = useState(1);


    useEffect( () => {
        const btnStyle = {
            width: "100px",
            height: "42px",
            float: "left"
        }

        setInterval(async() => {
            if (document.querySelector(".panel.userpanel")) {
            const cookie = document.cookie.split(";")
            const NOW = new Date()
            const TEN_MINS_LATER = new Date(NOW.getTime() + 600000)
            console.log("x");
            const tokenExpiryDate = new Date(cookie[2].split("=")[1])
            if (tokenExpiryDate < TEN_MINS_LATER) {
                let response = await fetch("http://localhost:8000/token/generateNew.php", {
                        method: "POST",
                        body: `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}"}`
                    })
                    let data = await response.json();
                    if (data.success) {
                        document.cookie = `token=${data.token}`
                        document.cookie = `expires=${data.expires} GMT+0`
                        console.log("d");
                    }
                    else {
                        console.error(`Couldn't extend token: ${data.message}`)
                        console.log("D");
                    }
            }
        }
        }, 540000);

        let toggleSellPanel = ({target}) => {
            const sellPanel = document.querySelector(".sell-stock.panel")
            const buyPanel = document.querySelector(".buy-stock.panel")
            const selectedStock = document.querySelector("#giga-ultra-useful-container").innerText
            if (buyPanel.classList.contains("visible")) {
                buyPanel.classList.remove("visible")
                setSelectedStock(target.id)
                setTimeout(() => sellPanel.classList.add("visible"), 350)
            }
            else {
                if (sellPanel.classList.contains("visible") && target.id !== selectedStock) {
                    sellPanel.classList.remove("visible")
                    setTimeout(() => setSelectedStock(target.id), 150)
                    setTimeout(() => sellPanel.classList.add("visible"), 500)
                }
                else {
                    sellPanel.classList.toggle("visible")
                }

            }
        }

        let toggleBuyPanel = (e) => {
            const sellPanel = document.querySelector(".sell-stock.panel")
            const buyPanel = document.querySelector(".buy-stock.panel")
            const selectedStock = document.querySelector("#giga-ultra-useful-container").innerText
            if (sellPanel.classList.contains("visible")) {
                sellPanel.classList.remove("visible")
                setSelectedStock(e.target.id)
                setTimeout(() => buyPanel.classList.add("visible"), 350)
            }
            else {
                if (buyPanel.classList.contains("visible") && e.target.id !== selectedStock) {
                    buyPanel.classList.remove("visible")
                    setTimeout(() => setSelectedStock(e.target.id), 150)
                    setTimeout(() => buyPanel.classList.add("visible"), 500)
                }
                else {
                    buyPanel.classList.toggle("visible")
                }
            }
        }


        let cookie = document.cookie

        let cookieData = cookie.split(";")
        
        if (cookieData[2] && cookieData[1]) {
            let now = new Date()
            let expires = new Date(cookieData[2].split("=")[1]);
            if (cookieData[0].split("=")[1] && cookieData[1].split("=")[1] && now < expires) {
                (async (cookie) => {
                    setLogged(true)
                    let response = await fetch("http://localhost:8000/restricted/getAccountProps.php", {
                        method: "POST",
                        body: `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}"}`
                    })
                    let data = await response.json();
                    if (data.success) {
                            setUser({username: data.username, money: data.money, registerDate: data.registerDate })
                    }
                })(cookieData);
            }
        }


        (async () => {
            const response = await fetch("http://localhost:8000/stocks/view.php", {
                method: "GET",
            })
            const data = await response.json();
            let iter = 0;
            const stocks = data.result.map(({id, name, short, price, number}) => {
                iter++
                return (
                <tr key={id}>
                    <td className="id">{iter}</td>
                    <td className="medium">{name}</td>
                    <td className="small">{short}</td>
                    <td className="small">${price}</td>
                    <td className="small">{number}</td>
                    <td className="button" style={{padding: 0, width: "100px"}} ><Button text="Sell" id={id} action={toggleSellPanel} type="secondary" style={btnStyle} /></td>
                    <td className="button" style={{padding: 0, width: "115px"}}><Button text="Buy" id={id} action={toggleBuyPanel} type="primary" style={btnStyle} /></td>
                </tr>
                )
            })
        setStockData(data.result)
        setStocks(stocks);
        })();
            
    }, [])


    return (
        <>
            <div style={{display: 'none'}} id="giga-ultra-useful-container">{selectedStock}</div>
            <Navbar stockData={stockData} user={user} setUser={setUser} setSelectedStock={setSelectedStock} logged={logged} setLogged={setLogged} setStocks={setStocks} />
            <Center stocks={stocks} logged={logged} selectedStock={selectedStock} />
        </>
    )
}

export default App
