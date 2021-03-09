const express = require("express");
const router = express.Router();
const path = require("path");
// const ObjectId = require("mongodb").ObjectId;
const novDB = require("../db/NovelishDB");

router.get("/:id", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/../public/update.html"));
});

router.put("/:id", function (req, res, next) {
  // let reviewID = new ObjectId(req.params.id);
  // MongoClient.connect(connectionKey, function (err, client) {
  //   if (err) throw err;
  //   var db = client.db("novelishDatabase");
  //   db.collection("reviews")
  //     .findOneAndUpdate(
  //       { _id: reviewID },
  //       {
  //         $set: {
  //           userName: req.body.userName,
  //           userEmail: req.body.userEmail,
  //           bookName: req.body.bookName,
  //           authorName: req.body.authorName,
  //           genre: req.body.genre,
  //           rating: req.body.rating,
  //           userReview: req.body.userReview,
  //         },
  //       }
  //     )
  //     .then(function (result) {
  //       console.log(result);
  //     })
  //     .catch((error) => console.error(error));
  // });
  novDB.updateReview(req.params.id, req.body);
  res.redirect("/");
});

module.exports = router;
