import API from "./baseApi";
import {Faq} from "./models/Faq";


export const FaqService = {
    getFaq: async (): Promise<Faq[]> => {
        const response = await API.getProtectedResourceList("faq");
        
        return response.data
    },
};



