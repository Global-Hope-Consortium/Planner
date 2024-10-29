// syncDatabase.js
import { sequelize, connectDB, syncModels } from './config/db';
import User from './models/User';
import Plan from './models/Plan';
import Affirmation from './models/Affirmation';

const syncDatabase = async () => {
  try {
    console.log('Starting database synchronization...');

    // Ensure the database is connected
    await connectDB();
    console.log('Database connected.');

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

// Export the syncDatabase function for external use if needed
export default syncDatabase;

// Call the syncDatabase function to execute the synchronization
syncDatabase();