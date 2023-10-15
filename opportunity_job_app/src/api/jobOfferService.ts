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
    getActiveJobOffers: async (pageNumber: number): Promise<JobOfferListResponse> => {
        return JobOfferService.getJobOffers(pageNumber, { is_active: true });
    },

    getMyJobsOffers: async (pageNumber: number, employerID: number): Promise<JobOfferListResponse> => {
        return JobOfferService.getJobOffers(pageNumber, { employer: employerID });
    },

    getJobOffers: async (pageNumber: number, filters: object): Promise<JobOfferListResponse> => {
        const params = new URLSearchParams({
            ipp: 6,
            page: pageNumber,
            ...filters,
        });
        const response = await API.getAllResources("job-offers", params.toString());
        return response.data;
    }
};
