import "./text-area-field.scss";
import React from "react";
import FieldErrors from "@/components/FieldErrors/FieldErrors";


interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  value: string;

  onChange(value: string): void;

  isRequired?: boolean;
  errors?: string[];
}

const TextAreaField = (
  {
    label,
    placeholder,
    value,
    onChange,
    isRequired = true,
    errors
  }: TextAreaFieldProps
) => {
  return (
    <label className={ `form-field ${ errors && errors.length ? "form-field--error" : "" }` }>
      <span className="form-field-label">
        { label }{ isRequired && <span className="form-field-label__asterisk">*</span> }
      </span>
      <textarea
        className="form-field__value form-field__value--text-area"
        value={ value }
        placeholder={ placeholder }
        onChange={ (event) => onChange(event.target.value) }
      />
      <FieldErrors errors={ errors }/>
    </label>
  );
};

export default TextAreaField;
