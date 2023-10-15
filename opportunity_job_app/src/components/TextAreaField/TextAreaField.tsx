import "./text-area-field.scss"


interface InputFieldProps {
    label: string;
    placeholder: string;
    onChange(value: string): void
}

const InputField = ({ label, placeholder, onChange }: InputFieldProps) => {
    return (
        <label className="text-area-field">
            <span className="form-field-label">{ label }</span>
            <textarea
                className="text-area-field__input"
                placeholder={ placeholder }
                onChange={ (event) => onChange(event.target.value) }
                maxLength={500}
                rows={10}
            />
        </label>
    )
}

export default InputField
