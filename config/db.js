/* import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log, // Enable logging
});

console.log('Sequelize Instance:', sequelize); // Add this line

// Function to test the database connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

export default sequelize; */

// config/db.js
import { Sequelize } from 'sequelize';

// Initialize the Sequelize instance with PostgreSQL configuration
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log,  // Enable logging to see SQL queries in the console
});

// Function to authenticate the database connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();  // Test if the database connection works
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;  // Export the sequelize instance