const router = require('express').Router();
const { Op } = require('sequelize');

const {
  models: { Destination, City }
} = require('../../db');


// GET: /api/destinations Search cities or destinations by identifier.
router.get('/', async (req, res, next) => {
  try {
    let { identifier } = req.query;

    const whereClause = {};
    const orderClause = [];
    const includeClause = {
      as: 'destinations',
      model: Destination,
    };

    // Search destinations by names
    if (identifier) {
      orderClause.push(['name', 'DESC']);
      whereClause[Op.or] = [
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
      ];
      includeClause.required = true;
      includeClause.duplicating = false;

      //  Get the most popular destinations
    } else {
      orderClause.push(['searchAppearances', 'DESC']);
    }

    // TODO make identifier case-insensitive

    const citiesWithDestinations = await City.findAll({
      limit: 9,
      where: whereClause,
      order: orderClause,
      include: includeClause
    });
    res.status(200).send(citiesWithDestinations);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
