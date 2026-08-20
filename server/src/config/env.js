const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const required = ['MONGODB_URI', 'JWT_SECRET'];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  console.error('Copy server/.env.example to server/.env and fill in values.');
  process.exit(1);
}

if (process.env.NODE_ENV === 'production') {
  const secret = process.env.JWT_SECRET || '';
  const weakExact = new Set([
    'change_this_to_a_long_random_secret_in_production',
    'dev_only_change_me_mern_boilerplate_secret_key_32chars',
    'dev_only_change_me_mern_docker_secret_key',
    'replace_with_your_own_long_random_string_at_least_32_chars',
  ]);

  if (secret.length < 32 || weakExact.has(secret)) {
    console.error('Set a strong JWT_SECRET (32+ chars) before running in production');
    process.exit(1);
  }
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
