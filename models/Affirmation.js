// models/Affirmation.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Affirmation = sequelize.define('Affirmation', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Affirmation;