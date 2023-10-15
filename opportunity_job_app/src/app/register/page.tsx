"use client"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        const checkAccess = () => {
            // if (AuthService.isAuthenticated()) {
            //     router.push("/")
            // }
        }
        checkAccess()
    }, [])


    return (
        <>
            <Header/>
            <main>
                Hello
            </main>
            <Footer/>
        </>
    )
}