'use client';
import "./Popup.scss";
import React, { useState, useEffect } from "react";
import Link from "next/link";

type PopupElemetDetails = {
    popup_visibility: boolean;
    paragraph_first_text: string;
    paragraph_seccond_text: string;
    paragraph_second_visibility: boolean;
    link_visibility: boolean;
    link_text: string;
    link_url: string;
}

const Popup = (props:{elementsDetails:PopupElemetDetails}) => {
    const {elementsDetails } = props;

    const [disp, setDisp] = useState('');
    const [paragraphVis, setParagraphVis] = useState('');
    const [linkVis, setLinkVis] = useState('');

    useEffect(() => { setElementsVis()},[elementsDetails])

    const closePopup = (e:any) => {e.stopPropagation(); setDisp('')};
    const setElementsVis = () => {
            if(elementsDetails.popup_visibility) {setDisp('popup--active')}else { setDisp('')}
            if(elementsDetails.paragraph_second_visibility) {setParagraphVis('')}else {setParagraphVis('popup__element-hide')}
            if(elementsDetails.link_visibility) {setLinkVis('')} else {setLinkVis('popup__element-hide')}
    }
    
    return (
      <div className={`popup ${disp}`}>
        <div className="popup__overlay" onClick={closePopup}>
            <div className="popup__holder" onClick={(e)=> {e.stopPropagation()}}>
                <button className="popup__close" onClick={closePopup}>
                    <img src="/images/close.svg" alt="Close icon" className="popup__img" />
                </button>
                <span className="popup__text">{elementsDetails.paragraph_first_text}</span>
                <span className={`popup__text ${paragraphVis}`}>{elementsDetails.paragraph_seccond_text}</span>
                <Link href={elementsDetails.link_url} className={`popup__link ${linkVis}`}>{elementsDetails.link_text}</Link>
            </div>
        </div>
      </div>  
    )
}

export default Popup;