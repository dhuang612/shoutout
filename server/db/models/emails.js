const Sequelize = require('sequelize')
const db = require('../db')
//will need to include email validation here
const Emails = db.define('email', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'Email address already in use!'
    },
    validate: {
      isEmail: true
    }
  },
  sent: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Emails
