"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { AuthService } from "@/api/authService";
import Mission from "@/components/Mission/Mission";
import Statistics from "@/components/Statistics/Statistics";
import HomepageCardLinks from "@/components/HomepageCardLinks/HomepageCardLinks";
import { User } from "@/api/models/User";
import API from "@/api/baseApi";
import Banner from "@/components/Banner/Banner";


export default function HomePage() {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        // TODO: REMOVE WHEN FINISHED WITH DEVELOPMENT
        async function testIndexAPIEndpoint() {
            const response = await API.index();
            console.log("Index API endpoint response:", response.data);
        }

        testIndexAPIEndpoint();

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
                <Banner/>
                <HomepageCardLinks user={ user }/>
                <Mission/>
                <Statistics/>
            </main>
            <Footer/>
        </>
    );
}
