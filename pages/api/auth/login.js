import { initDB } from '../../../middleware/initDB';  
import { connectDB } from '../../../config/db';        
import bcrypt from 'bcryptjs';                         
import jwt from 'jsonwebtoken';                        
import User from '../../../models/User';               
import Cors from 'cors';                               

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      await initDB();
      await connectDB();

      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(200).json({ token });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}