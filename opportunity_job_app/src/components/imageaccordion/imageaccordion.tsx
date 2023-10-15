import React, { useState } from 'react';

const faqItems = [
    {
    question: "Prvo pitanje",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in.",
    // isOpen: true
    },
    {
    question: "Drugo pitanje",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in.",
    // isOpen: false
    },
    {
    question: "Drugo pitanje",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in.",
    // isOpen: false
    },
    {
    question: "Drugo pitanje",
    answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in.",
    // isOpen: false
    },
   ]
const ImageAccordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(null);

    const toggleAccordion = (index) => {
        if (isOpen === index) {
            return setIsOpen(null)
        }
        setIsOpen(index);
    };
    return (
        <div className="faq">
            <img className="faq__details faq__details--left" src="/images/detail.png" alt="" />
            <img className="faq__details faq__details--right" src="/images/detail-2.png" alt="" />
            <h2 className="faq__heading">NAJČEŠĆE POSTAVLJENA PITANJA</h2>
            <div className="faq__holder">
                <div className="faq__image-holder">
                    <img className="faq__image" src="/images/faq-bg.svg" alt="Background image" />
                </div>
                <div className="faq__accordion">
                    {faqItems.map((element, index) => 
                        (
                            <div className="faq__item">
                                <button className="faq__label" onClick={() => toggleAccordion(index)} type='button'>
                                    {element.question}
                                    <span className='faq__icon'>{isOpen === index ? '-' : '+'}</span>
                                </button>
                                <div className={isOpen === index ? 'faq__content--active' : 'faq__content'}>
                                    <div className='faq__content-inner'>{element.answer}</div></div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default ImageAccordion;