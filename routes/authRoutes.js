const express = require("express");
const router = express.Router();

router.get("/register", function (req, res) {
  res.render("register", { title: "Register", path: "/register" });
});

router.get("/login", function (req, res) {
  res.render("login", { title: "Login", path: "/login" });
});

router.get("/forgot-password", function (req, res) {
  res.render("forgotpass", { title: "Login", path: "/login" });
});

module.exports = router;
