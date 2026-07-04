import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { logger, logtail } from './config/logger.js';

import connectMongoDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import userRoutes from './routes/userRoutes.js';

import errorHandler from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/profile', userRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Wallify API is running..',
  });
});

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
      logger.info('Wallify backend started.');
    });
  } catch (error) {
    console.error(`Server connection failed: ${error.message}`);
    logger.error(`Server connection failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();

const shutdown = async () => {
  logger.info('Shutting down server...');
  await logtail.flush();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
