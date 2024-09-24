// models/Affirmation.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Affirmation = sequelize.define('Affirmation', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Affirmation;