import './Modal.css'

const Modal = ({children, width, height, cName, setState}) => {

    const classNames = `modal ${cName}`

    const closeModal = () => {
        setState(false)
    }

    return (
        <div className={classNames}>
            <div style={{width: width, height: height}} className="modal-content">
                <span className="material-icons close-icon" onClick={closeModal}> close </span>
                {children}
            </div>
        </div>
    )
}

export default Modal
