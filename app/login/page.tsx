"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../src/contexts/AuthContext";
import { Button } from "../src/components/ui/Button";
import { Input } from "../src/components/ui/Input";
import { Label } from "../src/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/components/ui/Card";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { login, isLoggedIn, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isLoggedIn) router.push("/dashboard");
  }, [isLoggedIn, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email address";
        return "";
      case "password":
        if (!value.trim()) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    // Validate
    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err !== "")) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Login successful! Redirecting...");
        login(data.user);
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setErrors((prev) => ({
          ...prev,
          email: data.error || "Invalid credentials",
        }));
      }
    } catch {
      setErrors((prev) => ({ ...prev, email: "Network error. Try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (field: keyof typeof formData) =>
    errors[field]
      ? "mt-1 border-red-500 focus:ring-red-500"
      : "mt-1 hover:border-purple-500 focus:ring-purple-500";

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
            <div className="flex flex-col leading-tight text-2xl font-bold tracking-tight text-black group-hover:text-indigo-600 transition-colors duration-300">
              Designer’s Hub
            </div>
          </div>
        </Link>
        <p className="text-gray-600 mt-1">
          Sign in to continue your design journey
        </p>
      </div>

      {/* Card */}
      <Card
        variant="elevated"
        className="w-full max-w-md animate-scaleIn shadow-lg"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {success && (
            <div className="flex items-center gap-2 bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg mb-4">
              ✓ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {(["email", "password"] as (keyof typeof formData)[]).map(
              (field) => (
                <div key={field}>
                  <Label htmlFor={field}>
                    {field === "password" ? "Password" : "Email Address"}
                  </Label>
                  <div className="relative">
                    <Input
                      id={field}
                      name={field}
                      type={field === "password" ? (showPassword ? "text" : "password") : "email"}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={
                        field === "password"
                          ? "Enter your password"
                          : "Enter your email"
                      }
                      className={`${getInputClass(field)} ${field === "password" ? "pr-10" : ""}`}
                    />
                    {field === "password" && (
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  {errors[field] && (
                    <p className="mt-1 text-red-600 text-sm">{errors[field]}</p>
                  )}
                </div>
              ),
            )}

            <Button
              type="submit"
              size="lg"
              variant="gradient"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2 text-sm">
            <Link
              href="/forgot-password"
              className="text-purple-600 hover:text-purple-700 font-medium block"
            >
              Forgot your password?
            </Link>
            <div className="text-neutral-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
