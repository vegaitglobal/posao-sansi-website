"use client"

import "./register-form.scss";
import InputField from "@/components/InputField/InputField";
import SelectField from "@/components/SelectField/SelectField";
import TextAreaField from "@/components/TextAreaField/TextAreaField";
import { useState } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter()
    const [responseError, setResponseError] = useState<string | null>("");
    const [formData, setFormData] = useState({
        type: "applicant",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        re_password: "",
        work_experience: "",
        education: "",
        about: "",
        company_name: "",
        pib: "",
        location: "",
        url: "",
    });
    const [formErrors, setFormErrors] = useState({
        type: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        re_password: "",
        work_experience: "",
        education: "",
        about: "",
        company_name: "",
        pib: "",
        location: "",
        url: "",
    });

    const clearForm = () => {
        setFormData({
            type: "applicant",
            first_name: "",
            last_name: "",
            phone_number: "",
            email: "",
            password: "",
            re_password: "",
            work_experience: "",
            education: "",
            about: "",
            company_name: "",
            pib: "",
            location: "",
            url: "",
        });
    }

    const account_type_options = [
        {
            text: "Aplikant",
            value: "applicant",
        },
        {
            text: "Poslodavac",
            value: "employer",
        }
    ];
    const work_experience_options = [
        {
            text: "Bez iskustva",
            value: "none",
        },
        {
            text: "Manje od jedne godine",
            value: "lt_year",
        },
        {
            text: "1 - 3 godine",
            value: "one_to_three",
        },
        {
            text: "3 - 5 godina",
            value: "three_to_five",
        },
        {
            text: "5 - 10 godina",
            value: "five_to_ten",
        },
        {
            text: "Više od 10 godina",
            value: "gt_ten",
        }
    ]

    const education_options = [
        {
            text: "Bez formalnog obrazovanja",
            value: "none",
        },
        {
            text: "I stepen - četiri razreda osnovne škole",
            value: "first_degree",
        },
        {
            text: "II stepen - osnovna škola",
            value: "second_degree",
        },
        {
            text: "III stepen - SSS srednja škola",
            value: "third_degree",
        },
        {
            text: "IV stepen - SSS srednja škola",
            value: "fourth_degree",
        },
        {
            text: "V Stepen - VKV - SSS srednja škola",
            value: "fifth_degree",
        },
        {
            text: "VI Stepen - VŠS viša škola",
            value: "sixth_degree",
        },
        {
            text: "VII - VSS visoka stručna sprema",
            value: "seventh_degree",
        }
    ]

    const validateForm = () => {
        let is_valid = true;
        let errorsObject = {
            type: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            email: "",
            password: "",
            re_password: "",
            work_experience: "",
            education: "",
            about: "",
            company_name: "",
            pib: "",
            location: "",
            url: "",
        }

        if (!formData.email) {
            errorsObject.email = "Polje je obavezno";
            is_valid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            errorsObject.email = "Molim vas unesite validan email";
            is_valid = false;
        } else {
            errorsObject.email = "";
        }
        if (!formData.first_name && formData.type==="applicant") {
            errorsObject.first_name = "Polje je obavezno";
            is_valid = false;
        } else {
            errorsObject.first_name = "";
        }
        if (!formData.last_name && formData.type==="applicant") {
            errorsObject.last_name = "Polje je obavezno";
            is_valid = false;
        } else {
            errorsObject.last_name = "";
        }
        if (!formData.phone_number) {
            errorsObject.phone_number = "Polje je obavezno";
            is_valid = false;
        } else {
            errorsObject.phone_number = "";
        }
        if (!formData.password) {
            errorsObject.password = "Polje je obavezno";
            is_valid = false;
        } else {
            errorsObject.password = "";
        }
        if (!formData.re_password) {
            errorsObject.re_password = "Polje je obavezno";
            is_valid = false;
        } else if (formData.password !== formData.re_password) {
            errorsObject.re_password = "Lozinke se ne podudaraju";
            is_valid = false;
        } else {
            errorsObject.re_password = "";
        }
        if (!formData.pib && formData.type==="employer") {
            errorsObject.pib = "Polje je obavezno";
            is_valid = false;
        } else {
            errorsObject.pib = "";
        }
        if (!formData.company_name && formData.type==="employer") {
            errorsObject.company_name = "Polje je obavezno";
            is_valid = false;
        } else {
            errorsObject.company_name = "";
        }

        setFormErrors({...formErrors, ...errorsObject})

        return is_valid;
    }

    async function register(e) {
        e.preventDefault();

        if (validateForm()) {
            try {
                const userData = formData;
                const response = AuthService.register(userData, formData.type);
                //TODO implement dialog
                clearForm();
            } catch (error: any) {
                setResponseError(error.response?.data?.errors?.non_field_errors);
            }
        };
    }

    const updateFormData = (fieldValue: string, fieldName: string) => {
        setFormData({ ...formData, [fieldName]: fieldValue });
    };
    
    return (
        <div className="wrapper">
            <p className="welcome-sentence">U padajućem meniju bira se jedna od dve opcije:</p>
            <p className="welcome-sentence">Poslodavac ili Aplikant</p>
            <form className="register-form">
                <SelectField
                    onChange={ (value) => updateFormData(value, "type") }
                    options={account_type_options}
                    selectedValue={formData.type}
                    invertColor={true}
                />
                { 
                    formData.type === "applicant" &&
                    <>
                        <InputField
                            label="Ime:"
                            placeholder="Vaše ime"
                            onChange={ (value) => updateFormData(value, "first_name") }
                        />
                        { formErrors.first_name && <p className="error-message">{ formErrors.first_name }</p> }
                    </>
                }
                { 
                    formData.type === "applicant" &&
                    <>
                        <InputField
                        label="Prezime:"
                        placeholder="Vaše prezime"
                        onChange={ (value) => updateFormData(value, "last_name") }
                        />
                        { formErrors.last_name && <p className="error-message">{ formErrors.last_name }</p> }
                    </>
                }
                { 
                    formData.type === "employer" &&
                    <>
                    <InputField
                        label="Naziv kompanije:"
                        placeholder="Naziv kompanije"
                        onChange={ (value) => updateFormData(value, "company_name") }
                    />
                    { formErrors.company_name && <p className="error-message">{ formErrors.company_name }</p> }
                    </>
                }
                
                { 
                    formData.type === "employer" &&
                    <>
                    <InputField
                        label="PIB:"
                        placeholder="PIB"
                        onChange={ (value) => updateFormData(value, "pib") }
                    />
                     { formErrors.pib && <p className="error-message">{ formErrors.pib }</p> }
                    </>
                    
                }
                <InputField
                    label="Broj telefona:"
                    placeholder="Vaš broj telefona"
                    onChange={ (value) => updateFormData(value, "phone_number") }
                />
                { formErrors.phone_number && <p className="error-message">{ formErrors.phone_number }</p> }
                { 
                    formData.type === "employer" &&
                    <>
                        <InputField
                            label="Adresa kompanije:"
                            placeholder="Adresa kompanije"
                            onChange={ (value) => updateFormData(value, "location") }
                        />
                        { formErrors.location && <p className="error-message">{ formErrors.location }</p> }
                    </>
                }
            
                <InputField
                    label="E-mail adresa:"
                    placeholder="Vaš email"
                    onChange={ (value) => updateFormData(value, "email") }
                    />
                { formErrors.email && <p className="error-message">{ formErrors.email }</p> }
                <InputField
                    label="Lozinka:"
                    placeholder="Vaša lozinka"
                    type="password"
                    onChange={ (value) => updateFormData(value, "password") }
                    />
                { formErrors.password && <p className="error-message">{ formErrors.password }</p> }
                <InputField
                    label="Ponovite lozinku:"
                    placeholder="Ponovite lozinku"
                    type="password"
                    onChange={ (value) => updateFormData(value, "re_password") }
                    />
                { formErrors.re_password && <p className="error-message">{ formErrors.re_password }</p> }
                { 
                    formData.type === "applicant" &&
                    <>
                        <SelectField
                            label="Radno iskustvo"
                            placeholder="Radno iskustvo"
                            onChange={ (value) => updateFormData(value, "work_experience") }
                            options={work_experience_options}
                            selectedValue={formData.work_experience}
                        />
                    </>
                }
                { 
                    formData.type === "applicant" &&
                    <SelectField
                        label="Nivo obrazovanja"
                        placeholder="Obrazovanje"
                        onChange={ (value) => updateFormData(value, "education") }
                        options={education_options}
                        selectedValue={formData.education}
                    />
                }
                { 
                    formData.type === "employer" &&
                    <InputField
                        label="Web adresa kompanije:"
                        placeholder="Web adresa kompanije"
                        onChange={ (value) => updateFormData(value, "url") }
                    />
                }
                <TextAreaField
                    label={ formData.type === "applicant" ? "O meni:" : "O kompaniji"}
                    placeholder={ formData.type === "applicant" ? "O meni:" : "O kompaniji"}
                    onChange={ (value) => updateFormData(value, "about") }
                />
                { responseError && <p className="error-message">{ responseError }</p> }
                <button className="register-form__button" onClick={ register }>Prijavi Me</button>
            </form>
        </div>
    )
}

export default RegisterForm
