import { AuthService } from "@/api/authService";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ResetPassword from "@/components/ResetPassword/ResetPassword";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ResetPasswordPage() {
    
  const router = useRouter();
  const token  = router.query.token as string;
  

  useEffect(() => {
    const checkAccess = () => {
      if (AuthService.isAuthenticated()) {
        router.push("/");
      }
    };
    checkAccess();
  }, [router]);

  if (!token) {
    return <p>Invalid reset token</p>;
  }

  return (
    <div>
      <Header />
      <main>
        <ResetPassword token = {token}/>
      </main>
      <Footer />
    </div>
  );
}
