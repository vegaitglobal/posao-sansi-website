import API from "./baseApi";
import { Pagination } from "@/api/models/Pagination";
import { JobEnrollment } from "@/api/models/JobEnrollment";


interface JobEnrollmentListResponse {
    items: JobEnrollment[],
    pagination: Pagination
}

export const JobEnrollmentService = {

    getJobEnrollments: async (applicantID: number): Promise<JobEnrollmentListResponse> => {
        const params = new URLSearchParams({
            applicant: applicantID
        });
        const response = await API.getResourceList("job-enrollments", params.toString());
        return response.data;
    }

};
