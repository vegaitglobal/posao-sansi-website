"use client"
import React, { useEffect, useState } from 'react';
import ImageAccordion from '../../components/imageaccordion/imageaccordion';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import './faq.scss'
import { AuthService } from '../../api/authService';

type User = {
   token: string;
   id: number;
   accountType: string;
};

export default function Page() {

   const [user, setUser] = useState<User>()
   useEffect(() => {
       const isLogged = () => {
           if (AuthService.getUser() !== null) {
               setUser(AuthService.getUser())
           }
       }
       isLogged()
   }, [])

 return (
 <>
 <Header user={user}/>
 <main>
    <ImageAccordion />
 </main>
 <Footer/>
 </>
 )
}