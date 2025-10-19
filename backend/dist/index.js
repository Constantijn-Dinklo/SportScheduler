"use strict";
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./auth');
const activityRoutes = require('./routes/activityRoutes');
const disciplineRoutes = require('./routes/disciplineRoutes');
const app = express();
connectDB();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/activities', activityRoutes);
app.use('/disciplines', disciplineRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
