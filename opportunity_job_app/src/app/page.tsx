"use client"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService"
import Banner from "../components/Banner/Banner"
import Mission from "@/components/Mission/Mission";
import Statistics from "@/components/Statistics/Statistics";
import Cards from "@/components/Cards/Cards";
import { User } from "@/api/models/User";

export default function Home() {
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
            <Header user={ user }/>
            <main>
                <Banner/>
                <Cards user={user} />
                <Mission/>
                <Statistics/>
            </main>
            <Footer/>
        </>
    )
}
