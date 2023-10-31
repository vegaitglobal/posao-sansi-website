"use client";

import "./FAQItems.scss";
import React, { useEffect, useState } from "react";
import { FaqService } from "@/api/faqService";
import { Faq } from "@/api/models/Faq";
import { useDictionary } from "@/hooks/useDictionary";
import Spinner from "@/components/Spinner/Spinner";

const FAQItems = () => {
  const { dict } = useDictionary();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ isOpen, setIsOpen ] = useState<number>(0);
  const [ faqList, setFaqList ] = useState<Faq[]>([]);

  useEffect(() => {
    async function getFaq() {
      const faq = await FaqService.getFaq();
      setFaqList(faq);
    }

    if (isLoading) {
      getFaq();
      setIsLoading(false);
    }
  }, [ isLoading ]);

  const toggleAccordion = (faqId: number) => {
    setIsOpen(isOpen === faqId ? 0 : faqId);
  };

  if (isLoading) return <Spinner/>;

  return (
    <div className="faq">
      <img className="faq__details faq__details--left" src="/images/detail.png" alt="Detail image"/>
      <img className="faq__details faq__details--right" src="/images/detail-2.png" alt="Detail image"/>
      <h2 className="faq__heading">{ dict.faqItems.title }</h2>
      <div className="faq__holder">
        <div className="faq__image-holder">
          <img className="faq__image" src="/images/faq-bg.svg" alt="Background image"/>
        </div>
        <div className="faq__accordion">
          { faqList.map(faq => (
            <div key={ faq.id } className="faq__item">
              <button className="faq__label" onClick={ () => toggleAccordion(faq.id) } type="button">
                { faq.question }
                <span className="faq__icon">{ isOpen === faq.id ? "-" : "+" }</span>
              </button>
              <div className={ isOpen === faq.id ? "faq__content--active" : "faq__content" }>
                <div className="faq__content-inner">{ faq.answer }</div>
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  );
};

export default FAQItems;
