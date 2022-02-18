const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43,
    },
};

const secret = process.env.SECRET;

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username !== mockUser.username || password !== mockUser.password) {
        return res.status(401).json(`Incorrect credentials`);
    }

    const token = jwt.sign(username, secret);

    res.json(token);
});

router.get('/profile', (req, res) => {
    const token = req.headers.authorization;

    try {
        jwt.verify(token, secret);
        res.json(mockUser.profile);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
