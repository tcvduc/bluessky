const express = require("express");
const path = require("path");
const app = express();
const geocoding = require("./utils/geocoding");
const forecast = require("./utils/forecast");
const bodyParser = require("body-parser");
let log = console.log;

app.use(express.static(path.join(__dirname, "../build")));

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT || 5000;

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// autocompleted
app.get("/suggests/geo_data", (req, res) => {
  const { search } = req.query;
  geocoding(search, (geo_err, geo_res) => {
    if (geo_err) {
      res.send(geo_err);
    }

    const geo_data = geo_res.features.map((feature) => {
      return {
        place_name: feature.place_name,
        latitude: feature.center[1],
        longitude: feature.center[0],
      };
    });
    res.send(geo_data);
  });
});

app.get("/api/weather", (req, res) => {
  if (!req.query.search) {
    return res.send("Lỗi!");
  }

  const { search } = req.query;
  geocoding(search, (geo_err, geo_res) => {
    if (geo_err) {
      return res.send(geo_err);
    }
    const geo_data = geo_res.features.map((feature) => {
      return {
        place_name: feature.place_name,
        latitude: feature.center[1],
        longitude: feature.center[0],
      };
    });
    res.send(geo_data);

    //const { latitude, longitude, place_name } = geo_data[0];
    // forecast(latitude, longitude, (fore_err, fore_res) => {
    //   if (fore_err) {
    //     return res.send(fore_err);
    //   }
    //   const fore_data = fore_res;
    //   const result = {
    //     place_name: place_name,
    //     summary: fore_data.currently.summary,
    //     temperature: fore_data.currently.temperature,
    //   };
    //   res.send(result);
    // });
  });
});

app.listen(port, () => {
  log(`Server started on port ${port}`);
});
