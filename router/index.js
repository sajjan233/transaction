const express = require('express')
const router = express.Router();
const acount = require('./acount')
const transaction = require('./transaction');

router.use('/api',acount)
router.use('/api',transaction)

module.exports = router;