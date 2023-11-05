import UpdateJobOffer from "@/components/UpdateJobOffer/UpdateJobOffer";

interface UpdateJobOfferPageProps {
  params: {
    myJobOfferId: string
  };
}

export default function UpdateJobOfferPage({ params }: UpdateJobOfferPageProps) {
  return <UpdateJobOffer jobOfferID={ parseInt(params.myJobOfferId) }/>;
}
