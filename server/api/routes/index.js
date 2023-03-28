const authRouter = require('./auth');
const usersRouter = require('./users');
const destinationsRouter = require('./destinations');
const activitiesRouter = require('./activities');
const itinerariesRouter = require('./itineraries');
const citiesRouter = require('./cities');

module.exports = {
  authRouter,
  usersRouter,
  destinationsRouter,
  activitiesRouter,
  itinerariesRouter,
  citiesRouter,
};
