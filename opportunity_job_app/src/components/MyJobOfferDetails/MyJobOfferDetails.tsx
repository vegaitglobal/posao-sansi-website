"use client";

import "../../scss/components/job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { AuthService } from "@/api/authService";
import Popup from "../Popup/Popup";
import { useRouter } from "next/navigation";


const commonPopupProps = {
  linkButton: {
    label: "Nazad na poslove",
    url: "/my-job-offers",
  }
};

interface MyJobOfferDetailsProps {
  jobOfferID: number;
}

interface Popups {
  activationConfirmation: {
    isOpened: boolean;
  };
  archivingConfirmation: {
    isOpened: boolean;
  };
  error: {
    isOpened: boolean;
  };
}

export default function MyJobOfferDetails({ jobOfferID }: MyJobOfferDetailsProps) {
  const router = useRouter();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffer, setJobOffer ] = useState<JobOffer>();
  const [ popups, setPopups ] = useState<Popups>({
    activationConfirmation: { isOpened: false },
    archivingConfirmation: { isOpened: false },
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
    } else if (user.account_type !== "applicant" && user.account_type !== "employer") {
      router.push("/");
    } else {
      setHasAccess(true);
    }
  };

  const fetchJobOffer = async () => {
    const newJobOffer = await JobOfferService.findJobOffer(jobOfferID);
    setJobOffer(newJobOffer);
  };

  const toggleJobStatus = async () => {
    try {
      await JobOfferService.toggleJobOffer(jobOfferID, { is_active: !jobOffer.is_active });
      fetchJobOffer();
      displayConfirmationPopup();
    } catch (error) {
      setPopups({ ...popups, error: { isOpened: true } });
    }
  };

  const displayConfirmationPopup = () => {
    if (jobOffer!.is_active) {
      setPopups({ ...popups, archivingConfirmation: { isOpened: true } });
    } else {
      setPopups({ ...popups, activationConfirmation: { isOpened: true } });
    }
  };

  return hasAccess && jobOffer && (
    <div className="page">
      <div className="page__back-button" onClick={ () => window.location.href = "/my-job-offers" }>
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
        { jobOffer.is_active ? (
          <button className="page__button page__button--secondary" onClick={ toggleJobStatus }>ARHIVIRAJ</button>
        ) : (
          <button className="page__button page__button--primary" onClick={ toggleJobStatus }>AKTIVIRAJ</button>
        ) }
        <Popup
          isOpened={ popups.activationConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, activationConfirmation: { isOpened: false } }) }
          primaryText="Uspešno ste arhivirali posao!"
          { ...commonPopupProps }
        />
        <Popup
          isOpened={ popups.archivingConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, archivingConfirmation: { isOpened: false } }) }
          primaryText="Uspešno ste aktivirali posao!"
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
