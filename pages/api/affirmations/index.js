// pages/api/affirmations/index.js
import nc from 'next-connect';
import Affirmation from '../../../models/Affirmation';
import { connectDB } from '../../../config/db';
import { verifyToken } from '../../../middleware/auth';

const handler = nc();

handler.use(verifyToken).post(async (req, res) => {
  await connectDB();
  const { content } = req.body;
  const userId = req.user.id;

  const affirmation = await Affirmation.create({ userId, content });
  res.status(201).json(affirmation);
});

handler.use(verifyToken).get(async (req, res) => {
  await connectDB();
  const userId = req.user.id;

  const affirmations = await Affirmation.findAll({ where: { userId } });
  res.status(200).json(affirmations);
});

export default handler;