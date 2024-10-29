import cors from 'cors';
import { connectDB, syncModels } from '../../../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

const corsMiddleware = cors();

export default async function handler(req, res) {
  try {
    await new Promise((resolve, reject) => {
      corsMiddleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        resolve(result);
      });
    });

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

    await connectDB(); 
    await syncModels(); 

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}