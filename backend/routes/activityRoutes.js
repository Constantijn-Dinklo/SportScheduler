const express = require('express');
const Activity = require('../models/Activity');

const { authenticateToken } = require('../middelware');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const activities = await Activity.find({
        userId: req.user.id
    });
    res.json(activities);
});

router.post('/', authenticateToken, async (req, res) => {
    console.log(req.body);
    try {
        const activityBody = {
            userId: req.user.id,
            title: req.body.title,
            disciplineId: req.body.disciplineId,
            startTime: req.body.startDate,
            endTime: req.body.endDate
        }
        const activity = new Activity(activityBody);
        await activity.save();
        res.status(201).json({
            id: activity._id,
            title: activity.title,
            disciplineId: activity.disciplineId,
            startDate: activity.startTime,
            endDate: activity.endTime
        });
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

module.exports = router;