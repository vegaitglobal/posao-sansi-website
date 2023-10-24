"use client";

import "./PasswordResetForm.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import InputField from "../InputField/InputField";
import Popup from "@/components/Popup/Popup";
import { deepCopy } from "@/utils";

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

  const validateFormData = (formData: PasswordResetFormData): PasswordResetFormData => {
    const formDataCopy = deepCopy(formData) as PasswordResetFormData;
    formDataCopy.password.error = formDataCopy.password.value.length < 8
      ? "Lozinka mora da sadrži najmanje 8 karaktera"
      : "";
    formDataCopy.passwordConfirmation.error = formDataCopy.password.value != formDataCopy.passwordConfirmation.value
      ? "Lozinke nisu iste"
      : "";
    return formDataCopy;
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

  const applyFormDataErrors = (formData: PasswordResetFormData) => {
    formData.password.error = formData.password.value.length < 8
      ? "Lozinka mora da sadrži najmanje 8 karaktera"
      : "";
    formData.passwordConfirmation.error = formData.password.value != formData.passwordConfirmation.value
      ? "Lozinke nisu iste"
      : "";
  };

  if (!hasAccess) return null;

  return (
    <div className="wrapper">
      <p className="welcome-sentence">Unesite novu lozinku.</p>
      <p className="welcome-sentence">
        Lozinka mora biti minimum osam karaktera, jedan specijalan karakter i jedno veliko slovo.
      </p>
      <form className="reset-password-form">
        <InputField
          type="password"
          label="Nova lozinka:"
          value={ formData.password.value }
          placeholder="Unesite novu lozinku"
          onChange={ (value) => updateFormData(value, "password") }
          error={ shouldDisplayFormErrors ? formData.password.error : "" }
        />
        <InputField
          type="password"
          label="Potvrdi lozinku:"
          value={ formData.passwordConfirmation.value }
          placeholder="Ponovite novu lozinku"
          onChange={ (value) => updateFormData(value, "passwordConfirmation") }
          error={ shouldDisplayFormErrors ? formData.passwordConfirmation.error : "" }
        />
        { responseError && <p className="error-message">{ responseError }</p> }
        <button
          className="reset-password-form__button"
          onClick={ handleSubmit }
        >
          RESETUJ LOZINKU
        </button>
      </form>
      <Popup
        isOpened={ hasOpenedPopup }
        onClose={ () => setHasOpenedPopup(false) }
        primaryText="Uspešno ste promenili lozinku."
        secondaryText="Sada se možete prijaviti sa novom lozinkom."
        linkButton={ { label: "Prijava", url: "/login" } }
      />
    </div>
  );
};

export default PasswordResetForm;
