const router = require('express').Router()
const {User} = require('../db/models')

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
      //magic method given to us by sequelize
      const createNewSO = await user.createShoutout({
        name: req.body.email,
        message: req.body.message,
        from: req.body.from || from
      })
      if (createNewSO) {
        res.status(200).send('successfully made new SO')
      }
    }
  } catch (error) {
    console.error(error)
  }
})

//edit eventually
