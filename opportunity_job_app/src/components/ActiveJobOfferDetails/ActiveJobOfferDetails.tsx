"use client";

import "../../scss/components/job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";
import { JobEnrollmentService } from "@/api/jobEnrollmentService";
import Popup from "../Popup/Popup";
import { useRouter } from "next/navigation";
import JobOfferDetails from "@/components/JobOfferDetail/JobOfferDetails";
import { useDictionary } from "@/hooks/useDictionary";


interface ActiveJobOfferDetailsProps {
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

export default function ActiveJobOfferDetails({ jobOfferID }: ActiveJobOfferDetailsProps) {
  const router = useRouter();
  const { dict } = useDictionary();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffer, setJobOffer ] = useState<JobOffer>();
  const [ user, setUser ] = useState<User>();
  const [ popups, setPopups ] = useState<Popups>({
    enrollmentConfirmation: { isOpened: false },
    cancellationConfirmation: { isOpened: false },
    error: { isOpened: false },
  });

  const commonPopupProps = {
    linkButton: {
      label: dict.activeJobOfferDetails.commonPopupLinkButtonLabel,
      url: "/job-offers",
    }
  };

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
      <JobOfferDetails jobOffer={ jobOffer } backButtonURL="/job-offers"/>
      <div className="page__action-buttons">
        { jobOffer.has_enrolled ? (
          <button className="page__button page__button--secondary" onClick={ removeJobEnrollment }>
            { dict.activeJobOfferDetails.removeJobEnrollmentButtonLabel }
          </button>
        ) : (
          <button className="page__button page__button--primary" onClick={ addJobEnrollment }>
            { dict.activeJobOfferDetails.addJobEnrollmentButtonLabel }
          </button>
        ) }
        <Popup
          isOpened={ popups.enrollmentConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, enrollmentConfirmation: { isOpened: false } }) }
          primaryText={ dict.activeJobOfferDetails.enrollmentConfirmationPopup.primaryText }
          secondaryText={ dict.activeJobOfferDetails.enrollmentConfirmationPopup.secondaryText }
          { ...commonPopupProps }
        />
        <Popup
          isOpened={ popups.cancellationConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, cancellationConfirmation: { isOpened: false } }) }
          primaryText={ dict.activeJobOfferDetails.cancellationConfirmationPopup.primaryText }
          { ...commonPopupProps }
        />
        <Popup
          isOpened={ popups.error.isOpened }
          onClose={ () => setPopups({ ...popups, error: { isOpened: false } }) }
          primaryText={ dict.activeJobOfferDetails.errorPopup.primaryText }
          secondaryText={ dict.activeJobOfferDetails.errorPopup.secondaryText }
          { ...commonPopupProps }
        />
      </div>
    </div>
  );
}