const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    img: String,
    url: String,

    description: {
        type: String,
        maxlength: 255,
        minlength: 1
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    author: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },

        {
            toJSON: {
                virtuals: true
            }
        }
    ]
})

postSchema.pre('save', () => {
    if (!this.url) {
        this.url = `http://localhost:3001/uploads/${this.img}`
    }
})

module.exports = model('posts', postSchema)
