"use client";

import "./../../scss/components/form-page.scss";
import { useDictionary } from "@/hooks/useDictionary";
import { SyntheticEvent, useEffect, useState } from "react";
import InputField from "@/components/InputField/InputField";
import {
  applyAPIFormErrors,
  clearFormData,
  hasFormErrors,
  mapFormDataToAPIRequestBody,
  scrollFirstFieldWithErrorsIntoView
} from "@/utils";
import { validateFormData } from "@/utils";
import { JobOfferService } from "@/api/jobOfferService";
import { getInitialJobOfferFormData } from "@/components/JobOfferForm/utils";
import { JobOfferFormData } from "@/components/JobOfferForm/types";
import { initialJobOfferFormData } from "@/components/JobOfferForm/data";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";
import SelectField from "@/components/SelectField/SelectField";
import { AuthService } from "@/api/authService";
import { HOME_LINK, LOGIN_LINK, MY_JOB_OFFERS_LINK } from "@/data/links";
import Spinner from "@/components/Spinner/Spinner";
import { AccountTypes } from "@/enums";
import { useRouter } from "next/navigation";
import TextAreaField from "@/components/TextAreaField/TextAreaField";
import Popup from "@/components/Popup/Popup";
import { CreateJobOffer } from "@/api/models/CreateJobOffer";


