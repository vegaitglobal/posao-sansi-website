"use client"
import Link from "next/link";
import { useState } from "react";
;

type LinkItem = {
    label: string;
    url: string;
    iconPath: string;
    isLogged?: null | object;
};

type LanguageItem = {
    label: string;
    code: string;
    flagPath: string;
};

type User = {
    token: string;
    id: number;
    accountType: string;
};

type HeaderProps = {
users: User | undefined;
};

type linksObjectTypes = {
    [x:string]:LinkItem[]
}

const Header = ({users}:HeaderProps) => {
    const initialLinks: LinkItem[] = [
        { label: 'Pocetna', url: '/', iconPath: '/images/home.svg', },
        { label: 'FAQ', url: '/faq', iconPath: '/images/faq.svg'},
    ]

    const links:LinkItem[] = [
        ...initialLinks,
        { label: 'Prijava', url: '/login', iconPath: '/images/log-in.svg'},
        { label: 'Registracija', url: '/register', iconPath: '/images/sign-in.svg'},
    ];

    const linksLoggedUser:LinkItem[] = [
        ...initialLinks,
        { label: 'Moji poslovi', url: '/register', iconPath: '/images/jobs.svg'},
        { label: 'Odjava', url: '/login', iconPath: '/images/sing-out.svg'},
    ];

    
    const linksLoggedCompany:LinkItem[] = [
        ...initialLinks,
        { label: 'Ponuda poslova', url: '/register', iconPath: '/images/jobs.svg'},
        { label: 'Odjava', url: '/login', iconPath: '/images/sing-out.svg'},
    ];
    
    const linksObject:linksObjectTypes = {
        "undefined": links,
        "Company": linksLoggedCompany,
        "User": linksLoggedUser
    }

    const languages: LanguageItem[] = [
        { label: 'ENG', code: 'en', flagPath: '/images/en-flag.png' },
        { label: 'SRB', code: 'srb', flagPath: '/images/srb-flag.png' },
    ];

    const mapItems = (items: LinkItem[]) => {
        return  items.map((link:LinkItem,index:number) => (
            <li className='header__nav-item' key={index}>
                <Link className="header__nav-link" href={link.url}>
                    <img src={link.iconPath} alt="icon" />
                    <span className="header__nav-link-text">
                        {link.label}
                    </span>
                </Link>
            </li>
        ))
    }

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
                        { users ? mapItems(linksObject[users.accountType]) : mapItems(links)}
                    </ul>
                    <button className='header__hamburger-btn' type='button'>
                        {users ? <img src="/images/user.svg" alt="user" /> : <img src="/images/hamburger-btn.svg" alt="hamburger-btn" /> }
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