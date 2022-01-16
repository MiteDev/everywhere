const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/userCtrl');

router.post('/register', userCtrl.createUser);
router.get('/login', userCtrl.getLogin);
router.post('/login', userCtrl.findUser);
router.get('/logout', userCtrl.logout);
router.get('/delete-user', userCtrl.deleteUser);
router.post('/update-user', userCtrl.updateUser);
router.post('/check-pw', userCtrl.checkPw);

module.exports = router;