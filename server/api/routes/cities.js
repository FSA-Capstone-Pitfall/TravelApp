const router = require('express').Router();
const {
  models: { City },
} = require('../../db');

// GET: /api/cities Search cities by cityId or destinationId.
router.get('/', async (req, res, next) => {
  try {
    const cities = await City.findAll();
    res.status(200).json(cities);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
