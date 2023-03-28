const db = require('./db');

const Activity = require('./models/activity');
const Badge = require('./models/badge');
const City = require('./models/city');
const Destination = require('./models/destination');
const Frame = require('./models/frame');
const Itinerary_Activity = require('./models/itinerary_activity');
const Itinerary = require('./models/itinerary');
const Post = require('./models/post');
const User_Badge = require('./models/user_badge');
const User_Frame = require('./models/user_frame');
const User = require('./models/user');
const User_Itinerary = require('./models/user_itinerary');

// User
User.hasMany(User_Itinerary);
User.hasMany(Badge);
User.hasMany(Frame);
User.belongsToMany(Itinerary, { through: User_Itinerary });
Badge.belongsToMany(User, { through: User_Badge });
Frame.belongsToMany(User, { through: User_Frame });

// Itinerary
Itinerary.belongsTo(User, { as: 'author' });
Itinerary.belongsTo(City);
Itinerary.belongsToMany(User, { through: User_Itinerary });
Itinerary.hasMany(User_Itinerary);
Itinerary.belongsToMany(Activity, {
  through: { model: Itinerary_Activity, unique: false },
});

// Activity
Activity.belongsTo(Destination);
Activity.belongsToMany(Itinerary, {
  through: { model: Itinerary_Activity, unique: false },
});

// City
City.hasMany(Itinerary);
City.hasMany(Destination);

// Destination
Destination.belongsTo(City);
Destination.hasMany(Activity);

// User_Itinerary
User_Itinerary.belongsTo(User);
User_Itinerary.belongsTo(Itinerary);

// Itinerary_Activity
Itinerary_Activity.belongsTo(Itinerary);
Itinerary_Activity.belongsTo(Activity);
Itinerary.hasMany(Itinerary_Activity);
Activity.hasMany(Itinerary_Activity);


module.exports = {
  db,
  models: {
    Activity,
    Badge,
    City,
    Destination,
    Frame,
    Itinerary_Activity,
    Itinerary,
    Post,
    User_Badge,
    User_Frame,
    User,
    User_Itinerary,
  },
};
