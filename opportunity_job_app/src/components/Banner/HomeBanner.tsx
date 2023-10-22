import "./HomeBanner.scss";
import { getDictionary } from "@/app/[lang]/dictionaries";

const HomeBanner = () => {
    const dict = getDictionary("sr");

    return (
        <section className="banner">
            <h1 className="banner__heading">{ dict.homeBanner.title }</h1>
            <div className="banner__content">
                <img className="banner__img" src="/images/banner-img.svg" alt="Banner image"/>
                <p className="banner__text">{ dict.homeBanner.text }</p>
            </div>
        </section>
    );
};

export default HomeBanner;
