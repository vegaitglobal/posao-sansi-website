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
        myJobOfferId: string
    };
}

export default function JobOffersPage({ params }: JobOffersPageProps) {
    const router = useRouter();

    console.log(params)

    const [employer, setEmployer] = useState<User>();

    useEffect(() => {
        const fetchJobOffers = async () => {
            const user = AuthService.getUser();
            if (!user) {
                router.push("/login");
            } else if (user.account_type !== "employer") {
                router.push("/");
            } else {
                setEmployer(user);
            }
        };
        fetchJobOffers();
    }, []);

    return (
        <>
            <Header user={ employer }/>
            <main>
                <JobOffersDetails jobOfferID={ parseInt(params.myJobOfferId) }/>
            </main>
            <Footer/>
        </>
    );
}