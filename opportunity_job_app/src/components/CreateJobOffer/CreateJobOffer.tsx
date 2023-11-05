"use client";

import "./../../scss/components/form-page.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { getInitialJobOfferFormData } from "@/components/JobOfferForm/utils";
import { JobOfferFormData } from "@/components/JobOfferForm/types";
import { initialJobOfferFormData } from "@/components/JobOfferForm/data";
import { AuthService } from "@/api/authService";
import { HOME_LINK, LOGIN_LINK } from "@/data/links";
import Spinner from "@/components/Spinner/Spinner";
import { AccountTypes } from "@/enums";
import { useRouter } from "next/navigation";
import { PostJobOffer } from "@/api/models/PostJobOffer";
import JobOfferForm from "@/components/JobOfferForm/JobOfferForm";
import { useDictionary } from "@/hooks/useDictionary";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";


const CreateJobOffer = () => {
  const router = useRouter();
  const { dict, locale } = useDictionary();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
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
        <p className="form-page__message">{ dict.jobOfferForm.topText }</p>
        <JobOfferForm
          onSubmit={ createJobOffer }
          formData={ formData }
          setFormData={ setFormData }
        />
      </div>
      <FormPageDesktopImage style={ { paddingTop: "140px" } }/>
    </div>
  );
};

export default CreateJobOffer;
