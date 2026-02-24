'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const registered = localStorage.getItem('registered');
    if (!registered) {
      router.push('/');
    } else {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex">
          {/* Sidebar for desktop */}
          <div className="md:w-1/4 md:pr-8 mb-8 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Student Dashboard</h2>
              <ul className="space-y-2">
                <li className="text-gray-700">My Courses</li>
                <li className="text-gray-700">Progress</li>
                <li className="text-gray-700">Settings</li>
              </ul>
            </div>
          </div>
          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h1 className="text-2xl font-bold mb-4">Welcome, {user.fullName}!</h1>
              <p className="text-gray-600">You are enrolled in: <span className="font-semibold">{user.course}</span></p>
              <p className="text-gray-600 mt-2">Payment Status: <span className="text-green-600 font-semibold">Paid</span></p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Course Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <p className="text-gray-600 mt-2">25% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}