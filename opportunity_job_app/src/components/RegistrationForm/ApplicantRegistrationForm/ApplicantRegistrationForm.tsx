"use client";

import "./../registration-form.scss";
import { useDictionary } from "@/hooks/useDictionary";
import { SyntheticEvent, useEffect, useState } from "react";
import InputField from "@/components/InputField/InputField";
import SelectField from "@/components/SelectField/SelectField";
import TextAreaField from "@/components/TextAreaField/TextAreaField";
import {
  applyAPIFormErrors,
  clearFormData,
  getInitialApplicantFormData,
  hasFormErrors,
  mapFormDataToApplicantAccount,
  validateFormData
} from "@/components/RegistrationForm/utils";
import { ApplicantFormData } from "@/components/RegistrationForm/types";
import { initialApplicantFormData } from "@/components/RegistrationForm/data";
import CredentialsFields from "@/components/RegistrationForm/CredentialsFields/CredentialsFields";
import { AuthService } from "@/api/authService";


interface ApplicantRegistrationFormProps {
  onSuccess(): void;

  onError(): void;
}

const ApplicantRegistrationForm = ({ onSuccess, onError }: ApplicantRegistrationFormProps) => {
  const { dict } = useDictionary();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ shouldDisplayFormErrors, setShouldDisplayFormErrors ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<ApplicantFormData>(initialApplicantFormData);
  const [ responseError, setResponseError ] = useState<string>("");

  useEffect(() => {
    if (isLoading) {
      getInitialApplicantFormData().then(data => {
        setFormData(data);
        setIsLoading(false);
      });
    }
  }, []);

  const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const validatedFormData = validateFormData(formData, dict);
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
      const accountData = mapFormDataToApplicantAccount(formData);
      await AuthService.registerApplicant(accountData);
      onSuccess();
      setFormData(clearFormData(formData));
    } catch (error: any) {
      handleResponseError(error);
    }
  };

  const handleResponseError = (error: any) => {
    if (error.response?.data?.errors) {
      const validatedFormData = applyAPIFormErrors(formData, error.response.data.errors);
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
    <form className="registration-form">
      <InputField
        label={ dict.applicantRegistrationForm.firstNameFieldLabel }
        placeholder={ dict.applicantRegistrationForm.firstNameFieldPlaceholder }
        value={ formData.first_name.value }
        onChange={ (value) => updateFormData(value, "first_name") }
        errors={ shouldDisplayFormErrors ? formData.first_name.errors : [] }
      />
      <InputField
        label={ dict.applicantRegistrationForm.lastNameFieldLabel }
        placeholder={ dict.applicantRegistrationForm.lastNameFieldPlaceholder }
        value={ formData.last_name.value }
        onChange={ (value) => updateFormData(value, "last_name") }
        errors={ shouldDisplayFormErrors ? formData.last_name.errors : [] }
      />
      <CredentialsFields
        formData={ formData }
        onUpdateFormData={ updateFormData }
        shouldDisplayFormErrors={ shouldDisplayFormErrors }
      />
      <SelectField
        label={ dict.applicantRegistrationForm.workExperienceFieldLabel }
        placeholder={ dict.applicantRegistrationForm.workExperienceFieldPlaceholder }
        value={ formData.work_experience.value }
        options={ formData.work_experience.options }
        onChange={ (value) => updateFormData(value, "work_experience") }
        errors={ shouldDisplayFormErrors ? formData.work_experience.errors : [] }
      />
      <SelectField
        label={ dict.applicantRegistrationForm.educationFieldLabel }
        placeholder={ dict.applicantRegistrationForm.educationFieldPlaceholder }
        value={ formData.education.value }
        options={ formData.education.options }
        onChange={ (value) => updateFormData(value, "education") }
        errors={ shouldDisplayFormErrors ? formData.education.errors : [] }
      />
      <TextAreaField
        label={ dict.applicantRegistrationForm.aboutFieldLabel }
        placeholder={ dict.applicantRegistrationForm.aboutFieldPlaceholder }
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

export default ApplicantRegistrationForm;
