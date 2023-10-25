"use client";

import "./Header.scss";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { User } from "@/api/models/User";
import { AuthService } from "@/api/authService";
import { anonymousUserLinks, applicantLinks, employerLinks, languageLinks, MainMenuLink } from "@/appData/links";
import { useLanguage } from "@/hooks/useDictionary";
import { usePathname } from "next/navigation";

interface MainMenuLinks {
  [x: string]: MainMenuLink[];
}

const Header = () => {
  const pathname = usePathname();
  const { slug, dict } = useLanguage();
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

  const mainMenuLinks: MainMenuLinks = {
    "anonymous": anonymousUserLinks,
    "employer": employerLinks,
    "applicant": applicantLinks
  };

  const changeLanguage = (languageSlug: string) => {
    if (!pathname.startsWith(`/${ languageSlug }`)) {
      localStorage.setItem("locale", languageSlug);
      window.location.href = pathname.replace(`/${ slug }`, `/${ languageSlug }`);
    }
  };

  const renderMainMenuLinks = (items: MainMenuLink[]) => {
    return items.map((link: MainMenuLink, index: number) => (
      <li className="header__nav-item" key={ index }>
        <Link className="header__nav-link" href={ link.url }>
          <img className="header__nav-icon" src={ link.iconPath } alt="icon"/>
          <span className="header__nav-link-text">
              { dict.header.mainMenu[link.labelDictKey] }
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
            <span className="header__logo-text">{ dict.header.logoText }</span>
          </a>
        </div>
        <div className="header__language">
          <button className="header__language-button" type="button" onClick={ toggleLanguageMenu }>
            <img src="/images/language-icon.svg" alt="icon"/>
          </button>
          { hasOpenedLanguageMenu && (
            <ul className="header__language-list">
              { languageLinks.map(languageLink => (
                <li key={ languageLink.code }
                    className="header__language-item"
                    onClick={ () => changeLanguage(languageLink.code) }
                >
                  <button className="header__language-btn" type="button">
                    <img className="header__language-flag" src={ languageLink.flagPath } alt="flag"/>
                    { dict.header.languageMenu[languageLink.labelDictKey] }
                  </button>
                </li>
              )) }
            </ul>
          ) }
        </div>
        <nav className="header__nav">
          { !isLoading && (
            <>
              <ul className={ `header__nav-list ${ hasOpenedMainMenu ? "header__nav-list--active" : "" }` }>
                { user ? renderMainMenuLinks(mainMenuLinks[user.account_type]) : renderMainMenuLinks(anonymousUserLinks) }
                { user && (
                  <li className="header__nav-item" key="logout-main-menu-item" onClick={ logout }>
                    <div className="header__nav-link">
                      <img className="header__nav-icon" src="/images/sing-out.svg" alt="icon"/>
                      <span className="header__nav-link-text">{ dict.header.mainMenu.logoutLabel }</span>
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
