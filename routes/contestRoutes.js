const express = require("express");
const router = express.Router();

router.get("/contests", function (req, res) {
  res.render("contests", { title: "Contests", path: "/contests" });
});

module.exports = router;
