const express = require("express");
const router = express.Router();
const path = require("path");
const novDB = require("../db/NovelishDB");

router.get("/:id", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/../public/update.html"));
});

router.put("/:id", async function (req, res, next) {
  console.log(req.params.id);
  const databaseResult = await novDB.updateReview(req.params.id, req.body);
  res.send({ result: databaseResult });
});

module.exports = router;
