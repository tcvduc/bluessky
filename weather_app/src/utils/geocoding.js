const request = require("request");

const access_token = `pk.eyJ1IjoiYWludGR1YyIsImEiOiJjazZ5ZmhicG4wc3EyM21xbzR2M2IweGtjIn0.5Al9ddJcfoi7LwEk0ldFWw`;
// let log = console.log;
// const geoCodingUrl =
//   "http://api.mapbox.com/geocoding/v5/mapbox.places/hochiminh.json?access_token=pk.eyJ1IjoiYWludGR1YyIsImEiOiJjazZ5ZmhicG4wc3EyM21xbzR2M2IweGtjIn0.5Al9ddJcfoi7LwEk0ldFWw";

function geocoding(keywords, callback) {
  //keywords = keywords.replace(/\s/g, ""); // Xóa khoảng trắng của chuỗi

  const geoCodingUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    keywords
  )}.json?access_token=${access_token}&language=vi&limit=5`;

  // let data = null; // Không thể dùng kiểu này để return vì bất đồng bộ
  request(geoCodingUrl, { json: true }, (err, res) => {
    if (err) {
      return callback("Cant connect to sever, try later", undefined);
    } else if (res.body.length === 0) {
      return callback("No result for your key", undefined);
    } else {
      //  const data = res.body;
      // log(data);
      return callback(undefined, res.body);
    }
  });
}

module.exports = geocoding;
