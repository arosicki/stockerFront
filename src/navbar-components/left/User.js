import './User.css';
import userlogo from '../../img/user.svg';


let showPanel = () => {
    let panel = document.querySelector(".panel-right");
    panel.classList.toggle("visible");
}

const User = () => (
        <button className="navbar-user" onClick={showPanel}>
            <span className="navbar-username">Username</span>
            <img className="navbar-logo" src={userlogo} alt="User logo"/>
        </button>
)

export default User
