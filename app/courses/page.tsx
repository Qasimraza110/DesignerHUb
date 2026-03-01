"use client";

import { useState } from "react";
import CourseCard from "../src/components/CourseCard";
import { COURSES } from "../src/constants/courses";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Courses() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const totalPages = Math.ceil(COURSES.length / coursesPerPage);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = COURSES.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Perfect <span className="text-indigo-600">Course</span>
          </h1>
          <p className="text-gray-500 mt-4">
            Browse our specialized courses. Select, pay, and begin your learning
            journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex  text-black items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded font-medium transition ${
                page === currentPage
                  ? "bg-indigo-300 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex text-black items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
