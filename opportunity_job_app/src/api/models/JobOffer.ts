export interface JobOffer {
    id: number;
    created: string;
    modified: string;
    job_name: string;
    job_description: string;
    location: string;
    application_deadline: string;
    engagement: JobOfferEngagements;
    category: string;
    required_work_experience: string;
    required_education: string;
    additional_skills: string;
    is_active: boolean;
    employer: number;
}

export enum JobOfferEngagements {
    course = "Course or internship",
    unpaid_internship = "Unpaid internship",
    paid_internship = "Paid internship",
    part_time = "Part time job offer",
    full_time = "Full time job offer",
}
