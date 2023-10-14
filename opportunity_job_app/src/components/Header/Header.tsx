"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import API, {setLocalStorage} from "@/api/baseApi";
import { AuthService } from "@/api/authService";
import { log } from "console";
import './Header.scss'

type LinkItem = {
    label: string;
    url: string;
    iconPath: string;
};

type LanguageItem = {
    label: string;
    code: string;
    flagPath: string;
};

const Header = () => {
    const [logged, setLogged] = useState<boolean>(false);

    const links:LinkItem[] = [
        { label: 'Pocetna', url: '/', iconPath: '/images/home.svg'},
        { label: 'FAQ', url: '/faq', iconPath: '/images/faq.svg' },
        { label: 'Prijava', url: '/login', iconPath: '/images/log-in.svg' },
        { label: 'Registracija', url: '/register', iconPath: '/images/sign-in.svg' },
    ];

    const languages: LanguageItem[] = [
        { label: 'ENG', code: 'en', flagPath: '/images/en-flag.png' },
        { label: 'SRB', code: 'srb', flagPath: '/images/srb-flag.png' },
    ];
    return (
        <header className="header">

            <div className="header__container">
                <div className="header__logo">
                    <a className="header__logo-link" href="/">
                        <img className="header__logo-img" src="/images/logo.png" alt="logo" />
                        <span className="header__logo-text">POSAO ŠANSI</span>
                    </a>
                </div>
                <nav className="header__nav">
                    <ul className="header__nav-list">
                        {links.map((link, index) => (
                            <li className='header__nav-item' key={index}>
                                <Link className="header__nav-link" href={link.url}>
                                    <img src={link.iconPath} alt="icon" />
                                    <span className="header__nav-link-text">
                                        {link.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button className='header__hamburger-btn' type='button'>
                        {logged ? <img src="/images/user.svg" alt="user" /> : <img src="/images/hamburger-btn.svg" alt="hamburgerBtn"/>}
                    </button>
                </nav>
                <div className="header__language">
                    <button className="header__language-button" type='button'>
                        <img src="/images/language-icon.svg" alt="icon"/>
                    </button>
                    <ul className="header__language-list">
                        {languages.map((language, index) => (
                            <li className='header__language-item' key={index}>
                                <img src={language.flagPath} alt="flag" />
                                {language.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}


export default Header