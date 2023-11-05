import { JobOfferFormData } from "@/components/JobOfferForm/types";
import { FormFieldType } from "@/types";

export const initialJobOfferFormData: JobOfferFormData = {
  job_name: { value: "", errors: [] },
  location: { value: "", errors: [] },
  application_deadline: { value: "", errors: [], type: FormFieldType.date },
  job_description: { value: "", errors: [] },
  category: { value: "", options: [], errors: [] },
  engagement: { value: "", options: [], errors: [] },
  required_education: { value: "", options: [], errors: [] },
  required_work_experience: { value: "", options: [], errors: [] },
  additional_skills: { value: "", errors: [] }
};
