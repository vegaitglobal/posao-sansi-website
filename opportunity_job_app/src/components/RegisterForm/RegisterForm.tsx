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
    const [responseError, setResponseError] = useState<object | null>(null);
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

    async function register(e) {
        alert("Register")
        //TODO: Validate data, send request and handle response
        // e.preventDefault()
        // try {
        //     await AuthService.login(formData.email, formData.password);
        //     router.push("/")
        // } catch (error) {
        //     setResponseError(error.response?.data?.errors?.non_field_errors);
        // }
    }

    const updateFormData = (fieldValue, fieldName) => {
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
                    <InputField
                        label="Ime:"
                        placeholder="Vaše ime"
                        onChange={ (value) => updateFormData(value, "first_name") }
                    />
                }
                { 
                    formData.type === "applicant" &&
                    <InputField
                        label="Prezime:"
                        placeholder="Vaše prezime"
                        onChange={ (value) => updateFormData(value, "last_name") }
                    />
                }
                { 
                    formData.type === "employer" &&
                    <InputField
                        label="Naziv kompanije:"
                        placeholder="Naziv kompanije"
                        onChange={ (value) => updateFormData(value, "company_name") }
                    />
                }
                { 
                    formData.type === "employer" &&
                    <InputField
                        label="PIB:"
                        placeholder="PIB"
                        onChange={ (value) => updateFormData(value, "pib") }
                    />
                }
                <InputField
                    label="Broj telefona:"
                    placeholder="Vaš broj telefona"
                    onChange={ (value) => updateFormData(value, "phone_number") }
                />
                { 
                    formData.type === "employer" &&
                    <InputField
                        label="Adresa kompanije:"
                        placeholder="Adresa kompanije"
                        onChange={ (value) => updateFormData(value, "pib") }
                    />
                }
            
                <InputField
                    label="E-mail adresa:"
                    placeholder="Vaš email"
                    onChange={ (value) => updateFormData(value, "email") }
                    />
                <InputField
                    label="Lozinka:"
                    placeholder="Vaša lozinka"
                    type="password"
                    onChange={ (value) => updateFormData(value, "password") }
                    />
                <InputField
                    label="Ponoviteo lozinku:"
                    placeholder="Ponovite lozinku"
                    type="password"
                    onChange={ (value) => updateFormData(value, "re-password") }
                    />
                { 
                    formData.type === "applicant" &&
                    <SelectField
                        label="Radno iskustvo"
                        placeholder="Radno iskustvo"
                        onChange={ (value) => updateFormData(value, "work_experience") }
                        options={work_experience_options}
                        selectedValue={formData.work_experience}
                    />
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
