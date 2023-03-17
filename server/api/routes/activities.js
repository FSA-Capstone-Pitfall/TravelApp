const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { Destination, City, Activity }
} = require("../../db");

const defaultPage = 1;
const defaultPageLimit = 10;

// GET: /api/activities Search activities by cityId or destinationId.
router.get("/", async (req, res, next) => {
  try {
    let { cityId, destinationId, categories, page, limit } = req.query;

    if (!cityId && !destinationId) {
      res.status(400).send({
        message: "either cityId or destinationId query param is required"
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
      attributes: []
    };
    if (destinationId) {
      includeClause.model = Destination;
      includeClause.where = {
        id: destinationId
      };
    } else {
      includeClause.model = City;
      includeClause.where = {
        id: cityId
      };
    }

    categories = categories && categories.split(",");
    let whereActivitiesClause = {};
    if (categories && categories.length) {
      whereActivitiesClause.categories = { [Op.overlap]: categories };
    }

    const activitiesByCity = await Activity.findAll(
      {
        offset: (Number(page) - 1) * limit,
        limit: Number(limit),
        where: whereActivitiesClause,
        include: includeClause
      });

    const data = {
      page: Number(page),
      limit: Number(limit),
      data: activitiesByCity
    };
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;