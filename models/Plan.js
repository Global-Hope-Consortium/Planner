// models/Plan.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db';  // Ensure sequelize is imported correctly

// Define the Plan model
const Plan = sequelize.define('Plan', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true  // Automatically add createdAt and updatedAt fields
});

export default Plan;