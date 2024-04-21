const express = require('express');
const sendEmailController = require('../src/controllers/sendEmailController');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'Success' });
});

app.use('/api/send-email', sendEmailController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
