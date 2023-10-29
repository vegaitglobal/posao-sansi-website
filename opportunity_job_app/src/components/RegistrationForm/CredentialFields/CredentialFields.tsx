"use client";

import "./../registration-form.scss";
import InputField from "@/components/InputField/InputField";
import { RegistrationFormData } from "@/components/RegistrationForm/types";
import { useDictionary } from "@/hooks/useDictionary";

interface CredentialFieldsProps {
  formData: RegistrationFormData;

  onUpdateFormData(value: string, fieldName: string): void;

  shouldDisplayFormErrors: boolean;
}

const CredentialFields = ({ formData, onUpdateFormData, shouldDisplayFormErrors }: CredentialFieldsProps) => {
  const { dict } = useDictionary();
  return (
    <>
      <InputField
        type="email"
        label={ dict.registrationForm.emailFieldLabel }
        placeholder={ dict.registrationForm.emailFieldPlaceholder }
        value={ formData.email.value }
        onChange={ (value) => onUpdateFormData(value, "email") }
        errors={ shouldDisplayFormErrors ? formData.email.errors : [] }
      />
      <InputField
        type="password"
        label={ dict.registrationForm.passwordFieldLabel }
        placeholder={ dict.registrationForm.passwordFieldPlaceholder }
        value={ formData.password.value }
        autocomplete="new-password"
        onChange={ (value) => onUpdateFormData(value, "password") }
        errors={ shouldDisplayFormErrors ? formData.password.errors : [] }
      />
      <InputField
        type="password"
        label={ dict.registrationForm.passwordConfirmFieldLabel }
        placeholder={ dict.registrationForm.passwordConfirmFieldPlaceholder }
        value={ formData.password_confirmation.value }
        onChange={ (value) => onUpdateFormData(value, "password_confirmation") }
        errors={ shouldDisplayFormErrors ? formData.password_confirmation.errors : [] }
      />
    </>
  );
};

export default CredentialFields;
