import express, { Request, Response, Router } from 'express'

import { authenticateToken } from "../middelware";
import Discipline from '../models/Discipline';

const router: Router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
    const disciplines = await Discipline.find({
        userId: req.user.id
    });
    res.json(disciplines);
});

router.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const disciplineBody = {
            userId: req.user.id,
            name: req.body.name
        }
        const discipline = new Discipline(disciplineBody);
        await discipline.save();
        res.status(201).json(discipline);
    } catch(err: any) {
        res.status(400).json({ error: err.message })
    }
});

router.patch('/:id', authenticateToken, async (req: Request, res: Response) => {
    console.log("Update discipline");
    const disciplineId = req.params.id;
    const userId = req.user.id;
    console.log(req.body);
    const updated = await Discipline.findOneAndUpdate(
        { _id: disciplineId, userId: userId},
        { $set: req.body }
    );
    console.log(updated);
    res.json(updated);
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    try{
        const disciplineId = req.params.id;
        const userId = req.user.id;
        const deleted = await Discipline.findOneAndDelete({
            _id: disciplineId,
            userId: userId
        });

        if (!deleted) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this discipline or it does not exist.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Discipline deleted successfully.',
            disciplineId: deleted._id
        });
    }
    catch (err: any) {
        console.error('Delete discipline error:', err);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while deleting the discipline.',
            error: err.message
        });
    }
});

export default router;