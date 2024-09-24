// config/db.js
const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log, // Set to true to see SQL queries in the console
});

// Test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// config/db.js
const syncModels = async () => {
    try {
      await sequelize.sync({ alter: true }); // Use alter: true to update the schema
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing models:', error);
    }
  };
  
  module.exports = { sequelize, connectDB, syncModels, };
