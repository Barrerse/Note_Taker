const path = require('path');
const htmlRoute = require('express').Router();

// Route to return notes.html
htmlRoute.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Route to return index.html for all other requests
htmlRoute.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = htmlRoute;
