const express = require('express');
const router = express.Router();

const {isAuth, isAdmin} = require('../controllers/auth');
const {userById, readCurrentUser, readAllUsers, updateUser} = require('../controllers/user');

router.get('/read/current', isAuth, readCurrentUser);
router.get('/read/all', isAuth, isAdmin, readAllUsers);
router.put('/update/:userId', isAuth, isAdmin, updateUser);

router.param('userId', userById);

module.exports = router;