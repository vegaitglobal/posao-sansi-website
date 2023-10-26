"use client";

import { User } from "@/api/models/User";
import "./HomeCardLinks.scss";
import React, { useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import HomeCardLink from "@/components/HomeCardLink/HomeCardLink";
import { useDictionary } from "@/hooks/useDictionary";


const HomeCardLinks = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ user, setUser ] = useState<User>();
  const { dict } = useDictionary();

  useEffect(() => {
    if (isLoading) {
      if (AuthService.getUser() !== null) {
        setUser(AuthService.getUser());
      }
      setIsLoading(false);
    }
  }, []);

  const renderButtons = () => {
    if (!user) {
      return (
        <>
          <HomeCardLink
            title={ dict.homeCardLinks.anonymousApplicantCardLink.title }
            label={ dict.homeCardLinks.anonymousApplicantCardLink.label }
            href="/register"
            imageURL="/images/card-1-img.svg"
          />
          <HomeCardLink
            title={ dict.homeCardLinks.anonymousEmployerCardLink.title }
            label={ dict.homeCardLinks.anonymousEmployerCardLink.label }
            href="/register"
            imageURL="/images/card-2-img.svg"
          />
        </>
      );
    }

    if (user.account_type === "applicant") {
      return (
        <HomeCardLink
          title={ dict.homeCardLinks.applicantCardLink.title }
          label={ dict.homeCardLinks.applicantCardLink.label }
          href="/job-offers"
          imageURL="/images/card-1-img.svg"
        />
      );
    }
    if (user.account_type === "employer") {
      return (
        <HomeCardLink
          title={ dict.homeCardLinks.employerCardLink.title }
          label={ dict.homeCardLinks.employerCardLink.label }
          href="/my-job-offers"
          imageURL="/images/card-2-img.svg"
        />
      );
    }
  };

  return (
    <section className="cards">
      { !isLoading && renderButtons() }
    </section>
  );

};

export default HomeCardLinks;
