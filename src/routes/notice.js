const express = require('express');
const router = express.Router();
const noticeCtrl = require('../controller/noticeCtrl');

router.get('/notice-list', noticeCtrl.showNoticeList);
router.get('/notice/:n_seq', noticeCtrl.showOneNotice);
router.post('/create-notice', noticeCtrl.createNotice);
router.post('/update-notice', noticeCtrl.updateNotice); 
router.post('/delete-notice', noticeCtrl.deleteNotice);

module.exports = router