const router = require('express').Router();
const sequelize = require('sequelize');

const {
  db,
  models: { Itinerary, City, Activity, Destination, Itinerary_Activity, User },
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
          id: cityId,
        },
      },
    };

    const publicItineraries = await Itinerary.findAll({
      ...basicQuery,
      offset: (Number(page) - 1) * limit,
      limit: Number(limit),
    });

    const numberOfRecords = await Itinerary.count({
      ...basicQuery,
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
        id: itineraryId,
      },
      include: [
        {
          model: Itinerary_Activity,
          order: [[Itinerary_Activity, 'date', 'ASC']],
          include: {
            model: Activity,
            include: {
              model: Destination,
            },
          },
        },
        {
          model: City,
        },
      ],
    });

    res.status(200).json(itinerary);
  } catch (err) {
    next(err);
  }
});

// POST: /api/itineraries/:itineraryId
router.post('/:itineraryId', async (req, res, next) => {

  // init db transaction to handle chain of DB writes
  const tx = await db.transaction();

  try {
    const { itineraryId } = req.params;

    const { userId } = req.body;

    // fetch user who wants to have the itinerary
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(400).send('invalid user id');
      return;
    }

    // fetch itinerary
    const itinerary = await Itinerary.findOne({
      where: {
        id: itineraryId,
      },
      include: [
        {
          model: Itinerary_Activity,
          include: {
            model: Activity,
            include: {
              model: Destination,
            },
          },
        },
        {
          model: City,
        },
      ],
    });

    // create itinerary row for new user with old itinerary info
    const itineraryCopy = await Itinerary.create({
      name: itinerary.name,
      duration: itinerary.duration,
      authorId: itinerary.authorId,
      cityId: itinerary.cityId
    }, { transaction: tx });

    // copy itinerary_activities into new itinerary
    if (itinerary.itinerary_activities) {
      const itineraryActivities = itinerary.itinerary_activities.map(record => record.activity);
      await itineraryCopy.setActivities(itineraryActivities, { transaction: tx });
    }

    // assign new itinerary to new user
    await user.addItinerary(itineraryCopy, {
      through: { status: 'planning' },
      transaction: tx
    });

    // commit DB transaction to apply creates/updates
    await tx.commit();

    res.status(200).json({
      itineraryId: itineraryCopy.id
    });
  } catch (err) {
    // rollback succeeded DB creates/updates on error
    await tx.rollback();
    next(err);
  }
});


module.exports = router;
