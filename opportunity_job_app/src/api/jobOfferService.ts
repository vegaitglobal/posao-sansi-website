import API from "./baseApi";
import { JobOffer, jobOfferFlags } from "@/api/models/JobOffer";
import { Pagination } from "@/api/models/Pagination";
import { PostJobOffer } from "@/api/models/PostJobOffer";
import { PatchJobOffer } from "@/api/models/PatchJobOffer";


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
    const response = await API.getList("job-offers", params.toString());
    return response.data;
  },

  findJobOffer: async (jobOfferID: number, withRawValues?: boolean): Promise<JobOffer> => {
    const queryParams = withRawValues ? "raw_values=true" : "";
    const response = await API.getOne("job-offers", jobOfferID, queryParams);
    return response.data;
  },

  toggleJobOffer: async (jobOfferId: number, updatedData: any) => {
    return await API.patch(`/job-offers/${ jobOfferId }/`, updatedData);
  },

  createJobOffer: async (jobOffer: PostJobOffer) => {
    return await API.post("/job-offers/", jobOffer);
  },

  updateJobOffer: async (jobOfferId: number, jobOffer: PatchJobOffer) => {
    return await API.patch(`/job-offers/${ jobOfferId }/`, jobOffer);
  },
};
