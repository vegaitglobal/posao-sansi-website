"use client";

import "./Header.scss";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/api/models/User";
import { AuthService } from "@/api/authService";
import { anonymousUserLinks, applicantLinks, employerLinks } from "@/appData/headerData";
import { useLanguage } from "@/hooks/useDictionary";
import { usePathname } from "next/navigation";

interface LinkItem {
  label: string;
  url: string;
  iconPath: string;
  isLogged?: null | object;
}

interface LanguageItem {
  label: string;
  code: string;
  flagPath: string;
}

interface LinksObjectTypes {
  [x: string]: LinkItem[];
}

const Header = () => {
  const pathname = usePathname();
  const { slug } = useLanguage();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ user, setUser ] = useState<User | undefined>();
  const [ hasOpenedLanguageMenu, setHasOpenedLanguageMenu ] = useState<boolean>(false);
  const [ hasOpenedMainMenu, setHasOpenedMainMenu ] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setUser(AuthService.getUser());
      setIsLoading(false);
    }
  }, [ user, isLoading ]);

  const toggleLanguageMenu = () => {
    setHasOpenedLanguageMenu(!hasOpenedLanguageMenu);
    setHasOpenedMainMenu(false);
  };

  const toggleMainMenu = () => {
    setHasOpenedMainMenu(!hasOpenedMainMenu);
    setHasOpenedLanguageMenu(false);
  };

  const logout = useCallback(async () => {
    await AuthService.logout();
    window.location.href = "/login";
  }, []);

  const linksObject: LinksObjectTypes = {
    "anonymous": anonymousUserLinks,
    "employer": employerLinks,
    "applicant": applicantLinks
  };

  const languages: LanguageItem[] = [
    { label: "ENG", code: "en", flagPath: "/images/en-flag.png" },
    { label: "SRB", code: "sr", flagPath: "/images/srb-flag.png" },
  ];

  const changeLanguage = (languageSlug: string) => {
    if (!pathname.startsWith(`/${ languageSlug }`)) {
      localStorage.setItem("locale", languageSlug);
      window.location.href = pathname.replace(`/${ slug }`, `/${ languageSlug }`);
    }
  };

  const mapItems = (items: LinkItem[]) => {
    return items && items.map((link: LinkItem, index: number) => (
      <li className="header__nav-item" key={ index }>
        <Link className="header__nav-link" href={ link.url }>
          <img className="header__nav-icon" src={ link.iconPath } alt="icon"/>
          <span className="header__nav-link-text">
              { link.label }
          </span>
        </Link>
      </li>
    ));
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a className="header__logo-link" href="/">
            <img className="header__logo-img" src="/images/logo.png" alt="logo"/>
            <span className="header__logo-text">POSAO ŠANSI</span>
          </a>
        </div>
        <div className="header__language">
          <button className="header__language-button" type="button" onClick={ toggleLanguageMenu }>
            <img src="/images/language-icon.svg" alt="icon"/>
          </button>
          { hasOpenedLanguageMenu && <ul className="header__language-list">
            { languages.map((language, index) => (
              <li key={ index }
                  className="header__language-item"
                  onClick={ () => changeLanguage(language.code) }
              >
                <button className="header__language-btn" type="button">
                  <img className="header__language-flag" src={ language.flagPath } alt="flag"/>
                  { language.label }
                </button>
              </li>
            )) }
					</ul> }
        </div>
        <nav className="header__nav">
          { !isLoading && (
            <>
              <ul className={ `header__nav-list ${ hasOpenedMainMenu ? "header__nav-list--active" : "" }` }>
                { user ? mapItems(linksObject[user.account_type]) : mapItems(anonymousUserLinks) }
                { user && (
                  <li className="header__nav-item" key="logout-main-menu-item" onClick={ logout }>
                    <div className="header__nav-link">
                      <img className="header__nav-icon" src="/images/sing-out.svg" alt="icon"/>
                      <span className="header__nav-link-text">Odjava</span>
                    </div>
                  </li>
                ) }
              </ul>
              <button className="header__hamburger-btn" type="button" onClick={ toggleMainMenu }>
                { user ? <img src="/images/user.svg" alt="user"/> :
                  <img src="/images/hamburger-btn.svg" alt="hamburger-btn"/> }
              </button>
            </>
          ) }
        </nav>
      </div>
    </header>
  );
};


export default Header;
