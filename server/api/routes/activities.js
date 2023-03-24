const router = require('express').Router();
const { Op } = require('sequelize');
const {
  models: { Destination, City, Activity },
} = require('../../db');

const defaultPage = 1;
const defaultPageLimit = 10;

// GET: /api/activities Search activities by cityId or destinationId.
router.get('/', async (req, res, next) => {
  try {
    let { cityId, destinationId, categories, page, limit } = req.query;

    if (!cityId && !destinationId) {
      res.status(400).send({
        message: 'either cityId or destinationId query param is required',
      });
      return;
    }

    if (!page) {
      page = defaultPage;
    }

    if (!limit) {
      limit = defaultPageLimit;
    }

    let includeClause = {
      attributes: [],
      model: Destination,
    };
    if (destinationId) {
      includeClause.where = {
        id: destinationId,
      };
    } else {
      includeClause.where = {
        cityId: cityId,
      };
    }

    categories = categories && categories.split(',');
    let whereActivitiesClause = {};
    if (categories && categories.length) {
      whereActivitiesClause.categories = { [Op.overlap]: categories };
    }

    const basicQuery = {
      where: whereActivitiesClause,
      include: includeClause,
    };


    const activitiesByCity = await Activity.findAll(
      {
        ...basicQuery,
        offset: (Number(page) - 1) * limit,
        limit: Number(limit),
      });

    const numberOfRecords = await Activity.count({
      ...basicQuery
    });

    const data = {
      page: Number(page),
      totalPages: Math.ceil(numberOfRecords / limit),
      limit: Number(limit),
      data: activitiesByCity,
    };

    if (cityId) {
      await City.increment(
        {
          searchAppearances: 1
        },
        {
          where: { id: cityId }
        });
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:activityId', async (req, res, next) => {
  try {
    const { activityId } = req.params
    const activity = await Activity.findOne({
      where: {
        id: activityId,
      },
    });
    if (activity) {
      res.send(activity);

    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;