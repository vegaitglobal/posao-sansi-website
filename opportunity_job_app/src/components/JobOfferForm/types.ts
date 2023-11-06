import { FormData, InputFieldProps, SelectFieldProps } from "@/types";

export interface JobOfferFormData extends FormData {
  job_name: InputFieldProps;
  location: InputFieldProps;
  application_deadline: InputFieldProps;
  job_description: InputFieldProps;
  category: SelectFieldProps;
  engagement: SelectFieldProps;
  required_education: SelectFieldProps;
  required_work_experience: SelectFieldProps;
  additional_skills: InputFieldProps;
}
