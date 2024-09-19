// pages/api/notifications/reminders.js
import nc from 'next-connect';
import { connectDB } from '../../../config/db';
import { verifyToken } from '../../../middleware/auth';

const handler = nc();

handler.use(verifyToken).post(async (req, res) => {
  await connectDB();
  const { reminderMessage, dueDate } = req.body;
  const userId = req.user.id;

  // Here you would typically save the reminder to the database.
  // For simplicity, we just return the reminder.
  res.status(201).json({ userId, reminderMessage, dueDate });
});

export default handler;