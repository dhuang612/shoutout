const router = require('express').Router()
const {Emails, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.body) {
      if (User.prototype.usedValidEmail(req.body.email)) {
        const addEmail = await Emails.create(req.body)
        if (addEmail) {
          res.status(200).send('successfully added email!')
        }
      } else {
        res.status(401).send('invalid email!')
      }
    }
  } catch (error) {
    console.error(error)
  }
})
