"use client"
import { AuthService } from "./authService";
import API, { api } from "./baseApi";
export const JobEnrollmentService = {
    addJobEnrollment: async (jobOfferId: number, applicant_account: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
             const response = await API.post(`/job-enrollments/`, { job_offer: jobOfferId, applicant_account:applicant_account }, config);
             return response;
    }
}


export const cancelEnrollment = {
    removeJobEnrollment: async (jobEnrollmentId: number) => {
        const config = { headers: AuthService.getAuthorizationHeaders() };
        const response = await api.delete(`/job-enrollments/${jobEnrollmentId}/`, config);
        return response;
    }
}
