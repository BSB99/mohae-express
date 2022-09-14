const express = require('express');
const authCtrl = require("./user.ctrl");
const router = express.Router();

router.post('/signup',authCtrl.process.signUp);

module.exports = router;