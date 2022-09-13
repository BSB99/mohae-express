const express = require("express");
const categoryCtrl = require("./category.ctrl");
const router = express.Router();

router.get('/:no', categoryCtrl.process.readCategory);

module.exports = router;