const JobOfferForm = () => {
  const { dict, locale } = useDictionary();
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ shouldDisplayFormErrors, setShouldDisplayFormErrors ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<JobOfferFormData>(initialJobOfferFormData);
  const [ responseError, setResponseError ] = useState<string>("");
  const [ hasOpenedSuccessPopup, setHasOpenedSuccessPopup ] = useState<boolean>(false);
  const [ hasOpenedErrorPopup, setHasOpenedErrorPopup ] = useState<boolean>(false);

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

  const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const validatedFormData = validateFormData<JobOfferFormData>(formData, dict);
    setFormData(validatedFormData);

    if (hasFormErrors(validatedFormData)) {
      displayFormErrors();
    } else {
      setShouldDisplayFormErrors(false);
      createJobOffer();
    }
  };

  const createJobOffer = async () => {
    try {
      const jobOffer = mapFormDataToAPIRequestBody<CreateJobOffer>(formData);
      await JobOfferService.createJobOffer(jobOffer);
      setHasOpenedSuccessPopup(true);
      const clearedFormData = clearFormData<JobOfferFormData>(formData);
      setFormData(clearedFormData);
    } catch (error: any) {
      handleResponseError(error);
    }
  };

  const displayFormErrors = () => {
    setShouldDisplayFormErrors(true);
    scrollFirstFieldWithErrorsIntoView();
  };

  const handleResponseError = (error: any) => {
    if (error.response?.data?.errors) {
      const validatedFormData = applyAPIFormErrors<JobOfferFormData>(formData, error.response.data.errors);
      setFormData(validatedFormData);
      setResponseError(error.response.data.errors.non_field_errors);
      displayFormErrors();
    } else {
      setHasOpenedErrorPopup(true);
    }
  };

  const updateFormData = (fieldValue: string, fieldName: string) => {
    const newFormData = { ...formData, [fieldName]: { ...formData[fieldName], value: fieldValue } };
    setFormData(newFormData);
  };

  if (isLoading) return <Spinner/>;

  return hasAccess && (
    <div className="form-page">
      <div className="form-page__left">
        <p className="form-page__message">{ dict.jobOfferForm.topText }</p>
        <form className="form-page__form">
          <InputField
            label={ dict.jobOfferForm.jobNameFieldLabel }
            placeholder={ dict.jobOfferForm.jobNameFieldPlaceholder }
            value={ formData.job_name.value }
            onChange={ (value) => updateFormData(value, "job_name") }
            errors={ shouldDisplayFormErrors ? formData.job_name.errors : [] }
          />
          <InputField
            label={ dict.jobOfferForm.locationFieldLabel }
            placeholder={ dict.jobOfferForm.locationFieldPlaceholder }
            value={ formData.location.value }
            onChange={ (value) => updateFormData(value, "location") }
            errors={ shouldDisplayFormErrors ? formData.location.errors : [] }
          />
          <InputField
            label={ dict.jobOfferForm.applicationDeadlineFieldLabel }
            placeholder={ dict.jobOfferForm.applicationDeadlineFieldPlaceholder }
            value={ formData.application_deadline.value }
            onChange={ (value) => updateFormData(value, "application_deadline") }
            errors={ shouldDisplayFormErrors ? formData.application_deadline.errors : [] }
          />
          <TextAreaField
            label={ dict.jobOfferForm.jobDescriptionFieldLabel }
            placeholder={ dict.jobOfferForm.jobDescriptionFieldPlaceholder }
            value={ formData.job_description.value }
            onChange={ (value) => updateFormData(value, "job_description") }
            errors={ shouldDisplayFormErrors ? formData.job_description.errors : [] }
          />
          <SelectField
            label={ dict.jobOfferForm.categoryFieldLabel }
            placeholder={ dict.jobOfferForm.categoryFieldPlaceholder }
            value={ formData.category.value }
            options={ formData.category.options }
            onChange={ (value) => updateFormData(value, "category") }
            errors={ shouldDisplayFormErrors ? formData.category.errors : [] }
          />
          <SelectField
            label={ dict.jobOfferForm.engagementFieldLabel }
            placeholder={ dict.jobOfferForm.engagementFieldPlaceholder }
            value={ formData.engagement.value }
            options={ formData.engagement.options }
            onChange={ (value) => updateFormData(value, "engagement") }
            errors={ shouldDisplayFormErrors ? formData.engagement.errors : [] }
          />
          <SelectField
            label={ dict.jobOfferForm.requiredEducationFieldLabel }
            placeholder={ dict.jobOfferForm.requiredEducationFieldPlaceholder }
            value={ formData.required_education.value }
            options={ formData.required_education.options }
            onChange={ (value) => updateFormData(value, "required_education") }
            errors={ shouldDisplayFormErrors ? formData.required_education.errors : [] }
          />
          <SelectField
            label={ dict.jobOfferForm.requiredWorkExperienceFieldLabel }
            placeholder={ dict.jobOfferForm.requiredWorkExperienceFieldPlaceholder }
            value={ formData.required_work_experience.value }
            options={ formData.required_work_experience.options }
            onChange={ (value) => updateFormData(value, "required_work_experience") }
            errors={ shouldDisplayFormErrors ? formData.required_work_experience.errors : [] }
          />
          <TextAreaField
            label={ dict.jobOfferForm.additionalSkillsFieldLabel }
            placeholder={ dict.jobOfferForm.additionalSkillsFieldPlaceholder }
            value={ formData.additional_skills.value }
            onChange={ (value) => updateFormData(value, "additional_skills") }
            errors={ shouldDisplayFormErrors ? formData.additional_skills.errors : [] }
          />
          { responseError && <p className="form-field__error">{ responseError }</p> }
          <button className="button" onClick={ handleSubmit }>
            { dict.jobOfferForm.submitButtonLabel }
          </button>
        </form>
      </div>
      <FormPageDesktopImage style={ { paddingTop: "140px" } }/>
      <Popup
        isOpened={ hasOpenedSuccessPopup }
        primaryText={ dict.jobOfferForm.successPopup.primaryText }
        secondaryText={ dict.jobOfferForm.successPopup.secondaryText }
        linkButton={ {
          url: MY_JOB_OFFERS_LINK.getPathname(locale),
          label: dict.jobOfferForm.successPopup.linkButtonLabel
        } }
        onClose={ () => setHasOpenedSuccessPopup(false) }
      />
      <Popup
        isOpened={ hasOpenedErrorPopup }
        primaryText={ dict.jobOfferForm.errorPopup.primaryText }
        secondaryText={ dict.jobOfferForm.errorPopup.secondaryText }
        onClose={ () => setHasOpenedErrorPopup(false) }
      />
    </div>
  );
};

export default JobOfferForm;
