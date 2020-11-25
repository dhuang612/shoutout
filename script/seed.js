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
    User.create({email: 'cody@email.com', password: 'Password2'}),
    User.create({email: 'murphy@email.com', password: 'FakePass4'}),
    User.create({email: 'frank@email.com', password: 'S@lt#592'})
  ])
  const userOne = users[0]
  const userTwo = users[1]
  const userThree = users[2]

  if (users) {
    // const shoutouts = await userOne.getShoutouts()
    let id = 2
    let emailObj = {
      firstName: 'Bob',
      email: 'bob@email.com'
    }

    // const addEmail = await userThree.setEmails(id, emailObj)
    console.log('this is setEmails', await userThree.setEmails)
    if (userThree.email) {
      // let paramsObj = {
      //   name: 'Bob',
      //   email: 'bob@email.com',
      //   message: 'test msg',
      //   userId: userThree.id
      // }

      // const addShoutout = await userThree.createShoutout(paramsObj)
      // console.log(Object.keys(userThree.__proto__))
      // console.log(Object.keys(newShoutout.__proto__));
      console.log(`seeded ${users.length} users`)
      if (userThree) {
        // console.log('this is what addEmail holds', addEmail)
        const addEmail = await userThree.createEmail({
          firstName: 'Dan',
          email: 'dan@email.com'
        })
        let setId = 2
        // let shoutoutObj = {
        //   shoutoutId: addShoutout.id
        // }
        // const setEmail = await userThree.setEmails(id, shoutoutObj)
        //  const setShoutout = await userThree.setEmails(id, emailObj);
        // console.log(`seeded ${addShoutout.length} shoutouts`)
        // console.log('this is what addInfo holds',addInfo)
        // console.log(`created ${addShoutout.length} shoutouts`)
        // console.log(addShoutout)
      }
      console.log(`seeded successfully`)
    }
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
