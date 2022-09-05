"use strict";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const board = require("./src/apis/board");

app.use("/board", board);

module.exports = app;
