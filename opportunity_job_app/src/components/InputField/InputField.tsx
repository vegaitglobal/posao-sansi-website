import "./input-field.scss";


interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;

  onChange(value: string): void;

  type?: string;
  error?: string;
}

const InputField = ({ label, placeholder, value, onChange, type = "text", error = "" }: InputFieldProps) => {
  return (
    <label className={ `input-field ${ error ? "input-field--error" : "" }` }>
      <span className="form-field-label">{ label }</span>
      <input
        className="input-field__input"
        value={ value }
        type={ type }
        placeholder={ placeholder }
        onChange={ (event) => onChange(event.target.value) }
      />
      <span className="input-field__error">{ error }</span>
    </label>
  );
};

export default InputField;
