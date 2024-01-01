const express = require("express");
const router = express.Router();

router.get("/register", function (req, res) {
  if (req.session.appUserToken) {
    return res.redirect("/app/pre-home");
  }
  return res.render("register", { title: "Register", path: "/register" });
});

router.get("/login", (req, res) => {
  if (req.session.appUserToken) {
    return res.redirect("/app/pre-home");
  }

  return res.render("login", { title: "Login", path: "/login" });
});

router.get("/forgot-password", function (req, res) {
  res.render("forgotpass", { title: "Login", path: "/login" });
});

module.exports = router;
