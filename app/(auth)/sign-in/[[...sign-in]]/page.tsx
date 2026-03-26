import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      fallbackRedirectUrl="/"
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-in"
      withSignUp
    />
  );
}
