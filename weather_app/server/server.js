const express = require("express");
require("./database/mongoose");
const path = require("path");
const app = express();
const userRoute = require("./router/user");
const suggestRoute = require("./router/suggest");
const homeRoute = require("./router/home");
const socialRoute = require("./router/social");
const apiRoute = require("./router/api");
const assetsRoute = require("./router/assets");
const weatherStatusRoute = require("./router/weatherStatus");
let log = console.log;

app.use(express.static(path.join(__dirname, "../build")));

// middle ware
app.use(express.json());

// cors bugs - allowes get source from another host
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// Routing
app.use(userRoute);
app.use(suggestRoute);
app.use(homeRoute);
app.use(socialRoute);
app.use(apiRoute);
app.use(assetsRoute);
app.use(weatherStatusRoute);


const port = process.env.PORT;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

app.listen(port, () => {
  log(`Server started on port ${port}`);
});
