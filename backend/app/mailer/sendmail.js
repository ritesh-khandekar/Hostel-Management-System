var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'riteshkhandekar1380@gmail.com',
    pass: ''
  }
});

function sendMail(user){
  var mailOptions = {
    from: 'riteshkhandekar003@gmail.com',
    to: user,
    subject: 'Created Account Successfully!',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
module.exports = sendMail;