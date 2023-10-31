"use client";

import "./../../scss/components/job-offer-list.scss";
import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import { usePathname, useRouter } from "next/navigation";
import { JobOffer } from "@/api/models/JobOffer";
import { JobOfferService } from "@/api/jobOfferService";
import { useDictionary } from "@/hooks/useDictionary";
import JobOfferCard from "@/components/JobOfferCard/JobOfferCard";
import { AccountTypes } from "@/enums";
import Spinner from "@/components/Spinner/Spinner";


export default function MyJobOfferList() {
  const router = useRouter();
  const { dict } = useDictionary();
  const pathname = usePathname();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffers, setJobOffers ] = useState<JobOffer[]>([]);
  const [ pageNumber, setPageNumber ] = useState<number>(0);
  const [ totalJobOfferNumber, setTotalJobOfferNumber ] = useState<number>(0);
  const [ hasNextPage, setHasNextPage ] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      checkAccess();
      loadMoreJobOffers().then(() => setIsLoading(false));
    }
  }, [ isLoading ]);

  const checkAccess = () => {
    const auth = AuthService.getAuth();
    if (!auth) {
      router.push("/login");
    } else if (auth.account_type !== AccountTypes.employer) {
      router.push("/");
    } else {
      setHasAccess(true);
    }
  };

  async function loadMoreJobOffers() {
    const nextPageNumber = pageNumber + 1;
    setPageNumber(nextPageNumber);
    const response = await JobOfferService.getMyJobsOffers(nextPageNumber);
    setJobOffers([ ...jobOffers, ...response.items ]);
    setHasNextPage(nextPageNumber < response.pagination.total_pages);
    setTotalJobOfferNumber(response.pagination.total_items);
  }

  if (isLoading) return <Spinner/>;

  return hasAccess && (
    <>
      <h2 className="job-offers-title">{ `${ dict.myJobOfferList.title } ${ totalJobOfferNumber }` }</h2>
      <div className="job-offers">
        { jobOffers?.map(jobOffer => {
          return <JobOfferCard key={ jobOffer.id } jobOffer={ jobOffer } listPathname={ pathname }/>;
        }) }
      </div>
      { hasNextPage && (
        <div className="job-offers-bottom">
          <button className="load-more-button" onClick={ loadMoreJobOffers }>
            { dict.myJobOfferList.loadMoreButtonLabel }
          </button>
        </div>
      ) }
    </>
  );
}
