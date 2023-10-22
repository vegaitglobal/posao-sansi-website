"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { AuthService } from "@/api/authService";
import { useRouter } from "next/navigation";
import PasswordForgottenForm from "@/components/PasswordForgottenForm/PasswordForgottenForm";

export default function PasswordForgottenPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAccess = () => {
      if (AuthService.isAuthenticated()) {
        router.push("/");
      }
    };
    checkAccess();
  }, [ router ]);

  return (
    <>
      <Header/>
      <main>
        <PasswordForgottenForm/>
      </main>
      <Footer/>
    </>
  );
}
