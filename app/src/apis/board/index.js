const express = require("express");
const boardCtrl = require("./board.ctrl");

const router = express.Router();

router.get("/", boardCtrl.process.all);
router.get("/:no", boardCtrl.process.readByOneBoard);

module.exports = router;
