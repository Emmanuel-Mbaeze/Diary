const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DiarySchema = new Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    user: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Diary", DiarySchema);
