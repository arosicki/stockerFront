import "./BtnPrimary.css"

const BtnPrimary = ({ height, width, text, bRadius}) =>  <button style={{height: height, width: width, borderRadius: bRadius}} className="btn-primary">{text}</button>


export default BtnPrimary