"use client"

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { AuthService } from "@/api/authService"
import LoginForm from "@/components/LoginForm/LoginForm";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        const checkAccess = () => {
            if (AuthService.isAuthenticated()) {
                router.push("/")
            }
        }
        checkAccess()
    }, [])

    // TODO: login page (form) is displayed for a second when user is not logged in
    //  > do not render form until check access finishes executing

    return (
        <>
            <Header/>
            <main>
                <LoginForm/>
            </main>
            <Footer/>
        </>
    )
}
