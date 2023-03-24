const router = require('express').Router();
const {
  models: { User, User_Itinerary, Itinerary, Activity, City, Destination },
} = require('../../db');
const { requireToken, requireAdminToken } = require('../middleware');

// GET /api/users/
router.get('/', requireAdminToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'city',
        'state',
        'imageUrl',
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId
router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'role',
        'city',
        'state',
        'imageUrl',
      ],
    });

    if (user) {
      if (req.user.role === 'admin' || req.user.id === user.id) {
        res.json(user);
      } else {
        res.status(403).send('You are not authorized to access this resource.');
      }
    } else {
      res.status(404).send("User doesn't exist.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /api/users/profile/:userId
router.get('/profile/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ['id', 'firstName', 'lastName', 'city', 'state', 'imageUrl'],
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User doesn't exist.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// user views all their trips
// GET /api/users/:userId/trips/
router.get('/:userId/trips', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const trips = await User_Itinerary.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: Itinerary,
          include: [
            {
              model: Activity,
              include: {
                model: Destination,
              },
            },
            {
              model: City,
            },
          ],
        },
      ],
    });
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// user gets a specific trip
// GET /api/users/:userId/trips/:tripId
router.get('/:userId/trips/:tripId', requireToken, async (req, res, next) => {
  try {
    const { userId, tripId } = req.params;
    const trip = await User_Itinerary.findOne({
      where: {
        userId: userId,
        itineraryId: tripId,
      },
      include: [
        {
          model: Itinerary,
          include: [
            {
              model: Activity,
              include: {
                model: Destination,
              },
            },
            {
              model: City,
            },
          ],
        },
      ],
    });
    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /api/users/
router.post('/', requireAdminToken, async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

// PUT /api/users/:userId
router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const [numUpdated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (numUpdated === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// DELETE /api/users/:userId
router.delete('/:id', requireAdminToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
