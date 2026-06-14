import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectMongoDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

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
    });
  } catch (error) {
    console.error(`Server connection failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
