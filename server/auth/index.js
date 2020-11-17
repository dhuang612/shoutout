const router = require('express').Router()
const Emails = require('../db/models/emails')
const User = require('../db/models/user')
const sender = require('../emails/mailer')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
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
    const user = await User.create(req.body)
    if (user.usedValidEmail(req.body.email)) {
      req.login(user, err => (err ? next(err) : res.json(user)))
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
//route to handle invited people // will need to send the id along from the invite side.
router.post('/signup/invite', async (req, res, next) => {
  try {
    console.log('we are hitting this route!')
    const user = await User.create(req.body)

    if (req.body.id) {
      user.flag = false
      user.inviteId = req.body.id
      await user.save()
    }
    if (user.usedValidEmail(req.body.email)) {
      //give them access to the user who invite them's email list.
      req.login(user, err => (err ? next(err) : res.json(user)))
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

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
