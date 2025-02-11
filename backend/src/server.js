const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

const DB_url = `${config.mongoose.url}`;

mongoose
  .connect(DB_url)
  .then(() => {
    console.log("its connected to MongoDb Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(config.port, () => {
  console.log("connected securely to port: ", config.port);
});