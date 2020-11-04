const Sequelize = require('sequelize')
const db = require('../db')

const Shoutout = db.define('shoutout', {
  user: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  from: {
    type: Sequelize.STRING
  }
})

module.exports = Shoutout
