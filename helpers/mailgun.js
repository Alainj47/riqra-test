const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
    public_key: process.env.MAILGUN_PUBLIC_KEY || ''
  });

const send = async(email)=> {
    mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: process.env.MAILGUN_FROMUSER,
        to: [email],
        subject: "Welcome",
        text: "Welcome to challenge Riqra Backend Developer!",
        html: "<h1>Welcome to challenge Riqra Backend Developer!</h1>"
      })
      .then(msg => console.log(msg)) 
      .catch(err => console.log(err)); 
}

module.exports = {
    send
}