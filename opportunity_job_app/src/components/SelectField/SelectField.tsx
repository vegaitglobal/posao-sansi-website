import "./select-field.scss"

interface SelectOption {
    text: string,
    value: string
}

interface SelectFieldProps {
    label?: string;
    placeholder?: string;
    onChange(value: string): void;
    options: SelectOption[];
    selectedValue: string;
    invertColor?: boolean;
}

const SelectField = ({ label, placeholder, onChange, options, selectedValue, invertColor }: SelectFieldProps) => {
    
    const wrapperClass = invertColor ? "select-field invert-color" : "select-field"; 

    return (
        <div className={wrapperClass}>
            <label className="form-field-label">{ label }</label>
            <select className="select-field__input" value={selectedValue} onChange={ (event) => onChange(event.target.value)}>
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, i) => <option value={option.value}>{option.text}</option>)}
            </select>
        </div>
    )
}

export default SelectField
