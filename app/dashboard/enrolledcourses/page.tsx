"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { COURSES, Course } from "../../src/constants/courses";
import EnrolledCourseCard from "../../src/components/EnrolledCourseCard";
import { useAuth } from "@/app/src/contexts/AuthContext";
import { usePayments } from "../../src/contexts/PaymentContext";
import Sidebar from "../../src/components/Sidebar";
import Loader from "../../src/components/Loader";
import { STUDENT_SIDEBAR_ITEMS } from "../../src/constants/sidebar";
import Link from "next/link";

export default function EnrolledCoursesPage() {
  const { user, isLoggedIn } = useAuth();
  const { payments, approvedPayments, pendingPayments, loading } =
    usePayments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/register");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        items={STUDENT_SIDEBAR_ITEMS}
        enrolledCourses={approvedPayments.length}
        pendingPayments={pendingPayments.length}
        completedCourses={0}
        className="lg:w-72 w-full lg:h-screen lg:sticky lg:top-0"
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-500 text-sm">
            Manage your enrolled and pending courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {payments.map((payment) => {
            const course: Course | undefined = COURSES.find(
              (c) => c.title === payment.course,
            );

            if (!course) return null;

            return (
              <EnrolledCourseCard
                key={payment._id}
                course={course}
                amountPaid={payment.amount}
                paymentStatus={payment.status}
                paymentTime={payment.submittedAt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
