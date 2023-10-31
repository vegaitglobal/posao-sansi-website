"use client";

import "./registration-form.scss";
import { useDictionary } from "@/hooks/useDictionary";
import { AuthService } from "@/api/authService";
import { useEffect, useState } from "react";
import ApplicantRegistrationForm from "./ApplicantRegistrationForm/ApplicantRegistrationForm";
import { useSearchParams } from "next/navigation";
import SelectField, { SelectOption } from "@/components/SelectField/SelectField";
import Popup from "@/components/Popup/Popup";
import EmployerRegistrationForm from "@/components/RegistrationForm/EmployerRegistrationForm/EmployerRegistrationForm";
import { AccountTypes } from "@/enums";
import FormPageDesktopImage from "@/components/FormPageDesktopImage/FormPageDesktopImage";


const RegistrationForm = () => {
  const { dict } = useDictionary();
  const searchParams = useSearchParams();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ selectedAccountType, setSelectedAccountType ] = useState<AccountTypes>(() => {
    const accountTypeURLParam = searchParams.get("accountType");
    if (accountTypeURLParam && accountTypeURLParam === AccountTypes.employer) return AccountTypes.employer;
    return AccountTypes.applicant;
  });
  const [ hasOpenedSuccessPopup, setHasOpenedSuccessPopup ] = useState<boolean>(false);
  const [ hasOpenedErrorPopup, setHasOpenedErrorPopup ] = useState<boolean>(false);

  const accountTypeOptions: SelectOption[] = [
    { value: AccountTypes.applicant, label: dict.registrationForm.applicantOptionLabel },
    { value: AccountTypes.employer, label: dict.registrationForm.employerOptionLabel },
  ];

  useEffect(() => {
    if (isLoading) {
      checkAccess();
      setIsLoading(false);
    }
  }, [ isLoading ]);

  const checkAccess = () => {
    if (AuthService.isAuthenticated()) {
      window.location.href = "/";
    } else {
      setHasAccess(true);
    }
  };

  if (isLoading || !hasAccess) return null;

  return (
    <div className="form-page">
      <div className="form-page__left">
        <p className="form-page__message">{ dict.registrationForm.topText }</p>
        <div className="account-type-selector-wrapper">
          <SelectField
            value={ selectedAccountType }
            onChange={ (value: AccountTypes) => setSelectedAccountType(value) }
            options={ accountTypeOptions }
            withReversedColors
          />
        </div>
        { selectedAccountType === AccountTypes.applicant && (
          <ApplicantRegistrationForm
            onSuccess={ () => setHasOpenedSuccessPopup(true) }
            onError={ () => setHasOpenedErrorPopup(true) }
          />
        ) }
        { selectedAccountType === AccountTypes.employer && (
          <EmployerRegistrationForm
            onSuccess={ () => setHasOpenedSuccessPopup(true) }
            onError={ () => setHasOpenedErrorPopup(true) }
          />
        ) }
        <Popup
          isOpened={ hasOpenedSuccessPopup }
          primaryText={ dict.registrationForm.successPopup.primaryText }
          secondaryText={ dict.registrationForm.successPopup.secondaryText }
          linkButton={ { url: "/", label: dict.registrationForm.successPopup.linkButtonLabel } }
          onClose={ () => setHasOpenedSuccessPopup(false) }
        />
        <Popup
          isOpened={ hasOpenedErrorPopup }
          primaryText={ dict.registrationForm.errorPopup.primaryText }
          secondaryText={ dict.registrationForm.errorPopup.secondaryText }
          onClose={ () => setHasOpenedErrorPopup(false) }
        />
      </div>
      <FormPageDesktopImage style={ { paddingTop: "120px" } }/>
    </div>
  );
};

export default RegistrationForm;
