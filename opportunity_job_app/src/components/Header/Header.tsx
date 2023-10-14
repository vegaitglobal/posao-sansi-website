"use client"
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import API, {setLocalStorage} from "@/api/baseApi";
import { AuthService } from "@/api/authService";
import './Header.scss'
import { initialLinks, links, linksLoggedUser, linksLoggedCompany } from "./HeaderData";

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
    const [isActive, setIsActive] = useState<boolean>(false);
    const [navActive, setIsNavActive] = useState<boolean>(false);
    

    const toggle = () => {
        setIsActive(!isActive);
        setIsNavActive(false)
    };

    const toggleNav = () => {
        setIsNavActive(!navActive);
        setIsActive(false)
    };
    
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
                    <img className="header__nav-icon" src={link.iconPath} alt="icon" />
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
                <div className="header__language">
                    <button className="header__language-button"  type='button' onClick={toggle}>
                        <img src="/images/language-icon.svg" alt="icon"/>
                    </button>
                    {isActive && <ul className="header__language-list">
                        {languages.map((language, index) => (
                            <li className='header__language-item' key={index}>
                                <button className="header__language-btn" type="button">
                                    <img className="header__laanguage-flag" src={language.flagPath} alt="flag" />
                                    {language.label}
                                </button>
                            </li>
                        ))}
                    </ul>}
                </div>
                <nav className="header__nav">
                    <ul className={`header__nav-list ${navActive ? 'header__nav-list--active' : ''}`}>       
                        { users ? mapItems(linksObject[users.accountType]) : mapItems(links)}
                    </ul>
                    <button className='header__hamburger-btn' type='button' onClick={toggleNav}>
                        {users ? <img src="/images/user.svg" alt="user" /> : <img src="/images/hamburger-btn.svg" alt="hamburger-btn" /> }
                    </button>
                </nav>
            </div>
        </header>
    )
}


export default Header