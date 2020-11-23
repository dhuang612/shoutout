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
    if (req.user.flag) {
      const userId = req.user.id
      const user = await User.findOne({where: {id: userId}})

      if (user) {
        const emailsToShow = await Emails.findAll({where: {userId: user.id}})
        if (emailsToShow) {
          res.status(200).json(emailsToShow)
        } else {
          res.send('No emails to show')
        }
      }
    } else {
      const userId = req.user.inviteId
      const user = await User.findOne({where: {id: userId}})

      if (user) {
        const emailsToShow = await Emails.findAll({where: {userId: user.id}})
        if (emailsToShow) {
          res.status(200).json(emailsToShow)
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const emailToSend = await Emails.findByPk(req.params.id)
    res.send(emailToSend)
  } catch (error) {
    next(error)
  }
})

router.post('/sendInvite', async (req, res, next) => {
  try {
    if (req.body) {
      const name = req.body.firstName
      const userId = req.user.id
      let data = {
        templateName: 'welcome',
        sender: 'no-reply@shoutout.com',
        receiver: req.body.email,
        name: req.body.firstName,
        login_url: 'https://shoutouts-the-app.herokuapp.com/signup/invite',
        id: userId
      }
      const sendEmail = sender.sendEmail(data)
      const emailToFind = await Emails.findOne({
        where: {
          email: req.body.email
        }
      })
      console.log('this is what emailToFind holds', emailToFind)
      emailToFind.sent = true
      await emailToFind.save()
      res.status(200).send('successfully sent so!')
    }
  } catch (error) {
    console.error(error)
  }
})
