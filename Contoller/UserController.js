const userModel = require("../Schema/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../Connect/CLoudinary");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const verifiedEmail = require("../Connect/sendMail");

// const transport = nodemailer.createTransport({
//   service: "hotmail",
//   auth: {
//     user: "nelsonelaye@hotmail.com",
//     pass: "boking.100",
//   },
// });

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "Gideonekeke64@gmail.com",
//     pass: "sgczftichnkcqksx",
//   },
// });

const signupUser = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const image = await cloudinary.uploader.upload(req.file.path);

    const user = await userModel.create({
      username,
      fullname,
      password: hashed,
      email,
      avatar: image.secure_url,
      avatarID: image.public_id,
      // verifiedtoken: token,
    });
    // const online = "https://i--jot-backend.herokuapp.com";
    // const local = "http://localhost:3000/confirm";

    verifiedEmail(email, user._id)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));

    res.status(201).json({
      status: "check mail",
      message: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "signup failed",
      message: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verifiedtoken !== "") {
        await userModel.findByIdAndUpdate(
          req.params.id,
          {
            isverify: true,
            verifiedtoken: "",
          },
          { new: true }
        );
        res.status(201).json({
          status: "Verification complete proceed to sign in",
        });
      } else {
        res.status(404).json({
          status: "Verification failed",
        });
      }
    } else {
      res.status(404).json({
        status: "user not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "alluser failed",
      message: error.message,
    });
  }
};

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        if (user.isverify && user.verifiedtoken === "") {
          const token = jwt.sign(
            {
              _id: user._id,
              isverify: user.isverify,
            },
            "myDiary",
            { expiresIn: "1d" }
          );
          const { password, ...info } = user._doc;
          res.status(201).json({
            status: `welcome back ${user.username}`,
            data: { token, ...info },
          });
        } else {
        }
      } else {
        res.status(500).json({
          status: "Incorrect password",
        });
      }
    } else {
      res.status(500).json({
        status: "User not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "alluser failed",
      message: error.message,
    });
  }
};

const getUSers = async (req, res) => {
  try {
    const allusers = await userModel.find();
    res.status(201).json({
      status: "all users gotten",
      data: allusers,
    });
  } catch (error) {
    res.status(404).json({
      status: "alluser failed",
      message: error.message,
    });
  }
};

const oneUser = async (req, res) => {
  try {
    const singleUser = await userModel.findById(req.params.id);
    res.status(201).json({
      status: "singleUser gotten",
      data: singleUser,
    });
  } catch (error) {
    res.status(404).json({
      status: "one user failed",
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, fullname } = req.body;
    const user = await userModel.findById(req.params.id);
    if (user) {
      await cloudinary.uploader.upload.destroy(user.avatarID);
      const image = await cloudinary.uploader.upload(req.file.path);

      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          username,
          fullname,
          avatar: image.secure_url,
          avatarID: image.public_id,
        },
        { new: true }
      );
    } else {
      res.status(404).json({
        status: "user not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "alluser failed",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const removeUSer = await userModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      data: removeUSer,
    });
  } catch (error) {
    res.status(404).json({
      status: "delete failed",
      message: error.message,
    });
  }
};

module.exports = {
  signinUser,
  signupUser,
  verifyUser,
  updateUser,
  getUSers,
  oneUser,
  deleteUser,
};
