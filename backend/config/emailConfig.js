require("dotenv").config();

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = async function ({ to, subject, text, html }) {
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject,
    text,
    html
  }

  sgMail
    .send(msg)
    .then((response) => {
      console.log("Message successfully sent.")
    })
    .catch((error) => {
      console.error(error)
    })
}


