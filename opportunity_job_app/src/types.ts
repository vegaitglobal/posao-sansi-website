import { SelectOption } from "@/components/SelectField/SelectField";


export interface PublicRuntimeConfig {
  baseURL: string,
  baseApiURL: string,
  staticFolder: string,
  name: string;
  title: string;
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
}

export interface EnvironmentVariables extends PublicRuntimeConfig {
}

export enum FormFieldType {
  date = "date",
}

export interface InputFieldProps {
  value: string;
  errors: string[];
  type?: FormFieldType;
  isOptional?: boolean;
}

export interface SelectFieldProps extends InputFieldProps {
  options: SelectOption[];
}

export interface FormData {
  [key: string]: InputFieldProps | SelectFieldProps;
}

export interface AppLink {
  rawPathname: string;

  getPathname(locale?: string, params?: {}, variables?: {}): string;

  isActive(currentPathname: string): boolean;
}

export interface MainMenuLink extends AppLink {
  labelDictKey: string;
  iconPath: string;
}

export interface LanguageLink {
  labelDictKey: string;
  code: string;
  flagPath: string;
}
