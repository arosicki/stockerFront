import "./Navbar.css";
import Search from './navbar-components/Search';
import Brand from './navbar-components/Brand';
import Left from './navbar-components/Left';


const Navbar = () => (
        <nav className="navbar">
            <Brand />
            <Search />
            <Left />
        </nav>
    )

export default Navbar
