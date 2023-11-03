"use client";

import "./Popup.scss";
import React, { useEffect, useState } from "react";
import Link from "next/link";


interface LinkButton {
  label: string;
  url: string;
}

export interface PopupProps {
  isOpened: boolean;
  primaryText: string;
  secondaryText?: string;
  linkButton?: LinkButton;

  onClose?(): void;
}

const Popup = ({ isOpened, primaryText, secondaryText = "", linkButton, onClose }: PopupProps) => {
  const [ isDisplayed, setIsDisplayed ] = useState<boolean>(false);

  useEffect(() => {
    setIsDisplayed(isOpened);
  }, [ isOpened ]);

  const closePopup = () => {
    setIsDisplayed(false);
    onClose && onClose();
  };

  return (
    <div className="popup" style={ { display: isDisplayed ? "block" : "none" } }>
      <div className="popup__overlay" onClick={ closePopup }>
        <div className="popup__holder">
          <button className="popup__close" onClick={ closePopup }>
            <img src="/images/close.svg" alt="Close icon" className="popup__img"/>
          </button>
          <span className="popup__text">{ primaryText }</span>
          <span className="popup__text">{ secondaryText }</span>
          { linkButton && (
            <Link href={ linkButton.url } className="popup__link">
              { linkButton.label }
            </Link>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Popup;
