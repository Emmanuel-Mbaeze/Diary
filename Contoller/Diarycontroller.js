const userModel = require("../Schema/UserSchema");
const diaryModel = require("../Schema/DiarySchema");
const mongoose = require("mongoose");

const createDiary = async (req, res) => {
  try {
    const { message, title } = req.body;
    const getUser = await userModel.findById(req.params.id);
    const diarycreate = new diaryModel({
      message,
      title,
    });
    diarycreate.user = getUser;
    diarycreate.save();

    getUser.diary.push(mongoose.Types.ObjectId(diarycreate._id));
    getUser.save();

    res.status(200).json({
      message: "items has been created",
      data: diarycreate,
    });
  } catch (error) {
    res.status(404).json({
      status: "creation failed",
      message: error.message,
    });
  }
};

const singleallDiary = async (req, res) => {
  try {
    const singleallDiary = await userModel
      .findById(req.params.id)
      .populate("diary");
    res.status(200).json({
      message: "items has been created",
      data: singleallDiary,
    });
  } catch (error) {
    res.status(404).json({
      status: "all failed",
      message: error.message,
    });
  }
};

const deleteallDiary = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user.isverify) {
      const deleteDiary = await diaryModel.findByIdAndDelete(req.params.diary);

      user.diary.pull(deleteDiary);
      user.save();

      res.status(204).json({});
    } else {
      res.status(404).json({
        message: "access denied",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "all failed",
      message: error.message,
    });
  }
};

const alldiary = async (req, res) => {
  try {
    const alldiary = await diaryModel.find();

    res.status(201).json({
      message: "all",
      data: alldiary,
    });
  } catch (error) {
    res.status(404).json({
      status: "all failed",
      message: error.message,
    });
  }
};

const oneDiary = async (req, res) => {
  try {
    const oneDiary = await diaryModel.findById(req.params.diary);
    res.status(200).json({
      message: "items has been created",
      data: oneDiary,
    });
  } catch (error) {
    res.status(404).json({
      status: "all failed",
      message: error.message,
    });
  }
};

module.exports = {
  createDiary,
  singleallDiary,
  oneDiary,
  deleteallDiary,
  alldiary,
};
