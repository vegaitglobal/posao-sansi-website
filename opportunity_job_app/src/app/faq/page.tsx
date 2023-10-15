"use client"
import React from 'react';
import ImageAccordion from '../../components/imageaccordion/imageaccordion';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import './faq.scss'

export default function Page() {

 return (
 <>
 <Header/>
 <main>
    <ImageAccordion />
 </main>
 <Footer/>
 </>
 )
}