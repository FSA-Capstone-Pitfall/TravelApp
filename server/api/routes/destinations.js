const router = require('express').Router();
const Sequelize = require('sequelize');

const {
  models: { Destination },
} = require('../../db');

// GET: /api/destinations
router.get('/', async (req, res, next) => {
  try {
    const destinations = await Destination.findAll();
    res.json(destinations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
