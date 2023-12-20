const express = require("express");
const router = express.Router();

router.get("/contests", function (req, res) {
  res.render("contests", { title: "Contests", path: "/contests" });
});

router.get("/contest", function (req, res) {
  res.render("contest", { title: "Contests", path: "/contests" });
});

module.exports = router;
