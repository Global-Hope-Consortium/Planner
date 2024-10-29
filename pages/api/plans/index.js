// pages/api/plans/index.js
import { connectDB, syncModels } from '../../../config/db';
import Plan from '../../../models/Plan'; // Import the Plan model
import { verifyToken } from '../../../middleware/auth';

export default async function handler(req, res) {
  try {
    await connectDB(); // Connect to DB
    await syncModels(); // Sync models before use

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = verifyToken(req, res);

    if (req.method === 'GET') {
      // Fetch plans for the logged-in user
      const plans = await Plan.findAll({ where: { userId: decoded.id } });
      return res.status(200).json(plans);
    } else if (req.method === 'POST') {
      // Add a new plan
      const { title, amount, description } = req.body;
      if (!title || !amount || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      const newPlan = await Plan.create({ title, amount, description, userId: decoded.id });
      return res.status(201).json({ message: 'Plan created successfully', plan: newPlan });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}