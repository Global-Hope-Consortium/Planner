/* import cors from 'cors';
import { default as nextConnect } from 'next-connect'; // Named import to avoid Webpack issue
import { connectDB, syncModels } from '../../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

const handler = nextConnect();
handler.use(cors()); // Use CORS middleware
const jwtSecret = process.env.JWT_SECRET || 'your-default-secret'; 

handler.post(async (req, res) => {
  try {
    // Log JWT Secret to check if it's correctly loaded
    console.log('JWT Secret:', process.env.JWT_SECRET);

    // Test the database connection and synchronize models
    await connectDB(); // Ensure the database is reachable
    await syncModels(); // Synchronize the models (create tables if they do not exist)

    const { username, password } = req.body;
    console.log('Received request:', req.body);

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    // Generate JWT token for the new user
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default handler; 

 */
import cors from 'cors';
import { connectDB, syncModels } from '../../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

// CORS middleware
const corsMiddleware = cors();

export default async function handler(req, res) {
  try {
    // Handle the CORS middleware
    await new Promise((resolve, reject) => {
      corsMiddleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        resolve(result);
      });
    });

    // Only handle POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Log JWT Secret to check if it's correctly loaded
    console.log('JWT Secret:', process.env.JWT_SECRET);

    // Test the database connection and synchronize models
    await connectDB(); // Ensure the database is reachable
    await syncModels(); // Synchronize the models (create tables if they do not exist)

    const { username, password } = req.body;
    console.log('Received request:', req.body);

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    // Generate JWT token for the new user
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}