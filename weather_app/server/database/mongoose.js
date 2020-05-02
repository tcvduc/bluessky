const mongoose = require("mongoose");
const connectionURL = "mongodb://127.0.0.1:27017/bluessky-user";
mongoose.connect(process.env.MONGODB_URL || connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
