// server/src/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // If status code is 200 (OK) but there is an error, set it to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  res.json({
    success: false,
    message: err.message,
    // Only show stack trace in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };