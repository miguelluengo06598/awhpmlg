import { Suspense } from 'react'
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "AECMI - Sign In",
  description: "Sign in to your AECMI account",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
