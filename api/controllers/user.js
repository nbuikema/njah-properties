const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({error: 'User was not found.'});
        }
        req.user = user;
        next();
    });
};

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

exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {$set: req.body},
        {new: true},
        (err, user) => {
            if(err) {
                return res.status(400).json({error: 'User could not be updated.'});
            }
            user.password = undefined;
            return res.json(user);
        }
    );
};