"use client";

import "./password-forgotten-form.scss";
import InputField from "@/components/InputField/InputField";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import Popup from "@/components/Popup/Popup";


const PasswordForgottenForm = () => {
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ hasOpenedPopup, setHasOpenedPopup ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState({
    email: ""
  });

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

  const forgotPassword = async (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await AuthService.requestPasswordReset(formData.email);
      setHasOpenedPopup(true);
    } catch (error: any) {
    }
  };

  const updateFormData = (fieldValue: string, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  if (!hasAccess) return null;

  return (
    <div className="wrapper">
      <p className="welcome-sentence">
        Unesite Vašu e-mail adresu kako bismo Vam poslali podatke za resetovanje lozinke.
      </p>
      <form className="password-forgotten-form">
        <InputField
          label="E-mail adresa:"
          placeholder="Vaša e-mail adresa"
          onChange={ (value) => updateFormData(value, "email") }
        />
        <button className="password-forgotten-form__button" onClick={ forgotPassword }>
          ZAHTEVAJ LINK
        </button>
      </form>
      <Popup
        isOpened={ hasOpenedPopup }
        onClose={ () => setHasOpenedPopup(false) }
        primaryText="Ukoliko nalog sa ovom mejl adresom postoji, poslaćemo mejl za resetovanje lozinke."
        linkButton={ { label: "Nazad na početnu", url: "/" } }
      />
    </div>
  );
};

export default PasswordForgottenForm;
