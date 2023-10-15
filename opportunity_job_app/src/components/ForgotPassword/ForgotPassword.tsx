"use client"

import "./Forgot-password.scss"
import InputField from "@/components/InputField/InputField";
import { useState } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation"

const ForgotPassword = () => {
    const router = useRouter();
    const [responseError, setResponseError] = useState<string>("");
    const [formData, setFormData] = useState({
        email: ""
    });

    async function forgotPassword(e: React.SyntheticEvent<EventTarget>) {
        e.preventDefault()
        try {
            await AuthService.forgotPassword(formData.email);
            router.push("/")
        } catch (error: any) {
            setResponseError(error.response?.data?.errors?.non_field_errors);
        }
        console.log(formData.email);
        
    }

    const updateFormData = (fieldValue: string, fieldName: string) => {
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
                { responseError && <p className="error-message">{ responseError }</p> }
                <button className="login-form__button" onClick={ forgotPassword }>ZAHTEVAJ LINK</button>
            </form>
        </div>
    )
}

export default ForgotPassword