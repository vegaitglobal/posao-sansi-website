"use client";

import "./../../scss/components/form-page.scss";
import { useDictionary } from "@/hooks/useDictionary";
import { SyntheticEvent, useState } from "react";
import InputField from "@/components/InputField/InputField";
import {
  applyAPIFormErrors,
  clearFormData,
  hasFormErrors,
  mapFormDataToAPIRequestBody,
  scrollFirstFieldWithErrorsIntoView,
  validateFormData
} from "@/utils";
import { JobOfferFormData } from "@/components/JobOfferForm/types";
import SelectField from "@/components/SelectField/SelectField";
import TextAreaField from "@/components/TextAreaField/TextAreaField";
import { PostJobOffer } from "@/api/models/PostJobOffer";

interface JobOfferFormProps {
  formData: JobOfferFormData;
  submitButtonLabel: string;
  clearFormAfterSuccessfulSubmit?: boolean;

  onSubmit(jobOffer: PostJobOffer): Promise<void>;

  setFormData(formData: JobOfferFormData): void;

  onSuccess(): void;

  onError(): void;
}

const JobOfferForm = (
  {
    onSubmit,
    submitButtonLabel,
    formData,
    setFormData,
    onSuccess,
    onError,
    clearFormAfterSuccessfulSubmit = true
  }: JobOfferFormProps
) => {
  const { dict, locale } = useDictionary();
  const [ shouldDisplayFormErrors, setShouldDisplayFormErrors ] = useState<boolean>(false);
  const [ responseError, setResponseError ] = useState<string>("");

  const handleSubmit = (e: SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const validatedFormData = validateFormData<JobOfferFormData>(formData, dict);
    setFormData(validatedFormData);

    if (hasFormErrors(validatedFormData)) {
      displayFormErrors();
    } else {
      doSubmit();
    }
  };

  const doSubmit = async () => {
    setShouldDisplayFormErrors(false);
    try {
      const jobOffer = mapFormDataToAPIRequestBody<PostJobOffer>(formData);
      await onSubmit(jobOffer);
      onSuccess();
      if (clearFormAfterSuccessfulSubmit) {
        const clearedFormData = clearFormData<JobOfferFormData>(formData);
        setFormData(clearedFormData);
      }
    } catch (error: any) {
      handleSubmitError(error);
    }
  };

  const displayFormErrors = () => {
    setShouldDisplayFormErrors(true);
    scrollFirstFieldWithErrorsIntoView();
  };

  const handleSubmitError = (error: any) => {
    if (error.response?.data?.errors) {
      const validatedFormData = applyAPIFormErrors<JobOfferFormData>(formData, error.response.data.errors);
      setFormData(validatedFormData);
      setResponseError(error.response.data.errors.non_field_errors);
      displayFormErrors();
    } else {
      onError();
    }
  };

  const updateFormData = (fieldValue: string, fieldName: string) => {
    const newFormData = { ...formData, [fieldName]: { ...formData[fieldName], value: fieldValue } };
    setFormData(newFormData);
  };

  return (
    <>
      <form className="form-page__form">
        <InputField
          isRequired={ !formData.job_name.isOptional }
          label={ dict.jobOfferForm.jobNameFieldLabel }
          placeholder={ dict.jobOfferForm.jobNameFieldPlaceholder }
          value={ formData.job_name.value }
          onChange={ (value) => updateFormData(value, "job_name") }
          errors={ shouldDisplayFormErrors ? formData.job_name.errors : [] }
        />
        <InputField
          isRequired={ !formData.location.isOptional }
          label={ dict.jobOfferForm.locationFieldLabel }
          placeholder={ dict.jobOfferForm.locationFieldPlaceholder }
          value={ formData.location.value }
          onChange={ (value) => updateFormData(value, "location") }
          errors={ shouldDisplayFormErrors ? formData.location.errors : [] }
        />
        <InputField
          isRequired={ !formData.application_deadline.isOptional }
          label={ dict.jobOfferForm.applicationDeadlineFieldLabel }
          placeholder={ dict.jobOfferForm.applicationDeadlineFieldPlaceholder }
          value={ formData.application_deadline.value }
          onChange={ (value) => updateFormData(value, "application_deadline") }
          errors={ shouldDisplayFormErrors ? formData.application_deadline.errors : [] }
        />
        <TextAreaField
          isRequired={ !formData.job_description.isOptional }
          label={ dict.jobOfferForm.jobDescriptionFieldLabel }
          placeholder={ dict.jobOfferForm.jobDescriptionFieldPlaceholder }
          value={ formData.job_description.value }
          onChange={ (value) => updateFormData(value, "job_description") }
          errors={ shouldDisplayFormErrors ? formData.job_description.errors : [] }
        />
        <SelectField
          isRequired={ !formData.category.isOptional }
          label={ dict.jobOfferForm.categoryFieldLabel }
          placeholder={ dict.jobOfferForm.categoryFieldPlaceholder }
          value={ formData.category.value }
          options={ formData.category.options }
          onChange={ (value) => updateFormData(value, "category") }
          errors={ shouldDisplayFormErrors ? formData.category.errors : [] }
        />
        <SelectField
          isRequired={ !formData.engagement.isOptional }
          label={ dict.jobOfferForm.engagementFieldLabel }
          placeholder={ dict.jobOfferForm.engagementFieldPlaceholder }
          value={ formData.engagement.value }
          options={ formData.engagement.options }
          onChange={ (value) => updateFormData(value, "engagement") }
          errors={ shouldDisplayFormErrors ? formData.engagement.errors : [] }
        />
        <SelectField
          isRequired={ !formData.required_education.isOptional }
          label={ dict.jobOfferForm.requiredEducationFieldLabel }
          placeholder={ dict.jobOfferForm.requiredEducationFieldPlaceholder }
          value={ formData.required_education.value }
          options={ formData.required_education.options }
          onChange={ (value) => updateFormData(value, "required_education") }
          errors={ shouldDisplayFormErrors ? formData.required_education.errors : [] }
        />
        <SelectField
          isRequired={ !formData.required_work_experience.isOptional }
          label={ dict.jobOfferForm.requiredWorkExperienceFieldLabel }
          placeholder={ dict.jobOfferForm.requiredWorkExperienceFieldPlaceholder }
          value={ formData.required_work_experience.value }
          options={ formData.required_work_experience.options }
          onChange={ (value) => updateFormData(value, "required_work_experience") }
          errors={ shouldDisplayFormErrors ? formData.required_work_experience.errors : [] }
        />
        <TextAreaField
          isRequired={ !formData.additional_skills.isOptional }
          label={ dict.jobOfferForm.additionalSkillsFieldLabel }
          placeholder={ dict.jobOfferForm.additionalSkillsFieldPlaceholder }
          value={ formData.additional_skills.value }
          onChange={ (value) => updateFormData(value, "additional_skills") }
          errors={ shouldDisplayFormErrors ? formData.additional_skills.errors : [] }
        />
        { responseError && <p className="form-field__error">{ responseError }</p> }
        <button className="button" onClick={ handleSubmit }>
          { submitButtonLabel }
        </button>
      </form>

    </>
  );
};

export default JobOfferForm;
