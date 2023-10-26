"use client";

import Link from "next/link";
import "./Footer.scss";
import { contact, socialMediaLinks } from "@/appData/footerData";
import { useDictionary } from "@/hooks/useDictionary";


const Footer = () => {
  const { dict } = useDictionary();

  return (
    <div className="footer">
      <img className="footer__bg-img" src="/images/footer-bg.png" alt="Background image"/>
      <div className="footer__container">
        <div className="footer__social">
          <span className="footer__social-title">{ dict.footer.socialMediaListTitle }</span>
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
          <span className="footer__links-title">{ dict.footer.contactListTitle }</span>
          <ul className="footer__contacts">
            { contact.map((contact, i) => (
              <li className="footer__contacts-item" key={ i }>
                <img src={ contact.iconPath } alt={ contact.alt } className="footer__contacts-img"/>
                <a className="footer__contact-link" href={ contact.href }>{ contact.label }</a>
              </li>
            )) }
            <li className="footer__contacts-item">
              <img src="/images/location.svg" alt="Location icon" className="footer__contacts-img"/>
              <div className="footer__contacts-address-holder">
                <span className="footer__contacts-address">Bul. Kralja Aleksandra 23,</span>
                <span className="footer__contacts-address">11000 Beograd</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="footer__links-page">
          <Link className="footer__links-link" href="/files/uslovi.pdf">
            { dict.footer.termsOfUseFilename }
          </Link>
          <Link className="footer__links-link" href="/files/privatnost.pdf">
            { dict.footer.privacyPolicyFilename }
          </Link>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="footer__bottom-text">{ dict.footer.copyrightText }</span>
        <span className="footer__bottom-text">{ dict.footer.designedByText }</span>
      </div>
    </div>
  );
};

export default Footer;
