import "./Banner.scss";
import { useTranslation } from 'react-i18next';


const Banner = () => {
    const { t } = useTranslation();
    return (
        <section className="banner">
            <h1 className="banner__heading">{t('banner_heading')}</h1>
            <div className="banner__content">
                <img className="banner__img" src="/images/banner-img.svg" alt="Banner image" />
                <p className="banner__text">
                    {t('banner_content')}
                </p>
            </div>
        </section>
    )
}

export default Banner;