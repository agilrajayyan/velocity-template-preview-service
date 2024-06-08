const express = require('express');
const cors = require('cors');
const sendEmailController = require('../src/controllers/sendEmailController');
const generateTemplateDataController = require('../src/controllers/generateTemplateDataController');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'Success' });
});

app.use('/api/send-email', sendEmailController);
app.use('/api/generate-template-data', generateTemplateDataController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
