import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Payment from '../../../models/Payment';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { paymentId, adminEmail } = await request.json();

    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Update payment status
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: adminEmail || 'admin@designershub.com'
      },
      { new: true }
    );

    if (!payment) {
      return NextResponse.json(
        { success: false, message: 'Payment not found' },
        { status: 404 }
      );
    }

    // Send approval email to user
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: payment.email,
      subject: 'Payment Approved - Course Access Granted',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Payment Approved!</h2>
          <p>Dear ${payment.fullName},</p>
          <p>Congratulations! Your payment for the course <strong>${payment.course}</strong> has been approved.</p>
          <p>You now have full access to your course materials. You can start learning right away!</p>
          <p><strong>Payment Details:</strong></p>
          <ul>
            <li>Course: ${payment.course}</li>
            <li>Amount: PKR ${payment.amount}</li>
            <li>Transaction ID: ${payment.transactionId}</li>
          </ul>
          <p>Log in to your dashboard to access your course.</p>
          <br>
          <p>Happy Learning!<br>Designer's Hub Team</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment approved successfully',
      payment
    });
  } catch (error) {
    console.error('Payment approval error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to approve payment' },
      { status: 500 }
    );
  }
}