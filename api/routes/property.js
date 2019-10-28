const express = require('express');
const router = express.Router();

const {isAuth, isAdmin} = require('../controllers/auth');
const {createProperty, readAllProperties, readPropertiesWithQuery} = require('../controllers/property');

router.post('/create', createProperty);
router.get('/read/all', readAllProperties);
router.post('/read/query', readPropertiesWithQuery);

module.exports = router;