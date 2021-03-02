var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const genresRouter = require("./routes/genres");
const addRouter = require("./routes/add");
const reviewsRouter = require("./routes/reviews");
const updateRouter = require("./routes/update");

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

module.exports = app;
