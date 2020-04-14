const express = require("express");
const socialRouter = new express.Router();
const path = require("path");
socialRouter.get("/social", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

module.exports = socialRouter;
