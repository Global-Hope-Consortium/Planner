// pages/api/analysis/budget.js
import nc from 'next-connect';
import Plan from '../../../models/Plan';
import { connectDB } from '../../../config/db';
import { verifyToken } from '../../../middleware/auth';

const handler = nc();

handler.use(verifyToken).get(async (req, res) => {
  await connectDB();
  const userId = req.user.id;

  // Aggregate data to provide a simple analysis
  const plans = await Plan.findAll({ where: { userId } });
  const totalAmount = plans.reduce((sum, plan) => sum + parseFloat(plan.amount), 0);

  res.status(200).json({
    totalAmount,
    numberOfPlans: plans.length,
    averageAmount: plans.length ? totalAmount / plans.length : 0,
  });
});

export default handler;