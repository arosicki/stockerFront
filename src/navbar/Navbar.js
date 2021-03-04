import './Navbar.css';
import Button from '../universal/Button';
import userlogo from '../img/user.svg';
import Panel from '../universal/Panel'

const NoUser = () => {
    let style = {
        height: "40px",
        width: "150px"
    }
    return(
    <span className="navbar-nouser">
        <Button type="transparent" style={style} text="Sign In"/>
        <Button type="primary" style={style} text="Sign Up"/>
    </span>
)
    }

const User = () => {

    let showPanel = () => {
        let panel = document.querySelector(".panel-right");
        panel.classList.toggle("visible");
    }

    let closePanel = () => {
        let panel = document.querySelector(`.panel-right`);
        panel.classList.remove("visible");
    }


    let style = {
        height: "40px",
        width: "150px",
        display: "flex",
        justifyContent: "center"
    }

    return (
        <Button action={showPanel} type="transparent" style={style}>
            <Panel side="right" />
            <span className="navbar-username">Username</span>
            <img className="navbar-userlogo" src={userlogo} alt="User logo"/>
        </Button>
    )
}
const Brand = () => {

    let style = {
        height: "40px",
        width: "150px"
    }

    let togglePanel = () => {
        let panel = document.querySelector(".panel-left");
        panel.classList.toggle("visible");
    }

    return <Button type="transparent" action={togglePanel} style={style} text="Stocker Inc." />

}

const Search = () => {
    return (
        <span className="search-bar">
            <label className="search-icon"><span className="material-icons"> search </span></label>
            <input className="search-input" type="text" placeholder="Search"></input>
        </span>
    )
}

const Navbar = () => (
    <nav className="navbar">
        <Brand />
        <Search />
        <User />
    </nav>
)

export default Navbar