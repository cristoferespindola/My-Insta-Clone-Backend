const users = require('../models/users')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const index = async (req, res) => {
    const userId = req.userId

    const loggedUser = await users.findById(userId)

    const user = await users.find({
        $and: [
            { _id: { $ne: userId } },
            { _id: { $nin: loggedUser.following } }
        ]
    })

    return res.json(user)
}

const show = async (req, res) => {
    const user = await users.findById(req.userId)        

    user.password = undefined

    return res.json(user)
}

const save = async (req, res) => {
    try {
        const { username, name, email, password } = req.body
        
        const hash = crypto.createHash('md5').update(email).digest('hex');
        const img = `https://www.gravatar.com/avatar/${hash.toString()}.jpg`

        if (
            (await users.findOne({ username })) ||
            (await users.findOne({ email }))
        ) {
            return res
                .status(400)
                .send({ error: 'Username or E-mail already exists' })
        }

        if (!name || !password)
            res.status(400).send({
                error: 'Fill in the fields'
            })

        const user = await users.create({
            username,
            name,
            email,
            password,
            avatar: img
        })

        const token = jwt.sign({ id: user._id }, process.env.AUTH, {
            expiresIn: 86400
        })

        user.password = undefined

        return res.status(200).json({ user, token })
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Registration fail' })
    }
}

const update = async (req, res) => {
    try {
        const user = await users.findByIdAndUpdate(req.userId, req.body, {
            runValidators: true
        })

        user.password = undefined

        return res.json(user)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    index,
    save,
    update,
    show
}
