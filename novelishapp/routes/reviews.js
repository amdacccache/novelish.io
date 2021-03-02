const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const connectionString = require("../mongoDBFolder/mongoDBInfo");

router.get("/", function (req, res) {
  let returnData = [];
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

module.exports = router;
