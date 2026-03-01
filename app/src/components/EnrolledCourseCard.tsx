"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Course } from "../constants/courses";

interface EnrolledCourseCardProps {
  course: Course;
  amountPaid: string;
  paymentStatus: "approved" | "pending" | "rejected";
  paymentTime?: string;
}

export default function EnrolledCourseCard({
  course,
  amountPaid,
  paymentStatus,
  paymentTime,
}: EnrolledCourseCardProps) {
  const router = useRouter();

  const isActive = paymentStatus === "approved";

  const statusStyles = isActive
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm">
            Amount Paid: <span className="font-medium">PKR {amountPaid}</span>
          </p>
          {paymentTime && (
            <p className="text-gray-500 text-xs">
              Payment Date: {new Date(paymentTime).toLocaleDateString()}
            </p>
          )}
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-semibold ${statusStyles}`}
        >
          {isActive ? "Active" : "Pending"}
        </span>
      </div>

      {/* Progress */}
      {isActive && (
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-2"></div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" />
          </div>

          {/* <p className="text-gray-500 text-xs mt-1">
            Progress updates as you complete modules
          </p> */}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          disabled={!isActive}
          onClick={() => router.push(`/courses/${course.id}/roadmap`)}
          className={`flex-1 text-sm py-2 px-4 rounded-md transition-colors ${
            isActive
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          View Roadmap
        </button>

        <button
          disabled={!isActive}
          onClick={() =>
            router.push(`/dashboard/timetable?course=${course.id}`)
          }
          className={`text-sm py-2 px-4 rounded-md transition-colors ${
            isActive
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Timetable
        </button>
      </div>
    </motion.div>
  );
}
