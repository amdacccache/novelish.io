const express = require("express");
const router = express.Router();
const novDB = require("../db/NovelishDB");

router.get("/", async function (req, res) {
  try {
    const reviews = await novDB.getReviews();
    res.send(reviews);
  } catch (e) {
    console.log("Error getting reviews");
  }
});

router.get("/:id", async function (req, res) {
  try {
    const review = await novDB.getReview(req.params.id);
    res.send(review);
  } catch (e) {
    console.log("Error getting review.");
  }
});

router.post("/:id", async function (req, res) {
  console.log(req.body.reviewId);
  try {
    const deleteReview = await novDB.deleteReview(req.body);
    console.log(deleteReview);
    res.send({ deleted: true });
  } catch (e) {
    res.send({ deleted: false });
  }
});

router.get("/genres/:id", async function (req, res) {
  try {
    const reviews = await novDB.getGenreReviews(req.params.id);
    res.send(reviews);
  } catch (e) {
    console.log("Error getting genre reviews.");
  }
});

router.get("/search/:query", async function (req, res) {
  try {
    console.log(req.params.query);
    const reviews = await novDB.searchAndGetReviews(req.params.query);
    console.log(reviews);
    res.send(reviews);
  } catch (e) {
    console.log(e);
    console.log("Error searching for that query");
  }
});

module.exports = router;
