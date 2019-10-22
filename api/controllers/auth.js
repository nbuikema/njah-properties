const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({error: 'Could not signup new user.'});
        }
        user.password = undefined;
        res.json({user: user});
    });
};