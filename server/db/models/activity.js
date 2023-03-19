const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  googleMap: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: [],
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
    defaultValue:
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
});

module.exports = Activity;
