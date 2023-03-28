const router = require('express').Router();
const {
  authRouter,
  usersRouter,
  destinationsRouter,
  activitiesRouter,
  citiesRouter,
} = require('./routes');

// /api/{path}
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/destinations', destinationsRouter);
router.use('/activities', activitiesRouter);
router.use('/cities', citiesRouter);

router.use((req, res, next) => {
  const err = new Error('API route not found');
  err.status = 404;
  next(err);
});

module.exports = router;
