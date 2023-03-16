const Sequelize = require('sequelize');
const db = require('../db');
const { hashPassword: hashPasswordUtil } = require('../../utils');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: Sequelize.ENUM,
    values: ['admin', 'customer', 'creator'],
    allowNull: false,
    defaultValue: 'customer',
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
    defaultValue:
      'https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
  },
});

module.exports = User;

// hooks
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await hashPasswordUtil(user.password);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
