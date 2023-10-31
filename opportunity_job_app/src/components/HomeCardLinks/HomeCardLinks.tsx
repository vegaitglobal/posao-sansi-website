"use client";

import "./HomeCardLinks.scss";
import React from "react";
import HomeCardLink from "@/components/HomeCardLink/HomeCardLink";
import { useDictionary } from "@/hooks/useDictionary";
import { AccountTypes } from "@/enums";

interface HomeCardLinks {
  accountType?: AccountTypes;
}

const HomeCardLinks = ({ accountType }: HomeCardLinks) => {
  const { dict } = useDictionary();

  const renderButtons = () => {
    if (accountType === AccountTypes.applicant) {
      return (
        <HomeCardLink
          title={ dict.homeCardLinks.applicantCardLink.title }
          label={ dict.homeCardLinks.applicantCardLink.label }
          href="/job-offers"
          imageURL="/images/card-1-img.svg"
        />
      );
    }
    if (accountType === AccountTypes.employer) {
      return (
        <HomeCardLink
          title={ dict.homeCardLinks.employerCardLink.title }
          label={ dict.homeCardLinks.employerCardLink.label }
          href="/my-job-offers"
          imageURL="/images/card-2-img.svg"
        />
      );
    }
    return (
      <>
        <HomeCardLink
          title={ dict.homeCardLinks.anonymousApplicantCardLink.title }
          label={ dict.homeCardLinks.anonymousApplicantCardLink.label }
          href={ `/register?accountType=${ AccountTypes.applicant }` }
          imageURL="/images/card-1-img.svg"
        />
        <HomeCardLink
          title={ dict.homeCardLinks.anonymousEmployerCardLink.title }
          label={ dict.homeCardLinks.anonymousEmployerCardLink.label }
          href={ `/register?accountType=${ AccountTypes.employer }` }
          imageURL="/images/card-2-img.svg"
        />
      </>
    );
  };

  return (
    <section className="cards">
      { renderButtons() }
    </section>
  );

};

export default HomeCardLinks;
