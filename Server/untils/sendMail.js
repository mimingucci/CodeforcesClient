const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"mimingucci 👻" <no-reply@mimingucci.email>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
  return info;
};

module.exports = sendMail;
