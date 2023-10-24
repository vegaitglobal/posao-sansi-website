import PasswordResetForm from "@/components/PasswordResetForm/PasswordResetForm";

interface PasswordResetPageProps {
  params: {
    token: string
  };
}

export default function PasswordResetPage({ params }: PasswordResetPageProps) {
  return <PasswordResetForm token={ params.token }/>;
}
