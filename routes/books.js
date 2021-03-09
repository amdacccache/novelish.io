/* 
"newId" is the generated MongoDB ObjectId 
that will be used for manual referencing.
*/
const newId = ObjectId();
db.collection("reviews").insertOne({
  _id: newId,
  userName: req.body.userName,
  movieName: req.body.movieName,
  genre: req.body.movieGenre,
  userReview: req.body.userReview,
});
db.collection(req.body.movieGenre).insertOne({
  reviewID: newId,
});
