const express = require("express");
const router = express.Router();
const showProjectsController = require("../controllers/showProjectsController");

// Use router.get instead of app.get
// Get Routes
router.get("/", (req, res) => {
  res.render("index", { title: "Home", path: "/" });
});
router.get("/road-map", (req, res) => {
  res.render("road-map", { title: "Road Map", path: "/road-map" });
});

router.get("/project", (req, res) => {
  res.render("project-view", { title: "Projects", path: "project" });
});
router.get("/privacy", (req, res) => {
  res.render("privacy", { title: "Privacy policy", path: "privacy" });
});
router.get("/terms", (req, res) => {
  res.render("terms", { title: "Terms & Conditions", path: "terms" });
});
router.get("/cookies", (req, res) => {
  res.render("use-of-cookies", { title: "cookies", path: "cookies" });
});
router.get("/projects", showProjectsController.showProjects);
router.get("/project-view/:id", showProjectsController.viewProject);

module.exports = router;
