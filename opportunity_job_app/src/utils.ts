import { locales, SERBIAN_LOCALE } from "@/data/locales";
import { SelectOption } from "@/components/SelectField/SelectField";
import { TextChoicesFieldOptions } from "@/api/models/TextChoicesFieldOptions";
import { Dictionary } from "@/dictionaries/Dictionary";
import { AppLink, EnvironmentVariables, FormData, FormFieldType, MainMenuLink, PublicRuntimeConfig } from "@/types";
import { BadRequestResponse } from "@/api/models/BadRequestResponse";
import { FIELD_WITH_ERRORS_CLASS_NAME } from "@/data/constants";

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

export function getPathnameLocale(pathname: string): string | undefined {
  return locales.find(
    (locale) => pathname.startsWith(`/${ locale }/`) || pathname === `/${ locale }`
  );
}

export function deepCopy(value: object | []): object | [] {
  const valueJSON = JSON.stringify(value);
  return JSON.parse(valueJSON);
}

export function mapTextChoicesFieldOptionsToSelectOptions(options: TextChoicesFieldOptions): SelectOption[] {
  return Object.entries(options).map(([ value, label ]) => ({ value: value, label: label }));
}

export const validateFormData = <T>(formData: FormData, dict: Dictionary): T => {
  const formDataCopy = deepCopy(formData) as FormData;
  Object.entries(formDataCopy).forEach(([ key, field ]) => {
    formDataCopy[key].errors = [];
    if (!field.isOptional && !field.value.trim()) {
      formDataCopy[key].errors.push(dict.commonFormErrors.requiredField);
    } else if (field.type === FormFieldType.date && !isValidDateFormat(field.value)) {
      formDataCopy[key].errors.push(dict.commonFormErrors.invalidDateFormat);
    } else if (key === "password" && field.value.length < 8) {
      formDataCopy[key].errors.push(dict.commonFormErrors.passwordMinLength);
    } else if (key === "password_confirmation" && formDataCopy.password.value != field.value) {
      formDataCopy[key].errors.push(dict.commonFormErrors.passwordsNotMatch);
    }
  });
  return formDataCopy as T;
};

/**
 * Valid date format is only "[D]D.[M]M.YYYY[.]"
 */
const isValidDateFormat = (value: string): boolean => {
  if (value.length < 8 || value.length > 10) {
    return false;
  }
  if (value.endsWith(".")) {
    value = value.slice(0, value.length - 1);
  }
  const dateParts = value.split(".");
  if (dateParts.length !== 3 || !dateParts.every(part => isAllDigits(part))) {
    return false;
  }
  const [ day, month, year ] = dateParts;
  if (day.length < 1 || day.length > 2) {
    return false;
  }
  if (month.length < 1 || month.length > 2) {
    return false;
  }
  return year.length === 4;
};

const isAllDigits = (value: string): boolean => {
  return value.split("").every((char) => !isNaN(Number(char)));
};

export function mapPublicRuntimeConfigToENV(publicRuntimeConfig: PublicRuntimeConfig): EnvironmentVariables {
  return deepCopy(publicRuntimeConfig) as EnvironmentVariables;
}

export const createAppLink = (rawPathname: string): AppLink => {
  if (!rawPathname.startsWith("/") && rawPathname !== "") {
    throw new Error("Raw pathname must start with \"/\" or be an empty string!");
  }

  return {
    getPathname(locale?: string, params?: {}): string {
      const urlSearchParams = new URLSearchParams(params);
      const urlSearchParamsString = urlSearchParams.size ? `?${ urlSearchParams.toString() }` : "";
      return `/${ locale || SERBIAN_LOCALE }${ this.rawPathname }${ urlSearchParamsString }`;
    },
    isActive(currentRawPathname: string): boolean {
      return this.rawPathname === currentRawPathname;
    },
    rawPathname: rawPathname,
  };
};

export const createMenuLink = (rawPathname: string, labelDictKey: string, iconPath: string): MainMenuLink => {
  const appLink = createAppLink(rawPathname);
  return {
    ...appLink,
    labelDictKey: labelDictKey,
    iconPath: iconPath,
  };
};

export function clearFormData<T>(formData: FormData): T {
  const formDataCopy = deepCopy(formData) as FormData;
  Object.entries(formDataCopy).forEach(([ key, _ ]) => formDataCopy[key].value = "");
  return formDataCopy as T;
}

export const applyAPIFormErrors = <T>(formData: FormData, formDataErrors: BadRequestResponse): T => {
  const erroneousFields = Object.keys(formDataErrors);
  const formDataCopy = deepCopy(formData) as T;
  Object.entries(formDataCopy).forEach(([ key, _ ]) => {
    formDataCopy[key].errors = [];
    if (erroneousFields.includes(key)) {
      formDataCopy[key].errors = formDataErrors[key] as string[];
    } else if (key === "email" && formDataErrors.user) {
      const userErrors = formDataErrors.user as BadRequestResponse;
      formDataCopy[key].errors = userErrors[key] as string[];
    }
  });
  return formDataCopy;
};

export const hasFormErrors = (formData: FormData) => {
  return !!Object.values(formData).find(field => !!field.errors.length);
};

export const mapFormDataToAPIRequestBody = <T>(formData: FormData, excludeFields: string[] = []): T => {
  const APIRequestBody = {} as T;
  Object.entries(formData).forEach(([ fieldName, field ]) => {
    if (!excludeFields.includes(fieldName)) {
      if (field.type == FormFieldType.date) {
        APIRequestBody[fieldName] = field.value.split(".").reverse().join("-");
      } else {
        APIRequestBody[fieldName] = formData[fieldName].value as any;
      }
    }
  });
  return APIRequestBody;
};

export function scrollFirstFieldWithErrorsIntoView() {
  setTimeout(function () {
    const firstFieldWithErrors = document.getElementsByClassName(FIELD_WITH_ERRORS_CLASS_NAME)[0];
    if (firstFieldWithErrors) {
      const scrollTop = firstFieldWithErrors.offsetTop - 100;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  }, 500);
}
