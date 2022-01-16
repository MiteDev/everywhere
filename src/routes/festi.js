const express = require('express');
const router = express.Router();
const festiCtrl = require('../controller/festiCtrl');

router.post('/insertFestiData', festiCtrl.insertFesti); 
router.get('/get-festi', festiCtrl.getFesti)

module.exports = router;