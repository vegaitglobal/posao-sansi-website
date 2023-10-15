"use client"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

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
                <RegisterForm />
            </main>
            <Footer/>
        </>
    )
}