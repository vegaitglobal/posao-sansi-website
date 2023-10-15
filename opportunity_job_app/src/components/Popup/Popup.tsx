import "./Popup.scss";
import React from "react";
import Link from "next/link";

const Popup = () => {
    return (
      <div className="popup">
        <div className="popup__overlay">
            <div className="popup__holder">
                <button className="popup__close">
                    <img src="/images/close.svg" alt="Close icon" className="popup__img" />
                </button>
                <span className="popup__text">Vaša registracija je uspešno obavljena!</span>
                <span className="popup__text">Uskoro će Vam se javiti neko iz udruženja <span className="popup__text-bold">ATINA</span>.</span>
                <Link href='/' className="popup__link">Nazad na početnu</Link>
            </div>
        </div>
      </div>  
    )
}

export default Popup;