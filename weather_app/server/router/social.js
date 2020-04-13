const express = require("express");
const socialRouter = new express.Router();

socialRouter.get("/social", (req, res) => {
  res.send();
});

module.exports = socialRouter;
