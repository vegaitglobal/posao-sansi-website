"use client";

import "./about.scss";
import { useDictionary } from "@/hooks/useDictionary";

interface ContentType {
  imageURL: string;
  text: string;
}

const About = () => {
  const { dict } = useDictionary();
  const mission: ContentType = {
    imageURL: "/images/mision.svg",
    text: dict.about.missionText
  };
  const vision: ContentType = {
    imageURL: "/images/vision.svg",
    text: dict.about.visionText
  };

  return (
    <div className="mission">
      <div className="mission__container">
        <div className="mission__top">
          <img className="mission__top-image mission__top-image--left" src="/images/mision-top-left.png" alt="image"/>
          <img className="mission__top-image mission__top-image--right" src="/images/mission-bottom-right.png"
               alt="image"/>
          <h2 className="mission__title">{ dict.about.title }</h2>
        </div>
        <div className="mission__content">
          <ul className="mission__content-list">
            { [ mission, vision ].map((cont, index) => (
              <li key={ index } className="mission__content-item">
                <img src={ cont.imageURL } alt="icon"/>
                <p>{ cont.text }</p>
              </li>
            )) }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
