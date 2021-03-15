const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "/../public/review.html"));
});
module.exports = router;
