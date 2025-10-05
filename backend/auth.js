const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('./models/User');
const { authenticateToken } = require('./middelware');

const router = express.Router();

const SECRET = process.env.JWT_SECRET

router.post('/signup', async (req, res) => {

    //TODO: Check if user with email already exists
    const user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).json({ message: 'User already exists'});

    console.log(req.body);
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();

        const token = jwt.sign({id: user.id, username: user.email}, SECRET, { expiresIn: '24h'});

        res.status(201).json({token: token, name: user.name});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

})

router.post('/login', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ email: username});

    if(!user) return res.status(401).json({message: 'Invalid credentials'});

    //TODO: check if valid password
    // const valid = await bcrypt.compare(password, user.password)
    // if(!valid) return res.status(401).json({message: 'Invalid credentials'});

    const token = jwt.sign({id: user.id, username: user.email}, SECRET, {expiresIn: '24h'});

    const min = 60;
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 1000 * 60 * min 
    });

    res.json({ name: user.name });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out'});
});

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

module.exports = router;