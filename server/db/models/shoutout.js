const Sequelize = require('sequelize')
const db = require('../db')

const Shoutout = db.define('shoutout', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false
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
