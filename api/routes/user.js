const express = require('express');
const router = express.Router();

const {isAuth, isAdmin, isSelf} = require('../controllers/auth');
const {userById, readCurrentUser, readAllUsers, updateUser, deleteUser, updateSelf} = require('../controllers/user');
const {updateUserValidator} = require('../helpers/user');

router.get('/read/current', isAuth, readCurrentUser);
router.get('/read/all', isAuth, isAdmin, readAllUsers);
router.put('/update/:userId', isAuth, isAdmin, updateUserValidator, updateUser);
router.delete('/delete/:userId', isAuth, isAdmin, deleteUser);
router.put('/update/self/:userId', isAuth, updateSelf);

router.param('userId', userById);

module.exports = router;