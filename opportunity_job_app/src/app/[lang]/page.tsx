import Footer from "@/components/Footer/Footer";
import Mission from "@/components/Mission/Mission";
import Statistics from "@/components/Statistics/Statistics";
import HomeCardLinks from "@/components/HomeCardLinks/HomeCardLinks";
import HomeBanner from "@/components/Banner/HomeBanner";


export default function HomePage() {
    return (
        <>
            <main>
                <HomeBanner/>
                <HomeCardLinks/>
                <Mission/>
                <Statistics/>
            </main>
            <Footer/>
        </>
    );
}
