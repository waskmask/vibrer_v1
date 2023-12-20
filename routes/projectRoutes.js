const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.post("/postProject", projectController.postProject);
router.get("/getProjects", projectController.getProjects);

module.exports = router;
