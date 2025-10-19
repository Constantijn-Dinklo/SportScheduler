import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/db';
import authRoutes from './auth';
import activityRoutes from './routes/activityRoutes';
import disciplineRoutes from './routes/disciplineRoutes';

const app = express();

// ✅ Connect to the database
connectDB();

// ✅ Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// ✅ Routes
app.use('/auth', authRoutes);
app.use('/activities', activityRoutes);
app.use('/disciplines', disciplineRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from backend!' });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}`);
});