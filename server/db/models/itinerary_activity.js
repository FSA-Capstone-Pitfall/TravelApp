const Sequelize = require('sequelize');
const db = require('../db');

const Itinerary_Activity = db.define('itinerary_activity', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 60,
  },
  buffer: {
    type: Sequelize.INTEGER,
    defaultValue: 30,
  },
  notes: {
    type: Sequelize.TEXT,
    defaultValue: 'Double click to add notes',
  },
});

module.exports = Itinerary_Activity;
