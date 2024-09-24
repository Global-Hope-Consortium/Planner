// Import configurations from environment.js
const env = require('./config/environment');

// Using environment variables in your database connection
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(env.databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

// Using environment variables in JWT utilities
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: 123 }, env.jwtSecret, { expiresIn: env.jwtExpiration });