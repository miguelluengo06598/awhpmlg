import { Suspense } from 'react'
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "AECOMI - Iniciar Sesión",
  description: "Accede a tu cuenta AECOMI",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
