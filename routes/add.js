const express = require("express");
const router = express.Router();
const path = require("path");
const novDB = require("../db/NovelishDB");

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../public/add.html"));
});

router.post("/", function (req, res) {
  try {
    novDB.createReview(req.body);
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
