const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter object using the mailtrap.io SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the mail options
  const mailOptions = {
    from: 'Ritik from Natours <ritik@natours.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // Send mail with message object
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
