import './Navbar.css';
import Button from '../universal/Button';
import userlogo from '../img/user.svg';
import {useState, useEffect} from 'react';
import Loading from '../universal/Loading';
import { LogInPanel, RegisterPanel, Userpanel } from '../side-panels/SidePanels';

const NoUser = ({setLogged, setUser}) => {

    
    let toggleLogIn = () => {
        const logIn = document.querySelector(".panel.log-in")
        const register = document.querySelector(".panel.register")
        if (register.classList.contains("visible")) {
            register.classList.remove("visible")
            setTimeout(() => logIn.classList.add("visible"), 350)
        }
        else {
            logIn.classList.toggle("visible")
        }
    }

    let toggleRegister = () => {
        const logIn = document.querySelector(".panel.log-in")
        const register = document.querySelector(".panel.register")
        if (logIn.classList.contains("visible")) {
            logIn.classList.toggle("visible")
            setTimeout(() => register.classList.toggle("visible"), 350)
        }
        else {
            register.classList.toggle("visible")
        }
        
    }

    let style = {
        height: "40px",
        width: "100px"
    }

    return(
    <span className="navbar-nouser">
        <LogInPanel setLogged={setLogged} setUser={setUser} />
        <RegisterPanel />
        <Button action={toggleLogIn} type="transparent" style={style} text="Sign In"/>
        <Button action={toggleRegister} type="primary" style={style} text="Sign Up"/>
    </span>
    )

}

const User = ({user, setLogged, setSelectedStock}) => {

    let togglePanel = () => {
        let panel = document.querySelector(".panel.userpanel");
        panel.classList.toggle("visible");
    }

    let style = {
        height: "40px",
        width: "200px",
        display: "flex",
        justifyContent: "center"
    }

    return (
        <>
        <Userpanel setSelectedStock={setSelectedStock} setLogged={setLogged}  />
        <Button action={togglePanel} type="transparent" style={style}>
            <span className="navbar-username">{user.username.length > 8 ? user.username.substr(0,6) + "..." : user.username}</span>
            <span className="navbar-money">${user.money}</span>
            <img className="navbar-userlogo" src={userlogo} alt="User logo"/>
        </Button>
        </>
    )
}
const Brand = () => {

    let style = {
        height: "40px",
        width: "150px",
        marginRight: "50px"
    }

    const closeAllPanels = () => {
        document.querySelectorAll(".panel").forEach((t) => {
            t.classList.remove("visible")
        })
    }


    return <Button type="transparent" action={closeAllPanels} style={style} text="Stocker Inc." />

}

const Search = ({setStocks, stockData}) => {

    let [searchPhrase, setSearchPhrase] = useState("");

    useEffect(() => {

        const btnStyle = {
            width: "100px",
            height: "42px",
            float: "left"
        }
        let value = document.querySelector(".navbar .search-input").value;
        let regex = new RegExp(`.*${value}.*`, "i")
        let iter = 0;
        let filteredStocks = stockData.filter(s => s.name.match(regex));
        let stocks = filteredStocks.length === 0 && value === "" ? <Loading size="150px" /> : filteredStocks.map(({id, name, short, price, number}) => {
            iter++
            return (
                <tr key={id}>
                <td className="id">{iter}</td>
                <td className="medium">{name}</td>
                <td className="small">{short}</td>
                <td className="small">${price}</td>
                <td className="small">{number}</td>
                <td className="button" style={{padding: 0, width: "100px"}} ><Button text="Sell" type="secondary" style={btnStyle} /></td>
                <td className="button" style={{padding: 0, width: "115px"}}><Button text="Buy" type="primary" style={btnStyle} /><div style={{color: 'transparent', width: "15px", height: "42px", float: "right", backgroundColor: "#4f4f4f"}}>a</div></td>
            </tr>
            )
        })
        setStocks(stocks);
    }, [searchPhrase]);

    return (
        <span className="search-bar">
            <label className="search-icon"><span className="material-icons"> search </span></label>
            <input className="search-input" value={searchPhrase.value} onChange={setSearchPhrase} type="text" placeholder="Search"></input>
        </span>
    )
}

const Navbar = ({setStocks, stockData, logged, setLogged, setUser, user, setSelectedStock}) => {

return (
    <nav className="navbar">
        <Brand />
        <Search stockData={stockData} setStocks={setStocks} />
        {logged ? <User user={user} setSelectedStock={setSelectedStock} setLogged={setLogged} /> : <NoUser setLogged={setLogged} setUser={setUser} />}
    </nav>
)
}

export default Navbar