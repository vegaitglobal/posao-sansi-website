import "./Banner.scss";
import { useTranslation } from 'react-i18next';


const Banner = () => {
    const { t } = useTranslation();
    return (
        <section className="banner">
            <h1 className="banner__heading">{t('app.components.banner.bannerHeading')}</h1>
            <div className="banner__content">
                <img className="banner__img" src="/images/banner-img.svg" alt="Banner image" />
                <p className="banner__text">
                    {t('app.components.banner.bannerContent')}
                </p>
            </div>
        </section>
    )
}

export default Banner;