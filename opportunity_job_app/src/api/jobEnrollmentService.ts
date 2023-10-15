"use client"
import API from "./baseApi";
export const JobEnrollmentService = {
    addJobEnrollment: async (jobOfferId: number, applicant_account: number) => {
             const response = await API.post(`/job-enrolments/`, { job_offer: jobOfferId, applicant_account:applicant_account }, {});
             return response;
    }
}