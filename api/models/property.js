const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
    {
        address: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: String,
            trim: true,
            required: true
        },
        zip: {
            type: String,
            trim: true,
            required: true
        },
        images: {
            type: Array
        },
        lat: {
            type: String,
            trim: true,
            required: true
        },
        long: {
            type: String,
            trim: true,
            required: true
        }
    }, {timestamps: true}
);

module.exports = mongoose.model('Property', propertySchema);