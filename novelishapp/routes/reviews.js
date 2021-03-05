const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const connectionString = require("../mongoDBFolder/mongoDBInfo");
const ObjectId = require("mongodb").ObjectId;

router.get("/", function (req, res) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
    (client) => {
      console.log("Connected to Database");
      let db = client.db("novelishDatabase");
      db.collection("reviews")
        .find()
        .toArray()
        .then((results) => res.send(results));
    }
  );
});

router.get("/:id", function (req, res) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
    (client) => {
      console.log("Connected to the database");
      let db = client.db("novelishDatabase");
      db.collection("reviews")
        .findOne({ _id: ObjectId(req.params.id) })
        .then((results) => res.send(results));
    }
  );
});

router.get("/genres/:id", function (req, res) {
  MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
    (client) => {
      console.log("Connected to Database");
      let db = client.db("novelishDatabase");
      db.collection(req.params.id)
        .find()
        .toArray()
        .then((results) => res.send(results));
    }
  );
});

module.exports = router;
