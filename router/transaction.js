const express = require('express');
const router = express.Router();
const {userTransaction,list}  = require('../controller/transaction')

router.post('/transfer',userTransaction);
router.get('/transaction/list',list);

module.exports = router;