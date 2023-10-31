"use client";

import Link from "next/link";
import "./footer.scss";
import { useDictionary } from "@/hooks/useDictionary";
import { EnvironmentVariables } from "@/types";

interface FooterProps {
  env: EnvironmentVariables;
}

interface SocialIcon {
  url: string,
  iconPath: string,
  alt: string,
}


const Footer = ({ env }: FooterProps) => {
  const { dict } = useDictionary();

  const socialMediaLinks: SocialIcon[] = [
    {
      url: env.facebookURL,
      iconPath: "/images/facebook.svg",
      alt: "Facebook icon"
    },
    {
      url: env.linkedinURL,
      iconPath: "/images/linkedin.svg",
      alt: "Linkedin icon"
    },
    {
      url: env.twitterURL,
      iconPath: "/images/twitter.svg",
      alt: "Twitter icon"
    },
    {
      url: env.atinaWebsiteURL,
      iconPath: "/images/web.svg",
      alt: "Web icon"
    },
  ];

  const location = `${ env.address }, ${ env.city } ${ env.postalCode }`;
  const googleMapsLocationURL = `https://www.google.com/maps/search/?api=1&query=${ location }`;

  return (
    <footer className="footer">
      <img className="footer__bg-img" src="/images/footer-bg.png" alt="Background image"/>
      <div className="footer__container">
        <div className="footer__social">
          <span className="footer__social-title">{ dict.footer.socialMediaListTitle }</span>
          <ul className="footer__social-icon-holder">
            { socialMediaLinks.map((link, index) => (
              <li className="footer__social-item" key={ index }>
                <Link className="footer__social-link" target="_blank" href={ link.url || "" }>
                  <img className="footer__social-img" src={ link.iconPath } alt={ link.alt }/>
                </Link>
              </li>
            )) }
          </ul>
        </div>
        <div className="footer__links-holder">
          <span className="footer__links-title">{ dict.footer.contactListTitle }</span>
          <ul className="footer__contacts">
            <li className="footer__contacts-item">
              <img src="/images/mail.svg" alt="Mail icon" className="footer__contacts-img"/>
              <a className="footer__contact-link" href={ `mailto: ${ env.email }` }>{ env.email }</a>
            </li>
            <li className="footer__contacts-item">
              <img src="/images/phone.svg" alt="Phone icon" className="footer__contacts-img"/>
              <a className="footer__contact-link" href={ `tel: ${ env.phone }` }>{ env.phone }</a>
            </li>
            <li className="footer__contacts-item">
              <img src="/images/location.svg" alt="Location icon" className="footer__contacts-img"/>
              <Link className="footer__contacts-address-holder" href={ googleMapsLocationURL }>
                <span className="footer__contacts-address">{ location }</span>
              </Link>
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
    </footer>
  );
};

export default Footer;
