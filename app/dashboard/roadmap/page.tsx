"use client";

import { COURSES } from "../../src/constants/courses";
import { useAuth } from "../../src/contexts/AuthContext";
import { usePayments } from "../../src/contexts/PaymentContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../../src/components/Loader";
import Sidebar from "../../src/components/Sidebar";
import { STUDENT_SIDEBAR_ITEMS } from "../../src/constants/sidebar";

export default function DashboardRoadmapPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const { approvedPayments, pendingPayments, loading } = usePayments();
  const router = useRouter();

  const [expandedCourseIds, setExpandedCourseIds] = useState<number[]>([]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/register");
    }
  }, [isLoggedIn, isLoading, router]);

  if (!isLoggedIn) return null;
  if (loading) return <Loader />;

  const enrolledCourses = approvedPayments
    .map((p) => COURSES.find((c) => c.title === p.course))
    .filter(
      (course): course is NonNullable<typeof course> => course !== undefined,
    );

  const toggleCourse = (id: number) => {
    setExpandedCourseIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id],
    );
  };

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
              onClick={() => router.push("/courses")}
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

        {/* Courses Accordion */}
        <div className="space-y-6">
          {enrolledCourses.map((course) => {
            const isExpanded = expandedCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200"
              >
                {/* Course Card Header */}
                <button
                  onClick={() => toggleCourse(course.id)}
                  className="w-full flex justify-between items-center p-5 focus:outline-none"
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {course.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Duration: {course.duration} • Level: {course.level}
                    </p>
                  </div>
                  <div className="text-blue-600 text-2xl font-bold transform transition-transform duration-200">
                    {isExpanded ? "−" : "+"}
                  </div>
                </button>

                {/* Roadmap Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {course.roadmap.map((week) => (
                        <div
                          key={week.week}
                          className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200"
                        >
                          <h3 className="font-semibold text-blue-600 mb-2">
                            Week {week.week}: {week.title}
                          </h3>
                          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                            {week.topics.map((topic, i) => (
                              <li key={i}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
