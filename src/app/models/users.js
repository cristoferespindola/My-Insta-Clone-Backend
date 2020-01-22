const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100,
            minlength: 1
        },
        name: {
            type: String,
            required: true,
            minlength: 2
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('users', userSchema);
