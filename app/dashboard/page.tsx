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
                <li className="text-blue-600 font-semibold">My Courses</li>
                <li className="text-gray-700">Progress</li>
                <li className="text-gray-700">Settings</li>
              </ul>
            </div>
          </div>
          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h1 className="text-2xl font-bold mb-4">Welcome, {user?.fullName}!</h1>

              {pendingPayments.length > 0 && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="font-semibold text-yellow-800">Pending Approvals</h3>
                  <p className="text-yellow-700 text-sm">
                    You have {pendingPayments.length} payment(s) awaiting approval.
                    You will receive an email once approved.
                  </p>
                </div>
              )}

              {approvedPayments.length > 0 ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Your Enrolled Courses</h2>
                  <div className="space-y-4">
                    {approvedPayments.map((payment) => (
                      <div key={payment._id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-lg">{payment.course}</h3>
                        <p className="text-gray-600">Amount Paid: PKR {payment.amount}</p>
                        <p className="text-green-600 text-sm">Status: Approved</p>
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Course Progress</h4>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-blue-600 h-4 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <p className="text-gray-600 mt-2 text-sm">25% Complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No approved courses yet.</p>
                  <p className="text-gray-500 text-sm">Complete your payment to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
