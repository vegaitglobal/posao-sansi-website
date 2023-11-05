import "./input-field.scss";
import React from "react";
import FieldErrors from "@/components/FieldErrors/FieldErrors";
import { FIELD_WITH_ERRORS_CLASS_NAME } from "@/data/constants";


interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  autocomplete?: string;

  onChange(value: string): void;

  type?: string;
  isRequired?: boolean;
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
    isRequired = true,
    errors
  }: InputFieldProps
) => {
  return (
    <label className={ `form-field ${ errors && errors.length ? FIELD_WITH_ERRORS_CLASS_NAME : "" }` }>
      <span className="form-field-label">
        { label }{ isRequired && <span className="form-field-label__asterisk">*</span> }
      </span>
      <input
        className="form-field__value input-field__value--input"
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
