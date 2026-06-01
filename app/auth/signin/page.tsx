import { Suspense } from 'react'
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "AECMI - Iniciar Sesión",
  description: "Accede a tu cuenta AECMI",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
