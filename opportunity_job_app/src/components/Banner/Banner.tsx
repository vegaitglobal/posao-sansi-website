import "./Banner.scss";

const Banner = () => {
    return (
        <section className="banner">
            <h1 className="banner__heading">Posao šansi</h1>
            <div className="banner__content">
                <img className="banner__img" src="/images/banner-img.svg" alt="Banner image" />
                <p className="banner__text">
                    Dobrodošli na Posao Šansi - platformu koja pravi razliku u svetu zapošljavanja! Naša vizija je jednostavna - Želimo stvoriti prostor u kome svaka žena može ostvariti uspeh i imati jednake šanse za pronalaženje dostojanstvenog posla. Bez obzira na to da li tražite posao ili nudite prilike za zapošljavanje, pozivamo vas da se pridružite našoj platformi kako bismo zajedno radili na stvaranju pozitivne vizije budućnosti za sve žene na tržištu rada. Posao šansi – jer zajedno pravimo razliku!
                </p>
            </div>
        </section>
    )
}

export default Banner;