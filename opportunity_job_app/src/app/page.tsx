import Header from "../components/Header/Header";
import Loading from "../components/Loading/Loading";
import Banner from "../components/Banner/Banner";

export default function Home() {
  return (
    <>
      <Loading>
        <Header />
        <main>
          <Banner />
        </main>
      </Loading>
    </>
  )
}
