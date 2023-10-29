import { deepCopy, mapTextChoicesFieldOptionsToSelectOptions } from "@/utils";
import { Dictionary } from "@/dictionaries/Dictionary";
import { GeneralService } from "@/api/generalService";
import { SelectOption } from "@/components/SelectField/SelectField";
import { ApplicantAccount } from "@/api/models/ApplicantAccount";
import { ApplicantFormData } from "@/components/RegistrationForm/types";
import { initialApplicantFormData } from "@/components/RegistrationForm/data";
import { BadRequestResponse } from "@/api/models/BadRequestResponse";

export const validateFormData = (formData: ApplicantFormData, dict: Dictionary): ApplicantFormData => {
  const formDataCopy = deepCopy(formData) as ApplicantFormData;
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

export const applyAPIFormErrors = (formData: ApplicantFormData, formDataErrors: BadRequestResponse): ApplicantFormData => {
  const erroneousFields = Object.keys(formDataErrors);
  const formDataCopy = deepCopy(formData) as ApplicantFormData;
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

export const hasFormErrors = (formData: ApplicantFormData) => {
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
    user: { email: formData.email.value },
    first_name: formData.first_name.value,
    last_name: formData.last_name.value,
    work_experience: formData.work_experience.value,
    education: formData.education.value,
    about: formData.about.value,
  };
}
