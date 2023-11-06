import { deepCopy, mapFormDataToAPIRequestBody, mapTextChoicesFieldOptionsToSelectOptions } from "@/utils";
import { GeneralService } from "@/api/generalService";
import { SelectOption } from "@/components/SelectField/SelectField";
import { ApplicantAccount } from "@/api/models/ApplicantAccount";
import { ApplicantFormData, EmployerFormData } from "@/components/RegistrationForm/types";
import { initialApplicantFormData } from "@/components/RegistrationForm/data";
import { EmployerAccount } from "@/api/models/EmployerAccount";


export const getInitialApplicantFormData = async (): Promise<ApplicantFormData> => {
  const {
    work_experience,
    education
  } = await GeneralService.getFormSelectOptions();
  const workExperienceOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(work_experience);
  const educationOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(education);
  const initialApplicantFormDataCopy = deepCopy(initialApplicantFormData) as ApplicantFormData;
  return {
    ...initialApplicantFormDataCopy,
    work_experience: {
      ...initialApplicantFormDataCopy.work_experience,
      options: workExperienceOptions
    },
    education: {
      ...initialApplicantFormDataCopy.education,
      options: educationOptions
    }
  };
};

export function mapFormDataToApplicantAccount(formData: ApplicantFormData): ApplicantAccount {
  const applicantAccount = mapFormDataToAPIRequestBody<ApplicantAccount>(
    formData,
    [ "email", "password", "password_confirmation" ]
  );
  applicantAccount.user = {
    email: formData.email.value,
    password: formData.password.value,
  };
  return applicantAccount;
}

export function mapFormDataToEmployerAccount(formData: EmployerFormData): EmployerAccount {
  const employerAccount = mapFormDataToAPIRequestBody<EmployerAccount>(
    formData,
    [ "email", "password", "password_confirmation" ]
  );
  employerAccount.user = {
    email: formData.email.value,
    password: formData.password.value,
  };
  return employerAccount;
}
