import express, { Request, Response, Router } from 'express';
import Activity from '../models/Activity';
import { authenticateToken } from '../middelware';
import { JwtPayload } from 'jsonwebtoken';

const router: Router = express.Router();

// ----------------- GET ALL ACTIVITIES -----------------
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtPayload;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const activities = await Activity.find({ userId: user.id });
    res.json(activities);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------- CREATE ACTIVITY -----------------
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtPayload;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const activityBody = {
      userId: user.id,
      title: req.body.title,
      disciplineId: req.body.disciplineId,
      startTime: req.body.startDate,
      endTime: req.body.endDate,
    };

    const activity = new Activity(activityBody);
    await activity.save();

    res.status(201).json({
      id: activity._id,
      title: activity.title,
      disciplineId: activity.disciplineId,
      startDate: activity.startTime,
      endDate: activity.endTime,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ----------------- DELETE ACTIVITY -----------------
router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtPayload;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const activityId = req.params.id;
    const deleted = await Activity.findOneAndDelete({
      _id: activityId,
      userId: user.id,
    });

    if (!deleted) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this activity or it does not exist.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Activity deleted successfully',
      activityId: deleted._id,
    });
  } catch (err: any) {
    console.error('Delete activity error:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while deleting the activity.',
      error: err.message,
    });
  }
});

export default router;