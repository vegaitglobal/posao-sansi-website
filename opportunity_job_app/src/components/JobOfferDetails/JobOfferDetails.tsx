import "./job-offer-details.scss";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { useDictionary } from "@/hooks/useDictionary";
import JobOfferDetailsItem from "@/components/JobOfferDetailsItem/JobOfferDetailsItem";

interface JobOfferDetailsProps {
  jobOffer: JobOffer;
  backButtonURL: string;
}

export default function JobOfferDetails({ jobOffer, backButtonURL }: JobOfferDetailsProps) {
  const { dict } = useDictionary();
  return (
    <>
      <div className="job-offer__back-button" onClick={ () => window.location.href = backButtonURL }>
        <img className="job-offer__back-button-image" src="/images/left-arrow.svg" alt="flag"/>
        <p className="job-offer__back-button-text">{ dict.jobOfferDetails.backButtonLabel }</p>
      </div>
      <div className="job-offer__content">
        <div className="job-offer__content-left">
          <h2 className="job-offer__title">{ jobOffer.job_name }</h2>
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.applicationDeadlineLabel }
            value={ mapStringToLocalDateString(jobOffer.application_deadline) }
          />
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.companyLabel }
            value={ jobOffer.company_name.toUpperCase() }
          />
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.locationLabel }
            value={ jobOffer.location.toUpperCase() }
          />
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.websiteLinkLabel }
            value={ jobOffer.company_url }
            url={ jobOffer.company_url }
          />
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.engagementLabel }
            value={ jobOffer.engagement.toUpperCase() }
          />
        </div>
        <div className="job-offer__content-right">
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.descriptionLabel }
            value={ jobOffer.job_description }
            isColumn
          />
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.requiredWorkExperienceLabel }
            value={ jobOffer.required_work_experience }
            isColumn
          />
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.requiredEducationLabel }
            value={ jobOffer.required_education }
            isColumn
          />
          <JobOfferDetailsItem
            label={ dict.jobOfferDetails.additionalSkillsLabel }
            value={ jobOffer.additional_skills || "" }
            isColumn
          />
        </div>
      </div>
    </>
  );
}
