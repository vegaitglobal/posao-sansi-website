import "./job-offer-card.scss"
import { JobOffer, JobOfferEngagements } from "@/api/models/JobOffer";
import { useRouter } from "next/navigation";

interface JobOfferProps {
    jobOffer: JobOffer;
    hasApplied: boolean;
}

const JobOfferCard = ({ jobOffer, hasApplied = false }: JobOfferProps) => {
    const router = useRouter()

    function openJobOfferDetails(jobID: number): void {
        router.push(`/job-offers/${ jobID }`)
    }

    return (
        <div key={ jobOffer.id } className="job-offer" onClick={ () => openJobOfferDetails(jobOffer.id) }>
            <div className="job-offer__row job-offer__name">{ jobOffer.job_name.toUpperCase() }</div>
            <div className="job-offer__row job-offer__description">
                Opis posla:&nbsp;
                { jobOffer.job_description.slice(0, 20) }{ jobOffer.job_description.length >= 20 && "..." }
            </div>
            <div className="job-offer__row job-offer__engagement">
                Angažman:&nbsp;
                <span className="job-offer__engagement-value">
                    { JobOfferEngagements[jobOffer.engagement].toUpperCase() }
                </span>
            </div>
            <div className="job-offer__row job-offer__application-deadline">
                Rok za prijavu: { new Date(Date.parse(jobOffer.application_deadline)).toLocaleDateString("de") }
            </div>
        </div>
    )
}

export default JobOfferCard
