"use client";

import "./../../scss/components/form-page.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import InputField from "../InputField/InputField";
import Popup from "@/components/Popup/Popup";
import { validateFormData } from "@/utils";
import { useDictionary } from "@/hooks/useDictionary";
import { FormData, InputFieldProps } from "@/types";
import { hasFormErrors } from "@/components/RegistrationForm/utils";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";
import Spinner from "@/components/Spinner/Spinner";
import { HOME_LINK, LOGIN_LINK } from "@/data/links";

interface PasswordResetFormProps {
  token: string;
}

interface PasswordResetFormData extends FormData {
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
  const { dict, locale } = useDictionary();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [hasOpenedPopup, setHasOpenedPopup] = useState<boolean>(false);
  const [shouldDisplayFormErrors, setShouldDisplayFormErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState<PasswordResetFormData>(getInitialFormData);
  const [responseError, setResponseError] = useState<string>("");

  useEffect(() => {
    if (isLoading) {
      checkAccess();
      setIsLoading(false);
    }
  }, [isLoading]);

  const checkAccess = () => {
    if (AuthService.isAuthenticated()) {
      window.location.href = HOME_LINK.getPathname(locale);
    } else {
      setHasAccess(true);
    }
  };

  const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const validatedFormData = validateFormData<PasswordResetFormData>(formData, dict);
    setFormData(validatedFormData);

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

  const updateFormData = (fieldValue: string, fieldName: keyof PasswordResetFormData) => {
    const newFormData = {
      ...formData,
      [fieldName]: { ...formData[fieldName], value: fieldValue }
    };
    setFormData(newFormData);
  };

  if (isLoading) return <Spinner/>;

  return hasAccess && (
    <div className="form-page">
      <div className="form-page__left">
        <div className="form-page__message">
          <p>{ dict.passwordResetForm.topTextFirstLine }</p>
          <p>{ dict.passwordResetForm.topTextSecondLine }</p>
        </div>
        <form className="form-page__form">
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
          { responseError && <p className="form-field__error">{ responseError }</p> }
          <button className="form-submit-button" onClick={ handleSubmit }>
            { dict.passwordResetForm.submitButtonLabel }
          </button>
        </form>
        <Popup
          isOpened={ hasOpenedPopup }
          onClose={ () => setHasOpenedPopup(false) }
          primaryText={ dict.passwordResetForm.popup.primaryText }
          secondaryText={ dict.passwordResetForm.popup.secondaryText }
          linkButton={ {
            label: dict.passwordResetForm.popup.linkButtonLabel,
            url: LOGIN_LINK.getPathname(locale)
          } }
        />
      </div>
      <FormPageDesktopImage/>
    </div>
  );
};

export default PasswordResetForm;
