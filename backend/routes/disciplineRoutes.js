const express = require('express');
const Discipline = require('../models/Discipline');

const { authenticateToken } = require('../middelware');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const disciplines = await Discipline.find({
        userId: req.user.id
    });
    res.json(disciplines);
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const disciplineBody = {
            userId: req.user.id,
            name: req.body.name
        }
        const discipline = new Discipline(disciplineBody);
        await discipline.save();
        res.status(201).json(discipline);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
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
    catch (error) {
        console.error('Delete discipline error:', error);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while deleting the discipline.',
            error: error.message
        });
    }
})

module.exports = router;