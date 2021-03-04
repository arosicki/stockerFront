import "./Brand.css"
import BtnTransparent from "../Buttons/BtnTransparent"

let togglePanel = () => {
    let panel = document.querySelector(".panel-left");
    panel.classList.toggle("visible");
}

const Brand = () =>  (
        <BtnTransparent action={togglePanel} height="40px" width="150px" text="Stocker Inc." />
    )


export default Brand