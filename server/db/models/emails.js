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
    unique: true,
    validate: {
      isEmail: true,
      unqiueEmail(email) {
        if (!email.unique) {
          throw new Error('email already added!')
        }
      }
    }
  }
})

module.exports = Emails
