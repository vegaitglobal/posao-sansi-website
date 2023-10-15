import API from "./baseApi";
import { JobOffer, jobOfferFlags } from "@/api/models/JobOffer";
import { Pagination } from "@/api/models/Pagination";


interface JobOfferListResponse {
    items: JobOffer[],
    pagination: Pagination
}

export const JobOfferService = {
    getActiveJobOffers: async (pageNumber: number): Promise<JobOfferListResponse> => {
        return JobOfferService.getJobOffers(pageNumber, { is_active: true });
    },

    getMyJobsOffers: async (pageNumber: number, employerID: number): Promise<JobOfferListResponse> => {
        const listResponse = await JobOfferService.getJobOffers(pageNumber, { employer: employerID });
        listResponse.items = listResponse.items.map(jobOffer => {
            return { ...jobOffer, flag: jobOffer.is_active ? jobOfferFlags.active : jobOfferFlags.archived };
        });
        return listResponse;
    },

    getJobOffers: async (pageNumber: number, filters: object): Promise<JobOfferListResponse> => {
        const params = new URLSearchParams({
            ipp: 6,
            page: pageNumber,
            ...filters,
        });
        const response = await API.getAllResources("job-offers", params.toString());
        return response.data;
    },
};
