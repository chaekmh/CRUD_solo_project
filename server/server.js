// imports
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// app.get('/', express.static(path.join(__dirname, '../index.html')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
