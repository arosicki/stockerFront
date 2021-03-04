import "./Panel.css"

const Panel = ({side, children}) => {

    let closePanel = () => {
        let panel = document.querySelector(`.panel-${side}`);
        panel.classList.remove("visible");
    }

    return(
        <div className={`panel panel-${side}`}>
            <span onClick={closePanel} className="material-icons close-icon"> close </span>
            {children}
        </div>
    )
}
export default Panel
