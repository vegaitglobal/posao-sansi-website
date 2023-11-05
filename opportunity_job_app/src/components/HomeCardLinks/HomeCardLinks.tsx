"use client";

import "./home-card-links.scss";
import React from "react";
import HomeCardLink from "@/components/HomeCardLink/HomeCardLink";
import { useDictionary } from "@/hooks/useDictionary";
import { AccountTypes } from "@/enums";
import { ACTIVE_JOB_OFFERS_LINK, MY_JOB_OFFERS_LINK, REGISTER_LINK } from "@/data/links";

interface HomeCardLinks {
  accountType?: AccountTypes;
}

const HomeCardLinks = ({ accountType }: HomeCardLinks) => {
  const { dict, locale } = useDictionary();

  const renderButtons = () => {
    if (accountType === AccountTypes.applicant) {
      return (
        <HomeCardLink
          title={ dict.homeCardLinks.applicantCardLink.title }
          label={ dict.homeCardLinks.applicantCardLink.label }
          href={ ACTIVE_JOB_OFFERS_LINK.getPathname(locale) }
          imageURL="/images/card-1-img.svg"
        />
      );
    }
    if (accountType === AccountTypes.employer) {
      return (
        <HomeCardLink
          title={ dict.homeCardLinks.employerCardLink.title }
          label={ dict.homeCardLinks.employerCardLink.label }
          href={ MY_JOB_OFFERS_LINK.getPathname(locale) }
          imageURL="/images/card-2-img.svg"
        />
      );
    }
    return (
      <>
        <HomeCardLink
          title={ dict.homeCardLinks.anonymousApplicantCardLink.title }
          label={ dict.homeCardLinks.anonymousApplicantCardLink.label }
          href={ REGISTER_LINK.getPathname(locale, { accountType: AccountTypes.applicant }) }
          imageURL="/images/card-1-img.svg"
        />
        <HomeCardLink
          title={ dict.homeCardLinks.anonymousEmployerCardLink.title }
          label={ dict.homeCardLinks.anonymousEmployerCardLink.label }
          href={ REGISTER_LINK.getPathname(locale, { accountType: AccountTypes.employer }) }
          imageURL="/images/card-2-img.svg"
        />
      </>
    );
  };

  return (
    <section className="cards-wrapper">
      <div className="cards">
        { renderButtons() }
      </div>
    </section>
  );

};

export default HomeCardLinks;
