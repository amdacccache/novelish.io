const { MongoClient, ObjectId } = require("mongodb");
const connectionKey = require("../mongoDBFolder/mongoDBInfo");

function NovelishDB() {
  const novDB = {};

  const url = process.env.MONGO_URL || connectionKey;
  const DB_NAME = "novelishDatabase";

  novDB.getReviews = async function () {
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
      const reviews = await reviewsCollection.find().toArray();
      return reviews;
    } finally {
      console.log("Closing database connection");
      client.close();
    }
  };

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

  novDB.getGenreReviews = async function (genreName) {
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

  novDB.updateReview = async function (reviewID, reviewObj) {
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

  return novDB;
}

module.exports = NovelishDB();
