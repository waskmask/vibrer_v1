const express = require("express");
const router = express.Router();

router.get("/register", function (req, res) {
  res.render("register", { title: "Register", path: "/register" });
});

router.get("/login", function (req, res) {
  res.render("login", { title: "Login", path: "/login" });
});

router.get("/forgot-password", function (req, res) {
  res.render("forgotpass", {
    title: "Forgot password",
    path: "/forgot-password",
  });
});

router.get("/reset-password", function (req, res) {
  res.render("reset-password", {
    title: "Reset password",
    path: "/reset-password",
  });
});

router.get("/email-verified", function (req, res) {
  res.render("email-verified", {
    title: "Reset password",
    path: "/reset-password",
  });
});

module.exports = router;
