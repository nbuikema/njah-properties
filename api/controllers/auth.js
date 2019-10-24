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
        const {_id, email, first_name, last_name, role} = user;
        jwt.sign({user: user}, process.env.JWT_SECRET, {expiresIn: '60m'}, (err, token) => {
            if(err || !token) {
                return res.status(400).json({error: 'Could not sign user in.'});
            }
            return res.json({token});
        })
    });
};

exports.verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err || !data) {
                return res.status(403).json({error: 'You do not have access to do this.'});
            } else {
                if(Date.now() >= data.exp * 1000) {
                    return res.status(403).json({error: 'Your login has expired.'});
                } else {
                    data.user.password = undefined;
                    req.user = data.user;
                    next();
                }
            }
        });
    } else {
        return res.status(403).json({error: 'You do not have access to do this.'});
    }
};

exports.isAdmin = (req, res, next) => {
    if(req.user.role === 0) {
        return res.status(403).json({error: 'You do not have access to do this.'});
    }
    next();
};

exports.signout = (req, res) => {
    res.clearCookie('jwt');
    res.json({message: 'User signed out.'});
};