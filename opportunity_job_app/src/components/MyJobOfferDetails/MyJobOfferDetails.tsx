"use client";

import "../../scss/components/job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { AuthService } from "@/api/authService";
import Popup from "../Popup/Popup";
import { useRouter } from "next/navigation";
import JobOfferDetails from "@/components/JobOfferDetail/JobOfferDetails";
import { useDictionary } from "@/hooks/useDictionary";
import { AccountTypes } from "@/enums";


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
  const { dict } = useDictionary();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffer, setJobOffer ] = useState<JobOffer>();
  const [ popups, setPopups ] = useState<Popups>({
    activationConfirmation: { isOpened: false },
    archivingConfirmation: { isOpened: false },
    error: { isOpened: false },
  });

  const commonPopupProps = {
    linkButton: {
      label: dict.myJobOfferDetails.commonPopupLinkButtonLabel,
      url: "/my-job-offers",
    }
  };

  useEffect(() => {
    checkAccess();
    fetchJobOffer();
  }, []);

  const checkAccess = () => {
    const auth = AuthService.getAuth();
    if (!auth) {
      router.push("/login");
    } else if (auth.account_type !== AccountTypes.applicant && auth.account_type !== AccountTypes.employer) {
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
      await JobOfferService.toggleJobOffer(jobOfferID, { is_active: !jobOffer!.is_active });
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
      <JobOfferDetails jobOffer={ jobOffer } backButtonURL="/my-job-offers"/>
      <div className="page__action-buttons">
        { jobOffer.is_active ? (
          <button className="page__button page__button--secondary" onClick={ toggleJobStatus }>
            { dict.myJobOfferDetails.archiveJobOfferButtonLabel }
          </button>
        ) : (
          <button className="page__button" onClick={ toggleJobStatus }>
            { dict.myJobOfferDetails.activateJobOfferButtonLabel }
          </button>
        ) }
        <Popup
          isOpened={ popups.activationConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, activationConfirmation: { isOpened: false } }) }
          primaryText={ dict.myJobOfferDetails.activationConfirmationPopup.primaryText }
          { ...commonPopupProps }
        />
        <Popup
          isOpened={ popups.archivingConfirmation.isOpened }
          onClose={ () => setPopups({ ...popups, archivingConfirmation: { isOpened: false } }) }
          primaryText={ dict.myJobOfferDetails.archivingConfirmationPopup.primaryText }
          { ...commonPopupProps }
        />
        <Popup
          isOpened={ popups.error.isOpened }
          onClose={ () => setPopups({ ...popups, error: { isOpened: false } }) }
          primaryText={ dict.myJobOfferDetails.errorPopup.primaryText }
          secondaryText={ dict.myJobOfferDetails.errorPopup.secondaryText }
          { ...commonPopupProps }
        />
      </div>
    </div>
  );
}
