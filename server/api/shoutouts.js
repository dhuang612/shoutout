const router = require('express').Router()
const {User, Emails, Shoutouts} = require('../db/models')
const Shoutout = require('../db/models/shoutout')
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
        let paramsObj = {
          name: req.body.name,
          message: req.body.message,
          email: req.body.email,
          from: req.body.from || from
        }
        let id = req.user.id
        //magic method given to us by sequelize
        const createNewSO = await user.createShoutout(paramsObj)
        if (createNewSO) {
          console.log('this is our new shoutout', createNewSO)
          res.status(200).send('successfully made new SO')
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/showAllShoutouts', async (req, res, next) => {
  try {
    const userId = req.user.id
    const shoutouts = await Shoutouts.findAll({where: {userId}})
    if (shoutouts) {
      res.status(200).json(shoutouts)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const shoutoutToSend = await Shoutouts.findByPk(req.params.id)
    res.send(shoutoutToSend)
  } catch (error) {
    next(error)
  }
})

//edit eventually maybe?

//send the shoutout
router.post('/send', async (req, res, next) => {
  try {
    if (req.body) {
      const email = req.body.email
      const msg = req.body.message
      console.log('this is msg', msg)
      let data = {
        templateName: 'shoutouts',
        sender: 'no-reply@shoutout.com',
        receiver: email,
        name: req.body.name,
        message: msg,
        welcome_url: 'https://shoutouts-the-app.herokuapp.com/auth/login'
      }
      const sendEmail = sender.sendEmail(data)
      if (sendEmail) {
        res.status(200).send('successfully sent so!')
      }
    }
  } catch (error) {
    console.error(error)
  }
})
