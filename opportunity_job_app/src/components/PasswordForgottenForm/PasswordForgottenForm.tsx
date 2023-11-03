"use client";

import "./../../scss/components/form-page.scss";
import InputField from "@/components/InputField/InputField";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import Popup from "@/components/Popup/Popup";
import { useDictionary } from "@/hooks/useDictionary";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";
import Spinner from "@/components/Spinner/Spinner";
import { HOME_LINK } from "@/data/links";


const PasswordForgottenForm = () => {
  const { dict, locale } = useDictionary();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [hasOpenedPopup, setHasOpenedPopup] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: ""
  });

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

  const forgotPassword = async (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await AuthService.requestPasswordReset(formData.email);
      setHasOpenedPopup(true);
      setFormData({ email: "" });
    } catch (error: any) {
    }
  };

  const updateFormData = (fieldValue: string, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  if (isLoading) return <Spinner/>;

  return hasAccess && (
    <div className="form-page">
      <div className="form-page__left">
        <p className="form-page__message">{ dict.passwordForgottenForm.topText }</p>
        <form className="form-page__form">
          <InputField
            label={ dict.passwordForgottenForm.emailFieldLabel }
            placeholder={ dict.passwordForgottenForm.emailFieldPlaceholder }
            value={ formData.email }
            onChange={ (value) => updateFormData(value, "email") }
          />
          <button className="form-submit-button" onClick={ forgotPassword }>
            { dict.passwordForgottenForm.submitButtonLabel }
          </button>
        </form>
        <Popup
          isOpened={ hasOpenedPopup }
          onClose={ () => setHasOpenedPopup(false) }
          primaryText={ dict.passwordForgottenForm.popup.primaryText }
          linkButton={ {
            label: dict.passwordForgottenForm.popup.linkButtonLabel,
            url: HOME_LINK.getPathname(locale)
          } }
        />
      </div>
      <FormPageDesktopImage/>;
    </div>
  );
};

export default PasswordForgottenForm;
