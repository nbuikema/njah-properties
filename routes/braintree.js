const express = require('express');
const router = express.Router();

const {generateToken, processPayment} = require('../controllers/braintree');
const {userById} = require('../controllers/user');
const {isAuth} = require('../controllers/auth');

router.get('/token', isAuth, generateToken);
router.post('/payment/:userId', isAuth, processPayment);

router.param('userId', userById);

module.exports = router;