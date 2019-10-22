const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true
        },
        last_name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        },
    }, {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);