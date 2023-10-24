"use client";

import "./job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";
import { JobEnrollmentService } from "@/api/jobEnrollmentService";
import Popup, { PopupProps } from "../Popup/Popup";
import { useRouter } from "next/navigation";


const commonPopupProps = {
  isOpened: true,
  button: {
    label: "Nazad na poslove",
    url: "/job-offers",
  }
};

interface JobOfferDetailsProps {
  jobOfferID: number;
}

export default function JobOffersDetails({ jobOfferID }: JobOfferDetailsProps) {
  const router = useRouter();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffer, setJobOffer ] = useState<JobOffer>();
  const [ user, setUser ] = useState<User>();
  const [ popupProps, setPopupProps ] = useState<PopupProps>({
    isOpened: false,
    primaryText: "",
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
    } else if (user.account_type !== "applicant") {
      router.push("/");
    } else {
      setUser(user);
      setHasAccess(true);
    }
  };

  function goBack() {
    window.location.href = "/job-offers";
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
      setPopupProps({
        primaryText: "Vasa prijava je uspeno prosledjena!",
        secondaryText: "Uskoro ce Vam se javiti neko iz organizacije ATINA",
        ...commonPopupProps
      });
      fetchJobOffers();
    } catch (error) {
      setPopupProps({
        primaryText: "Greška: Vaša prijava nije mogla biti obradjena",
        secondaryText: "Molim Vas pokušajte kasnije",
        ...commonPopupProps
      });
    }
  };

  const removeJobEnrollment = async () => {
    try {
      await JobEnrollmentService.removeJobEnrollment(jobOffer!.job_enrollment);
      fetchJobOffers();
      setPopupProps({
        primaryText: "Vasa prijava je uspeno otkazana! ",
        ...commonPopupProps,
      });
    } catch (error) {
      setPopupProps({
        primaryText: "Greška: Vaša prijava nije mogla biti obradjena",
        secondaryText: "Molim Vas pokušajte kasnije",
        ...commonPopupProps,
      });
    }
  };


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
            <Popup { ...popupProps }/>
          </>
        ) }
        { user?.account_type == "employer" && (
          // TODO: add "IZMENI" button later
          <button className="page__secondary-button">ARHIVIRAJ</button>
        ) }
      </div>
    </div>
  );
}
