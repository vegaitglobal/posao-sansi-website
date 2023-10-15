"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { JobOffer } from "@/api/models/JobOffer";
import { JobOfferService } from "@/api/jobOfferService";
import JobOffers from "@/components/JobOffers/JobOffers";
import { User } from "@/api/models/User";
import JobOffersDetails from "@/components/JobOfferDetails/JobOfferDetails";

export default function JobOffersPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [jobOfferID, setJobOfferID] = useState<number>();
    const [applicant, setApplicant] = useState<User>();
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [totalJobOfferNumber, setTotalJobOfferNumber] = useState<number>(0);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);

    useEffect(() => {
        const fetchJobOffers = async () => {
            const user = AuthService.getUser();
            if (!user) {
                router.push("/login");
            } else if (user.accountType !== "applicant") {
                router.push("/");
            } else {
                setApplicant(user);
                const id = parseInt(searchParams.get("id"));
                console.log("id:", id);
                if (id) {
                    setJobOfferID(id);
                } else {
                    loadMoreJobOffers();
                }
            }
        };
        fetchJobOffers();
    }, []);

    async function loadMoreJobOffers() {
        const nextPageNumber = pageNumber + 1;
        setPageNumber(nextPageNumber);
        const response = await JobOfferService.getActiveJobOffers(nextPageNumber);
        setJobOffers([...jobOffers, ...response.items]);
        setHasNextPage(nextPageNumber < response.pagination.total_pages);
        setTotalJobOfferNumber(response.pagination.total_items);
    }

    return (
        <>
            <Header user={ applicant }/>
            <main>
                { jobOfferID ? (
                    <JobOffersDetails jobOfferID={ jobOfferID }/>
                ) : (
                    <JobOffers
                        onLoadMore={ loadMoreJobOffers }
                        jobOffers={ jobOffers }
                        hasNextPage={ hasNextPage }
                        totalJobOfferNumber={ totalJobOfferNumber }
                    />
                ) }
            </main>
            <Footer/>
        </>
    );
}
