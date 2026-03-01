"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired reset link");
      setTimeout(() => router.push("/login"), 3000);
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!token) return;

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password reset successful. Redirecting...");
        setTimeout(() => router.push("/login"), 3000);
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-100 to-indigo-200">
      <div className="flex flex-col items-center mb-8 text-center">
        <Link
          href="/"
          className="flex items-center gap-3 group whitespace-nowrap"
        >
          <img
            src="/designer.png"
            alt="Designer's Hub Logo"
            className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex items-center gap-3">
            <span className="h-8 w-[2px] bg-black rounded-full"></span>
            <div className="text-2xl font-bold tracking-tight text-black group-hover:text-indigo-600 transition-colors duration-300">
              Designer’s Hub
            </div>
          </div>
        </Link>
        <p className="text-gray-600 mt-1">Reset your password to continue</p>
      </div>

      {/* CARD */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
          Reset Password
        </h2>

        {error && (
          <p className="text-red-600 text-center text-sm mb-3">✕ {error}</p>
        )}

        {success && (
          <p className="text-green-600 text-center text-sm mb-3">✓ {success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NEW PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New password"
              required
              onChange={handleChange}
              className="w-full text-black border px-4 py-3 rounded pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              required
              onChange={handleChange}
              className="w-full text-black border px-4 py-3 rounded pr-10 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-medium disabled:opacity-50 transition"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          <Link href="/login" className="text-indigo-600 hover:text-indigo-700">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
