"use client";

import React, { useEffect, useState } from "react";
import FAQItems from "../../../components/imageaccordion/FAQItems";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AuthService } from "@/api/authService";
import { User } from "@/api/models/User";

export default function FAQPage() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const isLogged = () => {
            if (AuthService.getUser() !== null) {
                setUser(AuthService.getUser());
            }
        };
        isLogged();
    }, []);

    return (
        <>
            <Header user={ user }/>
            <main>
                <FAQItems/>
            </main>
            <Footer/>
        </>
    );
}
