import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Payment from '../../../../models/Payment';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const resolvedParams = await params;
    const paymentId = resolvedParams.id;

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Invalid action' },
        { status: 400 }
      );
    }

    // Update payment status
    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      {
        status: action === 'approve' ? 'approved' : 'rejected',
        approvedAt: new Date(),
        approvedBy: 'admin@designershub.com'
      },
      { new: true }
    );

    if (!payment) {
      return NextResponse.json(
        { success: false, message: 'Payment not found' },
        { status: 404 }
      );
    }

    // Send email to user based on action
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (action === 'approve') {
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
    } else {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: payment.email,
        subject: 'Payment Rejected - Designer\'s Hub',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">Payment Rejected</h2>
            <p>Dear ${payment.fullName},</p>
            <p>Unfortunately, your payment for the course <strong>${payment.course}</strong> could not be verified.</p>
            <p><strong>Payment Details:</strong></p>
            <ul>
              <li>Course: ${payment.course}</li>
              <li>Amount: PKR ${payment.amount}</li>
              <li>Transaction ID: ${payment.transactionId}</li>
            </ul>
            <p>Please check your payment details and try again, or contact our support team for assistance.</p>
            <p>If you have any questions, please contact us at ${process.env.ADMIN_EMAIL}</p>
            <br>
            <p>Best regards,<br>Designer's Hub Team</p>
          </div>
        `,
      });
    }

    // Return a simple HTML response for the admin
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment ${action === 'approve' ? 'Approved' : 'Rejected'}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: #16a34a; }
            .error { color: #dc2626; }
          </style>
        </head>
        <body>
          <h1 class="${action === 'approve' ? 'success' : 'error'}">
            Payment ${action === 'approve' ? 'Approved' : 'Rejected'} Successfully
          </h1>
          <p>The payment has been ${action}d and the user has been notified via email.</p>
          <p>You can close this window now.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    console.error('Payment action error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process payment action' },
      { status: 500 }
    );
  }
}