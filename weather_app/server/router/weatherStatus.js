const express = require("express");
// const path = require("path");
const weatherStatusRouter = new express.Router();
const geocoding = require("./../../src/utils/geocoding");
const forecast = require("./../../src/utils/forecast");

// let log = console.log;

// Tạm thời lấy vị trí hồ chí minh để lấy render icon mưa hay nắng

weatherStatusRouter.get("/weather/status", (req, res) => {
  const location = "Hồ Chí Minh, Việt Nam";

  // const devURL = "http://localhost:5000";
  // const proURL = "uessky.herokuapp.com";

  geocoding(location, (geo_er, geo_res) => {
    if (geo_er) {
      res.send(geo_er.message);
    }
    const geo_data = geo_res.features.map((feature) => {
      return {
        place_name: feature.place_name,
        lat: feature.center[1],
        lng: feature.center[0],
      };
    });
    // res.send(geo_data[0]);
    forecast(geo_data[0].lat, geo_data[0].lng, (fore_err, fore_res) => {
      if (fore_err) {
        return res.send(fore_err);
      }
      const fore_data = fore_res.currently;
      const { summary } = fore_data;
      // Nếu có tồn tại chữ mưa thì icon mưa ngược lại nắng
      if (summary.includes("mưa")) {
        res.send({
          iconStatus: "Mưa",
        });
      }
      res.send({
        iconStatus: "Nắng",
      });
    });
  });
});

module.exports = weatherStatusRouter;
