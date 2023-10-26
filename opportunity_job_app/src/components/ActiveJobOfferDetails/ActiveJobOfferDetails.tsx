"use client";

import "../../scss/components/job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";
import { JobEnrollmentService } from "@/api/jobEnrollmentService";
import Popup from "../Popup/Popup";
import { useRouter } from "next/navigation";


const commonPopupProps = {
  linkButton: {
    label: "Nazad na poslove",
    url: "/job-offers",
  }
};

interface JobOfferDetailsProps {
  jobOfferID: number;
}

interface Popups {
  enrollmentConfirmation: {
    isOpened: boolean;
  };
  cancellationConfirmation: {
    isOpened: boolean;
  };
  error: {
    isOpened: boolean;
  };
}

export default function ActiveJobOfferDetails({ jobOfferID }: JobOfferDetailsProps) {
  const router = useRouter();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffer, setJobOffer ] = useState<JobOffer>();
  const [ user, setUser ] = useState<User>();
  const [ popups, setPopups ] = useState<Popups>({
    enrollmentConfirmation: { isOpened: false },
    cancellationConfirmation: { isOpened: false },
    error: { isOpened: false },
  });

  useEffect(() => {
    checkAccess();
    fetchJobOffer();
  }, []);

  const checkAccess = () => {
    const user = AuthService.getUser();
    if (!user) {
      router.push("/login");
    } else if (user.account_type !== "applicant") {
      router.push("/");
    } else {
      setUser(user);
      setHasAccess(true);
    }
  };

  const fetchJobOffer = async () => {
    const newJobOffer = await JobOfferService.findJobOffer(jobOfferID);
    setJobOffer(newJobOffer);
  };

  const addJobEnrollment = async () => {
    try {
      await JobEnrollmentService.addJobEnrollment(jobOfferID, user!.account_id);
      setPopups({ ...popups, enrollmentConfirmation: { isOpened: true } });
      fetchJobOffer();
    } catch (error) {
      setPopups({ ...popups, error: { isOpened: true } });
    }
  };

  const removeJobEnrollment = async () => {
    try {
      await JobEnrollmentService.removeJobEnrollment(jobOffer!.job_enrollment);
      setPopups({ ...popups, cancellationConfirmation: { isOpened: true } });
      fetchJobOffer();
    } catch (error) {
      setPopups({ ...popups, error: { isOpened: true } });
    }
  };

  return hasAccess && jobOffer && (
    <div className="page">
      <div className="page__back-button" onClick={ () => window.location.href = "/job-offers" }>
        <img className="page__back-button-image" src="/images/left-arrow.svg" alt="flag"/>
        <p className="page__back-button-text">Nazad na poslove</p>
      </div>
      <div className="page__content">
        <div className="page__content-left">
          <h2 className="page__title">{ jobOffer?.job_name }</h2>
          <p className="page__dedaline">Roksasdasd za
            prijavu: { mapStringToLocalDateString(jobOffer.application_deadline) }</p>
          <p className="page__company">KOMPANIJA: { jobOffer.company_name.toUpperCase() }</p>
          <p className="page__location">MESTO: { jobOffer.location.toUpperCase() }</p>
          { jobOffer.company_url && (
            <a className="page__link" href={ jobOffer.company_url }>{ jobOffer.company_url }</a>
          ) }
          <p className="page__engagement">Angažman: <span
            className="page__engagement-sub">{ jobOffer.engagement }</span></p>
        </div>
        <div className="page__content-right">
          <p>Opis posla: { jobOffer.job_description }</p>
          <div className="page__list-wrap">
            <span className="page__terms">Uslovi:</span>
            <p>{ jobOffer.required_work_experience }</p>
          </div>
        </div>
      </div>
      <div className="page__action-buttons">
        { jobOffer.has_enrolled ? (
          <button className="page__button page__button--secondary" onClick={ removeJobEnrollment }>
            ODUSTANI
          </button>
        ) : (
          <button className="page__button page__button--primary" onClick={ addJobEnrollment }>
            KONKURIŠI
          </button>
        ) }
        <Popup
          isOpened={ popups.enrollmentConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, enrollmentConfirmation: { isOpened: false } }) }
          primaryText="Vasa prijava je uspeno prosledjena!"
          secondaryText="Uskoro ce Vam se javiti neko iz organizacije ATINA."
          { ...commonPopupProps }
        />
        <Popup
          isOpened={ popups.cancellationConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, cancellationConfirmation: { isOpened: false } }) }
          primaryText="Vasa prijava je uspeno otkazana!"
          { ...commonPopupProps }
        />
        <Popup
          isOpened={ popups.error.isOpened }
          onClose={ () => setPopups({ ...popups, error: { isOpened: false } }) }
          primaryText="Došlo je do greške."
          secondaryText="Molimo Vas pokušajte kasnije."
          { ...commonPopupProps }
        />
      </div>
    </div>
  );
}
