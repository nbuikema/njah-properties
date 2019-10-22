const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res) => {
    User.find({email: req.body.email}).exec((err, foundUser) => {
        if(err) {
            return res.status(400).json({error: 'Could not signup new user.'});
        } else {
            if(foundUser.length === 0) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                const user = new User(req.body);
                user.save((err, user) => {
                    if(err) {
                        return res.status(400).json({error: 'Could not signup new user.'});
                    }
                    user.password = undefined;
                    res.json({user: user});
                });
            } else {
                return res.status(400).json({error: 'A user with that email is already registered.'});
            }
        }
    });
};