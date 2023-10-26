import MyJobOfferDetails from "@/components/MyJobOfferDetails/MyJobOfferDetails";

interface MyJobOfferPageProps {
  params: {
    myJobOfferId: string
  };
}

export default function MyJobOfferPage({ params }: MyJobOfferPageProps) {
  return <MyJobOfferDetails jobOfferID={ parseInt(params.myJobOfferId) }/>;
}
