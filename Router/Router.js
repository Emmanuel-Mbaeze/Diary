const express = require("express");
const router = express.Router();
const {
  signinUser,
  getUSers,
  oneUser,
  deleteUser,
  signupUser,
  verifyUser,
  updateUser,
} = require("../Contoller/UserController");
const { upload } = require("../Connect/Multer");

router.route("/all").get(getUSers);
router.route("/verify/:id/:token").get(verifyUser);
router.route("/register").post(upload, signupUser);
router.route("/signin").post(signinUser);
router.route("/:id").get(oneUser).delete(deleteUser).patch(updateUser);

module.exports = router;
