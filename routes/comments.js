const express = require("express");
const router = express.Router();
const novDB = require("../db/NovelishDB");

// this :id is a review id to link the comments to it
router.post("/:id", function (req, res) {
  novDB.createComment({
    commenter: req.body.commenterName,
    comment: req.body.comment,
    reviewId: req.body.reviewId,
  });
  res.send({ commenter: req.body.commenterName, comment: req.body.comment });
});

// this get function will handle requests for all comments on a review
router.get("/:id", async function (req, res) {
  const comments = await novDB.getComments(req.params.id);
  res.send(comments);
});

router.delete("/:id", async function (req, res) {
  const response = await novDB.deleteComment(req.body.commentID);
  res.send(response);
});

// this put function will handle updates to a comment
router.put("/update/:id", async function (req, res) {
  const response = await novDB.updateComment(req.params.id, req.body);
  res.send(response);
});
module.exports = router;
