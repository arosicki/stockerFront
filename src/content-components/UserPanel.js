import Panel from '../Side-Panels/Panel'
import usericon from '../img/user.svg'
import BtnPrimary from '../Buttons/BtnPrimary'
import FloatingLabel from '../Input/FloatingLabel'
import './UserPanel.css'


const UserPanel = () => { 

    let date = new Date().toUTCString();
    
    
    return ( <Panel side="right">
         <div className="panel-user">
            <img className="panel-usericon" src={usericon} alt="usericon"/>
            <div className="panel-username">{"Username"}</div>
            <div>Since:</div>
            <div>{date}</div>
         </div>
        <div className="change-password">
            <FloatingLabel width="340px" type="password" name="password" autoComplete="current-password" label="Password" />
            <FloatingLabel width="340px" type="password" name="password" autoComplete="new-password" label="New Password"  />
            <FloatingLabel width="340px" type="password" name="password" autoComplete="new-password" label="Confirm Password" />
            <BtnPrimary text="Change Password" height="35px" width="340px" bRadius="2px"></BtnPrimary>
        </div>
         </Panel>   
    )
}

export default UserPanel
