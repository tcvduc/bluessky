const request = require("request");

//let log = console.log;

const default_url =
  "https://api.darksky.net/forecast/13bc464d5fa304c0e0999d354b8d7892/37.8267,-122.4233?units=si&lang=vi";

function forecast(latitude, longitude, callback) {
  const secret_key = "13bc464d5fa304c0e0999d354b8d7892";
  const darksky_url = `https://api.darksky.net/forecast/${secret_key}/${latitude},${longitude}?units=si&lang=vi`;

  request(darksky_url, { json: true }, (err, res) => {
    if (err) {
      return callback(
        "Không thể kết nối đến server, vui lòng thử lại sau!",
        undefined
      );
    } else if (res.body.length === 0) {
      return callback("Không có dữ liệu!", undefined);
    } else {
      return callback(undefined, res.body);
    }
  });
}

module.exports = forecast;
