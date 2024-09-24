/* // pages/api/auth/login.js
import cors from 'cors';
import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB, syncModels } from '../../../config/db';
import User from '../../../models/User';

const handler = nextConnect();
handler.use(cors()); // Use CORS middleware

handler.post(async (req, res) => {
  try {
    // Log JWT Secret to check if it's correctly loaded
    console.log('JWT Secret:', process.env.JWT_SECRET);

    // Connect to the database
    await connectDB();
    await syncModels();

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Log success and send the token to the client
    console.log('Login successful for user:', username);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler; */
import { connectDB, syncModels } from '../../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to the database and sync models
      await connectDB();
      await syncModels();

      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Find the user in the database
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      // Return the token to the client
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