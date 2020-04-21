const express = require("express");
const path = require("path");
const assetsRouter = new express.Router();

assetsRouter.get("/assets/svg/sun", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../src/assets/svg", "sun.svg"));
});

assetsRouter.get("/assets/svg/rain", (req, res) => {
  res.sendFile(path.join(__dirname, "./../../src/assets/svg", "rain.svg"));
});

module.exports = assetsRouter;
