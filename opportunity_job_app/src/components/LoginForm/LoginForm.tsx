"use client";

import "./login-form.scss";
import InputField from "@/components/InputField/InputField";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";
import Spinner from "@/components/Spinner/Spinner";
import { HOME_LINK, PASSWORD_FORGOTTEN_LINK } from "@/data/links";

const LoginForm = () => {
  const { dict, locale } = useDictionary();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  async function login(e: SyntheticEvent<EventTarget>) {
    e.preventDefault();
    try {
      await AuthService.login(formData.email, formData.password);
      window.location.href = HOME_LINK.getPathname(locale);
    } catch (error: any) {
      setResponseError(error.response?.data?.errors?.non_field_errors);
    }
  }

  const updateFormData = (fieldValue: string, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  if (isLoading) return <Spinner/>;

  return hasAccess && (
    <div className="form-page">
      <div className="form-page__left">
        <div className="form-page__message">
          <p>{ dict.loginForm.topTextFirstLine }</p>
          <p>{ dict.loginForm.topTextSecondLine }</p>
        </div>
        <form className="form-page__form">
          <InputField
            label={ dict.loginForm.emailFieldLabel }
            placeholder={ dict.loginForm.emailFieldPlaceholder }
            value={ formData.email }
            onChange={ (value) => updateFormData(value, "email") }
          />
          <InputField
            label={ dict.loginForm.passwordFieldLabel }
            placeholder={ dict.loginForm.passwordFieldPlaceholder }
            value={ formData.password }
            type="password"
            onChange={ (value) => updateFormData(value, "password") }
          />
          { responseError && <p className="form-field__error">{ responseError }</p> }
          <button className="button" onClick={ login }>{ dict.loginForm.submitButtonLabel }</button>
          <Link className="login-form__link" href={ PASSWORD_FORGOTTEN_LINK.getPathname(locale) }>
            { dict.loginForm.passwordForgottenLinkText }
          </Link>
        </form>
      </div>
      <FormPageDesktopImage/>
    </div>
  );
};

export default LoginForm;
