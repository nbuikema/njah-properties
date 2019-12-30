const express = require('express');
const router = express.Router();

const {signup, signin, isAuth, isAdmin, signout, forgotPassword} = require('../controllers/auth');
const {signupValidator} = require('../helpers/auth');

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.put('/password/forgot', forgotPassword);

module.exports = router;