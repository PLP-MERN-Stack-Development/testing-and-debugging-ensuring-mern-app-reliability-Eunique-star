const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure you have a User model!

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check for the token in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (Remove "Bearer " string)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

      // Find the user associated with the token
      // (We exclude the password for security)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Pass control to the next function
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 2. If no token was found
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};