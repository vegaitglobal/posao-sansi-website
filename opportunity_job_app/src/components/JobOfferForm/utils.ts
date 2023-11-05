import { GeneralService } from "@/api/generalService";
import { SelectOption } from "@/components/SelectField/SelectField";
import { mapTextChoicesFieldOptionsToSelectOptions } from "@/utils";
import { initialJobOfferFormData } from "@/components/JobOfferForm/data";
import { JobOfferFormData } from "@/components/JobOfferForm/types";

export const getInitialJobOfferFormData = async (): Promise<JobOfferFormData> => {
  const {
    job_category,
    job_engagement,
    education,
    work_experience
  } = await GeneralService.getFormSelectOptions();
  const categoryOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(job_category);
  const engagementOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(job_engagement);
  const requiredEducationOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(education);
  const requiredWorkExperienceOptions: SelectOption[] = mapTextChoicesFieldOptionsToSelectOptions(work_experience);
  return {
    ...initialJobOfferFormData,
    category: {
      ...initialJobOfferFormData.category,
      options: categoryOptions
    },
    engagement: {
      ...initialJobOfferFormData.engagement,
      options: engagementOptions
    },
    required_education: {
      ...initialJobOfferFormData.required_education,
      options: requiredEducationOptions
    },
    required_work_experience: {
      ...initialJobOfferFormData.required_work_experience,
      options: requiredWorkExperienceOptions
    },
  };
};
