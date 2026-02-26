'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/contexts/AuthContext';

interface Payment {
  _id: string;
  course: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: string;
  submittedAt: string;
}

export default function Dashboard() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/register');
      return;
    }

    // Fetch user's payments
    const fetchPayments = async () => {
      try {
        const response = await fetch(`/api/payments?email=${user?.email}`);
        if (response.ok) {
          const data = await response.json();
          setPayments(data.payments);
        }
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [isLoggedIn, user, router]);

  if (!isLoggedIn || loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const approvedPayments = payments.filter(p => p.status === 'approved');
  const pendingPayments = payments.filter(p => p.status === 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex">
          {/* Sidebar for desktop */}
          <div className="md:w-1/4 md:pr-8 mb-8 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Student Dashboard</h2>
              <ul className="space-y-2">
                <li className="text-blue-600 font-semibold">📚 My Courses</li>
                <li className="text-gray-700">📊 Progress</li>
                <li className="text-gray-700">📜 Certificates</li>
                <li className="text-gray-700">💬 Support</li>
                <li className="text-gray-700">⚙️ Settings</li>
              </ul>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Enrolled Courses:</span>
                    <span className="font-semibold">{approvedPayments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Payments:</span>
                    <span className="font-semibold text-yellow-600">{pendingPayments.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="font-semibold text-green-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            {/* Welcome Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName}!</h1>
                  <p className="text-gray-600">Continue your learning journey</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Member since</p>
