"use client";

import "./PasswordResetForm.scss";
import { SyntheticEvent, useState } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation";
import InputField from "../InputField/InputField";

interface PasswordResetFormProps {
    token: string;
}

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
    const router = useRouter();
    const [shouldDisplayFormErrors, setShouldDisplayFormErrors] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        password: { value: "", error: "" },
        passwordConfirmation: { value: "", error: "" },
    });
    const [responseError, setResponseError] = useState<string>("");

    const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        if (hasFormErrors()) {
            setShouldDisplayFormErrors(true);
        } else {
            setShouldDisplayFormErrors(false);
            resetPassword();
        }
    };

    const hasFormErrors = () => {
        return !!(formData.password.error || formData.passwordConfirmation.error);
    };

    const resetPassword = async () => {
        try {
            await AuthService.resetPassword(token, formData.password.value);
            router.push("/");
        } catch (error: any) {
            setResponseError(error.response?.data?.errors?.non_field_errors);
        }
    };

    const updateFormData = (fieldValue: string, fieldName: string) => {
        const newFormData = { ...formData, [fieldName]: { ...formData[fieldName], value: fieldValue } };
        newFormData.password.error = newFormData.password.value.length < 8
            ? "Lozinka mora da sadrži najmanje 8 karaktera"
            : "";
        newFormData.passwordConfirmation.error = newFormData.password.value != newFormData.passwordConfirmation.value
            ? "Lozinke nisu iste"
            : "";
        setFormData(newFormData);
    };

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
                    placeholder="Unesite novu lozinku"
                    onChange={ (value) => updateFormData(value, "password") }
                    error={ shouldDisplayFormErrors ? formData.password.error : "" }
                />
                <InputField
                    type="password"
                    label="Potvrdi lozinku:"
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
        </div>
    );
};

export default PasswordResetForm;
