const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({error: 'Could not sign user in.'});
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({error: 'Email and Password do not match.'});
        }
        jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '60m'}, (err, token) => {
            if(err || !token) {
                return res.status(400).json({error: 'Could not sign user in.'});
            }
            const {_id, email, first_name, last_name, role} = user;
            return res.json({token, user: {_id, email, first_name, last_name, role}});
        })
    });
};