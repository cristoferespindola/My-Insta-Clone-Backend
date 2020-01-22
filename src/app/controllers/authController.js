const users = require('../models/users')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.AUTH

const authenticate = async (req, res) => {
    const { username, password } = req.body

    const user = await users.findOne({ username }).select('+password')

    if (!user) res.status(400).send({ error: 'User not found :(' })

    user.password = undefined

    const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 86400
    })

    res.send({ user, token })
}


module.exports = {
    authenticate
}
