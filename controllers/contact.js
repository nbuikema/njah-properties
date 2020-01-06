const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const Contact = require('../models/contact');

sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.contactById = (req, res, next, id) => {
    Contact.findById(id).exec((err, contact) => {
        if(err || !contact) {
            return res.status(400).json({error: 'Contact was not found.'});
        }
        req.selectedContact = contact;
        next();
    });
};

exports.contact = (req, res) => {
    const contact = new Contact(req.body);
    if(req.file) {
        let app = {};
        app.url = req.file.secure_url;
        app.id = req.file.public_id;
        contact.application = app;
    }
    contact.save((err, data) => {
        if(err) {
            return res.status(400).json({error: 'Contact form could not be submitted.'});
        }
        const emailData = {
            to: ['NJAHProperties@gmail.com', 'Snallo@verizon.net'],
            from: 'noreply@njahproperties.com',
            subject: `New Message Received`,
            html: `
                <p>A new message was received on ${moment(contact.createdAt).format('MMMM Do YYYY, h:mm:ss a')}.</p>
                <p>Name: <strong>${contact.last_name}, ${contact.first_name}</strong></p>
                <p>Email: <strong>${contact.email}</strong></p>
                <p>Phone: <strong>${contact.phone}</strong></p>
                <p>Type: <strong>${contact.type}</strong></p>
                <p>Reason: <strong>${contact.reason}</strong></p>
                <p>Severity: <strong>${contact.severity && contact.severity.length > 0 ? contact.severity : 'N/A'}</strong></p>
                <p>Message: <strong>${contact.message}</strong></p>
                <p>Application: ${contact.application ? `<a href=${contact.application.url}>` : 'N/A'}">View Application</a></p>
            `
        };
        sgMail.send(emailData);
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

exports.readMyMessages = (req, res) => {
    const sortBy = 'createdAt';
    const order = 'desc';
    Contact.find({user: req.user._id}).populate('property', 'address city state zip').sort([[sortBy, order]]).exec((err, contact) => {
        if(err) {
            return res.status(400).json({error: 'Could not find messages.'});
        }
        return res.json(contact);
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
            case 'user':
                query['user'] = req.query[param];
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

exports.deleteContact = (req, res) => {
    if(req.selectedContact.application) {
        cloudinary.v2.uploader.destroy(`${req.selectedContact.application.id}`, function(error, result) {
            if(error) {
                return res.status(400).json({error: 'Contact could not be deleted.'});
            }
        });
    }
    Contact.findOneAndDelete(
        {_id: req.selectedContact._id},
        (err, contact) => {
            if(err) {
                return res.status(400).json({error: 'Contact could not be deleted.'});
            }
            return res.json(`Contact: "${contact._id}" has been deleted.`);
        }
    );
};