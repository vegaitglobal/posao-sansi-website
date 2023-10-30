"use client";

import "./HomeCardLink.scss";
import Link from "next/link";


interface HomeCardLinkProps {
  href: string;
  label: string;
  imageURL: string;
  title: string;
}

const HomeCardLink = ({ href, title, label, imageURL }: HomeCardLinkProps) => {
  return (
    <div className="card__holder">
      <Link className="card__link" href={ href || "" }></Link>
      <div className="cards__left">
        <img className="cards__img" src={ imageURL } alt="Card 1"/>
      </div>
      <div className="cards__right">
        <p className="cards__title">{ title }</p>
        <div className="card__link-wrap">
          <span className="card__text">{ label }</span>
          <img className="cards__arrow" src="/images/right-arrow.svg" alt="Right arrow"/>
        </div>
      </div>
    </div>
  );
};

export default HomeCardLink;
