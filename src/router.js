const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

const secret = 'secret'

router.post('/login', (req, res) => {
    const {username, password} = req.body
    if (username !== mockUser.username || password !== mockUser.password) res.status(401).send(`Incorrect credentials`)
    const payload = {username, password, iat: 1561358034}
    const token = jwt.sign(payload, secret)
    res.json(token)
});

router.get('/profile', (req, res) => {
    const token = (req.headers.authorization)
    try {
        jwt.verify(token, secret)
        res.json(mockUser.profile)
    } catch(error) {
        res.send(error)
    }
});

module.exports = router;
