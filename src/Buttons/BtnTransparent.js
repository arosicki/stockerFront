import "./BtnTransparent.css"

const BtnTransparent = ({ height, width, text, action}) =>  <button style={{height: height, width: width}} onClick={action} className="btn-transparent">{text}</button>;


export default BtnTransparent