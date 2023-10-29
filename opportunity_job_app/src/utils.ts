import { locales } from "@/appData/locales";
import { SelectOption } from "@/components/SelectField/SelectField";
import { TextChoicesFieldOptions } from "@/api/models/TextChoicesFieldOptions";
import { Dictionary } from "@/dictionaries/Dictionary";
import { FormData } from "@/types";

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

export const validateFormData = <T>(formData: FormData, dict: Dictionary): T => {
  const formDataCopy = deepCopy(formData) as FormData;
  Object.entries(formDataCopy).forEach(([key, field]) => {
    formDataCopy[key].errors = [];
    if (!field.value.trim()) {
      formDataCopy[key].errors.push(dict.commonFormErrors.requiredField);
    } else if (key === "password" && field.value.length < 8) {
      formDataCopy[key].errors.push(dict.commonFormErrors.passwordMinLength);
    } else if (key === "password_confirmation" && formDataCopy.password.value != field.value) {
      formDataCopy[key].errors.push(dict.commonFormErrors.passwordsNotMatch);
    }
  });
  return formDataCopy as T;
};
