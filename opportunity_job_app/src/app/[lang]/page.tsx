import Statistics from "@/components/Statistics/Statistics";
import HomeCardLinks from "@/components/HomeCardLinks/HomeCardLinks";
import HomeBanner from "@/components/Banner/HomeBanner";
import About from "@/components/About/About";


export default function HomePage() {
  return (
    <main>
      <HomeBanner/>
      <HomeCardLinks/>
      <About/>
      <Statistics/>
    </main>
  );
}
