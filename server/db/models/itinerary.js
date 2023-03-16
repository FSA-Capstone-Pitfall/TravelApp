const Sequelize = require('sequelize');
const db = require('../db');

const Itinerary = db.define('itinerary', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Itinerary;
