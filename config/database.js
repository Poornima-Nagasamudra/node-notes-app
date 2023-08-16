const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const configureDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/my-note")
    .then((res) => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log("Error connected to database", err);
    });
};
module.exports = configureDB;
