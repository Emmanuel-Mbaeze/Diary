const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./Connect/Connect");
const port = process.env.PORT || 9090;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./Router/Router"));
app.use("/api/diary", require("./Router/diaryrouter"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Manel's Diary App" });
});

app.listen(port, () => {
  console.log("connecting to server ...!");
});
