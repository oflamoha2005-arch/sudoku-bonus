"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder — will be replaced with Clerk auth
    setTimeout(() => {
      setIsLoading(false);
      alert(
        "🔧 Auth not configured yet!\n\nTo enable sign-in, set up Clerk:\n1. Create an account at clerk.com\n2. Add your API keys to .env.local\n3. See the implementation plan for details."
      );
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    alert(
      "🔧 Google Sign-In not configured yet!\n\nTo enable Google auth, set up Clerk and enable Google OAuth in the Clerk dashboard."
    );
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gradient-to-br from-[#FFF5E6] via-[#FFEEF0] to-[#EDE7FF]">
      {/* Floating shapes */}
      <div className="absolute top-32 left-[10%] w-12 h-12 bg-accent-yellow/20 rounded-full animate-float" />
      <div className="absolute top-48 right-[15%] w-8 h-8 bg-primary/20 rounded-full animate-float-reverse" />
      <div className="absolute bottom-32 left-[20%] w-10 h-10 bg-accent-purple/20 rounded-full animate-float-slow" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-accent-purple/10 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </Link>
            <h1
              className="text-3xl font-bold gradient-text mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Welcome Back!
            </h1>
            <p className="text-foreground/50 text-sm">
              Sign in to your Oufella account
            </p>
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white border-2 border-gray-200 rounded-2xl font-semibold text-foreground hover:border-gray-300 hover:bg-gray-50 transition-all mb-5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-foreground/40 font-medium">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-accent-purple focus:bg-white focus:outline-none transition-all text-foreground placeholder:text-foreground/30"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-accent-purple focus:bg-white focus:outline-none transition-all text-foreground placeholder:text-foreground/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-accent-purple text-white rounded-2xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/40">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-accent-purple font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-4 p-4 bg-accent-yellow/10 rounded-2xl text-center">
          <p className="text-xs text-foreground/50">
            🔧 Auth is a placeholder. Set up{" "}
            <a
              href="https://clerk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-purple font-semibold hover:underline"
            >
              Clerk
            </a>{" "}
            to enable real sign-in with Google &amp; email.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
