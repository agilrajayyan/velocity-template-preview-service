const express = require('express');
const sendEmailController = require('./controllers/sendEmailController');

const app = express();
app.use(express.json());

app.use('/api/send-email', sendEmailController);

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;