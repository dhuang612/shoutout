const router = require('express').Router()
const {Emails, User} = require('../db/models')
const sender = require('../emails/mailer')
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
    const user = await User.findOne({where: {id: userId}})
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

router.post('/sendInvite', async (req, res, next) => {
  try {
    if (req.body) {
      const name = req.body.firstName

      console.log('req.body --->', req.body.email)
      let data = {
        templateName: 'welcome',
        sender: 'no-reply@shoutout.com',
        receiver: req.body.email,
        name: req.body.firstName,
        login_url: 'https://shoutouts-the-app.herokuapp.com/auth/signup/invite'
      }
      const sendEmail = sender.sendEmail(data)
      console.log(sendEmail)
      if (sendEmail) {
        res.status(200).send('successfully sent so!')
      }
    }
  } catch (error) {
    console.error(error)
  }
})
