import Navbar from './navbar/Navbar';
import Center from './center/Center';
import {useEffect, useState} from 'react'
import Button from './universal/Button'
import Loading from './universal/Loading'

const App = () => {

    const [stocks, setStocks] = useState(<Loading size="150px" />);
    const [stockData, setStockData] = useState([]);
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({username: "", money: "", registerDate: "" });

    useEffect( () => {

        let cookie = document.cookie

        let fetchUser = async (cookie) => {
            let response = await fetch("http://localhost:8000/restricted/getAccountProps.php", {
                method: "POST",
                body: `{"username": "${cookie[0].split("=")[1]}", "token": "${cookie[1].split("=")[1]}"}`
            })
            let data = await response.json();
            if (data.success) {
                    setUser({username: data.username, money: data.money, registerDate: data.registerDate })
            }
        }

        let cookieData = cookie.split(";")
        
        if (cookieData[2] && cookieData[1]) {
            let now = new Date()
            let expires = new Date(cookieData[2].split("=")[1]);
            if (cookieData[0].split("=")[1] && cookieData[1].split("=")[1] && now < expires) {
                setLogged(true)
                fetchUser(cookieData)
            }
        }

        

        const btnStyle = {
            width: "100px",
            height: "42px",
            float: "left"
        }

        let fetchData = async () => {
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
                    <td className="button" style={{padding: 0, width: "100px"}} ><Button text="Sell" type="secondary" style={btnStyle} /></td>
                    <td className="button" style={{padding: 0, width: "115px"}}><Button text="Buy" type="primary" style={btnStyle} /></td>
                </tr>
                )
            })
        setStockData(data.result)
        setStocks(stocks);
        }
        fetchData()
            
    }, [])


    return (
        <>
            <Navbar stockData={stockData} user={user} setUser={setUser} logged={logged} setLogged={setLogged} setStocks={setStocks} />
            <Center stocks={stocks} />
        </>
    )
}

export default App
