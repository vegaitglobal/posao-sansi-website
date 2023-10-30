"use client";

import "./../registration-form.scss";
import { useDictionary } from "@/hooks/useDictionary";
import { SyntheticEvent, useEffect, useState } from "react";
import InputField from "@/components/InputField/InputField";
import TextAreaField from "@/components/TextAreaField/TextAreaField";
import {
  applyAPIFormErrors,
  clearFormData,
  hasFormErrors,
  mapFormDataToEmployerAccount,
} from "@/components/RegistrationForm/utils";
import { EmployerFormData } from "@/components/RegistrationForm/types";
import { initialEmployerFormData } from "@/components/RegistrationForm/data";
import CredentialsFields from "@/components/RegistrationForm/CredentialsFields/CredentialsFields";
import { AuthService } from "@/api/authService";
import { validateFormData } from "@/utils";


interface EmployerRegistrationFormProps {
  onSuccess(): void;

  onError(): void;
}

const EmployerRegistrationForm = ({ onSuccess, onError }: EmployerRegistrationFormProps) => {
  const { dict } = useDictionary();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldDisplayFormErrors, setShouldDisplayFormErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState<EmployerFormData>(initialEmployerFormData);
  const [responseError, setResponseError] = useState<string>("");

  useEffect(() => {
    if (isLoading) {
      setFormData(initialEmployerFormData);
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const validatedFormData = validateFormData<EmployerFormData>(formData, dict);
    setFormData(validatedFormData);

    if (hasFormErrors(validatedFormData)) {
      setShouldDisplayFormErrors(true);
    } else {
      setShouldDisplayFormErrors(false);
      register();
    }
  };

  const register = async () => {
    try {
      const accountData = mapFormDataToEmployerAccount(formData);
      await AuthService.registerEmployer(accountData);
      onSuccess();
      const clearedFormData = clearFormData<EmployerFormData>(formData);
      setFormData(clearedFormData);
    } catch (error: any) {
      handleResponseError(error);
    }
  };

  const handleResponseError = (error: any) => {
    if (error.response?.data?.errors) {
      const validatedFormData = applyAPIFormErrors<EmployerFormData>(formData, error.response.data.errors);
      setFormData(validatedFormData);
      setResponseError(error.response.data.errors.non_field_errors);
      setShouldDisplayFormErrors(true);
    } else {
      onError();
    }
  };

  const updateFormData = (fieldValue: string, fieldName: string) => {
    const newFormData = { ...formData, [fieldName]: { ...formData[fieldName], value: fieldValue } };
    setFormData(newFormData);
  };

  if (isLoading) return null;

  return (
    <form className="form-page__form">
      <CredentialsFields
        formData={ formData }
        onUpdateFormData={ updateFormData }
        shouldDisplayFormErrors={ shouldDisplayFormErrors }
      />
      <InputField
        label={ dict.employerRegistrationForm.companyNameFieldLabel }
        placeholder={ dict.employerRegistrationForm.companyNameFieldPlaceholder }
        value={ formData.company_name.value }
        onChange={ (value) => updateFormData(value, "company_name") }
        errors={ shouldDisplayFormErrors ? formData.company_name.errors : [] }
      />
      <InputField
        type="number"
        label={ dict.employerRegistrationForm.pibFieldLabel }
        placeholder={ dict.employerRegistrationForm.pibFieldPlaceholder }
        value={ formData.pib.value }
        onChange={ (value) => updateFormData(value, "pib") }
        errors={ shouldDisplayFormErrors ? formData.pib.errors : [] }
      />
      <InputField
        label={ dict.employerRegistrationForm.addressFieldLabel }
        placeholder={ dict.employerRegistrationForm.addressFieldPlaceholder }
        value={ formData.address.value }
        onChange={ (value) => updateFormData(value, "address") }
        errors={ shouldDisplayFormErrors ? formData.address.errors : [] }
      />
      <InputField
        label={ dict.employerRegistrationForm.phoneNumberFieldLabel }
        placeholder={ dict.employerRegistrationForm.phoneNumberFieldPlaceholder }
        value={ formData.phone_number.value }
        onChange={ (value) => updateFormData(value, "phone_number") }
        errors={ shouldDisplayFormErrors ? formData.phone_number.errors : [] }
      />
      <InputField
        label={ dict.employerRegistrationForm.urlFieldLabel }
        placeholder={ dict.employerRegistrationForm.urlFieldPlaceholder }
        value={ formData.url.value }
        onChange={ (value) => updateFormData(value, "url") }
        errors={ shouldDisplayFormErrors ? formData.url.errors : [] }
      />
      <TextAreaField
        label={ dict.employerRegistrationForm.aboutFieldLabel }
        placeholder={ dict.employerRegistrationForm.aboutFieldPlaceholder }
        value={ formData.about.value }
        onChange={ (value) => updateFormData(value, "about") }
        errors={ shouldDisplayFormErrors ? formData.about.errors : [] }
      />
      { responseError && <p className="form-field__error">{ responseError }</p> }
      <button className="form-submit-button" onClick={ handleSubmit }>
        { dict.registrationForm.submitButtonLabel }
      </button>
    </form>
  );
};

export default EmployerRegistrationForm;
