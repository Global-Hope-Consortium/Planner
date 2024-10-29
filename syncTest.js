// syncTest.js (for testing purpose)

import sequelize from './config/db.js';  // Corrected path with .js extension
import User from './models/User.js';     // Also make sure to add .js here

const testSync = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await User.sync({ force: true });  // Sync the User model
    console.log('User model synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing User model:', error);
  } finally {
    await sequelize.close();  // Close the connection when done
  }
};

testSync();