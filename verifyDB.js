// verifyDB.js
const { connectDB, syncModels } = require('./config/db');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Affirmation = require('./models/Affirmation');

const verifyDatabaseSetup = async () => {
  await connectDB(); // Test the database connection
  await syncModels(); // Synchronize the models

  // Test creating a User
  try {
    const testUser = await User.create({ username: 'testuser', password: 'testpassword' });
    console.log('User created:', testUser);

    // Test creating a Plan
    const testPlan = await Plan.create({ userId: testUser.id, title: 'Test Plan', amount: 1000, description: 'Sample Plan' });
    console.log('Plan created:', testPlan);

    // Test creating an Affirmation
    const testAffirmation = await Affirmation.create({ userId: testUser.id, content: 'This is a test affirmation.' });
    console.log('Affirmation created:', testAffirmation);

  } catch (error) {
    console.error('Error during model operations:', error);
  }
};

verifyDatabaseSetup();