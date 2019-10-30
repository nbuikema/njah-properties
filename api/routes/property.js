const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "njah_properties",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

const {isAuth, isAdmin} = require('../controllers/auth');
const {propertyById, createProperty, readAllProperties, readPropertiesWithQuery, readProperty} = require('../controllers/property');

router.post('/create', parser.array('photos', 12), createProperty);
router.get('/read/all', readAllProperties);
router.get('/read/query', readPropertiesWithQuery);
router.get('/read/:propertyId', readProperty);

router.param('propertyId', propertyById);

module.exports = router;