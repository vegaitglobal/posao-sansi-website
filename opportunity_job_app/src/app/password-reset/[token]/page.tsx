"use client";

import { AuthService } from "@/api/authService";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import PasswordResetForm from "@/components/PasswordResetForm/PasswordResetForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ResetPasswordPageProps {
    params: {
        token: string
    };
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
    const router = useRouter();

    useEffect(() => {
        const checkAccess = () => {
            if (AuthService.isAuthenticated()) {
                router.push("/");
            }
        };
        checkAccess();
    }, [router]);

    return (
        <div>
            <Header/>
            <main>
                <PasswordResetForm token={ params.token }/>
            </main>
            <Footer/>
        </div>
    );
}
