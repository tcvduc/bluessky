const express = require("express");
const path = require("path");
const homeRouter = new express.Router();

homeRouter.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

module.exports = homeRouter;
