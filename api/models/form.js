const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        file: {
            type: Object,
            required: true
        }
    }, {timestamps: true}
);

module.exports = mongoose.model('Form', formSchema);