const express = require('express');
const router = express.Router();

const {signup, signin, isAuth, isAdmin, signout} = require('../controllers/auth');
const {signupValidator} = require('../helpers/auth');

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/secret', isAuth, isAdmin, (req, res) => {
    res.send('it worked');
});

module.exports = router;