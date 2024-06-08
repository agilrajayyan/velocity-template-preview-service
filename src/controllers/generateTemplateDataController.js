const express = require('express');
const router = express.Router();
require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

router.post('/', async function (req, res) {
    const velocityTemplate = req.body.velocityTemplate || '';
    if (velocityTemplate.trim() === '') {
        return res.status(400).json({ status: 400, message: 'Velocity Template content is empty.' });
    }
    const prompt = `Generate JSON data suitable for the variables used in the following velocity template with just the JSON and do not include tilde or any other texts in the response. ${velocityTemplate}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return res.status(200).json({ status: 200, response: response.text() });
});

module.exports = router;
