"use client";

import "./../registration-form.scss";
import InputField from "@/components/InputField/InputField";
import { useDictionary } from "@/hooks/useDictionary";
import { AuthService } from "@/api/authService";
import { SyntheticEvent, useEffect, useState } from "react";
import SelectField from "@/components/SelectField/SelectField";
import {
  applyAPIFormErrors,
  getInitialApplicantFormData,
  hasFormErrors,
  mapFormDataToApplicantAccount,
  validateFormData
} from "@/components/RegistrationForm/utils";
import { ApplicantFormData } from "@/components/RegistrationForm/types";
import { initialApplicantFormData } from "@/components/RegistrationForm/data";
import CredentialFields from "@/components/RegistrationForm/CredentialFields/CredentialFields";
import { deepCopy } from "@/utils";


const ApplicantRegistrationForm = () => {
  const { dict } = useDictionary();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldDisplayFormErrors, setShouldDisplayFormErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState<ApplicantFormData>(initialApplicantFormData);
  const [responseError, setResponseError] = useState<string>("");

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

    // if (hasFormErrors(validatedFormData)) {
    //   setShouldDisplayFormErrors(true);
    // } else {
    //   setShouldDisplayFormErrors(false);
    //   register();
    // }
    setShouldDisplayFormErrors(false);
    register();
  };

  const register = async () => {
    try {
      const accountData = mapFormDataToApplicantAccount(formData);

      console.log("accountData:", accountData);

      await AuthService.registerApplicant(accountData);
      setFormData(initialApplicantFormData);
    } catch (error: any) {
      const validatedFormData = applyAPIFormErrors(formData, error.response.data.errors);
      setFormData(validatedFormData);
      setResponseError(error.response?.data?.errors?.non_field_errors);
      setShouldDisplayFormErrors(true);
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
      <CredentialFields
        formData={ formData }
        onUpdateFormData={ updateFormData }
        shouldDisplayFormErrors={ shouldDisplayFormErrors }
      />
      <SelectField
        label={ dict.applicantRegistrationForm.workExperienceFieldLabel }
        placeholder={ dict.applicantRegistrationForm.workExperienceFieldPlaceholder }
        onChange={ (value) => updateFormData(value, "work_experience") }
        options={ formData.work_experience.options }
        errors={ shouldDisplayFormErrors ? formData.work_experience.errors : [] }
      />
      <SelectField
        label={ dict.applicantRegistrationForm.educationFieldLabel }
        placeholder={ dict.applicantRegistrationForm.educationFieldPlaceholder }
        onChange={ (value) => updateFormData(value, "education") }
        options={ formData.education.options }
        errors={ shouldDisplayFormErrors ? formData.education.errors : [] }
      />
      <InputField
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
