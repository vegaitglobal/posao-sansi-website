"use client";

import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation";
import { JobOffer } from "@/api/models/JobOffer";
import { JobOfferService } from "@/api/jobOfferService";
import JobOffers from "@/components/JobOffers/JobOffers";

// TODO: refactor to server side component

export default function JobOffersPage() {
  const router = useRouter();
  const [ hasAccess, setHasAccess ] = useState<boolean>(false);
  const [ jobOffers, setJobOffers ] = useState<JobOffer[]>([]);
  const [ pageNumber, setPageNumber ] = useState<number>(0);
  const [ totalJobOfferNumber, setTotalJobOfferNumber ] = useState<number>(0);
  const [ hasNextPage, setHasNextPage ] = useState<boolean>(false);

  useEffect(() => {
    const fetchJobOffers = async () => {
      loadMoreJobOffers();
    };

    checkAccess();
    fetchJobOffers();
  }, []);

  const checkAccess = () => {
    const user = AuthService.getUser();
    if (!user) {
      router.push("/login");
    } else if (user.account_type !== "applicant") {
      router.push("/");
    } else {
      setHasAccess(true);
    }
  };

  async function loadMoreJobOffers() {
    const nextPageNumber = pageNumber + 1;
    setPageNumber(nextPageNumber);
    const response = await JobOfferService.getActiveJobOffers(nextPageNumber);
    setJobOffers([ ...jobOffers, ...response.items ]);
    setHasNextPage(nextPageNumber < response.pagination.total_pages);
    setTotalJobOfferNumber(response.pagination.total_items);
  }

  return (
    <main>
      { hasAccess && (
        <JobOffers
          onLoadMore={ loadMoreJobOffers }
          jobOffers={ jobOffers }
          hasNextPage={ hasNextPage }
          totalJobOfferNumber={ totalJobOfferNumber }
        />
      ) }
    </main>
  );
}
