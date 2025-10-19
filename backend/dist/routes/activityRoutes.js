"use strict";
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
    try {
        const activityBody = {
            userId: req.user.id,
            title: req.body.title,
            disciplineId: req.body.disciplineId,
            startTime: req.body.startDate,
            endTime: req.body.endDate
        };
        const activity = new Activity(activityBody);
        await activity.save();
        res.status(201).json({
            id: activity._id,
            title: activity.title,
            disciplineId: activity.disciplineId,
            startDate: activity.startTime,
            endDate: activity.endTime
        });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const activityId = req.params.id;
        const userId = req.user.id;
        const deleted = await Activity.findOneAndDelete({
            _id: activityId,
            userId: userId
        });
        if (!deleted) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this activity or it does not exist.'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Activity deleted successfully',
            activityId: deleted._id
        });
    }
    catch (err) {
        console.error('Delete activity error:', error);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while deleting the activity.',
            error: error.message
        });
    }
});
module.exports = router;
