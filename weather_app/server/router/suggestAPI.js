const express = require("express");
const suggestRouter = new express.Router();
const geocoding = require("../../src/utils/geocoding");
// autocompleted
let log = console.log;
suggestRouter.get("/api/suggests/geo_data", (req, res) => {
  const { search } = req.query;
  geocoding(search, (geo_err, geo_res) => {
    if (geo_err) {
      return res.send(geo_err);
    }
    //  log(geo_res);

    // bug - query fail -  nếu không có kếch quả thì thông báo không có nơi này

    if (geo_res.features.length <= 0) {
      res.status(500).send({ error: "Không có nơi này!" });
    } else {
      const geo_data = geo_res.features.map((feature) => {
        return {
          place_name: feature.place_name,
          latitude: feature.center[1],
          longitude: feature.center[0],
        };
      });
      res.send(geo_data);
    }
  });
});
module.exports = suggestRouter;
