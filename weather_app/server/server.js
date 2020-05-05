const express = require("express");
require("./database/mongoose");
const path = require("path");
const app = express();
const userRoute = require("./router/user");
const suggestAPIRoute = require("./router/suggestAPI");
const homeRoute = require("./router/home");
const socialRoute = require("./router/social");
const weatherAPIroute = require("./router/weatherAPI");
const assetsRoute = require("./router/assets");
const weatherStatusRoute = require("./router/weatherStatus");
const forecastAPIRouter = require("./router/forecastAPI");
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
app.use(suggestAPIRoute);
app.use(homeRoute);
app.use(socialRoute);
app.use(weatherAPIroute);
app.use(assetsRoute);
app.use(weatherStatusRoute);
app.use(forecastAPIRouter);

const port = process.env.PORT;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

app.listen(port, () => {
  log(`Server started on port ${port}`);
});
