const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Schema/UserSchema");
const router = express.Router();
const cloudinary = require("../Connect/CLoudinary");
const { upload } = require("../Connect/Multer");
const path = require("path");
router.post("/register", upload, async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const image = await cloudinary.uploader.upload(req.file.path);
    const createUser = await userModel.create({
      userName,
      password: hashed,
      email,
      avatar: image.secure_url,
      avatarID: image.public_id,
    });
    res.status(201).json({
      message: "User Created",
      data: createUser,
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.patch("/:id/update-Username", async (req, res) => {
  try {
    const { userName } = req.body;
    const Updateuser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        userName,
      },
      { new: true }
    );
    res.status(200).json({
      status: "userName updated sucessfullly",
      data: Updateuser,
    });
  } catch (error) {
    console.log(error.message);
  }
});
router.patch("/:id/update-image", async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const Updateuser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        avatar: image.secure_url,
        avatarID: image.public_id,
      },
      { new: true }
    );
    res.status(200).json({
      status: "image updated sucessfullly",
      data: Updateuser,
    });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;

//localhost:1372/api/user/update/627d43901bb8ab4886ef293a
