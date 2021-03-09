const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

function NovelishDB() {
  const novDB = {};

  const url = process.env.MONGO_URL;
  const DB_NAME = "novelishDatabase";

  // get all of the reviews in the database
  novDB.getReviews = async function () {
    console.log(url);
    let client;
    console.log("Getting reviews...");
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to novelish DB");
      await client.connect();
      console.log("Connected");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection("reviews");
      console.log("Collection ready");
      const reviews = await reviewsCollection
        .find()
        .sort({ _id: -1 })
        .toArray();
      return reviews;
    } finally {
      console.log("Closing database connection");
      client.close();
    }
  };

  // get a single review
  novDB.getReview = async function (reviewID) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to novelish DB");
      await client.connect();
      console.log("Connected");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection("reviews");
      console.log("Collection ready");
      const reviews = await reviewsCollection.findOne({
        _id: ObjectId(reviewID),
      });
      return reviews;
    } finally {
      console.log("Closing database connection");
      client.close();
    }
  };

  // Get reviews for a specific genre
  novDB.getGenreReviews = async function (genreName) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to novelish DB");
      await client.connect();
      console.log("Connected");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection(genreName);
      console.log("Collection ready");
      const reviews = await reviewsCollection.find().toArray();
      return reviews;
    } finally {
      console.log("Closing database connection");
      client.close();
    }
  };

  // UPDATE REVIEW FUNCTION
  novDB.updateReview = async function (reviewID, reviewObj) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to Novelish DB");
      await client.connect();
      console.log("Connected");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection("reviews");
      console.log("collection ready.");
      let results;
      try {
        results = await reviewsCollection.findOneAndUpdate(
          { _id: ObjectId(reviewID) },
          {
            $set: {
              userName: reviewObj.userName,
              userEmail: reviewObj.userEmail,
              bookName: reviewObj.bookName,
              authorName: reviewObj.authorName,
              genre: reviewObj.genre,
              rating: reviewObj.rating,
              userReview: reviewObj.userReview,
            },
          }
        );
      } catch (e) {
        console.log(e);
      }
      console.log(results);
    } finally {
      console.log("closing database connection");
      client.close();
    }
  };

  // create a new review
  novDB.createReview = async function (reviewInfoObj) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to the novelish database");
      await client.connect();
      console.log("connected to the Db.");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection("reviews");
      const genreCollection = db.collection(reviewInfoObj.bookGenre);
      const newId = ObjectId();
      const results = await reviewsCollection.insertOne({
        _id: newId,
        userName: reviewInfoObj.userName,
        userEmail: reviewInfoObj.userEmail,
        bookName: reviewInfoObj.bookName,
        authorName: reviewInfoObj.authorName,
        genre: reviewInfoObj.bookGenre,
        rating: reviewInfoObj.rating,
        userReview: reviewInfoObj.userReview,
      });
      const secondResults = await genreCollection.insertOne({
        reviewID: newId,
      });
      console.log(results);
      console.log(secondResults);
    } finally {
      console.log("closing the connection");
      client.close();
    }
  };
  return novDB;
}

// TODO: delete a review

module.exports = NovelishDB();
