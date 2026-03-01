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
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const { login, isLoggedIn, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isLoggedIn) {
      router.push("/dashboard");
    }
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
    setErrors({ email: "", password: "" });

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    if (Object.values(newErrors).some((err) => err !== "")) {
      setErrors(newErrors);
      return;
    }

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
        setErrors({
          email: data.error || "Invalid credentials",
          password: "",
        });
      }
    } catch {
      setErrors({
        email: "Network error. Try again.",
        password: "",
      });
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
            <div className="text-2xl font-bold tracking-tight text-black group-hover:text-indigo-600 transition-colors duration-300">
              Designer’s Hub
            </div>
          </div>
        </Link>
        <p className="text-gray-600 mt-1">
          Sign in to continue your design journey
        </p>
      </div>

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
          <form onSubmit={handleSubmit} className="space-y-4">
            {(["email", "password"] as const).map((field) => (
              <div key={field}>
                <Label htmlFor={field}>
                  {field === "password" ? "Password" : "Email Address"}
                </Label>

                <div className="relative">
                  <Input
                    id={field}
                    name={field}
                    type={
                      field === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : "email"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={
                      field === "password"
                        ? "Enter your password"
                        : "Enter your email"
                    }
                    className={`${getInputClass(field)} ${
                      field === "password" ? "pr-10" : ""
                    }`}
                  />

                  {field === "password" && (
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
                  )}
                </div>
              </div>
            ))}

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

            {/* ERROR */}
            {errors.email && (
              <p className="mt-3 text-center text-sm font-medium text-red-600">
                ✕ {errors.email}
              </p>
            )}

            {/* SUCCESS */}
            {success && (
              <p className="mt-3 text-center text-sm font-medium text-green-600">
                ✓ {success}
              </p>
            )}
          </form>

          <div className="mt-6 text-center space-y-2 text-sm">
            <Link
              href="/forgot-password"
              className="text-purple-600 hover:text-purple-700 font-medium block"
            >
              Forgot your password?
            </Link>
            <div className="text-neutral-600">
              Don&apos;t have an account?{" "}
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
