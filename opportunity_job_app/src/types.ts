import { SelectOption } from "@/components/SelectField/SelectField";

export interface InputFieldProps {
  value: string;
  errors: string[];
}

export interface SelectFieldProps extends InputFieldProps {
  options: SelectOption[];
}

export interface FormData {
  [key: string]: InputFieldProps | SelectFieldProps;
}
