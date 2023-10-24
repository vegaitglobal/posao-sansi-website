import JobOffersDetails from "@/components/JobOfferDetails/JobOfferDetails";

interface JobOfferPageProps {
  params: {
    jobOfferId: string
  };
}

export default function JobOfferPage({ params }: JobOfferPageProps) {

  return <JobOffersDetails jobOfferID={ parseInt(params.jobOfferId) }/>;
}
