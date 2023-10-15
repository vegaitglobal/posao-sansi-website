import "./job-offers.scss"
import { JobOffer } from "@/api/models/JobOffer";
import JobOfferCard from "@/components/JobOffer/JobOfferCard";

interface JobOffersProps {
    jobOffers?: JobOffer[]
}

const JobOffers = ({ jobOffers = [] }: JobOffersProps) => {
    return (
        <>
            <h2 className="job-offers-title">Aktivni oglasi: { jobOffers?.length }</h2>
            <div className="job-offers">
                { jobOffers?.map(jobOffer => {
                    return <JobOfferCard jobOffer={ jobOffer }/>
                }) }
            </div>
        </>
    )
}

export default JobOffers
