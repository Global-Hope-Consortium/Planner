// pages/api/auth/requestPasswordReset.js
import { connectDB } from '../../../config/db';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import sendEmail from '../../../utils/sendEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Generate a reset token with expiration
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the reset link via email
    const resetLink = `http://localhost:3000/resetPassword?token=${token}`;
    await sendEmail(email, 'Password Reset Request', `Click this link to reset your password: ${resetLink}`);

    return res.status(200).json({ message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    console.error('Error in password reset request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}