import "./input-field.scss"


interface InputFieldProps {
    label: string;
    placeholder: string;
    onChange(value: string): void
    type?: string;
}

const InputField = ({ label, placeholder, onChange, type = "text" }: InputFieldProps) => {
    return (
        <label className="input-field">
            <span className="form-field-label">{ label }</span>
            <input
                className="input-field__input"
                type={ type }
                placeholder={ placeholder }
                onChange={ (event) => onChange(event.target.value) }
            />
        </label>
    )
}

export default InputField
