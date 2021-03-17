/*
* Haoyang Ding => Nabil:
*
* I don't recommend you use the sendFile() to do the redirect. That's slow and sometimes cause address error.
* Try res.redirect() next time.
*
* */

var express = require("express");
var router = express.Router();
const path = require("path");

/* GET home page. */
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});

module.exports = router;
