require('./config/env');

const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/env');

let server;

const start = async () => {
  await connectDB();

  server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  shutdown('unhandledRejection');
});

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
