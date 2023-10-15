"use client"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService"
import { useRouter } from "next/navigation";
import { JobOffer } from "@/api/models/JobOffer";
import { JobOfferService } from "@/api/jobOfferService";
import JobOffers from "@/components/JobOffers/JobOffers";

export default function JobOffersPage() {
    const router = useRouter()

    const [jobOffers, setJobOffers] = useState<JobOffer[]>()

    // TODO: implement pagination (infinite scroll with a button)
    // TODO: fetch job enrolments and mark applied ones

    useEffect(() => {
        const fetchJobOffers = async () => {
            const user = AuthService.getUser()
            if (!user) {
                router.push("/login")
            } else if (user.accountType !== "applicant") {
                router.push("/")
            } else {
                const jobOffers = await JobOfferService.getActiveJobs()
                setJobOffers(jobOffers)
            }
        }
        fetchJobOffers()
    }, [])

    return (
        <>
            <Header/>
            <main>
                <JobOffers jobOffers={ jobOffers }/>
            </main>
            <Footer/>
        </>
    )
}
