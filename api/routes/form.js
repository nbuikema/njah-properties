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
    folder: "njah_properties"
});
const parser = multer({ storage: storage });

const {createForm, readAllForms} = require('../controllers/form');
const {isAuth, isAdmin} = require('../controllers/auth');

router.post('/create', isAuth, isAdmin, parser.single('file'), createForm);
router.get('/read/all', readAllForms);

module.exports = router;