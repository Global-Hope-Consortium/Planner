// middleware/auth.js
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig';

export const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;  // Attach decoded info to request
    return decoded;      // Return the decoded token directly
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized, invalid token.' });
  }
};