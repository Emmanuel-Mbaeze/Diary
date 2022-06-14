const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSChema = Schema(
  {
    username: {
      type: String,
    },
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    isverify: {
      type: Boolean,
    },
    verifiedtoken: {
      type: String,
    },
    diary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diary",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSChema);
