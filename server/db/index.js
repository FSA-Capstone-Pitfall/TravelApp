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

Activity.belongsToMany(Itinerary, { through: Itinerary_Activity });
Itinerary.hasMany(Activity);
Activity.belongsTo(Destination);
Destination.hasMany(Activity);
Activity.belongsTo(City);
City.hasMany(Activity);
Destination.belongsTo(City);
City.hasMany(Destination);

User.hasMany(Badge);
User.hasMany(Frame);
Badge.belongsToMany(User, { through: User_Badge });
Frame.belongsToMany(User, { through: User_Frame });

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
  },
};
