'use client';

import { TimeTableCard } from "../../src/components/TimeTableCard";
import { COURSES } from "../../src/constants/courses";
import { TIMETABLE } from "../../src/constants/timetable";
import { useAuth } from "../../src/contexts/AuthContext";
import { usePayments } from "../../src/contexts/PaymentContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "../../src/components/Loader";
import Sidebar from "../../src/components/Sidebar";
import { STUDENT_SIDEBAR_ITEMS } from "../../src/constants/sidebar";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function DashboardTimetablePage() {
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
              No Timetable Available
            </h2>
            <p className="text-gray-500 mb-8">
              Enroll in courses to view your weekly class schedule.
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
            My Timetable
          </h1>
          <p className="text-gray-500 text-sm">
            Weekly class schedule for your enrolled courses
          </p>
        </div>

        {/* Course Timetables */}
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-gray-100"
          >
            {/* Course Title */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                {course.title}
              </h2>
              <span className="text-sm text-gray-500 mt-2 sm:mt-0">
                Weekly Schedule
              </span>
            </div>

            {/* Timetable Grid */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {DAYS.map((day) => {
                const dayClasses = TIMETABLE
                  .filter(
                    (item) =>
                      item.courseId === course.id && item.day === day
                  )
                  .slice(0, 2);

                return (
                  <div
                    key={day}
                    className="hover:scale-[1.02] transition duration-200"
                  >
                    <TimeTableCard
                      day={day}
                      classes={dayClasses.map((cls) => ({
                        name: course.title,
                        time: `${cls.startTime} - ${cls.endTime}`,
                      }))}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}