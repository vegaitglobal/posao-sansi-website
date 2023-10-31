"use client";

import Statistics from "@/components/Statistics/Statistics";
import HomeCardLinks from "@/components/HomeCardLinks/HomeCardLinks";
import HomeBanner from "@/components/Banner/HomeBanner";
import About from "@/components/About/About";
import { useEffect, useState } from "react";
import { Auth } from "@/api/models/Auth";
import { AuthService } from "@/api/authService";
import Spinner from "@/components/Spinner/Spinner";
import { GeneralService } from "@/api/generalService";


export default function Home() {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ auth, setAuth ] = useState<Auth>();
  const [ applicantCount, setApplicantCount ] = useState<number>(0);
  const [ employerCount, setEmployerCount ] = useState<number>(0);

  useEffect(() => {
    if (isLoading) {
      setAuth(AuthService.getAuth());
      fetchStatistics().then(() => setIsLoading(false));
    }
  }, [ isLoading ]);

  async function fetchStatistics() {
    const statistics = await GeneralService.getStatistics();
    setApplicantCount(statistics.applicant_count);
    setEmployerCount(statistics.employer_count);
  }

  if (isLoading) return <Spinner/>;

  return (
    <>
      <HomeBanner/>
      <HomeCardLinks accountType={ auth?.account_type }/>
      <About/>
      <Statistics applicantCount={ applicantCount } employerCount={ employerCount }/>
    </>
  );
}
