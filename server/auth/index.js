const router = require('express').Router()
const Emails = require('../db/models/emails')
const User = require('../db/models/user')
const sender = require('../emails/mailer')
const Op = require('sequelize').Op
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email, isVerified: {[Op.or]: ['true', 'false']}}
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('no user found')
    } else if (!user.isVerified) {
      res.status(401).send('awaiting email verification')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const createToken = () => {
      const tokenVal = Math.random()
        .toString(36)
        .substr(2)
      return tokenVal + tokenVal
    }
    const token = createToken()
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      token
    })
    console.log('this is the token we are assigned', token)
    if (user.usedValidEmail(req.body.email)) {
      let data = {
        receiver: req.body.email,
        sender: 'no-reply@shoutout.com',
        verify_url: `https://shoutouts-the-app.herokuapp.com/auth/confirmation/${token}`,
        templateName: 'verification'
      }

      const sendEmail = sender.sendEmail(data)
      // console.log('this is sendEmail', sendEmail)
      if (sendEmail) {
        return res
          .status(401)
          .json('Please check your Email for account confirmation')
      }
    } else {
      const removeUser = await User.findByPk(user.id)
      await removeUser.destroy(req.body)
      res.status(401).send('Invalid email!')
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

//route for email verification
router.get('/confirmation/:token', async (req, res, next) => {
  console.log('this is the token we are trying to use', req.params.token)
  const findUser = await User.findOne({
    where: {
      token: req.params.token
    }
  })
  if (!findUser) {
    res.status(404).send('invalid verification link')
  } else {
    findUser.isVerified = true
    await findUser.save()
    res.redirect('/login')
  }
})

//route to handle invited people // will need to send the id along from the invite side.
router.post('/signup/invite', async (req, res, next) => {
  try {
    if (req.body.id) {
      console.log(req.body)
      const password = req.body.password
      const email = req.body.email
      const user = await User.create({email, password})
      user.flag = false
      user.inviteId = req.body.id
      await user.save()

      if (user.usedValidEmail(req.body.email)) {
        //give them access to the user who invite them's email list.
        req.login(user, err => (err ? next(err) : res.json(user)))
      } else {
        const removeUser = await User.findByPk(user.id)
        await removeUser.destroy(req.body)
        res.status(401).send('Invalid email!')
      }
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
