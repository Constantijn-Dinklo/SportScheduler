const express = require('express');
const Discipline = require('../models/Discipline');

const router = express.Router();

router.get('/', async (req, res) => {
    const disciplines = await Discipline.find();
    res.json(disciplines);
});

router.post('/', async (req, res) => {
    try {
        const discipline = new Discipline(req.body);
        await discipline.save();
        res.status(201).json(discipline);
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
});

router.delete('/:id', async (req, res) => {
    const disciplineId = req.params.id;
    const response = await Discipline.findByIdAndDelete(disciplineId);
    res.json({ id: response._id});
})

module.exports = router;