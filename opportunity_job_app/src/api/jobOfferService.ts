import API from "./baseApi";
import { JobOffer } from "@/api/models/JobOffer";


interface Pagination {
    total_items: number;
    total_pages: number;
}

interface JobOfferListResponse {
    items: JobOffer[],
    pagination: Pagination
}

export const JobOfferService = {
    getActiveJobs: async (pageNumber: number): Promise<JobOfferListResponse> => {
        const itemsPerPage = 6;
        const queryParams = `is_active=true&page=${ pageNumber }&ipp=${ itemsPerPage }`;
        const response = await API.getAllResources("job-offers", queryParams);
        return response.data;
    },
};
