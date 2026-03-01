"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../src/contexts/AuthContext";
import { Button } from "../src/components/ui/Button";
import { Input } from "../src/components/ui/Input";
import { Label } from "../src/components/ui/Label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../src/components/ui/Card";

function PaymentContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
    paymentMethod: "bank",
    accountNumber: "",
    transactionId: "",
    amount: "",
    screenshot: null as File | null,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    accountNumber: "",
    transactionId: "",
    amount: "",
    screenshot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
        course: searchParams.get("course") || "",
      }));
    }
  }, [user, searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, screenshot: file }));
    setErrors((prev) => ({ ...prev, screenshot: "" }));
  };

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "fullName":
        return !value.trim() ? "Full name is required" : "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email";
        return "";
      case "accountNumber":
        return !value.trim() ? "Account/Mobile number is required" : "";
      case "transactionId":
        return !value.trim() ? "Transaction ID is required" : "";
      case "amount":
        return !value || Number(value) <= 0
          ? "Amount must be greater than 0"
          : "";
      case "screenshot":
        return !value ? "Payment screenshot is required" : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      accountNumber: validateField("accountNumber", formData.accountNumber),
      transactionId: validateField("transactionId", formData.transactionId),
      amount: validateField("amount", formData.amount),
      screenshot: validateField("screenshot", formData.screenshot),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    setIsSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "screenshot" && value) payload.append(key, value);
        else payload.append(key, value as string);
      });

      const res = await fetch("/api/payment", {
        method: "POST",
        body: payload,
      });
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => router.push("/dashboard"), 3000);
      } else {
        alert("Failed to submit payment. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-sm text-center p-6">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-600 mb-6">
            You need to sign in to make a payment.
          </p>
          <Button onClick={() => router.push("/register")} className="w-full">
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="max-w-md text-center p-8">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">
            Payment Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-4">
            Your payment has been submitted. You will receive a confirmation
            email once approved.
          </p>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200 flex items-center justify-center px-4 py-16">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8">
        {/* Logo / Left side */}
        <div className="flex flex-col items-center md:items-start justify-center md:w-1/3">
          <img
            src="/designer.png"
            alt="Designer's Hub Logo"
            className="w-20 h-20 mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Designer’s Hub
          </h1>
          <p className="text-gray-600 text-center md:text-left">
            Complete your payment to access your course and start learning.
          </p>
        </div>

        {/* Payment Form / Right side */}
        <Card className="md:w-2/3 w-full p-6 shadow-lg">
          <CardHeader className="text-center md:text-left">
            <CardTitle className="text-2xl">Course Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm">{errors.fullName}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="course">Selected Course</Label>
                <Input
                  id="course"
                  name="course"
                  value={formData.course}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">EasyPaisa</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="accountNumber">
                    {formData.paymentMethod === "bank"
                      ? "Account Number"
                      : "Mobile Number"}
                  </Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className={errors.accountNumber ? "border-red-500" : ""}
                  />
                  {errors.accountNumber && (
                    <p className="text-red-600 text-sm">
                      {errors.accountNumber}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    className={errors.transactionId ? "border-red-500" : ""}
                  />
                  {errors.transactionId && (
                    <p className="text-red-600 text-sm">
                      {errors.transactionId}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="amount">Amount Paid (PKR)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount && (
                  <p className="text-red-600 text-sm">{errors.amount}</p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="screenshot">Payment Screenshot</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-lg px-4 py-3 cursor-pointer focus:ring-2 focus:ring-blue-500"
                />
                {errors.screenshot && (
                  <p className="text-red-600 text-sm">{errors.screenshot}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Payment Details"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
