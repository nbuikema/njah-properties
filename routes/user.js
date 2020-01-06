const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "njah_properties"
});
const parser = multer({ storage: storage });

const {isAuth, isAdmin} = require('../controllers/auth');
const {userById, readCurrentUser, readAllUsers, updateUser, deleteUser, updateSelf, uploadFile} = require('../controllers/user');
const {updateUserValidator, updateSelfValidator, uploadFileValidator} = require('../helpers/user');

router.get('/read/current', isAuth, readCurrentUser);
router.get('/read/all', isAuth, isAdmin, readAllUsers);
router.put('/update/:userId', isAuth, isAdmin, updateUserValidator, updateUser);
router.delete('/delete/:userId', isAuth, isAdmin, deleteUser);
router.put('/update/self/:userId', isAuth, updateSelfValidator, updateSelf);
router.put('/upload/file/:userId', isAuth, isAdmin, parser.single('file'), uploadFileValidator, uploadFile);

router.param('userId', userById);

module.exports = router;