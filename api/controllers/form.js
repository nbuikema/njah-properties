const Form = require('../models/form');

exports.createForm = (req, res) => {
    const form = new Form(req.body);
    if(req.file) {
        let file = {};
        file.url = req.file.url;
        file.id = req.file.public_id;
        form.file = file;
    }
    form.save((err, data) => {
        if(err) {
            return res.status(400).json({error: 'Form could not be created.'});
        }
        return res.json({data});
    });
};

exports.readAllForms = (req, res) => {
    Form.find().exec((err, forms) => {
        if(err) {
            return res.status(400).json({error: 'Could not find forms.'});
        }
        return res.json(forms);
    });
};