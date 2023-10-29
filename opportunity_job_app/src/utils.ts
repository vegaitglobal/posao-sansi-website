import { locales } from "@/appData/locales";
import { SelectOption } from "@/components/SelectField/SelectField";
import { TextChoicesFieldOptions } from "@/api/models/TextChoicesFieldOptions";
import { ApplicantAccount } from "@/api/models/ApplicantAccount";
import { RegistrationFormData } from "@/components/RegistrationForm/RegistrationForm";

export function mapStringToLocalDateString(dateString: string): string {
  return new Date(Date.parse(dateString)).toLocaleDateString("de");
}

export function isPublicFile(pathname: string): boolean {
  const publicFolderNames = [
    "files",
    "fonts",
    "images",
  ];
  return !!publicFolderNames.find(folderName => {
    return pathname.startsWith(`/${ folderName }/`);
  });
}

export function getLangSlugFromPath(pathname: string): string | undefined {
  return locales.find(
    (locale) => pathname.startsWith(`/${ locale }/`) || pathname === `/${ locale }`
  );
}

export function deepCopy(value: object | []): object | [] {
  const valueJSON = JSON.stringify(value);
  return JSON.parse(valueJSON);
}

export function mapTextChoicesFieldOptionsToSelectOptions(options: TextChoicesFieldOptions): SelectOption[] {
  return Object.entries(options).map(([value, label]) => ({ value: value, label: label }));
}
