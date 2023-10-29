"use client";

import "./PasswordResetForm.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import InputField from "../InputField/InputField";
import Popup from "@/components/Popup/Popup";
import { validateFormData } from "@/utils";
import { useDictionary } from "@/hooks/useDictionary";
import { FormData, InputFieldProps } from "@/types";
import { hasFormErrors } from "@/components/RegistrationForm/utils";

interface PasswordResetFormProps {
  token: string;
}

interface PasswordResetFormData {
  password: InputFieldProps;
  password_confirmation: InputFieldProps;
}

const getInitialFormData = (): PasswordResetFormData => {
  return {
    password: { value: "", errors: [] },
    password_confirmation: { value: "", errors: [] },
  };
};

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const { dict } = useDictionary();
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [hasOpenedPopup, setHasOpenedPopup] = useState<boolean>(false);
  const [shouldDisplayFormErrors, setShouldDisplayFormErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState<PasswordResetFormData>(getInitialFormData);
  const [responseError, setResponseError] = useState<string>("");

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = () => {
    if (AuthService.isAuthenticated()) {
      window.location.href = "/";
    } else {
      setHasAccess(true);
    }
  };

  const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const validatedFormData = validateFormData(formData as FormData, dict);
    setFormData(validatedFormData as PasswordResetFormData);

    if (hasFormErrors(validatedFormData)) {
      setShouldDisplayFormErrors(true);
    } else {
      setShouldDisplayFormErrors(false);
      resetPassword();
    }
  };

  const resetPassword = async () => {
    try {
      await AuthService.resetPassword(token, formData.password.value);
      setFormData(getInitialFormData());
      setHasOpenedPopup(true);
    } catch (error: any) {
      setResponseError(error.response?.data?.errors?.non_field_errors);
    }
  };

  const updateFormData = (fieldValue: string, fieldName: string) => {
    const newFormData = { ...formData, [fieldName]: { ...formData[fieldName], value: fieldValue } };
    setFormData(newFormData);
  };

  if (!hasAccess) return null;

  return (
    <div className="wrapper">
      <p className="welcome-sentence">{ dict.passwordResetForm.topTextFirstLine }</p>
      <p className="welcome-sentence">{ dict.passwordResetForm.topTextSecondLine }</p>
      <form className="reset-password-form">
        <InputField
          type="password"
          label={ dict.passwordResetForm.passwordFieldLabel }
          placeholder={ dict.passwordResetForm.passwordFieldPlaceholder }
          value={ formData.password.value }
          onChange={ (value) => updateFormData(value, "password") }
          errors={ shouldDisplayFormErrors ? formData.password.errors : [] }
        />
        <InputField
          type="password"
          label={ dict.passwordResetForm.passwordConfirmFieldLabel }
          placeholder={ dict.passwordResetForm.passwordConfirmFieldPlaceholder }
          value={ formData.password_confirmation.value }
          onChange={ (value) => updateFormData(value, "password_confirmation") }
          errors={ shouldDisplayFormErrors ? formData.password_confirmation.errors : [] }
        />
        { responseError && <p className="error-message">{ responseError }</p> }
        <button className="form-submit-button" onClick={ handleSubmit }>
          { dict.passwordResetForm.submitButtonLabel }
        </button>
      </form>
      <Popup
        isOpened={ hasOpenedPopup }
        onClose={ () => setHasOpenedPopup(false) }
        primaryText={ dict.passwordResetForm.popup.primaryText }
        secondaryText={ dict.passwordResetForm.popup.secondaryText }
        linkButton={ { label: dict.passwordResetForm.popup.linkButtonLabel, url: "/login" } }
      />
    </div>
  );
};

export default PasswordResetForm;
