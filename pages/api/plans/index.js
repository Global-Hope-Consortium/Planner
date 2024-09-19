// pages/api/plans/index.js
import nc from 'next-connect';
import Plan from '../../../models/Plan';
import { connectDB } from '../../../config/db';
import { verifyToken } from '../../../middleware/auth';

const handler = nc();

handler.use(verifyToken).post(async (req, res) => {
  await connectDB();
  const { title, amount, description } = req.body;
  const userId = req.user.id;

  const plan = await Plan.create({ userId, title, amount, description });
  res.status(201).json(plan);
});

handler.use(verifyToken).get(async (req, res) => {
  await connectDB();
  const userId = req.user.id;

  const plans = await Plan.findAll({ where: { userId } });
  res.status(200).json(plans);
});

export default handler;