const express = require("express");
const router = express.Router();
const {
  createDiary,
  singleallDiary,
  oneDiary,
  deleteallDiary,
  alldiary,
} = require("../Contoller/Diarycontroller");

router.route("/create/:id").post(createDiary);
router.route("/:id").get(singleallDiary);
router.route("/:id/:diary").get(oneDiary);
router.route("/:id/:diary").get(oneDiary);
router.route("/").get(alldiary);
router.route("/:id/:diary").get(oneDiary).delete(deleteallDiary);

module.exports = router;
