// app/(auth)/_components/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schema";
import Link from "next/link";
import { useRouter } from "next/navigation";   // ← Add this import
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();   // ← For redirection

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login successful:", data, { rememberMe });

    // Simulate API delay (remove this when using real auth)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Replace this simulation with real authentication later
    // For now, just redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h1 className="logo-gradient">Ink Scratch</h1>
        <p className="mt-3 text-text-secondary text-lg">
          Log in to continue your reading journey
        </p>
      </div>

      <div className="space-y-4">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input-field"
        />
        {errors.email && (
          <p className="text-sm text-red-600 -mt-2">{errors.email.message}</p>
        )}

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-field pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 -mt-2">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-orange border-divider rounded focus:ring-orange/50"
          />
          <span className="text-text-secondary">Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="text-orange font-medium hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary"
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>

      <p className="text-center text-text-secondary">
        Don't have an account?{" "}
        <Link href="/register" className="text-orange font-bold hover:underline">
          Register now
        </Link>
      </p>
    </form>
  );
}