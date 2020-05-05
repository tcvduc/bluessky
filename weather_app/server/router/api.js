const express = require("express");
const apiRouter = new express.Router();

const forecast = require("./../../src/utils/forecast");

let log = console.log;
apiRouter.get("/api/weather", async (req, res) => {
  if (!req.query.lat || !req.query.long) {
    return res.send("Lỗi!");
  }

  const { lat, long, place_name } = req.query;
  //log(lat, long, place_name);

  forecast(lat, long, (fore_err, fore_res) => {
    if (fore_err) {
      return res.send(fore_err);
    }
    const fore_data = fore_res;
    // status icon
    const chechWeatherStatus = () => {
      if (
        fore_data.currently.summary.includes("mưa") ||
        fore_data.currently.summary.includes("có mưa")
      ) {
        return "Mưa";
      }
      return "Nắng";
    };
    const result = {
      place_name,
      summary: fore_data.currently.summary,
      temperature: fore_data.currently.temperature,
      iconStatus: chechWeatherStatus(),
    };

    res.send(result);
  });
});

module.exports = apiRouter;
