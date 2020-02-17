const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
    {
        address: {
            type: String,
            trim: true,
            required: true
        },
        address2: {
            type: String,
            trim: true,
            required: false
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
        },
        rent: {
            type: Number,
            required: true
        },
        size: {
            type: Number,
            required: true
        },
        beds: {
            type: Number,
            required: true
        },
        baths: {
            type: Number,
            required: true
        },
        info: {
            type: String,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        }
    }, {timestamps: true}
);

module.exports = mongoose.model('Property', propertySchema);