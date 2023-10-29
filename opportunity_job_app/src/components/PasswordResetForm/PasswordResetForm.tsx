"use client";

import "./PasswordResetForm.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import InputField from "../InputField/InputField";
import Popup from "@/components/Popup/Popup";
import { validateFormData } from "@/utils";
import { useDictionary } from "@/hooks/useDictionary";

interface PasswordResetFormProps {
  token: string;
}

interface PasswordResetFormData {
  [key: string]: {
    value: string,
    error: string
  };
}

const getInitialFormData = (): PasswordResetFormData => {
  return {
    password: { value: "", error: "" },
    passwordConfirmation: { value: "", error: "" },
  };
};

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const { dict } = useDictionary();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ hasOpenedPopup, setHasOpenedPopup ] = useState<boolean>(false);
  const [ shouldDisplayFormErrors, setShouldDisplayFormErrors ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<PasswordResetFormData>(getInitialFormData);
  const [ responseError, setResponseError ] = useState<string>("");

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

    const validatedFormData = validateFormData(formData);
    setFormData(validatedFormData);

    if (hasFormErrors(validatedFormData)) {
      setShouldDisplayFormErrors(true);
    } else {
      setShouldDisplayFormErrors(false);
      resetPassword();
    }
  };

  const hasFormErrors = (formData: PasswordResetFormData) => {
    return !!(formData.password.error || formData.passwordConfirmation.error);
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
          errors={ shouldDisplayFormErrors ? formData.password.error : [] }
        />
        <InputField
          type="password"
          label={ dict.passwordResetForm.passwordConfirmFieldLabel }
          placeholder={ dict.passwordResetForm.passwordConfirmFieldPlaceholder }
          value={ formData.passwordConfirmation.value }
          onChange={ (value) => updateFormData(value, "passwordConfirmation") }
          errors={ shouldDisplayFormErrors ? formData.passwordConfirmation.error : [] }
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
