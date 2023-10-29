import { SelectOption } from "@/components/SelectField/SelectField";

export interface InputFieldProps {
  value: string;
  errors: string[];
}

export interface SelectFieldProps extends InputFieldProps {
  options: SelectOption[];
}

export interface RegistrationFormData {
  email: InputFieldProps;
  password: InputFieldProps;
  password_confirmation: InputFieldProps;
}

export interface ApplicantFormData extends RegistrationFormData {
  first_name: InputFieldProps;
  last_name: InputFieldProps;
  work_experience: SelectFieldProps;
  education: SelectFieldProps;
  about: InputFieldProps;
}

export interface EmployerFormData extends RegistrationFormData {
  company_name: InputFieldProps;
  pib: InputFieldProps;
  address: InputFieldProps;
  phone_number: InputFieldProps;
  url: InputFieldProps;
  about: InputFieldProps;
}
