const router = require('express').Router();

const {
  models: { Destination, City }
} = require('../../db');
const { Op } = require('sequelize');


// GET: /api/destinations Search cities or destinations by identifier.
router.get('/', async (req, res, next) => {
  try {
    let { identifier } = req.query;

    if (!identifier) {
      res.status(400).send({
        message: 'missing url identifier query'
      });
      return;
    }

    // TODO make identifier case-insensitive

    const citiesWithDestinations = await City.findAll({
      limit: 5,
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${identifier}%`
            }
          },
          {
            '$destinations.name$': {
              [Op.like]: `%${identifier}%`
            }
          }
        ]
      },
      include: {
        as: 'destinations',
        model: Destination,
        required: true,
        duplicating: false
      }
    });
    res.status(200).send(citiesWithDestinations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
