import { Suspense } from 'react'
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "AECOMI - Entrar",
  description: "Acesse sua conta AECOMI",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
