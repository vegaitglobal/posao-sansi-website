import { ApplicantFormData, EmployerFormData } from "@/components/RegistrationForm/types";

const initialCredentialsFormData = {
  email: { value: "", errors: [] },
  password: { value: "", errors: [] },
  password_confirmation: { value: "", errors: [] },
};

export const initialApplicantFormData: ApplicantFormData = {
  ...initialCredentialsFormData,
  first_name: { value: "", errors: [] },
  last_name: { value: "", errors: [] },
  work_experience: { value: "", options: [], errors: [] },
  education: { value: "", options: [], errors: [] },
  about: { value: "", errors: [] },
};

export const initialEmployerFormData: EmployerFormData = {
  ...initialCredentialsFormData,
  company_name: { value: "", errors: [] },
  pib: { value: "", errors: [] },
  address: { value: "", errors: [] },
  phone_number: { value: "", errors: [] },
  url: { value: "", errors: [] },
  about: { value: "", errors: [] },
};
