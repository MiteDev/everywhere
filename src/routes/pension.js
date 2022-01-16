const express = require('express');
const router = express.Router();

const pentionCtrl = require('../controller/pensionCtrl');

router.post('/insert-pension', pentionCtrl.insertPension);
router.post('/show-pension', pentionCtrl.showPension);

module.exports = router;