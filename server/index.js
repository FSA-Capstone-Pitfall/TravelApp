const port = process.env.PORT || 8404;
const app = require('./app');

// import database if needed
const { db } = require('./db');

db.sync({force: true}).then(() => {
  console.log('db synced');
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
