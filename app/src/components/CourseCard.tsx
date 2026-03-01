"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/Button";
import { Clock, Star, Users, ArrowRight } from "lucide-react";
interface Course {
  id: number;
  title: string;
  duration: string;
  price: string;
  image: string;
  level?: string;
  category?: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { isLoggedIn } = useAuth();

  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl bg-white
        border border-gray-200
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* ===== Header / Image ===== */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {/* Category Badge */}
        {course.category && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-medium px-3 py-1 rounded-full shadow">
            {course.category}
          </span>
        )}

        {/* Level Badge */}
        {course.level && (
          <span className="absolute  text-gray-950 top-4 right-4 bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-full shadow">
            {course.level}
          </span>
        )}
      </div>

      {/* ===== Content ===== */}
      <div className="p-6">
        {/* Title */}
        <Link href={`/courses/${course.id}`}>
          <h3
            className="
              text-lg font-semibold text-gray-900
              mb-2 leading-snug
              transition-colors
              group-hover:text-indigo-600
            "
          >
            {course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4">
          Master this course with hands-on projects and expert guidance.
        </p>

        {/* Stats */}
        <div className="flex items-center gap-5 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Clock size={15} />
            <span>{course.duration}</span>
          </div>

          <div className="flex items-center gap-1">
            <Users size={15} />
            <span>215</span>
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={15} fill="currentColor" />
            <span className="text-gray-600">4.9</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <p className="text-indigo-600 font-bold text-xl">{course.price}</p>

          {isLoggedIn ? (
            <Link href={`/payment?course=${encodeURIComponent(course.title)}`}>
              <Button size="sm" className="gap-1">
                Enroll
                <ArrowRight size={15} />
              </Button>
            </Link>
          ) : (
            <Link href="/register">
              <Button size="sm" variant="outline">
                Enroll
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
