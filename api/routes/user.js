const express = require('express');
const router = express.Router();

const {isAuth, isAdmin} = require('../controllers/auth');
const {userById, readCurrentUser, readAllUsers, updateUser, deleteUser} = require('../controllers/user');

router.get('/read/current', isAuth, readCurrentUser);
router.get('/read/all', isAuth, isAdmin, readAllUsers);
router.put('/update/:userId', isAuth, isAdmin, updateUser);
router.delete('/delete/:userId', isAuth, isAdmin, deleteUser);

router.param('userId', userById);

module.exports = router;