const posts = require('../models/posts')

const index = async (req, res) => {
    const userId = req.userId
    try {
        const publi = await posts.find({ author: userId })

        return res.json(publi)
    } catch (err) {
        return res.status(400).send({ error: 'Error' })
    }
}


module.exports = {
    index
}
