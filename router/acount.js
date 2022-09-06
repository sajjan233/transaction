const express = require('express');
const router = express.Router();
const {userAccount} = require('../controller/acount');

router.post('/acount',userAccount);
module.exports = router;