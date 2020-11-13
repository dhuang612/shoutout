const router = require('express').Router()
const {User, Emails} = require('../db/models')
const sender = require('../emails/mailer')

module.exports = router

//need to post a new one
router.post('/new', async (req, res, next) => {
  try {
    if (req.body) {
      let from
      const user = req.user
      if (!req.body.from) {
        from = 'N/A'
      }
      const emailToCheck = req.body.email
      const checkEmail = await Emails.findOne({where: {email: emailToCheck}})
      if (!checkEmail) {
        res.status(401).send('email doesnt exist')
      } else {
        //magic method given to us by sequelize
        const createNewSO = await user.createShoutout({
          name: req.body.name,
          message: req.body.message,
          email: req.body.email,
          from: req.body.from || from
        })
        if (createNewSO) {
          res.status(200).send('successfully made new SO')
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
})

//edit eventually maybe?

//send the shoutout
router.get('/send', async (req, res, next) => {
  try {
    let data = {
      templateName: 'shoutouts',
      sender: 'no-reply@shoutout.com',
      receiver: 'dhuang684@gmail.com',
      name: req.user.email,
      welcome_url: 'https://shoutouts-the-app.herokuapp.com/auth/login'
    }
    const sendEmail = sender.sendEmail(data)
    if (sendEmail) {
      res.status(200).send('successfully sent so!')
    }
  } catch (error) {
    console.error(error)
  }
})
