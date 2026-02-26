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
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📊 Progress</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">📜 Certificates</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">💬 Support</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
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
                  <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Notifications/Alerts */}
            {pendingPayments.length > 0 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-yellow-800">Payment Approval Pending</h3>
                    <p className="text-yellow-700 text-sm">
                      You have {pendingPayments.length} payment(s) awaiting approval.
                      You will receive an email once approved.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Enrolled Courses */}
            {approvedPayments.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Your Enrolled Courses</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {approvedPayments.map((payment) => (
                    <div key={payment._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{payment.course}</h3>
                          <p className="text-gray-600 text-sm">Amount Paid: PKR {payment.amount}</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          Active
                        </span>
                      </div>

                      {/* Course Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Course Progress</span>
                          <span className="text-gray-600">25% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: '25%' }}></div>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">2 of 8 modules completed</p>
                      </div>

                      {/* Course Actions */}
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                          Continue Learning
                        </button>
                        <button className="bg-gray-100 text-gray-700 text-sm py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                          View Materials
                        </button>
                      </div>

                      {/* Recent Activity */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Activity</h4>
                        <div className="space-y-1 text-xs text-gray-600">
                          <p>✓ Completed: Introduction to Design</p>
                          <p>✓ Watched: Color Theory Basics</p>
                          <p>📖 Next: Typography Fundamentals</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Learning Path */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Your Learning Path</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        ✓
                      </div>
                      <div>
                        <p className="font-medium">Course Enrollment</p>
                        <p className="text-sm text-gray-600">Successfully enrolled in your first course</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Complete First Module</p>
                        <p className="text-sm text-gray-600">Finish the introduction module to unlock next content</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Earn Certificate</p>
                        <p className="text-sm text-gray-600">Complete the course to earn your certificate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses yet</h3>
                <p className="text-gray-600 mb-6">Start your design journey by enrolling in a course</p>
                <a
                  href="/courses"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse Courses
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}

            {/* Additional Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Study Materials</h3>
                <p className="text-gray-600 text-sm">Access downloadable resources and guides</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Certificates</h3>
                <p className="text-gray-600 text-sm">Download your course completion certificates</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-gray-600 text-sm">Get help from our support team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
