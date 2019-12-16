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

const {contactById, contact, readAllMessages, readMessagesWithQuery, readMyMessages, deleteContact} = require('../controllers/contact');
const {isAuth, isAdmin} = require('../controllers/auth');
const {contactValidator} = require('../helpers/contact');

router.post('/contact', parser.single('application'), contactValidator, contact);
router.get('/read/all', isAuth, isAdmin, readAllMessages);
router.get('/read/query', isAuth, isAdmin, readMessagesWithQuery);
router.get('/read/current', isAuth, readMyMessages);
router.delete('/delete/:contactId', isAuth, isAdmin, deleteContact);

router.param('contactId', contactById);

module.exports = router;