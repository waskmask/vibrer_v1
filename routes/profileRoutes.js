const express = require("express");
const router = express.Router();

router.get("/new-profile", function (req, res) {
  res.render("app/new-profile", { title: "Register", path: "/register" });
});

module.exports = router;
