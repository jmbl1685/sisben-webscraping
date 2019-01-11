"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const { SisbenWebScrapingHandle } = require("./controllers/sisben.controller");

require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/sisben", SisbenWebScrapingHandle);

app.listen(process.env.PORT, () => {
  console.log("Server running");
});

module.exports = app;
