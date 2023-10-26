"use client";

import "./login-form.scss";
import InputField from "@/components/InputField/InputField";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";

const LoginForm = () => {
  const { dict } = useDictionary();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ responseError, setResponseError ] = useState<string>("");
  const [ formData, setFormData ] = useState({
    email: "",
    password: "",
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

  async function login(e: SyntheticEvent<EventTarget>) {
    e.preventDefault();
    try {
      await AuthService.login(formData.email, formData.password);
      window.location.href = "/";
    } catch (error: any) {
      setResponseError(error.response?.data?.errors?.non_field_errors);
    }
  }

  const updateFormData = (fieldValue: string, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  if (!hasAccess) return null;

  return (
    <div className="wrapper">
      <p className="welcome-sentence">{ dict.loginForm.topTextFirstLine }</p>
      <p className="welcome-sentence">{ dict.loginForm.topTextSecondLine }</p>
      <form className="login-form">
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
        { responseError && <p className="error-message">{ responseError }</p> }
        <button className="form-submit-button" onClick={ login }>{ dict.loginForm.submitButtonLabel }</button>
        <Link className="login-form__link" href="/password-forgotten">
          { dict.loginForm.passwordForgottenLinkText }
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
