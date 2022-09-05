const express = require("express");
const boardCtrl = require("./board.ctrl");

const router = express.Router();

router.get("/", boardCtrl.process.all);
router.get("/:no", boardCtrl.process.readByOneBoard);
router.post("/create", boardCtrl.process.createBoard);

module.exports = router;
