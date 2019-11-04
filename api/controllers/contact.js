const Contact = require('../models/contact');

exports.contact = (req, res) => {
    const contact = new Contact(req.body);
    if(req.file) {
        let app = {};
        app.url = req.file.url;
        app.id = req.file.public_id;
        contact.application = app;
    }
    contact.save((err, data) => {
        if(err) {
            return res.status(400).json({error: 'Contact could not be created.'});
        }
        return res.json({data});
    });
};

exports.readAllMessages = (req, res) => {
    const sortBy = 'createdAt';
    const order = 'desc';
    Contact.find().populate('property', 'address city state zip').sort([[sortBy, order]]).exec((err, contacts) => {
        if(err) {
            return res.status(400).json({error: 'Could not find contacts.'});
        }
        return res.json(contacts);
    });
};

exports.readMessagesWithQuery = (req, res) => {
    let query = {};
    let sortBy = 'createdAt';
    let order = 'desc';
    for(let param in req.query) {
        switch(param) {
            case 'reason':
                query['reason'] = req.query[param];
                break;
            case 'type':
                query['type'] = req.query[param];
                break;
            case 'sortBy':
                sortBy = req.query[param];
                break;
            case 'order':
                order = req.query[param];
                break;
            default:
                return;
        }
    }

    Contact.find(query).populate('property', 'address city state zip').sort([[sortBy, order]]).exec((err, contacts) => {
        if(err) {
            return res.status(400).json({error: 'Could not find contacts.'});
        }
        return res.json(contacts);
    });
};