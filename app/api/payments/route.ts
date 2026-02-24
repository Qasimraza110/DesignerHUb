import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb';
import Payment from '../../models/Payment';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const payments = await Payment.find({ email }).sort({ submittedAt: -1 });

    return NextResponse.json({
      success: true,
      payments: payments.map(payment => ({
        _id: payment._id,
        course: payment.course,
        status: payment.status,
        amount: payment.amount,
        submittedAt: payment.submittedAt,
      }))
    });
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}