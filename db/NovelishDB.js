const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

function NovelishDB() {
  const novDB = {};

  const url = process.env.MONGO_URL;
  const DB_NAME = "novelishDatabase";

  // get all of the reviews in the database
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

  novDB.searchAndGetReviews = async function (query) {
    const parsedQuery = query;
    console.log(parsedQuery);
    let client;
    console.log("Search and retrieving reviews...");
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to novelish DB");
      await client.connect();
      console.log("Connected");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection("reviews");
      console.log("Collection ready");
      const reviews = await reviewsCollection
        .find({
          $or: [
            { userName: parsedQuery },
            { authorName: parsedQuery },
            { bookName: parsedQuery },
            { genre: parsedQuery },
            { userReview: parsedQuery },
          ],
        })
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
      console.log(genreName);
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
    let successfulDatabaseTransaction = false;
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to Novelish DB");
      await client.connect();
      console.log("Connected");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection("reviews");
      const oldGenreCollection = db.collection(reviewObj.oldGenre);
      const newGenreCollection = db.collection(reviewObj.genre);
      console.log("collection ready.");
      let results, secondResult, thirdResult;
      console.log(reviewObj.oldGenre);
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
      console.log(results);
      secondResult = await oldGenreCollection.findOneAndDelete({
        reviewID: ObjectId(reviewID),
      });
      console.log(secondResult);
      thirdResult = await newGenreCollection.insertOne({
        reviewID: ObjectId(reviewID),
      });
      console.log(thirdResult);
      successfulDatabaseTransaction = true;
    } finally {
      console.log("closing database connection");
      client.close();
    }

    return successfulDatabaseTransaction;
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

  novDB.createComment = async function (commentObject) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to the novelish database");
      await client.connect();
      console.log("connected to the DB");
      const db = client.db(DB_NAME);
      const commentsCollection = db.collection("comments");
      const results = await commentsCollection.insertOne({
        commenter: commentObject.commenter,
        comment: commentObject.comment,
        reviewId: commentObject.reviewId,
      });
      console.log(results);
    } finally {
      console.log("closing the connection");
      client.close();
    }
  };

  novDB.deleteReview = async function (reviewObject) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to novelish database");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const reviewsCollection = db.collection("reviews");
      const genreCollection = db.collection(reviewObject.reviewGenre);
      const result = await reviewsCollection.deleteOne({
        _id: new ObjectId(reviewObject.reviewId),
      });
      const secondResult = await genreCollection.deleteOne({
        reviewID: new ObjectId(reviewObject.reviewId),
      });
      console.log(result);
      console.log(secondResult);
    } finally {
      console.log("close connection");
      client.close();
    }
  };

  novDB.getComments = async function (reviewID) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to novelish database");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const commentsCollection = db.collection("comments");
      const comments = await commentsCollection
        .find({ reviewId: reviewID })
        .toArray();
      return comments;
    } finally {
      console.log("close connection");
      client.close();
    }
  };

  novDB.deleteComment = async function (commentID) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to novelish database");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const commentsCollection = db.collection("comments");
      const result = await commentsCollection.deleteOne({
        _id: new ObjectId(commentID),
      });
      console.log(result);
      return { deleted: true };
    } finally {
      console.log("close connection");
      client.close();
    }
  };

  novDB.updateComment = async function (commentID, commentObject) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("connecting to novelish database");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const commentsCollection = db.collection("comments");
      const result = await commentsCollection.findOneAndUpdate(
        { _id: ObjectId(commentID) },
        {
          $set: {
            comment: commentObject.comment,
          },
        }
      );
      console.log(result);
      return { updated: true };
    } finally {
      console.log("Closing update comment connection");
      client.close();
    }
  };

  return novDB;
}

module.exports = NovelishDB();
