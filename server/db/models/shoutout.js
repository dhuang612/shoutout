const Sequelize = require('sequelize')
const db = require('../db')
//Sequelize.ARRAY(Sequelize.STRING)
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
