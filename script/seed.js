'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Shoutouts} = require('../server/db/models')
const {Emails} = require('../server/db/models')

const models = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'frank@email.com', password: '456'})
  ])
  const userOne = users[0]
  const userTwo = users[1]
  const userThree = users[2]

  // console.log(userOne)
  // console.log(users[0].email)
  if (users) {
    // const shoutouts = await userOne.getShoutouts()
    const firstShoutout = await userOne.createShoutout({
      name: users[1].email,
      message: 'another shoutout!',
      from: users[2].email
    })
    const secondShoutout = await userTwo.createShoutout({
      name: users[0].email,
      message: 'second test shoutout!',
      from: users[1].email
    })
    const thirdShoutout = await userThree.createShoutout({
      name: users[2].email,
      message: 'final new shoutout!',
      from: users[0].email
    })

    const addEmail = await userThree.createEmail({
      firstName: 'Bob',
      email: 'bob@email.com'
    })

    console.log(`seeded ${users.length} users`)
    // console.log('this is what shoutout stores--> ', shoutouts)

    console.log(`seeded successfully`)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
