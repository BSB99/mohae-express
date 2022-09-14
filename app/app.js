"use strict";

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const board = require("./src/apis/board");
const category = require("./src/apis/category");
const auth = require("./src/apis/user");

app.use("/board", board);
app.use("/category", category);
app.use("/auth", auth);

module.exports = app;
