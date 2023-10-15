import "./job-offers.scss";
import { JobOffer } from "@/api/models/JobOffer";
import JobOfferCard from "@/components/JobOfferCard/JobOfferCard";

interface JobOffersProps {
    jobOffers?: JobOffer[];
    hasNextPage: boolean;
    totalJobOfferNumber: number;

    onLoadMore(): void;
}

const JobOffers = ({ totalJobOfferNumber, jobOffers = [], hasNextPage, onLoadMore }: JobOffersProps) => {
    return (
        <>
            <h2 className="job-offers-title">Aktivni oglasi: { totalJobOfferNumber }</h2>
            <div className="job-offers">
                { jobOffers?.map(jobOffer => {
                    return <JobOfferCard key={ jobOffer.id } jobOffer={ jobOffer }/>;
                }) }
            </div>
            { hasNextPage && (
                <div className="job-offers-bottom">
                    <button className="load-more-button" onClick={ onLoadMore }>
                        UČITAJ JOŠ
                    </button>
                </div>
            ) }
        </>
    );
};

export default JobOffers;
