import API from "./baseApi";
import { Statistics } from "@/api/models/Statistics";
import { TextChoicesFieldOptions } from "@/api/models/TextChoicesFieldOptions";


export const GeneralService = {
  getStatistics: async (): Promise<Statistics> => {
    const response = await API.getList("statistics");
    return response.data;
  },

  /**
   * Returns enum field options for each field
   * of that kind that is defined in the web API
   */
  getFormSelectOptions: async (): Promise<TextChoicesFieldOptions> => {
    const response = await API.getList("text-choices-field-options");
    return response.data;
  },
};
