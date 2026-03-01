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

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const { login, isLoggedIn, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isLoggedIn) router.push("/dashboard");
  }, [isLoggedIn, authLoading, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        return value.trim() === "" ? "Full name is required" : "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email address";
        return "";
      case "password":
        if (!value.trim()) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "confirmPassword":
        if (!value.trim()) return "Confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword,
      ),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err !== "")) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting...");
        login(data.user);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        setErrors((prev) => ({
          ...prev,
          email: data.error || "Registration failed",
        }));
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: "Network error. Please try again.",
      }));
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
          Create your account to start your design journey
        </p>
      </div>

      <Card
        variant="elevated"
        className="w-full max-w-md animate-scaleIn shadow-lg"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Fill in your details to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {(
              ["fullName", "email", "password", "confirmPassword"] as const
            ).map((field) => (
              <div key={field}>
                <Label htmlFor={field}>
                  {field === "confirmPassword"
                    ? "Confirm Password"
                    : field === "fullName"
                      ? "Full Name"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
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
                        : field === "confirmPassword"
                          ? showConfirmPassword
                            ? "text"
                            : "password"
                          : "text"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={
                      field === "confirmPassword"
                        ? "Confirm your password"
                        : field === "fullName"
                          ? "Enter your full name"
                          : `Enter your ${field}`
                    }
                    className={`${getInputClass(field)} pr-10`}
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

                  {field === "confirmPassword" && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>

                {errors[field] && (
                  <p className="mt-1 text-red-600 text-sm">{errors[field]}</p>
                )}
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
                "Create Account"
              )}
            </Button>

            {success && (
              <p className="mt-3 text-center text-sm font-medium text-green-600">
                ✓ {success}
              </p>
            )}
          </form>

          <div className="mt-6 text-center space-y-2 text-sm">
            <div className="text-neutral-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in here
              </Link>
            </div>
            <Link
              href="/forgot-password"
              className="text-purple-600 hover:text-purple-700 font-medium block"
            >
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
