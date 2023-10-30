import { SelectOption } from "@/components/SelectField/SelectField";

export interface BaseSEO {
  robotsProps: {
    maxSnippet: number,
    maxImagePreview: string,
    maxVideoPreview: number,
  },
}

export interface PublicRuntimeConfig {
  baseURL: string,
  baseApiURL: string,
  staticFolder: string,
  baseSEO: BaseSEO;
  name: string;
  title: string;
  description: string;
  author: string;
  logo: string;
  imageShare: string;
  atinaWebsiteURL: string;
  facebookURL: string;
  linkedinURL: string;
  twitterURL: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  locale: string;
}

export interface EnvironmentVariables extends PublicRuntimeConfig {
}

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
