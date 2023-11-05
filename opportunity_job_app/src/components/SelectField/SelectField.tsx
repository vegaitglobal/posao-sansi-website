import "./select-field.scss";
import React, { useEffect, useRef, useState } from "react";
import FieldErrors from "@/components/FieldErrors/FieldErrors";
import { FIELD_WITH_ERRORS_CLASS_NAME } from "@/data/constants";


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
  isRequired?: boolean;
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
    isRequired = true,
    errors
  }: SelectFieldProps
) => {
  const [ selectedOption, setSelectedOption ] = useState<SelectOption>();
  const [ isOpened, setIsOpened ] = useState<boolean>(false);
  const selectRef = useRef(null);
  const documentClickRef = useRef(null);


  useEffect(() => {
    setSelectedOption(getSelectedOption());
    documentClickRef.current = handleClickOutside as any;
    document.addEventListener("click", documentClickRef.current);
    return () => document.removeEventListener("click", documentClickRef.current);
  }, [ value, placeholder ]);

  const handleClickOutside = (event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpened(false);
    }
  };

  const getSelectedOption = () => {
    if (value) return options.find(option => option.value === value);
    if (placeholder) return { value: "", label: placeholder };
    throw Error("Either 'value' or 'placeholder' must be defined");
  };

  const selectOption = (value: string) => {
    setSelectedOption(options.find(option => option.value === value)!);
    setIsOpened(!isOpened);
    onChange(value);
  };

  const renderOptions = () => {
    return (
      <div className="form-field__options">
        { options.map(({ value, label }) => {
          let className = "form-field__option";
          if (selectedOption!.value === value) {
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
  if (isOpened) fieldClassName += " form-field--opened";
  if (errors && errors.length) fieldClassName += ` ${ FIELD_WITH_ERRORS_CLASS_NAME }`;
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
      { label && (
        <span className="form-field-label">
          { label }{ isRequired && <span className="form-field-label__asterisk">*</span> }
        </span>
      ) }
      <div className={ selectClassName } onClick={ () => setIsOpened(!isOpened) } ref={ selectRef }>
        { selectedOption.label }
        <img className="select-carrot" src={ selectCarrotImgPath } alt="select carrot"/>
      </div>
      { renderOptions() }
      <FieldErrors errors={ errors }/>
    </div>
  );
};

export default SelectField;
