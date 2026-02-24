import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['bank', 'jazzcash', 'easypaisa'],
  },
  accountNumber: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  screenshot: {
    type: String, // URL to uploaded screenshot
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: {
    type: Date,
  },
  approvedBy: {
    type: String,
  },
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);