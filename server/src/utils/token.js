const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn, isProd } = require('../config/env');

const signToken = (userId) =>
  jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie('token', token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
};

module.exports = { signToken, sendTokenResponse, cookieOptions };
