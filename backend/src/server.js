import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Wallify API is running..',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
