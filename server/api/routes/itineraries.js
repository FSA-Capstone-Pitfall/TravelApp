const router = require('express').Router();

const {
  models: { Itinerary, City, Activity, Destination, Itinerary_Activity },
} = require('../../db');

const defaultPage = 1;
let defaultPageLimit = 10;

//GET: /api/itineraries
router.get('/', async (req, res, next) => {
  try {

    let { cityId, page, limit } = req.query;

    if (!cityId) {
      res.status(400).send({
        message: 'cityId query param is required',
      });
      return;
    }

    if (!page) {
      page = defaultPage;
    }

    if (!limit) {
      limit = defaultPageLimit;
    }


    const basicQuery = {
      include: {
        model: City,
        attributes: [],
        where: {
          id: cityId
        }
      },
    };

    const publicItineraries = await Itinerary.findAll({
        ...basicQuery,
        offset: (Number(page) - 1) * limit,
        limit: Number(limit),
      }
    );

    const numberOfRecords = await Itinerary.count({
      ...basicQuery
    });

    const data = {
      page: Number(page),
      totalPages: Math.ceil(numberOfRecords / limit),
      limit: Number(limit),
      data: publicItineraries,
    };

    res.status(200).json(data);

  } catch (err) {
    next(err);
  }
});

//GET: /api/itineraries/:itineraryId
router.get('/:itineraryId', async (req, res, next) => {
  try {
    const { itineraryId } = req.params;

    const itinerary = await Itinerary.findOne({
        where: {
          id: itineraryId
        },
        include: [
          {
            model: City,
          },
          {
            model: Activity,
            through: {
              model: Itinerary_Activity,
            },
            order: [
              [Itinerary_Activity, 'date', 'ASC']
            ],
            include: [
              { model: Destination }
            ]
          }
        ],
      }
    );

    res.status(200).json(itinerary);

  } catch (err) {
    next(err);
  }
});

module.exports = router;