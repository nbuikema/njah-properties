const express = require('express');
const router = express.Router();

const {isAuth} = require('../controllers/auth');
const {readCurrentUser} = require('../controllers/user');

router.get('/read/current', isAuth, readCurrentUser);

module.exports = router;