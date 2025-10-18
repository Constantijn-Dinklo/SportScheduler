const express = require('express');
const Activity = require('../models/Activity');

const { authenticateToken } = require('../middelware');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
    console.log(req.body);

    res.json({message: 'hello'})
});

module.exports = router;