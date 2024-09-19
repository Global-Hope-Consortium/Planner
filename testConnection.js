// testConnection.js
require('dotenv').config(); // Load environment variables

// Print the DATABASE_URL to verify it's being loaded
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const { testDBConnection } = require('./config/db');

testDBConnection();