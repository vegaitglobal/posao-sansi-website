import MyJobOfferDetails from "@/components/MyJobOfferDetails/MyJobOfferDetails";

interface JobOffersPageProps {
  params: {
    myJobOfferId: string
  };
}

export default function MyJobOfferPage({ params }: JobOffersPageProps) {
  return <MyJobOfferDetails jobOfferID={ parseInt(params.myJobOfferId) }/>;
}
