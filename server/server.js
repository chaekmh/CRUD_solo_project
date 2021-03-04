// imports
const express = require('express');
const path = require('path');
const menuController = require('./controllers/menuControllers');

const app = express();
const PORT = 3000;

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/graph', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/create', menuController.addOrder, (req, res) => {
  return res.status(200).json('Your post request is through!');
});

app.get('/display', menuController.getOrder, (req, res) => {
  return res.status(200).json(res.locals.data);
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
