"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation";
import { User } from "@/api/models/User";
import JobOffersDetails from "@/components/JobOfferDetails/JobOfferDetails";

interface JobOffersPageProps {
    params: {
        jobOfferId: string
    };
}

export default function JobOffersPage({ params }: JobOffersPageProps) {
    const router = useRouter();

    const [applicant, setApplicant] = useState<User>();

    useEffect(() => {
        const fetchJobOffers = async () => {
            const user = AuthService.getUser();
            if (!user) {
                router.push("/login");
            } else if (user.accountType !== "applicant") {
                router.push("/");
            } else {
                setApplicant(user);
            }
        };
        fetchJobOffers();
    }, []);

    return (
        <>
            <Header user={ applicant }/>
            <main>
                <JobOffersDetails jobOfferID={ parseInt(params.jobOfferId) }/>
            </main>
            <Footer/>
        </>
    );
}
