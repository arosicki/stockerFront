import "./Button.css"

const Button = ({ type, style, text, action, children, id}) =>  <button style={style} onClick={action} id={id} className={`btn btn-${type}`}>{text}{children}</button>;

export default Button