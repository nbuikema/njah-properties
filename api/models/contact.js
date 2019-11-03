const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const contactSchema = new mongoose.Schema(
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
            required: true
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        application: {
            type: Object
        },
        property: {
            type: ObjectId,
            ref: 'Property'
        },
        message: {
            type: String
        }
    }, {timestamps: true}
);

module.exports = mongoose.model('Contact', contactSchema);