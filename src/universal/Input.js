import './Input.css'

const FloatingLabel = ({name, label, width, type, autoComplete, doOnChange, value, disabled}) => {

    return (
    <div className="floating-label">
        <input name={name} value={value} style={{ width: width }} onChange={doOnChange} type={type} autoComplete={autoComplete} placeholder={label} disabled={disabled}></input>
        <label htmlFor={name}>{label}</label>
    </div>

    )
}

export default FloatingLabel
