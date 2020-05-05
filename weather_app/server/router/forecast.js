const express = require("express");
const forecastRouter = new express.Router();
const geocoding = require("./../../src/utils/geocoding");
const forecast = require("./../../src/utils/forecast");
const Axios = require("axios");
let log = console.log;

forecastRouter.get("/api/forecast/:keyword", async (req, res) => {
  const keyword = req.params.keyword;

  geocoding(keyword, (geo_er, geo_res) => {
    if (geo_er) {
      return res.send(geo_er);
    }
    log(geo_res);
    // bugs mới query to long @_@
    const geo_data = geo_res.features.map((data) => {
      return {
        place_name: data.place_name,
        lat: data.center[1],
        long: data.center[0],
      };
    });
    // log(geo_data);

    forecast(geo_data[0].lat, geo_data[0].long, async (fore_er, fore_res) => {
      if (fore_er) {
        res.send(fore_er);
      }

      // map fore data
      //   const fore_data = await fore_res.daily.data.map(async (data) => {
      //     return {
      //       time: data.time,

      //       summary: data.summary,
      //       icon: data.icon,
      //       temperatureMax: data.temperatureMax,
      //     };
      //   });

      // holy shit fix được bugs này r - promise.all - async await

      const fore_data = await Promise.all(
        fore_res.daily.data.map(async (data) => {
          return {
            time: await convertTimeStamp(data.time),
            icon: data.icon,
            temperatureMax: data.temperatureMax,
          };
        })
      );

      res.send(fore_data);
    });
  });
});

// convert timestamp
async function convertTimeStamp(timeStamp) {
  const cvTimeStampAPI =
    "https://showcase.linx.twenty57.net:8081/UnixTime/fromunixtimestamp?unixtimestamp=";

  let result = "";
  await Axios.get(`${cvTimeStampAPI}${timeStamp}`)
    .then((rs) => {
      result = rs.data.Datetime;
    })
    .catch((er) => {
      result = er.message;
    });
  return result;
}

module.exports = forecastRouter;
