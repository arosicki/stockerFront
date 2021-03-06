import "./Panel.css"

const Panel = ({side, children, cName}) => {

    let closePanel = () => {
        let panel = document.querySelector(`.panel-${side}.${cName}`);
        panel.classList.remove("visible");
    }

    return(
        <div className={`panel panel-${side} ${cName}`}>
            <span onClick={closePanel} className="material-icons close-icon"> close </span>
            {children}
        </div>
    )
}
export default Panel
