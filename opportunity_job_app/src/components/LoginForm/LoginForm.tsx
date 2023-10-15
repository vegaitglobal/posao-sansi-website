"use client"

import "./login-form.scss"
import InputField from "@/components/InputField/InputField";
import { useState } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router = useRouter()
    const [responseError, setResponseError] = useState<object | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    async function login(e) {
        e.preventDefault()
        try {
            await AuthService.login(formData.email, formData.password);
            router.push("/")
        } catch (error) {
            setResponseError(error.response?.data?.errors?.non_field_errors);
        }
    }

    const updateFormData = (fieldValue, fieldName) => {
        setFormData({ ...formData, [fieldName]: fieldValue });
    };

    return (
        <div className="wrapper">
            <p className="welcome-sentence">Dobrodošli nazad!</p>
            <p className="welcome-sentence">Ulogujte se da biste nastavili.</p>
            <form className="login-form">
                <InputField
                    label="E-mail adresa:"
                    placeholder="Vaša e-mail adresa"
                    onChange={ (value) => updateFormData(value, "email") }
                />
                <InputField
                    label="Lozinka:"
                    placeholder="Vaša lozinka"
                    type="password"
                    onChange={ (value) => updateFormData(value, "password") }
                />
                { responseError && <p className="error-message">{ responseError }</p> }
                <button className="login-form__button" onClick={ login }>Uloguj se</button>
            </form>
        </div>
    )
}

export default LoginForm