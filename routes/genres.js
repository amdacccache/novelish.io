var express = require("express");
var router = express.Router();
const path = require("path");
const { route } = require("./add");

router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/../public/genres.html"));
});

router.get("/:id", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/../public/genre.html"));
});
module.exports = router;
