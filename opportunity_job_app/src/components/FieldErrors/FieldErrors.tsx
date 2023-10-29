import React from "react";

interface FieldErrorsProps {
  errors?: string[];
}

const FieldErrors = ({ errors }: FieldErrorsProps) => {
  return (
    <div className="form-field__error-container">
      { errors && errors.map((error, index) => (
        <span key={ index } className="form-field__error">{ error }</span>
      )) }
    </div>
  );
};

export default FieldErrors;
