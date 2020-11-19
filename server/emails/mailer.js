const sgMail = require('@sendgrid/mail')
require('../../secrets')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

templates = {
  welcome: 'd-19822032d2e2456084ebf2dc0a909913',
  shoutouts: 'd-29f8acda1c92421fadc9d7f578da6e36'
}

function sendEmail(data) {
  const msg = {
    to: data.receiver,
    from: data.sender,
    templateId: templates[data.templateName],

    dynamic_template_data: {
      name: data.name,
      welcome_url: data.welcome_url,
      login_url: data.login_url,
      message: data.message,
      id: data.id
    }
  }
  //send the email
  sgMail.send(msg, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log('successfully sent')
    }
  })
}
exports.sendEmail = sendEmail
