const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const emailValidator = require('../util/emailValidator');
const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

router.post('/', async function (req, res) {
  const { recipientEmail, htmlContent, emailSubject } = req.body;
  if (!recipientEmail) {
    res.status(400).json({ status: 400, message: 'Email is required.' });
    return;
  }
  const isValidEmail = emailValidator.isEmailValid(recipientEmail);
  if (!isValidEmail) {
    res.status(400).json({ status: 400, message: 'Please enter a valid email address.' });
    return;
  }
  if (!htmlContent) {
    res.status(400).json({ status: 400, message: 'htmlContent field is required.' });
    return;
  }
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const nodeMailerTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        type: 'OAuth2',
        user: 'velocity.template.preview@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    await nodeMailerTransport.sendMail({
      from: 'Velocity Template Preview <velocity.template.preview@gmail.com>',
      to: recipientEmail,
      subject: emailSubject || '',
      html: htmlContent,
    });
    res.status(200).json({ staus: 200, message: 'Email sent successfully.' });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

module.exports = router;
