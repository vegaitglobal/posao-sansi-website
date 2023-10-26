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
    return (
        <>
            <main>
                <JobOffersDetails jobOfferID={ parseInt(params.myJobOfferId) }/>
            </main>
        </>
    );
}