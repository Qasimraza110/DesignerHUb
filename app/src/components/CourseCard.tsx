'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

interface Course {
  id: number;
  title: string;
  duration: string;
  price: string;
  image: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {/* Placeholder for image */}
        <span className="text-gray-500">Course Image</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">{course.price}</p>
        {isLoggedIn ? (
          <Link
            href={`/payment?course=${encodeURIComponent(course.title)}`}
            className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Enroll
          </Link>
        ) : (
          <Link
            href="/register"
            className="block w-full bg-gray-600 text-white text-center py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Sign In to Enroll
          </Link>
        )}
      </div>
    </div>
  );
}
