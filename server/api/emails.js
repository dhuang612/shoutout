const router = require('express').Router()
const {Emails, User} = require('../db/models')
module.exports = router

//everything to do with adding emails
router.post('/', async (req, res, next) => {
  try {
    if (req.body) {
      const user = req.user
      if (user.usedValidEmail(req.body.email)) {
        const addEmail = user.createEmail({
          firstName: req.body.firstName,
          email: req.body.email
        })
        if (addEmail) {
          res.status(200).send('successfully added email!')
        }
      } else {
        res.status(401).send('invalid email!')
      }
      console.log(Emails)
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/showAllEmails', async (req, res, next) => {
  try {
    const userId = req.user.id
    console.log('this is what userId holds', userId)
    const user = await User.findOne({where: {id: userId}})
    console.log(user)
    if (user) {
      const emailsToShow = await Emails.findAll({where: {userId: user.id}})
      if (emailsToShow) {
        res.status(200).json(emailsToShow)
      }
    }
  } catch (error) {
    console.error(error)
  }
})
