import API from "./baseApi";
import { JobOffer, jobOfferFlags } from "@/api/models/JobOffer";
import { Pagination } from "@/api/models/Pagination";


interface JobOfferListResponse {
    items: JobOffer[],
    pagination: Pagination
}

export const JobOfferService = {
    getActiveJobOffers: async (pageNumber: number): Promise<JobOfferListResponse> => {
        const listResponse = await JobOfferService.getJobOffers(pageNumber);
        listResponse.items = listResponse.items.map(jobOffer => {
            return { ...jobOffer, flag: jobOffer.has_enrolled ? jobOfferFlags.enrolled : undefined };
        });
        return listResponse;
    },

    getMyJobsOffers: async (pageNumber: number): Promise<JobOfferListResponse> => {
        const listResponse = await JobOfferService.getJobOffers(pageNumber);
        listResponse.items = listResponse.items.map(jobOffer => {
            return { ...jobOffer, flag: jobOffer.is_active ? jobOfferFlags.active : jobOfferFlags.archived };
        });
        return listResponse;
    },

    getJobOffers: async (pageNumber: number): Promise<JobOfferListResponse> => {
        const params = new URLSearchParams({
            ipp: 6,
            page: pageNumber,
        } as any);
        const response = await API.getProtectedResourceList("job-offers", params.toString());
        return response.data;
    },

    findJobOffer: async (jobOfferID: number): Promise<JobOffer> => {
        const response = await API.getProtectedResourceDetails("job-offers", jobOfferID);
        return response.data;
    }
};
