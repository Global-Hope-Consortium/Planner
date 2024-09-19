// pages/api/auth/login.js
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import { connectDB } from '../../../config/db';
import { jwtSecret } from '../../../config/jwtConfig';

const handler = nc();

handler.post(async (req, res) => {
  await connectDB();
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
});

export default handler;