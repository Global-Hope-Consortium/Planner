// config/jwtConfig.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key', // Secure default
};