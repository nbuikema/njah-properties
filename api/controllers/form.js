const cloudinary = require("cloudinary");
const Form = require('../models/form');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

exports.formById = (req, res, next, id) => {
    Form.findById(id).exec((err, form) => {
        if(err || !form) {
            return res.status(400).json({error: 'Form was not found.'});
        }
        req.selectedForm = form;
        next();
    });
};

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

exports.deleteForm = (req, res) => {
    Form.findOneAndDelete(
        {_id: req.selectedForm._id},
        (err, form) => {
            if(err) {
                return res.status(400).json({error: 'Form could not be deleted.'});
            }
            cloudinary.v2.uploader.destroy(`${form.file.id}`, function(error, result) {
                if(error) {
                    return res.status(400).json({error: 'Form could not be deleted.'});
                } else {
                    return res.json(`Form: "${form._id}" has been deleted.`);
                }
            });
        }
    );
};