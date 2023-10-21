"use client";
import "./Popup.scss";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// TODO: REFACTOR THIS COMPONENT

type PopupElementDetails = {
    popupVisibility: boolean;
    paragraphFirstText: string;
    paragraphSecondText: string;
    paragraphSecondVisibility: boolean;
    linkVisibility: boolean;
    linkText: string;
    linkUrl: string;
}

const Popup = (props: { elementsDetails: PopupElementDetails }) => {
    const { elementsDetails } = props;

    const [visibilityClass, setVisibilityClass] = useState("");
    const [paragraphVisibilityClass, setParagraphVisibilityClassVisibilityClass] = useState("");
    const [linkVis, setLinkVis] = useState("");

    useEffect(() => {
        setElementsVis();
    }, [elementsDetails]);

    const closePopup = (e: any) => {
        e.stopPropagation();
        setVisibilityClass("");
    };

    const setElementsVis = () => {
        if (elementsDetails.popupVisibility) {
            setVisibilityClass("popup--active");
        } else {
            setVisibilityClass("");
        }
        if (elementsDetails.paragraphSecondVisibility) {
            setParagraphVisibilityClassVisibilityClass("");
        } else {
            setParagraphVisibilityClassVisibilityClass("popup__element-hide");
        }
        if (elementsDetails.linkVisibility) {
            setLinkVis("");
        } else {
            setLinkVis("popup__element-hide");
        }
    };

    return (
        <div className={`popup ${visibilityClass}`}>
            <div className="popup__overlay" onClick={closePopup}>
                <div className="popup__holder"
                     onClick={(e) => {
                         e.stopPropagation();
                     }}>
                    <button className="popup__close" onClick={closePopup}>
                        <img src="/images/close.svg" alt="Close icon" className="popup__img"/>
                    </button>
                    <span className="popup__text">{elementsDetails.paragraphFirstText}</span>
                    <span
                        className={`popup__text ${paragraphVisibilityClass}`}>{elementsDetails.paragraphSecondText}</span>
                    <Link href={elementsDetails.linkUrl} className={`popup__link ${linkVis}`}>
                        {elementsDetails.linkText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Popup;
