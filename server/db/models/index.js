const User = require('./user')
const Shoutouts = require('./shoutout')
const Emails = require('./emails')
const db = require('../db')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Shoutouts)
Shoutouts.belongsTo(User)
User.hasMany(Emails)
Emails.belongsTo(User)
// console.log(User)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Shoutouts,
  Emails,
  db
}
