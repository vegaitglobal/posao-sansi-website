import "./job-offers.scss";
import { JobOffer } from "@/api/models/JobOffer";
import JobOfferCard from "@/components/JobOfferCard/JobOfferCard";
import { useDictionary } from "@/hooks/useDictionary";

interface JobOffersProps {
  title: string;
  jobOffers?: JobOffer[];
  hasNextPage: boolean;

  onLoadMore(): void;
}

const JobOffers = ({ title, jobOffers = [], hasNextPage, onLoadMore }: JobOffersProps) => {
  const { dict } = useDictionary();
  return (
    <>
      <h2 className="job-offers-title">{ title }</h2>
      <div className="job-offers">
        { jobOffers?.map(jobOffer => {
          return <JobOfferCard key={ jobOffer.id } jobOffer={ jobOffer }/>;
        }) }
      </div>
      { hasNextPage && (
        <div className="job-offers-bottom">
          <button className="load-more-button" onClick={ onLoadMore }>
            { dict.jobOffers.loadMoreButtonLabel }
          </button>
        </div>
      ) }
    </>
  );
};

export default JobOffers;
