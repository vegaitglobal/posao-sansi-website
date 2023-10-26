"use client";

import "./job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";
import { JobEnrollmentService } from "@/api/jobEnrollmentService";
import Popup from "../Popup/Popup";
import { useRouter } from "next/navigation";
import Link from "next/link";


const commonPopupProps = {
  linkButton: {
    label: "Nazad na poslove",
    url: "/job-offers",
  }
};

const commonPopupPropsEmployer = {
  linkButton: {
    label: "Nazad na poslove",
    url: "/my-job-offers",
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
  activeJobStatus: {
    isOpened: boolean;
  };
  archiveJobStatus: {
    isOpened: boolean;
  };
  error: {
    isOpened: boolean;
  };
}

export default function JobOffersDetails({ jobOfferID }: JobOfferDetailsProps) {
  const router = useRouter();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffer, setJobOffer ] = useState<JobOffer>();
  const [ user, setUser ] = useState<User>();
  const [ popups, setPopups ] = useState<Popups>({
    enrollmentConfirmation: { isOpened: false },
    cancellationConfirmation: { isOpened: false },
    activeJobStatus: {isOpened: false},
    archiveJobStatus: {isOpened: false},
    error: { isOpened: false },
  });

  useEffect(() => {
    const fetchJobOffer = async () => {
      try {
        const jobOffer = await JobOfferService.findJobOffer(jobOfferID);
        setJobOffer(jobOffer);
      } catch (error: any) {
        goBack();
      }
    };

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
      setUser(user);
      setHasAccess(true);
    }
  };

  function goBack() {
    window.location.href = "/job-offers";
    if(user?.account_type !== "employer") {
        window.location.href = "/job-offers";
    }else {
        window.location.href = "/my-job-offers"
    }
}

  const fetchJobOffers = async () => {
    try {
      const newJobOffer = await JobOfferService.findJobOffer(jobOfferID);
      setJobOffer(newJobOffer);
    } catch (error) {
      goBack();
    }
  };
  

  const addJobEnrollment = async () => {
    try {
      await JobEnrollmentService.addJobEnrollment(jobOfferID, user!.account_id);
      setPopups({ ...popups, enrollmentConfirmation: { isOpened: true } });
      fetchJobOffers();
    } catch (error) {
      setPopups({ ...popups, error: { isOpened: true } });
    }
  };

  const removeJobEnrollment = async () => {
    try {
      await JobEnrollmentService.removeJobEnrollment(jobOffer!.job_enrollment);
      fetchJobOffers();
      setPopups({ ...popups, cancellationConfirmation: { isOpened: true } });
    } catch (error) {
      setPopups({ ...popups, error: { isOpened: true } });
    }
  };


  const jobStatusText = () => {
    if(jobOffer?.is_active) {
      setPopups({ ...popups, archiveJobStatus: { isOpened: true } });
    } else {
      setPopups({ ...popups, activeJobStatus: { isOpened: true } });
    }
}


const toggleJobStatus = async () => {
    if(jobOffer) {
        try { 
            const updatedData = {
                is_active: !jobOffer.is_active,
            };
            await JobOfferService.toggleJobOffer(jobOfferID, updatedData)
            fetchJobOffers();
            jobStatusText();
        } catch(error) {
            console.log(error)
        }
    }
}

  return hasAccess && jobOffer && (
    <div className="page">
      <div className="page__back-button" onClick={ goBack }>
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
          { jobOffer.company_url &&
						<a className="page__link" href={ jobOffer.company_url }>{ jobOffer.company_url }</a> }
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
        { user?.account_type === "applicant" && (
          <>
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
          </>
        ) }
        { user?.account_type == "employer" && (
         <>
          {jobOffer.is_active ? (
              <button className="page__button page__button--secondary" onClick={toggleJobStatus}>ARHIVIRAJ</button>
          ): (
              <button className="page__button page__button--primary" onClick={toggleJobStatus}>AKTIVIRAJ</button>
          )}
          <Link className="page__button page__button--primary" href="#">IZMENI</Link>
          <Popup
              isOpened={ popups.archiveJobStatus.isOpened }
              onClose={ () => setPopups({ ...popups, archiveJobStatus: { isOpened: false } }) }
              primaryText="Uspešno ste arhivirali posao!"
              { ...commonPopupPropsEmployer }
            />
            <Popup
              isOpened={ popups.activeJobStatus.isOpened }
              onClose={ () => setPopups({ ...popups, activeJobStatus: { isOpened: false } }) }
              primaryText="Uspešno ste aktivirali posao!"
              { ...commonPopupPropsEmployer }
            />
             <Popup
              isOpened={ popups.error.isOpened }
              onClose={ () => setPopups({ ...popups, error: { isOpened: false } }) }
              primaryText="Došlo je do greške."
              secondaryText="Molimo Vas pokušajte kasnije."
              { ...commonPopupPropsEmployer }
            />
        </>
        ) }
      </div>
    </div>
  );
}
