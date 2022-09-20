const express = require('express');
const authCtrl = require("./user.ctrl");
const router = express.Router();

router.post('/signin', authCtrl.process.signIn);
router.post('/signup', authCtrl.process.signUp);
router.delete('/secession', authCtrl.process.secession);

module.exports = router;