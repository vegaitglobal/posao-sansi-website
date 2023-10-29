import "./job-offer-card.scss";
import { JobOffer, JobOfferEngagements } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";

interface JobOfferProps {
  jobOffer: JobOffer;
  listPathname: string;
}

// TODO: ADD translations

const JobOfferCard = ({ jobOffer, listPathname }: JobOfferProps) => {

  function goToJobOfferDetails(jobID: number): void {
    window.location.href = `/${ listPathname }/${ jobID }/`;
  }

  return (
    <div key={ jobOffer.id } className="job-offer" onClick={ () => goToJobOfferDetails(jobOffer.id) }>
      { jobOffer.flag && (
        <div className="job-offer__flag" style={ jobOffer.flag.style }>
          { jobOffer.flag.label }
        </div>
      ) }
      <div className="job-offer__row job-offer__name">{ jobOffer.job_name.toUpperCase() }</div>
      <div className="job-offer__row">
        Opis posla:&nbsp;
        { jobOffer.job_description.slice(0, 20) }{ jobOffer.job_description.length >= 20 && "..." }
      </div>
      <div className="job-offer__row">
        Angažman:&nbsp;
        <span className="job-offer__engagement-value">
            { JobOfferEngagements[jobOffer.engagement as unknown as keyof typeof JobOfferEngagements].toUpperCase() }
        </span>
      </div>
      <div className="job-offer__row job-offer__application-deadline">
        Rok za prijavu: { mapStringToLocalDateString(jobOffer.application_deadline) }
      </div>
    </div>
  );
};

export default JobOfferCard;
