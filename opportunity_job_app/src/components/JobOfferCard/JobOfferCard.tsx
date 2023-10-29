import "./job-offer-card.scss";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { useDictionary } from "@/hooks/useDictionary";

interface JobOfferProps {
  jobOffer: JobOffer;
  listPathname: string;
}

const JobOfferCard = ({ jobOffer, listPathname }: JobOfferProps) => {
  const { dict } = useDictionary();

  function goToJobOfferDetails(jobID: number): void {
    window.location.href = `${ listPathname }/${ jobID }/`;
  }

  return (
    <div key={ jobOffer.id } className="job-offer" onClick={ () => goToJobOfferDetails(jobOffer.id) }>
      { jobOffer.flag && (
        <div className="job-offer__flag" style={ jobOffer.flag.style }>
          { dict.jobOfferCard[jobOffer.flag.labelKey] }
        </div>
      ) }
      <div className="job-offer__row job-offer__name">{ jobOffer.job_name.toUpperCase() }</div>
      <div className="job-offer__row">
        { dict.jobOfferCard.jobDescriptionLabel }
        <span className="job-offer__value">
          { jobOffer.job_description.slice(0, 75) }{ jobOffer.job_description.length >= 75 && "..." }
        </span>
      </div>
      <div className="job-offer__row">
        { dict.jobOfferCard.engagementLabel }
        <span className="job-offer__value job-offer__engagement-value">
            { jobOffer.engagement && jobOffer.engagement.toUpperCase() }
        </span>
      </div>
      <div className="job-offer__row job-offer__application-deadline">
        { dict.jobOfferCard.applicationDeadlineLabel }
        <span className="job-offer__value">
          { mapStringToLocalDateString(jobOffer.application_deadline) }
        </span>
      </div>
    </div>
  );
};

export default JobOfferCard;
