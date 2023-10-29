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
import Popup from "@/components/Popup/Popup";


const ApplicantRegistrationForm = () => {
  const { dict } = useDictionary();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ hasOpenedSuccessPopup, setHasOpenedSuccessPopup ] = useState<boolean>(false);
  const [ hasOpenedErrorPopup, setHasOpenedErrorPopup ] = useState<boolean>(false);
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
      setHasOpenedSuccessPopup(true);
      setFormData(initialApplicantFormData);
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
      setHasOpenedErrorPopup(true);
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
      <Popup
        isOpened={ hasOpenedSuccessPopup }
        primaryText={ dict.registrationForm.successPopup.primaryText }
        secondaryText={ dict.registrationForm.successPopup.secondaryText }
        linkButton={ { url: "/", label: dict.registrationForm.successPopup.linkButtonLabel } }
      />
      <Popup
        isOpened={ hasOpenedErrorPopup }
        primaryText={ dict.registrationForm.errorPopup.primaryText }
        secondaryText={ dict.registrationForm.errorPopup.secondaryText }
      />
    </form>
  );
};

export default ApplicantRegistrationForm;
