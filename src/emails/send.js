
const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY= process.env.SENDGRID_API_KEY

sgMail.setApiKey(SENDGRID_API_KEY)

const welcome = ((name , email)=>{
const msg = {
    to: email, // Change to your recipient
    from: 'noa1605@gmail.com', // Change to your verified sender
    subject: 'welcome',
    text: `hi ${name} happy you join us`,
    //html: '<strong>מאי 2000</strong>',
  }
  sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
})

const goodbye = ((name , email)=>{
    const msg = {
        to: email, // Change to your recipient
        from: 'noa1605@gmail.com', // Change to your verified sender
        subject: 'time to say goodbye',
        text: `hi ${name} hope to see you soon again`
        //html: '<strong>מאי 2000</strong>',
      }
      sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    })

    module.exports = {
        welcome,
        goodbye
    }