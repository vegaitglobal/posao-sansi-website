export interface JobOfferFlag {
    label: string;
    style: {
        labelColor: string;
        backgroundColor: string;
    };
}

export const jobOfferFlags = {
    active: {
        label: "AKTIVAN",
        style: {
            labelColor: "black",
            backgroundColor: "#77DAF0"
        }
    },
    archived: {
        label: "ARHIVIRAN",
        style: {
            labelColor: "white",
            backgroundColor: "#D7D5D5"
        }
    },
    enrolled: {
        label: "KONKURISALI STE",
        style: {
            labelColor: "black",
            backgroundColor: "#77DAF0"
        }
    }
};

export interface JobOffer {
    id: number;
    created: string;
    modified: string;
    job_name: string;
    job_description: string;
    location: string;
    application_deadline: string;
    engagement: string;
    category: string;
    required_work_experience: string;
    required_education: string;
    additional_skills: string;
    is_active: boolean;
    employer: number;
    job_enrollment: number;
    has_enrolled: boolean;
    company_name: string;
    company_url: string;
    flag?: JobOfferFlag;
}
