const express = require("express");
require("./database/mongoose");
const path = require("path");
const app = express();
const userRoute = require("./router/user");
const suggestRoute = require("./router/suggest");
const homeRoute = require("./router/home");
const socialRoute = require("./router/social");
const apiRoute = require("./router/api");
let log = console.log;

app.use(express.static(path.join(__dirname, "../build")));

// middle ware
app.use(express.json());

// cors bugs - allowes get source from another host
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Routing
app.use(userRoute);
app.use(suggestRoute);
app.use(homeRoute);
app.use(socialRoute);
app.use(apiRoute);
const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

app.listen(port, () => {
  log(`Server started on port ${port}`);
});
