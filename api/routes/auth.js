const express = require('express');
const router = express.Router();

const {signup} = require('../controllers/auth');

router.post('/auth/signup', signup);

module.exports = router;