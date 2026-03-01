'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface Payment {
  _id: string;
  course: string;
  status: 'approved' | 'pending' | 'rejected';
  amount: string;
  submittedAt: string;
}

interface PaymentContextType {
  payments: Payment[];
  loading: boolean;
  approvedPayments: Payment[];
  pendingPayments: Payment[];
  rejectedPayments: Payment[];
  refreshPayments: () => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();

  const fetchPayments = async () => {
    if (!isLoggedIn || !user?.email) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/payments?email=${user.email}`);
      if (response.ok) {
      const data = await response.json();
        setPayments(data.payments || []);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshPayments = async () => {
    setLoading(true);
    await fetchPayments();
  };

  useEffect(() => {
    fetchPayments();
  }, [isLoggedIn, user?.email]);

  const approvedPayments = payments.filter((p) => p.status === 'approved');
  const pendingPayments = payments.filter((p) => p.status === 'pending');
  const rejectedPayments = payments.filter((p) => p.status === 'rejected');

  const value: PaymentContextType = {
    payments,
    loading,
    approvedPayments,
    pendingPayments,
    rejectedPayments,
    refreshPayments,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayments() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayments must be used within a PaymentProvider');
  }
  return context;
}