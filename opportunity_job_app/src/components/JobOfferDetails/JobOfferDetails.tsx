"use client";

import "./job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";

interface JobOfferDetailsProps {
    jobOfferID: number;
}

export default function JobOffersDetails({ jobOfferID }: JobOfferDetailsProps) {
    const [jobOffer, setJobOffer] = useState<JobOffer>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const fetchJobOffer = async () => {
            const user = AuthService.getUser();
            if (!user) {
                window.location.href = "/login";
            }
            setUser(user);
            try {
                const jobOffer = await JobOfferService.findJobOffer(jobOfferID);
                setJobOffer(jobOffer);
            } catch (error: any) {
                goBack();
            }
        };
        fetchJobOffer();
    }, [jobOffer]);

    function goBack() {
        window.location.href = "/job-offers";
    }

    return jobOffer && (
        <div className="page">
            <div className="page__back-button" onClick={ goBack }>
                <img className="page__back-button-image" src="/images/left-arrow.svg" alt="flag"/>
                <p className="page__back-button-text">Nazad na poslove</p>
            </div>
            <h2 className="page__title">{ jobOffer?.job_name }</h2>
            <p>Rok za prijavu: { mapStringToLocalDateString(jobOffer.application_deadline) }</p>
            <p>KOMPANIJA: { jobOffer.company_name.toUpperCase() }</p>
            <p>MESTO: { jobOffer.location.toUpperCase() }</p>
            { jobOffer.company_url && <a href={ jobOffer.company_url }>{ jobOffer.company_url }</a> }
            <p>Angažman: { jobOffer.engagement }</p>
            <p>Opis posla: { jobOffer.job_description }</p>
            <p>Uslovi: { jobOffer.required_work_experience }</p>
            <div className="page__action-buttons">
                { user?.accountType == "applicant" && (
                    <button className="page__primary-button">KONKURIŠI</button>
                ) }
                { user?.accountType == "employer" && (
                    // TODO: add "IZMENI" button later
                    <button className="page__secondary-button">ARHIVIRAJ</button>
                ) }
            </div>
        </div>
    );
}
