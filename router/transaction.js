const express = require('express');
const router = express.Router();
const {userTransaction}  = require('../controller/transaction')

router.post('/transfer',userTransaction);

module.exports = router;