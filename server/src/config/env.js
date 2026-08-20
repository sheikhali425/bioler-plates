const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const required = ['MONGODB_URI', 'JWT_SECRET'];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  console.error('Copy server/.env.example to server/.env and fill in values.');
  process.exit(1);
}

if (
  process.env.NODE_ENV === 'production' &&
  /change|dev_only/i.test(process.env.JWT_SECRET || '')
) {
  console.error('Set a strong JWT_SECRET before running in production');
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
};
