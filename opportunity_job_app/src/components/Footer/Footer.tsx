"use client";

import Link from "next/link";
import "./Footer.scss";
import { contact, socialMediaLinks } from "@/appData/footerData";


const Footer = () => {
    return (
        <div className="footer">
            <img className="footer__bg-img" src="/images/footer-bg.png" alt="Background image"/>
            <div className="footer__container">
                <div className="footer__social">
                    <span className="footer__social-title">Društvene mreže</span>
                    <ul className="footer__social-icon-holder">
                        { socialMediaLinks.map((link, index) => (
                            <li className="footer__social-item" key={ index }>
                                <Link className="footer__social-link" target="_blank" href={ link.url }>
                                    <img className="footer__social-img" src={ link.iconPath } alt={ link.alt }/>
                                </Link>
                            </li>
                        )) }
                    </ul>
                </div>
                <div className="footer__links-holder">
                    <span className="footer__links-title">Kontakt</span>
                    <ul className="footer__contacts">
                        { contact.map((contact, i) => (
                            <li className="footer__contacts-item" key={ i }>
                                <img src={ contact.iconPath } alt={ contact.alt } className="footer__contacts-img"/>
                                <a className="footer__contact-link" href={ contact.href }>{ contact.label }</a>
                            </li>
                        )) }
                        <li className="footer__contacts-item">
                            <img src="/images/location.svg" alt="Location icon" className="footer__contacts-img"/>
                            <span className="footer__contacts-address-holder">
                                <span className="footer__contacts-address">Bul. Kralja Aleksandra 23,</span>
                                <span className="footer__contacts-address">11000 Beograd</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="footer__links-page">
                    <Link className="footer__links-link" href="/files/uslovi.pdf">
                        Uslovi korišćenja
                    </Link>
                    <Link className="footer__links-link" href="/files/privatnost.pdf">
                        Politika privatnosti
                    </Link>
                </div>
            </div>
            <div className="footer__bottom">
                <span className="footer__bottom-text">Copyright 2023 - Posao šansi</span>
                <span className="footer__bottom-text">Design by Vega IT</span>
            </div>
        </div>
    );
};

export default Footer;
