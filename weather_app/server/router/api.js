const express = require("express");
const apiRouter = new express.Router();
const geocoding = require("./../../src/utils/geocoding");
const forecast = require("./../../src/utils/forecast");

let log = console.log;
apiRouter.get("/api/weather", async (req, res) => {
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
    //res.send(geo_data);

    const { latitude, longitude, place_name } = geo_data[0];
    forecast(latitude, longitude, (fore_err, fore_res) => {
      if (fore_err) {
        return res.send(fore_err);
      }
      const fore_data = fore_res;
      // status icon
      const chechWeatherStatus = () => {
        if (fore_data.currently.summary.includes("mưa")) {
          return "Mưa";
        }
        return "Nắng";
      };
      const result = {
        place_name: place_name,
        summary: fore_data.currently.summary,
        temperature: fore_data.currently.temperature,
        iconStatus: chechWeatherStatus(),
      };

      res.send(result);
    });
  });
});

module.exports = apiRouter;
