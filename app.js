const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const genresRouter = require("./routes/genres");
const addRouter = require("./routes/add");
const reviewsRouter = require("./routes/reviews");
const updateRouter = require("./routes/update");
const reviewRouter = require("./routes/review");
const commentsRouter = require("./routes/comments");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/genres", genresRouter);
app.use("/add", addRouter);
app.use("/reviews", reviewsRouter);
app.use("/update", updateRouter);
app.use("/review", reviewRouter);
app.use("/comments", commentsRouter);

module.exports = app;
