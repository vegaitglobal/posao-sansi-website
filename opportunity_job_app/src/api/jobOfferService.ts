import API from "./baseApi";
import { JobOffer } from "@/api/models/JobOffer";


export const JobOfferService = {
    getActiveJobs: async (): Promise<JobOffer[]> => {
        const response = await API.getAllResources("job-offers");
        return response.data.items
    },
};
