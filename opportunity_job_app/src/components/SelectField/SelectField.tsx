import "./select-field.scss";
import React, { useEffect, useState } from "react";
import FieldErrors from "@/components/FieldErrors/FieldErrors";


export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  options: SelectOption[];
  value?: string;
  label?: string;
  placeholder?: string;

  onChange(value: string): void;

  withReversedColors?: boolean;
  errors?: string[];
}

const SelectField = (
  {
    options,
    value,
    label,
    placeholder,
    onChange,
    withReversedColors,
    errors
  }: SelectFieldProps
) => {
  const [ selectedOption, setSelectedOption ] = useState<SelectOption>();

  useEffect(() => {
    setSelectedOption(getSelectedOption());
  }, [ value, placeholder ]);

  const getSelectedOption = () => {
    if (value) return options.find(option => option.value === value);
    if (placeholder) return { value: "", label: placeholder };
    throw Error("Either 'value' or 'placeholder' must be defined");
  };

  const selectOption = (value: string) => {
    setSelectedOption(options.find(option => option.value === value)!);
    onChange(value);
  };

  const renderOptions = () => {
    return (
      <div className="form-field__options">
        { options.map(({ value, label }) => {
          let className = "form-field__option";
          if (selectedOption.value === value) {
            className += " form-field__option--selected";
          }
          return (
            <div key={ value } className={ className } onClick={ () => selectOption(value) }>
              { label }
            </div>
          );
        }) }
      </div>
    );
  };

  if (!selectedOption) return null;

  let fieldClassName = "form-field form-field--select";
  if (errors && errors.length) fieldClassName += " form-field--error";
  if (withReversedColors) fieldClassName += " form-field--reversed-colors";
  if (!label) fieldClassName += " form-field--no-label";

  let selectClassName = "form-field__value";
  if (!selectedOption.value) {
    selectClassName += " form-field__value--placeholder";
  }

  const selectCarrotImgPath = withReversedColors
    ? "/images/arrow-down-white.svg"
    : "/images/arrow-down-purple.svg";

  return (
    <div className={ fieldClassName }>
      { label && <span className="form-field-label">{ label }</span> }
      <div className={ selectClassName }>
        { selectedOption.label }
        <img className="select-carrot" src={ selectCarrotImgPath } alt="select carrot"/>
      </div>
      { renderOptions() }
      <FieldErrors errors={ errors }/>
    </div>
  );
};

export default SelectField;
