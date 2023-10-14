"use client"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { setLocalStorage } from "@/api/baseApi"
import { AuthService } from "@/api/authService"
import Banner from "../components/Banner/Banner"
import Mission from "@/components/Mission/Mission";

type User = {
  token: string;
  id: number;
  accountType: string;
};

export default function Home() {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    const isLogged = () => {
        setLocalStorage()
        if(AuthService.getUser() !== null){
            setUser(AuthService.getUser())
        }
    }
    isLogged()
},[])

  return (
    <>
      <Header user={user}/>
      <main>
          <Banner />
          <Mission />
      </main>
      <Footer />
    </>
  )
}
