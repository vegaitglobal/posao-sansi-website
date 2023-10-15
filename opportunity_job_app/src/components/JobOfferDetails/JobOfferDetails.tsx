"use client";

import "./job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";
import { JobEnrollmentService } from "@/api/jobEnrollmentService";

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
    }, []);

    function goBack() {
        window.location.href = "/job-offers";
    }

    // function enroleForJob(jobOfferId:number, applicationAccountId: number) {
       
    // }

    return jobOffer && (
        <div className="page">
            <div className="page__back-button" onClick={ goBack }>
                <img className="page__back-button-image" src="/images/left-arrow.svg" alt="flag"/>
                <p className="page__back-button-text">Nazad na poslove</p>
            </div>
            <div className="page__content">
                <div className="page__content-left">
                    <h2 className="page__title">{ jobOffer?.job_name }</h2>
                    <p className="page__dedaline">Roksasdasd za prijavu: { mapStringToLocalDateString(jobOffer.application_deadline) }</p>
                    <p className="page__company">KOMPANIJA: { jobOffer.company_name.toUpperCase() }</p>
                    <p className="page__location">MESTO: { jobOffer.location.toUpperCase() }</p>
                    { jobOffer.company_url && <a className="page__link" href={ jobOffer.company_url }>{ jobOffer.company_url }</a> }
                    <p className="page__engagement">Angažman: <span className="page__engagement-sub">{ jobOffer.engagement }</span></p>
                </div>
                <div className="page__content-right">
                    <p>Opis posla: { jobOffer.job_description }</p>
                    <div className="page__list-wrap">
                    <span className="page__terms">Uslovi:</span>
                       <p>{ jobOffer.required_work_experience }</p>
                    </div>
                </div>
            </div>
            <div className="page__action-buttons">
                        {user?.accountType === "applicant" && (
                                <>
                                    {jobOffer.has_enrolled ? (
                                        <button className="page__button page__button--secondary">ODUSTANI</button>
                                    ) : (
                                        <button className="page__button page__button--primary">KONKURIŠI</button>
                                    )}
                                </>
                        )}
                            { user?.accountType == "employer" && (
                                // TODO: add "IZMENI" button later
                                <button className="page__secondary-button">ARHIVIRAJ</button>
                            ) }
            </div>
        </div>
    );
}
