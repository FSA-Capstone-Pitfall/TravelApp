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

// GET: /api/destinations/:location
router.get('/:location', async (req, res, next) => {
  try {
    let { location } = req.params;
    location = location.toUpperCase();
    const destinations = await Destination.findAll({
      where: {
        destinationTag: location,
      },
    });
    res.json(destinations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
