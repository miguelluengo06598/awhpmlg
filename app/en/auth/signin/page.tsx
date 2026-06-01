import { Suspense } from 'react'
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "AECOMI - Sign In",
  description: "Sign in to your AECOMI account",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
