"use client";

import "./login-form.scss";
import InputField from "@/components/InputField/InputField";
import { SyntheticEvent, useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import Link from "next/link";

const LoginForm = () => {
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
      <p className="welcome-sentence">Dobrodošli nazad!</p>
      <p className="welcome-sentence">Ulogujte se da biste nastavili.</p>
      <form className="login-form">
        <InputField
          label="E-mail adresa:"
          placeholder="Vaša e-mail adresa"
          value={ formData.email }
          onChange={ (value) => updateFormData(value, "email") }
        />
        <InputField
          label="Lozinka:"
          placeholder="Vaša lozinka"
          value={ formData.password }
          type="password"
          onChange={ (value) => updateFormData(value, "password") }
        />
        { responseError && <p className="error-message">{ responseError }</p> }
        <button className="login-form__button" onClick={ login }>Uloguj se</button>
        <Link className="login-form__link" href="/password-forgotten">
          Zaboravili ste lozinku?
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
