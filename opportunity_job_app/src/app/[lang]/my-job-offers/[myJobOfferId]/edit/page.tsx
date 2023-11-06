import UpdateJobOffer from "@/components/UpdateJobOffer/UpdateJobOffer";

interface EditJobOfferPageProps {
  params: {
    myJobOfferId: string
  };
}

export default function EditJobOfferPage({ params }: EditJobOfferPageProps) {
  return <UpdateJobOffer jobOfferID={ parseInt(params.myJobOfferId) }/>;
}
