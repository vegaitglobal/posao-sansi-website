import API from "./baseApi";
import { Statistics } from "@/api/models/Statistics";
import { TextChoicesFieldOptions } from "@/api/models/TextChoicesFieldOptions";

interface TextChoicesFieldOptionsResponse {
  job_engagement: TextChoicesFieldOptions;
  job_category: TextChoicesFieldOptions;
  education: TextChoicesFieldOptions;
  work_experience: TextChoicesFieldOptions;
  account_type: TextChoicesFieldOptions;
}


export const GeneralService = {
  getStatistics: async (): Promise<Statistics> => {
    const response = await API.getList("statistics");
    return response.data;
  },

  /**
   * Returns enum field options for each field
   * of that kind that is defined in the web API
   */
  getFormSelectOptions: async (): Promise<TextChoicesFieldOptionsResponse> => {
    const response = await API.getList("text-choices-field-options");
    return response.data;
  },
};
