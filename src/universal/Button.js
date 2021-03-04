import { Children } from "react";
import "./Button.css"

const Button = ({ type, style, text, action, children}) =>  <button style={style} onClick={action} className={`btn btn-${type}`}>{text}{children}</button>;

export default Button