const User = require('../models/user');

exports.readCurrentUser = (req, res) => {
    return res.json({user: req.user});
};