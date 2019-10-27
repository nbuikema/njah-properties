const express = require('express');
const router = express.Router();

const {isAuth, isAdmin} = require('../controllers/auth');
const {createProperty, readAllProperties} = require('../controllers/property');

router.post('/create', createProperty);
router.get('/read/all', readAllProperties);

module.exports = router;