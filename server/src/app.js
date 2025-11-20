const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware'); // Import it
const morgan = require('morgan'); // Import morgan

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev')); // Logs requests like: "GET /api/posts 200 15ms"
}

// 👇 ADD THIS AT THE VERY BOTTOM (After all routes)
app.use(errorHandler);

module.exports = app;