const express = require('express');
const nodemailer = require('nodemailer');
const emailValidator = require('../util/emailValidator');

const router = express.Router();

const nodeMailerTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'velocity.template.preview@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

router.post('/', async function (req, res) {
  try {
    const { recipientEmail, htmlContent, emailSubject } = req.body;
    if (!recipientEmail) {
      res.json({ status: 400, message: 'Email is required.' });
      return;
    }
    const isValidEmail = emailValidator.isEmailValid(recipientEmail);
    if (!isValidEmail) {
      res.json({ status: 400, message: 'Please enter a valid email address.' });
      return;
    }
    if (!htmlContent) {
      res.json({ status: 400, message: 'htmlContent field is required.' });
      return;
    }
    await nodeMailerTransport.sendMail({
      to: recipientEmail,
      subject: emailSubject || '[Test Email] Sent from velocity-template-preview.web.app 😉',
      html: htmlContent,
    });
    res.json({ staus: 200, message: 'Email sent successfully.' });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});

module.exports = router;
