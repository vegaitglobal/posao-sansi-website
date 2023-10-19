'use client'
import { User } from "@/api/models/User";
import "./HomepageCardLinks.scss";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

type HeaderProps = {
    user: User | undefined;
};

type CardItem = {
    label: string;
    imgUrl: string;
    title: string;
};

const HomepageCardLinks = ({ user }: HeaderProps) => {
    const { t } = useTranslation();
    const initialCards: CardItem[] = [
        { label: "unlogged", imgUrl: "/images/card-1-img.svg", title: t('app.components.homepageCardLinks.anonymousApplicantCard.title'), },
        { label: "logged", imgUrl: "/images/card-2-img.svg", title: t('app.components.homepageCardLinks.anonymousEmployerCard.title'), },
    ]
    const logedUserCard: CardItem = { label: "logged", imgUrl: "/images/card-2-img.svg", title: t('app.components.homepageCardLinks.applicantCard.title'), }
    const loggedCompanyCard: CardItem = { label: "logged", imgUrl: "/images/card-1-img.svg", title: t('app.components.homepageCardLinks.employerCard.title'), }

    return (
        <section className="cards">
            {
                !user
                    ? initialCards.map((card, index) => {
                        return (
                            <div className="card__holder" key={index}>
                                    <Link className="card__link" href="/register"></Link>
                                        <div className="cards__left">
                                            <img className="cards__img" src={card.imgUrl} alt="Card 1" />
                                        </div>
                                        <div className="cards__right">
                                            <p className="cards__title">{card.title}</p>
                                            <div className="card__link-wrap">
                                                <span className="card__text">{t('app.components.homepageCardLinks.anonymousCard.text')}</span>
                                                <img className="cards__arrow" src="/images/right-arrow.svg" alt="Right arrow" />
                                            </div>
                                        </div>
                                </div>
                        )
                    })
                    : (user && user.account_type === "employer")
                        ?
                            <div className="card__holder">
                                <Link className="card__link" href="/my-job-offers" ></Link>
                                    <div className="cards__left">
                                        <img className="cards__img" src={logedUserCard.imgUrl} alt="Card 2" />
                                    </div>
                                    <div className="cards__right">
                                        <p className="cards__title">{logedUserCard.title}</p>
                                        <div className="card__link-wrap">
                                            <span className="card__text">{t('app.components.homepageCardLinks.employerCard.text')}</span>
                                            <img className="cards__arrow" src="/images/right-arrow.svg" alt="Right arrow" />
                                        </div>
                                    </div>
                            </div>
                        :
                            <div className="card__holder">
                                <Link className="card__link" href="/job-offers"></Link>
                                    <div className="cards__left">
                                        <img className="cards__img" src={loggedCompanyCard.imgUrl} alt="Card 1" />
                                    </div>
                                    <div className="cards__right">
                                        <p className="cards__title">{loggedCompanyCard.title}</p>
                                        <div className="card__link-wrap">
                                            <span className="card__text">{t('app.components.homepageCardLinks.applicantCard.text')}</span>
                                            <img className="cards__arrow" src="/images/right-arrow.svg" alt="Right arrow" />
                                        </div>
                                    </div>
                            </div>
            }
        </section>
    )
}

export default HomepageCardLinks;