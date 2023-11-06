"use client";

import "./../../scss/components/form-page.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { getInitialJobOfferFormData } from "@/components/JobOfferForm/utils";
import { JobOfferFormData } from "@/components/JobOfferForm/types";
import { initialJobOfferFormData } from "@/components/JobOfferForm/data";
import { AuthService } from "@/api/authService";
import { HOME_LINK, LOGIN_LINK, MY_JOB_OFFERS_LINK } from "@/data/links";
import Spinner from "@/components/Spinner/Spinner";
import { AccountTypes } from "@/enums";
import { useRouter } from "next/navigation";
import { PostJobOffer } from "@/api/models/PostJobOffer";
import JobOfferForm from "@/components/JobOfferForm/JobOfferForm";
import { useDictionary } from "@/hooks/useDictionary";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";
import Popup from "@/components/Popup/Popup";


const CreateJobOffer = () => {
  const router = useRouter();
  const { dict, locale } = useDictionary();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ hasOpenedSuccessPopup, setHasOpenedSuccessPopup ] = useState<boolean>(false);
  const [ hasOpenedErrorPopup, setHasOpenedErrorPopup ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<JobOfferFormData>(initialJobOfferFormData);

  useEffect(() => {
    if (isLoading) {
      checkAccess();
      getInitialJobOfferFormData().then(data => {
        setFormData(data);
        setIsLoading(false);
      });
    }
  }, [ isLoading ]);

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

  const createJobOffer = async (jobOffer: PostJobOffer) => {
    await JobOfferService.createJobOffer(jobOffer);
  };

  if (isLoading) return <Spinner/>;

  return hasAccess && (
    <div className="form-page">
      <div className="form-page__left">
        <p className="form-page__message">{ dict.createJobOfferForm.topText }</p>
        <JobOfferForm
          onSubmit={ createJobOffer }
          submitButtonLabel={ dict.createJobOfferForm.submitButtonLabel }
          formData={ formData }
          setFormData={ setFormData }
          onSuccess={ () => setHasOpenedSuccessPopup(true) }
          onError={ () => setHasOpenedErrorPopup(true) }
        />
      </div>
      <FormPageDesktopImage style={ { paddingTop: "140px" } }/>
      <Popup
        isOpened={ hasOpenedSuccessPopup }
        primaryText={ dict.createJobOfferForm.successPopup.primaryText }
        secondaryText={ dict.createJobOfferForm.successPopup.secondaryText }
        linkButton={ {
          url: MY_JOB_OFFERS_LINK.getPathname(locale),
          label: dict.createJobOfferForm.successPopup.linkButtonLabel
        } }
        onClose={ () => setHasOpenedSuccessPopup(false) }
      />
      <Popup
        isOpened={ hasOpenedErrorPopup }
        primaryText={ dict.createJobOfferForm.errorPopup.primaryText }
        secondaryText={ dict.createJobOfferForm.errorPopup.secondaryText }
        onClose={ () => setHasOpenedErrorPopup(false) }
      />
    </div>
  );
};

export default CreateJobOffer;
