const express = require("express");
const router = express.Router();
const novDB = require("../db/NovelishDB");

router.post("/:id", function (req, res, next) {
  novDB.createComment({
    commenter: req.body.commenterName,
    comment: req.body.comment,
    reviewId: req.body.reviewId,
  });
  res.send({ commenter: req.body.commenterName, comment: req.body.comment });
});
module.exports = router;
