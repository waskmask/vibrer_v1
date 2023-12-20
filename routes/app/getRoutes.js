const express = require("express");
const router = express.Router();

// app home page
router.get("/app/home", function (req, res) {
  res.render("app/home", { title: "Home", path: "/home" });
});

// app home page
router.get("/app/contests", function (req, res) {
  res.render("app/contests", { title: "Contests", path: "/contests" });
});

router.get("/app/contest-view", function (req, res) {
  res.render("app/contest-view", { title: "Contests", path: "/contests" });
});

router.get("/app/participate", function (req, res) {
  res.render("app/participate", { title: "Participate", path: "/contests" });
});

router.get("/app/my-contests", function (req, res) {
  res.render("app/my-contests", {
    title: "My Contests",
    path: "/my-contests",
    link: "/my-contests",
  });
});

router.get("/app/my-votes", function (req, res) {
  res.render("app/my-votes", {
    title: "My Votes",
    path: "/my-contests",
    link: "/my-contest-votes",
  });
});

router.get("/app/my-contest-favs", function (req, res) {
  res.render("app/my-contest-favs", {
    title: "My Contest favorites",
    path: "/my-contests",
    link: "/my-contest-favs",
  });
});

router.get("/app/pre-participate", function (req, res) {
  res.render("app/pre_participate", {
    title: "Participate",
    path: "/contest",
  });
});

router.get("/app/pre-my-contests", function (req, res) {
  res.render("app/pre_my-contests", {
    title: "Participate",
    path: "/contests",
    isParticipated: false,
  });
});

router.get("/app/pre-home", function (req, res) {
  res.render("app/pre_home", {
    title: "Home",
    path: "/home",
    isParticipated: false,
  });
});

module.exports = router;
