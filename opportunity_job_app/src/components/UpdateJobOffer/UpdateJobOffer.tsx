"use client";

import "./../../scss/components/form-page.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { getInitialJobOfferFormData } from "@/components/JobOfferForm/utils";
import { JobOfferFormData } from "@/components/JobOfferForm/types";
import { AuthService } from "@/api/authService";
import { HOME_LINK, LOGIN_LINK, MY_JOB_OFFERS_LINK } from "@/data/links";
import Spinner from "@/components/Spinner/Spinner";
import { AccountTypes } from "@/enums";
import { useRouter } from "next/navigation";
import JobOfferForm from "@/components/JobOfferForm/JobOfferForm";
import { useDictionary } from "@/hooks/useDictionary";
import { JobOffer } from "@/api/models/JobOffer";
import { PatchJobOffer } from "@/api/models/PatchJobOffer";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";
import Popup from "@/components/Popup/Popup";
import { mapStringToLocalDateString } from "@/utils";


interface UpdateJobOfferProps {
  jobOfferID: number;
}

const UpdateJobOffer = ({ jobOfferID }: UpdateJobOfferProps) => {
  const router = useRouter();
  const { dict, locale } = useDictionary();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ hasOpenedSuccessPopup, setHasOpenedSuccessPopup ] = useState<boolean>(false);
  const [ hasOpenedErrorPopup, setHasOpenedErrorPopup ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<JobOfferFormData>();

  useEffect(() => {
    if (isLoading) {
      fetchJobOffer().then((jobOffer) => setInitialFormData(jobOffer));
    }
  }, [ isLoading ]);

  const fetchJobOffer = async (): Promise<JobOffer> => {
    return await JobOfferService.findJobOffer(jobOfferID, true);
  };

  const setInitialFormData = (jobOffer: JobOffer) => {
    checkAccess();
    getInitialJobOfferFormData().then(data => {
      Object.keys(data).forEach(key => {
        if (key === "application_deadline") {
          data[key].value = mapStringToLocalDateString(jobOffer[key]);
        } else {
          data[key].value = jobOffer[key as keyof JobOffer] as any;
        }
      });
      setFormData(data);
      setIsLoading(false);
    });
  };

  const checkAccess = () => {
    const auth = AuthService.getAuth();
    if (!auth) {
      router.push(LOGIN_LINK.getPathname(locale));
    } else if (auth.account_type !== AccountTypes.employer) {
      router.push(HOME_LINK.getPathname(locale));
    } else {
      setHasAccess(true);
    }
  };

  const updateJobOffer = async (updatedJobOffer: PatchJobOffer) => {
    await JobOfferService.updateJobOffer(jobOfferID, updatedJobOffer);
  };

  if (isLoading) return <Spinner/>;

  return hasAccess && (
    <div className="form-page">
      <div className="form-page__left">
        <p className="form-page__message">{ dict.updateJobOfferForm.topText }</p>
        <JobOfferForm
          onSubmit={ updateJobOffer }
          submitButtonLabel={ dict.updateJobOfferForm.submitButtonLabel }
          formData={ formData! }
          setFormData={ setFormData }
          onSuccess={ () => setHasOpenedSuccessPopup(true) }
          onError={ () => setHasOpenedErrorPopup(true) }
          clearFormAfterSuccessfulSubmit={ false }
        />
      </div>
      <FormPageDesktopImage style={ { paddingTop: "140px" } }/>
      <Popup
        isOpened={ hasOpenedSuccessPopup }
        primaryText={ dict.updateJobOfferForm.successPopup.primaryText }
        secondaryText={ dict.updateJobOfferForm.successPopup.secondaryText }
        linkButton={ {
          url: MY_JOB_OFFERS_LINK.getPathname(locale),
          label: dict.updateJobOfferForm.successPopup.linkButtonLabel
        } }
        onClose={ () => setHasOpenedSuccessPopup(false) }
      />
      <Popup
        isOpened={ hasOpenedErrorPopup }
        primaryText={ dict.updateJobOfferForm.errorPopup.primaryText }
        secondaryText={ dict.updateJobOfferForm.errorPopup.secondaryText }
        onClose={ () => setHasOpenedErrorPopup(false) }
      />
    </div>
  );
};

export default UpdateJobOffer;
