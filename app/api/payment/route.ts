import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../lib/mongodb';
import Payment from '../../models/Payment';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();

    const paymentData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      course: formData.get('course') as string,
      paymentMethod: formData.get('paymentMethod') as string,
      accountNumber: formData.get('accountNumber') as string,
      transactionId: formData.get('transactionId') as string,
      amount: formData.get('amount') as string,
      screenshot: formData.get('screenshot') as File,
      status: 'pending',
      submittedAt: new Date(),
    };

    // Save to MongoDB
    const newPayment = new Payment({
      fullName: paymentData.fullName,
      email: paymentData.email,
      course: paymentData.course,
      paymentMethod: paymentData.paymentMethod,
      accountNumber: paymentData.accountNumber,
      transactionId: paymentData.transactionId,
      amount: paymentData.amount,
      screenshot: paymentData.screenshot ? 'uploaded' : null, // In a real app, you'd upload to cloud storage
      status: 'pending',
    });

    await newPayment.save();
    console.log('Payment saved to database:', newPayment._id);

    // Send email to user
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: paymentData.email,
      subject: 'Payment Submitted - Designer\'s Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Payment Submitted Successfully</h2>
          <p>Dear ${paymentData.fullName},</p>
          <p>Your payment for the course <strong>${paymentData.course}</strong> has been submitted successfully.</p>
          <p><strong>Payment Details:</strong></p>
          <ul>
            <li>Amount: PKR ${paymentData.amount}</li>
            <li>Payment Method: ${paymentData.paymentMethod}</li>
            <li>Transaction ID: ${paymentData.transactionId}</li>
          </ul>
          <p>Your payment is currently under review. You will receive an email once your payment is approved and you gain access to the course.</p>
          <p>If you have any questions, please contact us at ${process.env.ADMIN_EMAIL}</p>
          <br>
          <p>Best regards,<br>Designer's Hub Team</p>
        </div>
      `,
    });

    // Email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Payment Submission - Designer\'s Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Payment Submission</h2>
          <p><strong>Student Details:</strong></p>
          <ul>
            <li>Name: ${paymentData.fullName}</li>
            <li>Email: ${paymentData.email}</li>
            <li>Course: ${paymentData.course}</li>
          </ul>
          <p><strong>Payment Details:</strong></p>
          <ul>
            <li>Amount: PKR ${paymentData.amount}</li>
            <li>Payment Method: ${paymentData.paymentMethod}</li>
            <li>Account/Mobile: ${paymentData.accountNumber}</li>
            <li>Transaction ID: ${paymentData.transactionId}</li>
          </ul>
          <p>Please review the payment and approve/reject accordingly.</p>
          <br>
          <p>Designer's Hub Admin</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Payment submitted successfully' });
  } catch (error) {
    console.error('Payment submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit payment' },
      { status: 500 }
    );
  }
}