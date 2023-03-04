const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up middleware to handle JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up middleware to serve static assets from the public folder
app.use(express.static('public'));

// Set up routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
