const User = require('../models/user');

exports.readCurrentUser = (req, res) => {
    return res.json({user: req.user});
};

exports.readAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err) {
            return res.status(400).json({error: 'Could not find users.'});
        }
        return res.json(users);
    });
};