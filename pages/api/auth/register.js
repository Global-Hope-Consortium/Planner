// pages/api/auth/register.js
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import { connectDB } from '../../../config/db';

const handler = nc();

handler.post(async (req, res) => {
  await connectDB();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully.' });
});

export default handler;