const User = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { sendTokenResponse, cookieOptions } = require('../utils/token');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError('Email already registered', 409);
  }

  const user = await User.create({ name, email, password });
  sendTokenResponse(user, 201, res);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  sendTokenResponse(user, 200, res);
});

const logout = asyncHandler(async (_req, res) => {
  res.cookie('token', 'loggedout', {
    ...cookieOptions,
    maxAge: 10 * 1000,
  });

  res.json({ success: true, message: 'Logged out' });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = { register, login, logout, getMe };
