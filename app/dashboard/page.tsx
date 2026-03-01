"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../src/contexts/AuthContext";
import { usePayments } from "../src/contexts/PaymentContext";
import Sidebar from "../src/components/Sidebar";
import Loader from "../src/components/Loader";
import { STUDENT_SIDEBAR_ITEMS } from "../src/constants/sidebar";
import { COURSES } from "../src/constants/courses";
import { TIMETABLE } from "../src/constants/timetable";
import Link from "next/link";

import {
  FiBookOpen,
  FiClock,
  FiMap,
  FiPlus,
  FiAward,
  FiFileText,
  FiMessageCircle,
} from "react-icons/fi";

export default function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const { approvedPayments, pendingPayments, loading } = usePayments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/register");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  if (loading) return <Loader />;

  const enrolledCourses = approvedPayments
    .map((p) => COURSES.find((c) => c.title === p.course))
    .filter(
      (course): course is NonNullable<typeof course> => course !== undefined,
    );

  const todayClasses = enrolledCourses
    .flatMap((course) =>
      TIMETABLE.filter((t) => t.courseId === course.id).slice(0, 2),
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        items={STUDENT_SIDEBAR_ITEMS}
        enrolledCourses={approvedPayments.length}
        pendingPayments={pendingPayments.length}
        completedCourses={0}
        className="lg:w-80 w-90 lg:h-screen lg:sticky lg:top-0"
      />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {user?.fullName}!
              </h1>
              <p className="text-gray-500">
                Continue your learning journey with DesignerHub
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-sm text-gray-400">Member since</p>
              <p className="font-semibold text-gray-700">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {pendingPayments.length > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center gap-3">
              <FiClock className="text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">
                  Payment Approval Pending
                </h3>
                <p className="text-yellow-700 text-sm">
                  You have {pendingPayments.length} payment(s) awaiting
                  approval.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/dashboard/enrolledcourses" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  My Courses
                </h3>
                <FiBookOpen className="text-blue-600" size={22} />
              </div>
              <p className="text-gray-500 text-sm mb-2">
                {approvedPayments.length} enrolled courses
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: approvedPayments.length > 0 ? "25%" : "0%" }}
                />
              </div>
            </div>
          </Link>

          <Link href="/dashboard/timetable" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Timetable
                </h3>
                <FiClock className="text-green-600" size={22} />
              </div>
              <p className="text-gray-500 text-sm mb-2">
                {todayClasses.length} upcoming classes
              </p>
              {todayClasses.length > 0 && (
                <p className="text-sm text-blue-600 font-medium">
                  Next: {todayClasses[0].startTime} - {todayClasses[0].endTime}
                </p>
              )}
            </div>
          </Link>

          <Link href="/dashboard/roadmap" className="block">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Roadmap</h3>
                <FiMap className="text-purple-600" size={22} />
              </div>
              <p className="text-gray-500 text-sm mb-2">
                Learning paths for your courses
              </p>
              <p className="text-sm text-green-600 font-medium">
                {enrolledCourses.length} active roadmaps
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Courses */}
        {enrolledCourses.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrolledCourses.slice(0, 4).map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 font-medium">
                      {course.level}
                    </span>
                    <span className="text-sm text-gray-400">
                      {course.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/courses" className="block">
              <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
                <FiPlus className="mx-auto mb-2 text-blue-600" size={22} />
                <p className="text-sm font-medium text-gray-700">
                  Browse Courses
                </p>
              </div>
            </Link>

            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer">
              <FiAward className="mx-auto mb-2 text-green-600" size={22} />
              <p className="text-sm font-medium text-gray-700">Certificates</p>
            </div>

            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition cursor-pointer">
              <FiFileText className="mx-auto mb-2 text-purple-600" size={22} />
              <p className="text-sm font-medium text-gray-700">
                Study Materials
              </p>
            </div>

            <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition cursor-pointer">
              <FiMessageCircle
                className="mx-auto mb-2 text-orange-600"
                size={22}
              />
              <p className="text-sm font-medium text-gray-700">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
