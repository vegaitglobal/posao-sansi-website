"use client";

import "./job-offer-details.scss";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { useDictionary } from "@/hooks/useDictionary";

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
          <h2 className="job-offer__title">{ jobOffer?.job_name }</h2>
          <p className="job-offer__deadline">
            { dict.jobOfferDetails.applicationDeadlineLabel }
            <span className="job-offer__deadline-sub">
              { mapStringToLocalDateString(jobOffer.application_deadline) }
            </span>
          </p>
          <p className="job-offer__company">
            { dict.jobOfferDetails.companyLabel } { jobOffer.company_name.toUpperCase() }
          </p>
          <p className="job-offer__location">
            { dict.jobOfferDetails.locationLabel } { jobOffer.location.toUpperCase() }
          </p>
          { jobOffer.company_url && (
            <a className="job-offer__link" href={ jobOffer.company_url }>{ jobOffer.company_url }</a>
          ) }
          <p className="job-offer__engagement">
            { dict.jobOfferDetails.engagementLabel }
            <span className="job-offer__engagement-sub"> { jobOffer.engagement }</span>
          </p>
        </div>
        <div className="job-offer__content-right">
          <p>{ dict.jobOfferDetails.descriptionLabel } { jobOffer.job_description }</p>
          { jobOffer.required_work_experience && (
            <div className="job-offer__list-wrap">
              <span className="job-offer__terms">{ dict.jobOfferDetails.conditionsLabel }</span>
              <p>{ jobOffer.required_work_experience }</p>
            </div>
          ) }
        </div>
      </div>
    </>
  );
}
