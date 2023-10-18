"use client"
import API from "./baseApi";

export const JobEnrollmentService = {
    addJobEnrollment: async (jobOfferId: number, applicant_account: number) => {
        return await API.post(`/job-enrollments/`, { job_offer: jobOfferId, applicant_account:applicant_account });
    },

    removeJobEnrollment: async (jobEnrollmentId: number) => {
        return await API.delete(`/job-enrollments/${jobEnrollmentId}/`);
    }
}
