const express = require('express');
const router = express.Router();

const {signup, signin, verifyToken, isAdmin} = require('../controllers/auth');
const {signupValidator} = require('../helpers/auth');

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);
router.get('/secret', verifyToken, isAdmin, (req, res) => {
    return res.json({data: 'yes'});
});

module.exports = router;