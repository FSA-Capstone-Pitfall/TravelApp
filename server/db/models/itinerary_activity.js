const Sequelize = require('sequelize');
const db = require('../db');

const Itinerary_Activity = db.define('itinerary_activity', {
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  position: {
    type: Sequelize.INTEGER,
  },
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 60,
  },
  buffer: {
    type: Sequelize.INTEGER,
    defaultValue: 30,
  },
});

module.exports = Itinerary_Activity;
