"use client";

import "./header.scss";
import React, { useCallback, useEffect, useState } from "react";
import { Auth } from "@/api/models/Auth";
import { AuthService } from "@/api/authService";
import { anonymousUserLinks, applicantLinks, employerLinks, HOME_LINK, languageLinks, LOGIN_LINK } from "@/data/links";
import { useDictionary } from "@/hooks/useDictionary";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AccountTypes } from "@/enums";
import { MainMenuLink } from "@/types";

interface MainMenuLinks {
  [x: string]: MainMenuLink[];
}

interface Dictionary {
  // We define this interface for the object returned by
  // useDictionary hook so that we can access that object's
  // `dict` property using a dynamic key (e.g. `dict[key]`)
  locale: string | undefined,
  dict: any
}

const Header = () => {
  const pathname = usePathname();
  const { locale, dict }: Dictionary = useDictionary();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [auth, setAuth] = useState<Auth | undefined>();
  const [hasOpenedLanguageMenu, setHasOpenedLanguageMenu] = useState<boolean>(false);
  const [hasOpenedMainMenu, setHasOpenedMainMenu] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setAuth(AuthService.getAuth());
      setIsLoading(false);
      if (!localStorage.getItem("locale")) {
        localStorage.setItem("locale", locale!);
      }
    }
  }, [auth, isLoading]);

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
    window.location.href = LOGIN_LINK.getPathname(locale);
  }, []);

  const mainMenuLinks: MainMenuLinks = {
    anonymous: anonymousUserLinks,
    [AccountTypes.applicant]: applicantLinks,
    [AccountTypes.employer]: employerLinks,
  };

  const changeLanguage = (newLocale: string) => {
    if (!pathname.startsWith(`/${ newLocale }`)) {
      localStorage.setItem("locale", newLocale);
      window.location.href = pathname.replace(`/${ locale }`, `/${ newLocale }`);
    }
    setHasOpenedLanguageMenu(false);
  };

  const renderLanguageMenu = () => {
    return (
      <ul className="header__language-list">
        { languageLinks.map(languageLink => {
          let className = "header__language-item";
          if (languageLink.code === locale) {
            className += " header__language-item--active";
          }
          return (
            <li key={ languageLink.code }
                className={ className }
                onClick={ () => changeLanguage(languageLink.code) }
            >
              <button className="header__language-btn" type="button">
                <img className="header__language-flag" src={ languageLink.flagPath } alt="flag"/>
                { dict.header.languageMenu[languageLink.labelDictKey] }
              </button>
            </li>
          );
        }) }
      </ul>
    );
  };

  const renderMainMenuLinks = (items: MainMenuLink[]) => {
    return items.map((link: MainMenuLink, index: number) => {
      let className = "header__nav-item";
      const pathnameWithoutLocale = pathname.replace(`/${ locale }`, "");
      if (link.isActive(pathnameWithoutLocale)) {
        className += " header__nav-item--active";
      }
      return (
        <li className={ className } key={ index }>
          <Link className="header__nav-link" href={ link.getPathname(locale) }>
            <img className="header__nav-icon" src={ link.iconPath } alt="icon"/>
            <span className="header__nav-link-text">
              { dict.header.mainMenu[link.labelDictKey] }
          </span>
          </Link>
        </li>
      );
    });
  };

  const renderMainMenu = () => {
    return (
      <>
        <ul className={ `header__nav-list ${ hasOpenedMainMenu ? "header__nav-list--active" : "" }` }>
          { auth ? renderMainMenuLinks(mainMenuLinks[auth.account_type]) : renderMainMenuLinks(anonymousUserLinks) }
          { auth && (
            <li className="header__nav-item" key="logout-main-menu-item" onClick={ logout }>
              <div className="header__nav-link">
                <img className="header__nav-icon" src="/images/sing-out.svg" alt="icon"/>
                <span className="header__nav-link-text">{ dict.header.mainMenu.logoutLabel }</span>
              </div>
            </li>
          ) }
        </ul>
        <button className="header__hamburger-btn" type="button" onClick={ toggleMainMenu }>
          { auth ? <img src="/images/user.svg" alt="user"/> :
            <img src="/images/hamburger-btn.svg" alt="hamburger-btn"/> }
        </button>
      </>
    );
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a className="header__logo-link" href={ HOME_LINK.getPathname(locale) }>
            <img className="header__logo-img" src="/images/logo.png" alt="logo"/>
            <span className="header__logo-text">{ dict.header.logoText }</span>
          </a>
        </div>
        <div className="header__language">
          <button className="header__language-button" type="button" onClick={ toggleLanguageMenu }>
            <img src="/images/language-icon.svg" alt="icon"/>
          </button>
          { hasOpenedLanguageMenu && renderLanguageMenu() }
        </div>
        { !isLoading && renderMainMenu() }
      </div>
    </header>
  );
};

export default Header;
