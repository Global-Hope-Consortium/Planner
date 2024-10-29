/* // models/User.js

// Importing DataTypes from Sequelize and the sequelize instance from the database configuration
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

// Define the User model schema with two fields: username and password
const User = sequelize.define('User', {
  username: DataTypes.STRING,  // The username field is of type STRING
  password: DataTypes.STRING,  // The password field is of type STRING
});

// Export the User model to use it in other parts of the application
export default User; */

// models/User.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db';  // Ensure sequelize is imported correctly

// Test the sequelize instance
console.log('Sequelize Instance:', sequelize);  // Should not be undefined or null

// Define the User model schema with two fields: username and password
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,  // The username field is of type STRING
    allowNull: false,        // Ensure the field is not null
    unique: true,            // Make username unique
  },
  password: {
    type: DataTypes.STRING,  // The password field is of type STRING
    allowNull: false,        // Ensure the field is not null
  },
});

// Test if the User model is defined properly
console.log('User Model:', User);

export default User;