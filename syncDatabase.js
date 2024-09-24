/* // syncDatabase.js
const { connectDB, syncModels } = require('./config/db');

const syncDatabase = async () => {
  try {
    console.log('Starting database synchronization...');
    
    await connectDB();  // Ensure the database is connected
    console.log('Database connected.');

    // Add logging for model definition
    const User = require('./models/User');
    const Plan = require('./models/Plan');
    const Affirmation = require('./models/Affirmation');

    console.log('User model:', User);
    console.log('Plan model:', Plan);
    console.log('Affirmation model:', Affirmation);

    await syncModels(); // Synchronize the models with the database
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Database synchronization failed:', error);
  }
};

syncDatabase(); */

// syncDatabase.js
const { sequelize, connectDB, syncModels } = require('./config/db');

const syncDatabase = async () => {
  try {
    console.log('Starting database synchronization...');

    // Ensure the database is connected
    await connectDB();
    console.log('Database connected.');

    // Import the models
    const User = require('./models/User');
    const Plan = require('./models/Plan');
    const Affirmation = require('./models/Affirmation');

    // Log the models for debugging purposes
    console.log('User model:', User);
    console.log('Plan model:', Plan);
    console.log('Affirmation model:', Affirmation);

    // Synchronize the models with the database
    await syncModels();
    console.log('All models were synchronized successfully.');

    // List tables in the public schema to confirm they were created
    const [results] = await sequelize.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public';
    `);
    console.log('Tables in the database:', results);
    
  } catch (error) {
    console.error('Database synchronization failed:', error);
  } finally {
    await sequelize.close(); // Close the connection when done
  }
};

syncDatabase()