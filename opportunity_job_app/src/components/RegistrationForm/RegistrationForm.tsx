"use client";

import "./registration-form.scss";
import { useDictionary } from "@/hooks/useDictionary";
import { AuthService } from "@/api/authService";
import { useEffect, useState } from "react";
import ApplicantRegistrationForm from "./ApplicantRegistrationForm/ApplicantRegistrationForm";
import { useSearchParams } from "next/navigation";
import SelectField, { SelectOption } from "@/components/SelectField/SelectField";

enum AccountTypes {
  APPLICANT = "applicant",
  EMPLOYER = "employer",
}

const RegistrationForm = ({}) => {
  const { dict } = useDictionary();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [selectedAccountType, setSelectedAccountType] = useState<AccountTypes>(() => {
    let accountType;
    const accountTypeURLParam = searchParams.get("accountType");
    if (accountTypeURLParam) accountType = AccountTypes[accountTypeURLParam.toUpperCase()];
    return accountType || AccountTypes.APPLICANT;
  });

  const accountTypeOptions: SelectOption[] = [
    { value: AccountTypes.APPLICANT, label: dict.registrationForm.applicantOptionLabel },
    { value: AccountTypes.EMPLOYER, label: dict.registrationForm.employerOptionLabel },
  ];

  useEffect(() => {
    if (isLoading) {
      checkAccess();
      setIsLoading(false);
    }
  }, []);

  const checkAccess = () => {
    if (AuthService.isAuthenticated()) {
      window.location.href = "/";
    } else {
      setHasAccess(true);
    }
  };

  if (isLoading || !hasAccess) return null;

  return (
    <div className="wrapper">
      <p className="welcome-sentence">{ dict.registrationForm.topText }</p>
      <div className="account-type-selector-wrapper">
        <SelectField
          value={ selectedAccountType }
          onChange={ (value: AccountTypes) => setSelectedAccountType(value) }
          options={ accountTypeOptions }
          withReversedColors
        />
      </div>
      { selectedAccountType === AccountTypes.APPLICANT && <ApplicantRegistrationForm/> }
      { selectedAccountType === AccountTypes.EMPLOYER && <div>TODO: employer form</div> }
      {/* TODO: POPUP */ }
    </div>
  );
};

export default RegistrationForm;
