// config/jwtUtils.js
import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpiration } from './jwtConfig'; // Import configuration values

/**
 * Generate a JWT for a given payload
 * @param {Object} payload - The data to encode (e.g., user ID and username)
 * @returns {string} - A signed JWT
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
};

/**
 * Verify a given JWT
 * @param {string} token - The JWT to verify
 * @returns {Object|null} - The decoded payload if the token is valid, otherwise null
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;
  }
};