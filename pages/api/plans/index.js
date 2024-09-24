import { connectDB } from '../../../config/db';
import { verifyToken } from '../../../middleware/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Verify token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const decoded = verifyToken(token);

      // Connect to the database
      await connectDB();

      // Process request...
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}