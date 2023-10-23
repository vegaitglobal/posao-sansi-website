import Footer from "@/components/Footer/Footer";
import JobOffersDetails from "@/components/JobOfferDetails/JobOfferDetails";

interface JobOfferPageProps {
    params: {
        jobOfferId: string
    };
}

export default function JobOfferPage({ params }: JobOfferPageProps) {

    return (
        <>
            <main>
                <JobOffersDetails jobOfferID={ parseInt(params.jobOfferId) }/>
            </main>
            <Footer/>
        </>
    );
}
