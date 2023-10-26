import ActiveJobOfferDetails from "@/components/ActiveJobOfferDetails/ActiveJobOfferDetails";

interface ActiveJobOfferPageProps {
  params: {
    jobOfferId: string
  };
}

export default function ActiveJobOfferPage({ params }: ActiveJobOfferPageProps) {
  return <ActiveJobOfferDetails jobOfferID={ parseInt(params.jobOfferId) }/>;
}
