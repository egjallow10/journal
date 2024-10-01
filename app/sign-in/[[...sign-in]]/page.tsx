import { SignIn } from '@clerk/nextjs'

export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <SignIn signUpUrl="/sign-up" />
      </div>
    </div>
  );
}