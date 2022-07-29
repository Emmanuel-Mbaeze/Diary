const mongoose = require("mongoose");
require("dotenv").config();
// const url = "mongodb://localhost/ManeldiaryDB";
const url =
  "mongodb+srv://Emmanuel:123456789Somto@cluster0.firhs.mongodb.net/i--jot?retryWrites=true&w=majority";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error.message);
  });
