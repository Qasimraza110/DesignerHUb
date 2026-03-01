"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset email sent successfully!");
        setEmail("");
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200 flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
        {/* Left side: Logo + Info */}
        <div className="flex flex-col items-center md:items-start justify-center md:w-1/3 text-center md:text-left">
          <img
            src="/designer.png"
            alt="Designer's Hub Logo"
            className="w-24 h-24 mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Designer’s Hub
          </h1>
          <p className="text-gray-600">
            Designer’s Hub is your gateway to mastering creative design skills.
            Enter your email to receive a secure link and reset your password.
          </p>
        </div>

        {/* Right side: Form */}
        <div className="md:w-2/3 w-full">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center md:text-left">
              Reset Your Password
            </h2>
            <p className="text-gray-600 mb-6 text-center md:text-left">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-700 mb-2 font-medium"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2"
              >
                {isLoading ? "Sending..." : "Send Reset Email"}
              </Button>

              {/* Success / Error message */}
              {message && (
                <p className="text-green-600 mt-2 text-center md:text-left">
                  {message}
                </p>
              )}
              {error && (
                <p className="text-red-600 mt-2 text-center md:text-left">
                  {error}
                </p>
              )}
            </form>

            <div className="mt-6 text-center justify-center md:text-left">
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button({ children, className, ...props }: any) {
  return (
    <button
      {...props}
      className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
