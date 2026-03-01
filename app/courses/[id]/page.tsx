"use client";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "../../src/constants/courses";
import { motion } from "framer-motion";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = React.use(params);
  const courseId = parseInt(id);
  const course = COURSES.find((c) => c.id === courseId);

  if (!course) notFound();

  const roadmap = course.roadmap || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 relative"
        >
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src={course.image}
              alt={course.title}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-lg text-center px-4">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <span
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-2 sm:mb-0 ${
                  course.level === "Beginner"
                    ? "bg-green-100 text-green-800"
                    : course.level === "Intermediate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {course.level}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                {course.price}
              </span>
            </div>

            <p className="text-gray-800 text-base sm:text-lg">
              {course.description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-gray-100 font-semibold">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {course.duration}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-10 text-center">
            Course Roadmap
          </h2>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {roadmap.map((week, idx) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-gradient-to-br from-gray-100 to-indigo-200
                   rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full
                          bg-blue-600 text-white font-bold text-lg"
                  >
                    {week.week}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {week.title}
                  </h3>
                </div>

                {/* TOPICS */}
                <ul className="space-y-2">
                  {week.topics.map((topic, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700 font-medium"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href={`/payment?course=${encodeURIComponent(course.title)}`}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-2xl text-center font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-2xl"
          >
            Enroll Now - {course.price}
          </Link>
          <Link
            href="/courses"
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-2xl text-center font-semibold hover:bg-gray-300 transition-all shadow hover:shadow-md"
          >
            Back to Courses
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
