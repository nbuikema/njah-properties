const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({error: 'User was not found.'});
        }
        req.selectedUser = user;
        next();
    });
};

exports.readCurrentUser = (req, res) => {
    return res.json({user: req.user});
};

exports.readAllUsers = (req, res) => {
    User.find({role: 0}).exec((err, users) => {
        if(err) {
            return res.status(400).json({error: 'Could not find users.'});
        }
        return res.json(users);
    });
};

exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.selectedUser._id},
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

exports.deleteUser = (req, res) => {
    User.findOneAndDelete(
        {_id: req.selectedUser._id},
        (err, user) => {
            if(err) {
                return res.status(400).json({error: 'User could not be deleted.'});
            }
            user.password = undefined;
            return res.json(`User: "${user._id}" has been deleted.`);
        }
    );
};

exports.updateSelf = (req, res) => {
    if(req.body.password.length > 0) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    } else {
        delete req.body.password;
    }
    if(req.body._id === req.user._id) {
        User.findOneAndUpdate(
            {_id: req.user._id},
            {$set: req.body},
            {new: true},
            (err, user) => {
                if(err) {
                    return res.status(400).json({error: 'Your info could not be updated.'});
                }
                user.password = undefined;
                return res.json(user);
            }
        );
    } else {
        return res.status(403).json({error: 'You do not have permission to do that.'});
    }
};