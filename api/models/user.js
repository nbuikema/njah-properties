const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

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
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        },
        property: {
            type: ObjectId,
            ref: 'Property'
        }
    }, {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);