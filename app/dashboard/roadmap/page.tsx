'use client';

import { COURSES } from "../../src/constants/courses";
import { useAuth } from "../../src/contexts/AuthContext";
import { usePayments } from "../../src/contexts/PaymentContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../../src/components/Loader";
import Sidebar from "../../src/components/Sidebar";
import { STUDENT_SIDEBAR_ITEMS } from "../../src/constants/sidebar";

export default function DashboardRoadmapPage() {
  const { isLoggedIn } = useAuth();
  const { approvedPayments, pendingPayments, loading } = usePayments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/register');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  if (loading) return <Loader />;

  const enrolledCourses = approvedPayments
    .map(p => COURSES.find(c => c.title === p.course))
    .filter((course): course is NonNullable<typeof course> => course !== undefined);

  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
        <Sidebar
          items={STUDENT_SIDEBAR_ITEMS}
          enrolledCourses={approvedPayments.length}
          pendingPayments={pendingPayments.length}
          completedCourses={0}
          className="lg:w-72 w-full lg:h-screen lg:sticky lg:top-0"
        />

        <div className="flex-1 p-6 md:p-10">
          <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No Roadmaps Available
            </h2>
            <p className="text-gray-500 mb-8">
              Enroll in courses to unlock structured learning paths.
            </p>

            <button
              onClick={() => router.push('/courses')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      <Sidebar
        items={STUDENT_SIDEBAR_ITEMS}
        enrolledCourses={approvedPayments.length}
        pendingPayments={pendingPayments.length}
        completedCourses={0}
         className="lg:w-72 w-full lg:h-screen lg:sticky lg:top-0"
      />

      <div className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            My Learning Roadmaps
          </h1>
          <p className="text-gray-500 text-sm">
            Structured weekly plan for your enrolled courses
          </p>
        </div>

        {/* Courses */}
        {enrolledCourses.map((course) => (
          <div key={course.id} className="mb-12">
            {/* Course Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {course.title}
              </h2>
              <p className="text-gray-500 text-sm">
                Duration: {course.duration} • Level: {course.level}
              </p>
            </div>

            {/* Roadmap Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {course.roadmap.map((week) => (
                <div
                  key={week.week}
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200"
                >
                  <h3 className="font-semibold text-lg mb-3 text-blue-600">
                    Week {week.week}: {week.title}
                  </h3>

                  <ul className="space-y-2 text-gray-600 text-sm">
                    {week.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}