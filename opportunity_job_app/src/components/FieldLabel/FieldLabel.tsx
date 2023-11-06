import "./field-label.scss";
import React from "react";

interface FieldLabelProps {
  label: string;
  isRequired?: boolean;
}

const FieldLabel = ({ label, isRequired = true }: FieldLabelProps) => {
  return (
    <span className="form-field-label">
      { label }{ isRequired && <span className="form-field-label__asterisk">*</span> }
    </span>
  );
};

export default FieldLabel;
