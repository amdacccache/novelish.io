const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const connectionString = require("../mongoDBFolder/mongoDBInfo");
const ObjectId = require("mongodb").ObjectId;
const novDB = require("../db/NovelishDB");

router.get("/", async function (req, res) {
  // MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  //   (client) => {
  //     console.log("Connected to Database");
  //     let db = client.db("novelishDatabase");
  //     db.collection("reviews")
  //       .find()
  //       .toArray()
  //       .then((results) => res.send(results));
  //   }
  // );
  try {
    console.log(novDB.getReviews);
    const reviews = await novDB.getReviews();
    res.send(reviews);
  } catch (e) {
    console.log("Error getting reviews");
  }
});

router.get("/:id", async function (req, res) {
  // MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  //   (client) => {
  //     console.log("Connected to the database");
  //     let db = client.db("novelishDatabase");
  //     db.collection("reviews")
  //       .findOne({ _id: ObjectId(req.params.id) })
  //       .then((results) => res.send(results));
  //   }
  // );
  try {
    const review = await novDB.getReview(req.params.id);
    res.send(review);
  } catch (e) {
    console.log("Error getting review.");
  }
});

router.get("/genres/:id", async function (req, res) {
  // MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
  //   (client) => {
  //     console.log("Connected to Database");
  //     let db = client.db("novelishDatabase");
  //     db.collection(req.params.id)
  //       .find()
  //       .toArray()
  //       .then((results) => res.send(results));
  //   }
  // );

  try {
    const reviews = await novDB.getGenreReviews(req.params.id);
    res.send(reviews);
  } catch (e) {
    console.log("Error getting genre reviews.");
  }
});

module.exports = router;
