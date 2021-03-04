import BtnTransparent from '../../Buttons/BtnTransparent'
import BtnPrimary from '../../Buttons/BtnPrimary'


const NoUser = () => (
        <span className="navbar-nouser">
            <BtnTransparent height="40px" width="100px" text="Sign In"/>
            <BtnPrimary height="40px" width="100px" text="Sign Up"/>
        </span>
    )

export default NoUser
