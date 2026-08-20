const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const { clientUrl, isProd } = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// Sanitize body only (Express 5 makes req.query read-only)
app.use((req, _res, next) => {
  if (req.body) {
    req.body = mongoSanitize.sanitize(req.body, { replaceWith: '_' });
  }
  next();
});
app.use(hpp());
app.use(morgan(isProd ? 'combined' : 'dev'));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many auth attempts. Try again later.' },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Try again later.' },
});

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    message: 'MERN API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', apiLimiter);
app.use('/api/items', itemRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
