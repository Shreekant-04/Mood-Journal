const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Shreekant <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'gmail',

        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};

// const transporter = nodemailer.createTransport({
//   // host: process.env.EMAIL_HOST,
//   // port: process.env.EMAIL_PORT,
//   service: 'gmail',

//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

// const transporter = nodemailer.createTransport({
//   host: 'live.smtp.mailtrap.io',
//   port: 587,
//   auth: {
//     user: 'api',
//     pass: 'c16c8acefe6f73e0e17059427b5e39f1'
//   }
// });
// const verifyTransporter = async () => {
//   try {
//     await transporter.verify();
//     console.log('SMTP server connection established');
//   } catch (error) {
//     console.error('SMTP server connection failed:', error);
//   }
// };

// verifyTransporter();

// const sendEmail = async options => {
//   // 1) Create a transporter

//   // 2) Define the email options
//   const mailOptions = {
//     from: 'Shreekant <shree.kant.74.sk@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message
//     // html:
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
