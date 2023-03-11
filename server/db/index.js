const db = require('./db');

const User = require('./models/user');
const Post = require('./models/post');
const Destination = require('./models/destination');

module.exports = {
  db,
  models: {
    User,
    Post,
    Destination,
  },
};
