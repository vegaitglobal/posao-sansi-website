import ActiveJobOffersDetails from "@/components/ActiveJobOfferDetails/ActiveJobOfferDetails";

interface JobOfferPageProps {
  params: {
    jobOfferId: string
  };
}

export default function ActiveJobOfferPage({ params }: JobOfferPageProps) {
  return <ActiveJobOffersDetails jobOfferID={ parseInt(params.jobOfferId) }/>;
}
