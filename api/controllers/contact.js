const Contact = require('../models/contact');

exports.contact = (req, res) => {
    let app = {};
    app.url = req.file.url;
    app.id = req.file.public_id;
    const contact = new Contact(req.body);
    contact.application = app;
    contact.save((err, data) => {
        if(err) {
            return res.status(400).json({error: 'Contact could not be created.'});
        }
        return res.json({data});
    });
};