"use client";

import "./password-forgotten-form.scss";
import InputField from "@/components/InputField/InputField";
import { useState } from "react";
import { AuthService } from "@/api/authService";
import Popup from "@/components/Popup/Popup";

const popupDetails = {
    popupVisibility: false,
    paragraphFirstText: "Ukoliko nalog sa ovom mejl adresom postoji, poslaćemo mejl za resetovanje lozinke.",
    linkVisibility: true,
    linkText: "Nazad na početnu",
    linkUrl: "/",
};


const PasswordForgottenForm = () => {
    const [hasOpenedPopup, setHasOpenedPopup] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string>("");
    const [formData, setFormData] = useState({
        email: ""
    });

    async function forgotPassword(e: React.SyntheticEvent<EventTarget>) {
        e.preventDefault();
        try {
            await AuthService.requestPasswordReset(formData.email);
            setHasOpenedPopup(true);
        } catch (error: any) {
            setResponseError(error.response?.data?.errors?.non_field_errors);
        }
    }

    const updateFormData = (fieldValue: string, fieldName: string) => {
        setFormData({ ...formData, [fieldName]: fieldValue });
    };

    return (
        <div className="wrapper">
            <p className="welcome-sentence">
                Unesite Vašu e-mail adresu kako bismo Vam poslali podatke za resetovanje lozinke.
            </p>
            <form className="password-forgotten-form">
                <InputField
                    label="E-mail adresa:"
                    placeholder="Vaša e-mail adresa"
                    onChange={(value) => updateFormData(value, "email")}
                />
                {responseError && <p className="error-message">{responseError}</p>}
                <button className="password-forgotten-form__button" onClick={forgotPassword}>ZAHTEVAJ LINK</button>
                <Popup elementsDetails={{ ...popupDetails, popupVisibility: hasOpenedPopup }}/>
            </form>
        </div>
    );
};

export default PasswordForgottenForm;