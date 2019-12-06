const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crs = require('crypto-random-string');
const sgMail = require('@sendgrid/mail');
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
    User.findOne({email}).populate('property', 'address city state zip rent size beds baths').exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({error: 'User not found.'});
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({error: 'Password is incorrect.'});
        }
        const {_id, email, first_name, last_name, role, property} = user;
        user.password = undefined;
        jwt.sign({user: user}, process.env.JWT_SECRET, {expiresIn: '60m'}, (err, token) => {
            if(err || !token) {
                return res.status(400).json({error: 'Something went wrong signing you in. Please try again.'});
            }
            return res.json({token});
        })
    });
};

exports.isAuth = (req, res, next) => {
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err || !data) {
                return res.status(403).json({error: 'You do not have access to do this.'});
            } else {
                req.user = data.user;
                next();
            }
        });
    } else {
        return res.status(403).json({error: 'You do not have access to do this.'});
    }
};

exports.isAdmin = (req, res, next) => {
    if(req.user.role === 0) {
        return res.status(403).json({error: 'You must be an admin to do that.'});
    }
    next();
};

exports.signout = (req, res) => {
    res.clearCookie('jwt');
    res.json({message: 'User signed out.'});
};

exports.forgotPassword = (req, res) => {
    const tempPassword = crs({length: 20});
    req.body.password = bcrypt.hashSync(tempPassword, 10);
    User.findOneAndUpdate(
        {email: req.body.email},
        {$set: req.body},
        {new: true},
        (err, user) => {
            if(err || !user) {
                return res.status(400).json({error: 'User not found.'});
            }
            const emailData = {
                to: req.body.email,
                from: 'noreply@njahproperties.com',
                subject: `Password Reset Instructions`,
                html: `
                    <p>You have recently requested a new password.</p>
                    <p>To reset your password, sign in with the temporary password</p>
                    <p><strong>${tempPassword}</strong></p>
                    <p>and visit Update Account to change your password.</p>
                `
            };
            sgMail.send(emailData);
            return res.json(user.email);
        }
    );
};