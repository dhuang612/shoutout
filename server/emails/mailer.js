const sgMail = require('@sendgrid/mail')
require('../../secrets')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

templates = {
  welcome: 'd-19822032d2e2456084ebf2dc0a909913',
  shoutouts: 'd-29f8acda1c92421fadc9d7f578da6e36',
  verification: 'd-f321225b130846bc9eaece6af16b44b1'
}

const sendEmail = async data => {
  const msg = {
    to: data.receiver,
    from: data.sender,
    templateId: templates[data.templateName],

    dynamic_template_data: {
      name: data.name,
      welcome_url: data.welcome_url,
      login_url: data.login_url,
      verify_url: data.verify_url,
      message: data.message,
      id: data.id,
      person_who_sent: data.person
    }
  }
  //send the email

  // try {
  //   const mail = await sgMail.send(msg, (err, res) => {
  //     if (msg.dynamic_template_data.verify_url) {
  //       console.log('Please check your Email for account confirmation')
  //     }
  //   })
  // } catch (err) {
  //   console.error(err)
  // }
  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('successfully sent')
    }
  })
}
exports.sendEmail = sendEmail
