const express = require('express');
const router = express.Router();

const {signup} = require('../controllers/auth');
const {signupValidator} = require('../helpers/auth');

router.post('/auth/signup', signupValidator, signup);

module.exports = router;