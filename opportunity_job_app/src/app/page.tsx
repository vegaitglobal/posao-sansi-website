import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Loading from "@/components/Loading/Loading";

export default function Home() {
  return (
    <>
    <Loading>
      <Header />
      <main>
          <h1 className='test'>LETS GOOO</h1>
      </main>
      <Footer />
    </Loading>
    </>
  )
}
