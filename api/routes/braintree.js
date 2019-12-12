const express = require('express');
const router = express.Router();

const {generateToken, processPayment} = require('../controllers/braintree');
const {isAuth} = require('../controllers/auth');

router.get('/token', isAuth, generateToken);
router.post('/payment', isAuth, processPayment)

module.exports = router;