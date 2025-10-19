"use strict";
const mongoose = require('mongoose');
const uri = "mongodb+srv://cosdinklo_db_user:Goofy123!@sportcluster0.ctvndx1.mongodb.net/SportSchedulerWarehouse?retryWrites=true&w=majority&appName=SportCluster0";
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected');
    }
    catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // stop server if DB fails
    }
};
module.exports = connectDB;
