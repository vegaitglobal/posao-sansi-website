import API from "./baseApi";

export const JobEnrollmentService = {
  addJobEnrollment: async (jobOfferId: number, applicant_account: number) => {
    const data = { job_offer: jobOfferId, applicant_account: applicant_account };
    return await API.post("/job-enrollments/", data);
  },

  removeJobEnrollment: async (jobEnrollmentId: number) => {
    return await API.delete(`/job-enrollments/${ jobEnrollmentId }/`);
  }
};
