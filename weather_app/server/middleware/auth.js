const jwt = require("jsonwebtoken");
const User = require("./../models/user");
let log = console.log;

const auth = async (req, res, next) => {
  // get token => decode => user_id/err
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(404).send({ error: "Please authenticate!" });
  }
};

module.exports = auth;
