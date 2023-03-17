const Sequelize = require('sequelize');
const db = require('../db');

const User_Itinerary = db.define('user_itinerary', {
  status: {
    type: Sequelize.ENUM,
    values: ['planning', 'upcoming', 'complete'],
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 'planning',
  },
});

module.exports = User_Itinerary;
