const messageRouter = require('express').Router()
const User = require("../models/user")
const Message = require('../models/Message')
const {userExtractor} = require("../utils/middleware")



messageRouter.get('/:id', userExtractor, async (req, res) => {
    const { id } = req.params;
    const user = req.user
    const userDoc = await User.findOne({ username: id });
    if(!id) { res.json(null)}
    // if (!user) {
    //     return res.status(401).json({ error: 'operation not permitted' })
    //   }
    if (!userDoc) {
        res.status(404).json('User not found')
    }

    const messageDocs = await Message.find({ user: userDoc._id })

    res.json(messageDocs)
})

messageRouter.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const userDoc = await User.findOne({ username: id });
    if (!userDoc) {
        res.status(404).json('User not found')
    }
    const messageDoc = await Message.create({
        text,
        user: userDoc._id,
    })
    res.json(messageDoc)
})

module.exports = messageRouter