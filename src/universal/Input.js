import './Input.css'

const FloatingLabel = ({name, label, width, type, autoComplete}) => (

    <div className="floating-label">
        <input name={name} style={{ width: width }} type={type} autoComplete={autoComplete} placeholder={label}></input>
        <label htmlFor={name}>{label}</label>
    </div>

    )

export default FloatingLabel
