import Footer from "@/components/Footer/Footer";
import PasswordResetForm from "@/components/PasswordResetForm/PasswordResetForm";

interface PasswordResetPageProps {
    params: {
        token: string
    };
}

export default function PasswordResetPage({ params }: PasswordResetPageProps) {
    return (
        <div>
            <main>
                <PasswordResetForm token={ params.token }/>
            </main>
            <Footer/>
        </div>
    );
}
