const express = require("express");
const router = express.Router();
const i18n = require("i18n");
router.get("/register", function (req, res) {
  if (req.session.appUserToken) {
    return res.redirect("/app/pre-home");
  }

  return res.render("register", {
    title: i18n.__("sign_up"),
    path: "/register",
  });
});

router.get("/login", (req, res) => {
  if (req.session.appUserToken) {
    return res.redirect("/app/pre-home");
  }

  return res.render("login", { title: i18n.__("login"), path: "/login" });
});

router.get("/forgot-password", function (req, res) {
  res.render("forgotpass", {
    title: i18n.__("forgot_password"),
    path: "/forgot-password",
  });
});

router.get("/reset-password", function (req, res) {
  if (!req.query.token) {
    return res.redirect("/login");
  }
  return res.render("reset-password", {
    title: i18n.__("reset_password"),
    path: "/reset-password",
    token: req.query.token,
  });
});

router.get("/email-verified", function (req, res) {
  res.render("email-verified", {
    title: "Reset password",
    path: "/reset-password",
  });
});

module.exports = router;
