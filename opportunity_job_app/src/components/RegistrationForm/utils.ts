import { deepCopy, mapTextChoicesFieldOptionsToSelectOptions } from "@/utils";
import { Dictionary } from "@/dictionaries/Dictionary";
import { GeneralService } from "@/api/generalService";
import { SelectOption } from "@/components/SelectField/SelectField";
import { ApplicantAccount } from "@/api/models/ApplicantAccount";
import { ApplicantFormData, EmployerFormData } from "@/components/RegistrationForm/types";
import { initialApplicantFormData } from "@/components/RegistrationForm/data";
import { BadRequestResponse } from "@/api/models/BadRequestResponse";
import { EmployerAccount } from "@/api/models/EmployerAccount";

export const validateFormData = (formData: ApplicantFormData | EmployerFormData, dict: Dictionary): ApplicantFormData | EmployerFormData => {
  const formDataCopy = deepCopy(formData) as ApplicantFormData | EmployerFormData;
  Object.entries(formDataCopy).forEach(([ key, field ]) => {
    formDataCopy[key].errors = [];
    if (!field.value.trim()) {
      formDataCopy[key].errors.push(dict.commonFormErrors.requiredField);
    } else if (key === "password" && field.value.length < 8) {
      formDataCopy[key].errors.push(dict.commonFormErrors.passwordMinLength);
    } else if (key === "password_confirmation" && formDataCopy.password.value != field.value) {
      formDataCopy[key].errors.push(dict.commonFormErrors.passwordsNotMatch);
    }
  });
  return formDataCopy;
};

export const applyAPIFormErrors = (formData: ApplicantFormData | EmployerFormData, formDataErrors: BadRequestResponse): ApplicantFormData | EmployerFormData => {
  const erroneousFields = Object.keys(formDataErrors);
  const formDataCopy = deepCopy(formData) as ApplicantFormData | EmployerFormData;
  Object.entries(formDataCopy).forEach(([ key, _ ]) => {
    formDataCopy[key].errors = [];
    if (erroneousFields.includes(key)) {
      formDataCopy[key].errors = formDataErrors[key];
    } else if (key === "email" && formDataErrors.user?.email) {
      formDataCopy[key].errors = formDataErrors.user.email;
    }
  });
  return formDataCopy;
};

export const hasFormErrors = (formData: ApplicantFormData | EmployerFormData) => {
  return !!Object.values(formData).find(field => !!field.errors.length);
};

export const getInitialApplicantFormData = async (): Promise<ApplicantFormData> => {
  const {
    work_experience,
    education
  } = await GeneralService.getFormSelectOptions();
  const workExperienceOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(work_experience);
  const educationOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(education);
  return {
    ...initialApplicantFormData,
    work_experience: {
      ...initialApplicantFormData.work_experience,
      options: workExperienceOptions
    },
    education: {
      ...initialApplicantFormData.education,
      options: educationOptions
    }
  };
};

export function mapFormDataToApplicantAccount(formData: ApplicantFormData): ApplicantAccount {
  return {
    user: {
      email: formData.email.value,
      password: formData.password.value,
    },
    first_name: formData.first_name.value,
    last_name: formData.last_name.value,
    work_experience: formData.work_experience.value,
    education: formData.education.value,
    about: formData.about.value,
  };
}

export function mapFormDataToEmployerAccount(formData: EmployerFormData): EmployerAccount {
  return {
    user: {
      email: formData.email.value,
      password: formData.password.value,
    },
    company_name: formData.company_name.value,
    pib: formData.pib.value,
    address: formData.address.value,
    phone_number: formData.phone_number.value,
    url: formData.url.value,
    about: formData.about.value,
  };
}

export function clearFormData(formData: ApplicantFormData): ApplicantFormData {
  const formDataCopy = deepCopy(formData);
  Object.entries(formDataCopy).forEach(([ key, _ ]) => formDataCopy[key].value = "");
  return formDataCopy;
}
