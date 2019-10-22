const express = require('express');
const router = express.Router();

const {signup, signin} = require('../controllers/auth');
const {signupValidator} = require('../helpers/auth');

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);

module.exports = router;