const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/user')

const bcryptSalt = bcrypt.genSaltSync(10);
const jswtSecret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { username,email,  password } = req.body
    try {
        const userDoc  =await User.create({
            username,
            email, 
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (err) {
        res.status(422).json(err);
    }
})

router.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jswtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {username, email, id} = await User.findById(userData.id);
            res.json({username, email, id})
        })
    } else {
        res.json(null)
    }

})

module.exports = router