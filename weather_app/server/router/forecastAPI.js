const express = require("express");
const forecastRouter = new express.Router();

const forecast = require("../../src/utils/forecast");
const Axios = require("axios");
let log = console.log;

forecastRouter.get("/api/forecast", async (req, res) => {
  //log(req.query);

  // bugs mới query to long @_@ - fix dc r - ôn lại req.query

  if (!req.query.lat || !req.query.long) {
    return res.send("Lỗi!");
  }

  const { lat, long } = req.query;

  // log(geo_data);
  forecast(lat, long, async (fore_er, fore_res) => {
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

    // bugs cannot get data from a promise
    // holy shit fix được bugs này r - promise.all - async await in map
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
