import "./input-field.scss";
import React from "react";
import FieldErrors from "@/components/FieldErrors/FieldErrors";


interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  autocomplete?: string;

  onChange(value: string): void;

  type?: string;
  errors?: string[];
}

const InputField = (
  {
    label,
    placeholder,
    value,
    onChange,
    autocomplete = "off",
    type = "text",
    errors
  }: InputFieldProps
) => {
  return (
    <label className={ `form-field ${ errors && errors.length ? "form-field--error" : "" }` }>
      <span className="form-field-label">{ label }</span>
      <input
        className="form-field__value input-field__input"
        value={ value }
        type={ type }
        placeholder={ placeholder }
        onChange={ (event) => onChange(event.target.value) }
        autoComplete={ autocomplete }
      />
      <FieldErrors errors={ errors }/>
    </label>
  );
};

export default InputField;
