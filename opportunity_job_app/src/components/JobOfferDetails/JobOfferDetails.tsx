
import "./job-offer-details.scss";
import { useEffect, useState } from "react";
import { JobOfferService } from "@/api/jobOfferService";
import { JobOffer } from "@/api/models/JobOffer";
import { mapStringToLocalDateString } from "@/utils";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";
import { JobEnrollmentService } from "@/api/jobEnrollmentService";
import Popup from "../Popup/Popup";
import { log } from "console";

interface JobOfferDetailsProps {
    jobOfferID: number;
}

export default function JobOffersDetails({ jobOfferID }: JobOfferDetailsProps) {
    const [jobOffer, setJobOffer] = useState<JobOffer>();
    const [user, setUser] = useState<User>();
    const [popupDetails, setPopupDetails] = useState({
        popupVisibility: false,
        paragraphFirstText: '',
        paragraphSecondText: '',
        paragraphSecondVisibility: false,
        linkVisibility: false,
        linkText: '',
        linkUrl: '',
      });
      

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

    const fetchJobOffers = async () => {
        try {
            const newJobOffer = await JobOfferService.findJobOffer(jobOfferID)
            setJobOffer(newJobOffer)
        } catch (error) {
            goBack()
        }
    }
    

    const addJobEnrollment = async () => {
        if (user) {
            try {
                const { account_id } = user;
                await JobEnrollmentService.addJobEnrollment(jobOfferID, account_id);
                fetchJobOffers();
                setPopupDetails({
                    popupVisibility: true,
                    paragraphFirstText: 'Vasa prijava je uspeno prosledjena!',
                    paragraphSecondText: 'Uskoro ce Vam se javiti neko iz organizacije ATINA',
                    paragraphSecondVisibility: true,
                    linkVisibility: true,
                    linkText: 'Nazad na poslove',
                    linkUrl: '/job-offers',
                  });
            } catch (error) {
                console.log("Enrollment error:", error);
                    setPopupDetails({
                    popupVisibility: true,
                    paragraphFirstText: 'Error: Your enrollment could not be processed',
                    paragraphSecondText: 'Please try again later',
                    paragraphSecondVisibility: true,
                    linkVisibility: true,
                    linkText: 'Nazad na poslove',
                    linkUrl: '/job-offers',
                });
            }
        }
    };

    const removeJobEnrollment = async () => {
        if (user && jobOffer && jobOffer.job_enrollment) {
            try {
                const { job_enrollment } = jobOffer;
                await JobEnrollmentService.removeJobEnrollment(job_enrollment);
                fetchJobOffers();
                setPopupDetails({
                    popupVisibility: true,
                    paragraphFirstText: 'Vasa prijava je uspeno otkazana! ',
                    paragraphSecondText: '',
                    paragraphSecondVisibility: false,
                    linkVisibility: true,
                    linkText: 'Nazad na poslove',
                    linkUrl: '/job-offers',
                  });
            } catch (error) {
                console.log("Enrollment error:", error);
                    setPopupDetails({
                    popupVisibility: true,
                    paragraphFirstText: 'Error: Your enrollment could not be processed',
                    paragraphSecondText: 'Please try again later',
                    paragraphSecondVisibility: true,
                    linkVisibility: true,
                    linkText: 'Nazad na poslove',
                    linkUrl: '/job-offers',
                });
            }
        }
    };
    


    return jobOffer && (
        <div className="page">
            <div className="page__back-button" onClick={ goBack }>
                <img className="page__back-button-image" src="/images/left-arrow.svg" alt="flag"/>
                <p className="page__back-button-text">Nazad na poslove</p>
            </div>
            <div className="page__content">
                <div className="page__content-left">
                    <h2 className="page__title">{ jobOffer?.job_name }</h2>
                    <p className="page__dedaline">Roksasdasd za
                        prijavu: { mapStringToLocalDateString(jobOffer.application_deadline) }</p>
                    <p className="page__company">KOMPANIJA: { jobOffer.company_name.toUpperCase() }</p>
                    <p className="page__location">MESTO: { jobOffer.location.toUpperCase() }</p>
                    { jobOffer.company_url &&
                        <a className="page__link" href={ jobOffer.company_url }>{ jobOffer.company_url }</a> }
                    <p className="page__engagement">Angažman: <span
                        className="page__engagement-sub">{ jobOffer.engagement }</span></p>
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
                { user?.account_type === "applicant" && (
                    <>
                        { jobOffer.has_enrolled ? (
                            <>
                            <button className="page__button page__button--secondary" onClick={removeJobEnrollment}>ODUSTANI</button>
                            <Popup elementsDetails={popupDetails} />
                            </>
                        ) : (
                            <>
                            <button className="page__button page__button--primary" onClick={addJobEnrollment}>KONKURIŠI</button>
                            <Popup elementsDetails={popupDetails} />
                            </>
                        ) }
                    </>
                ) }
                { user?.account_type == "employer" && (
                    // TODO: add "IZMENI" button later
                    <button className="page__secondary-button">ARHIVIRAJ</button>
                ) }
            </div>
        </div>
    );
}