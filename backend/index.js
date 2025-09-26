const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const disciplineRoutes = require('./routes/disciplineRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/disciplines', disciplineRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));