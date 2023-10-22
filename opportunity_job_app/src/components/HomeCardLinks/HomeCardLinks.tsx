"use client";

import { User } from "@/api/models/User";
import "./HomeCardLinks.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService";

type HomepageCardLinkItem = {
    label: string;
    imgUrl: string;
    title: string;
};

const HomeCardLinks = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (AuthService.getUser() !== null) {
            setUser(AuthService.getUser());
        }
    }, []);

    const initialCards: HomepageCardLinkItem[] = [
        { label: "unlogged", imgUrl: "/images/card-1-img.svg", title: "Tražim posao", },
        { label: "logged", imgUrl: "/images/card-2-img.svg", title: "Nudim posao", },
    ];
    const applicantCard: HomepageCardLinkItem = {
        label: "logged",
        imgUrl: "/images/card-2-img.svg",
        title: "moji poslovi",
    };
    const employerCard: HomepageCardLinkItem = {
        label: "logged",
        imgUrl: "/images/card-1-img.svg",
        title: "aktivni poslovi",
    };

    return (
        <section className="cards">
            {
                !user
                    ? initialCards.map((card, index) => {
                        return (
                            <div className="card__holder" key={ index }>
                                <Link className="card__link" href="/register"></Link>
                                <div className="cards__left">
                                    <img className="cards__img" src={ card.imgUrl } alt="Card 1"/>
                                </div>
                                <div className="cards__right">
                                    <p className="cards__title">{ card.title }</p>
                                    <div className="card__link-wrap">
                                        <span className="card__text">Registruj se</span>
                                        <img className="cards__arrow" src="/images/right-arrow.svg" alt="Right arrow"/>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : (user && user.account_type === "employer")
                        ?
                        <div className="card__holder">
                            <Link className="card__link" href="/my-job-offers"></Link>
                            <div className="cards__left">
                                <img className="cards__img" src={ applicantCard.imgUrl } alt="Card 2"/>
                            </div>
                            <div className="cards__right">
                                <p className="cards__title">{ applicantCard.title }</p>
                                <div className="card__link-wrap">
                                    <span className="card__text">Kreiraj posao</span>
                                    <img className="cards__arrow" src="/images/right-arrow.svg" alt="Right arrow"/>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="card__holder">
                            <Link className="card__link" href="/job-offers"></Link>
                            <div className="cards__left">
                                <img className="cards__img" src={ employerCard.imgUrl } alt="Card 1"/>
                            </div>
                            <div className="cards__right">
                                <p className="cards__title">{ employerCard.title }</p>
                                <div className="card__link-wrap">
                                    <span className="card__text">Vidi stranicu</span>
                                    <img className="cards__arrow" src="/images/right-arrow.svg" alt="Right arrow"/>
                                </div>
                            </div>
                        </div>
            }
        </section>
    );
};

export default HomeCardLinks;
