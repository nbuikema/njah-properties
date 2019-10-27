const express = require('express');
const router = express.Router();

const {isAuth, isAdmin} = require('../controllers/auth');
const {createProperty} = require('../controllers/property');

router.post('/create', createProperty);

module.exports = router;