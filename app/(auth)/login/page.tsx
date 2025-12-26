// app/(auth)/login/page.tsx
import Link from 'next/link';
import { LoginForm } from '../_components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo / Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#1C1C1C]">
            Ink Scratch
          </h1>
          <p className="mt-3 text-lg text-[#6B6B6B]">
            Stream your favorite manga, comics & novels
          </p>
        </div>

        {/* Illustration (optional – you already have auth-illustration.svg in public/) */}
        <div className="flex justify-center">
          {/* Uncomment if you want to use your SVG */}
          {/* <img 
            src="/auth-illustration.svg" 
            alt="Reading illustration" 
            className="h-40 w-auto opacity-90"
          /> */}
        </div>

        {/* Form Card */}
        <div className="bg-[#F7F7F7] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8">
          <LoginForm />

          {/* Footer links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-[#6B6B6B]">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-[#FF512F] hover:text-[#DD2476] transition-colors"
              >
                Sign up
              </Link>
            </p>
            <p className="mt-2">
              <Link
                href="/forgot-password" // Add this route later if needed
                className="text-[#6B6B6B] hover:text-[#FF512F] transition-colors"
              >
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}