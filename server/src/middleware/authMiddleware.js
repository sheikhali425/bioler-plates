const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { jwtSecret } = require('../config/env');

const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized. Please log in.', 401);
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError('User no longer exists.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Not authorized. Invalid or expired token.', 401);
  }
});

module.exports = { protect };
