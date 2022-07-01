const mongoose = require("mongoose");
require("dotenv").config();
const url =
  "mongodb+srv://Emmanuel:123456789Somto@cluster0.firhs.mongodb.net/stfcreates?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });
