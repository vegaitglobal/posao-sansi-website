"use client"
import { AuthService } from "./authService";
import API from "./baseApi";

export const JobEnrollmentService = {
    addJobEnrollment: async (jobOfferId: number, applicant_account: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        const response = await API.post(`/job-enrollments/`, { job_offer: jobOfferId, applicant_account:applicant_account }, config);
        return response;
    },

    removeJobEnrollment: async (jobEnrollmentId: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        const response = await API.delete(`/job-enrollments/${jobEnrollmentId}/`, config);
        return response;
    }
}
