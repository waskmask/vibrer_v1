const Project = require("../models/postProject");

exports.showProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render("projects", {
      projects,
      title: "Projects",
      path: "/Allprojects",
    }); // Sending projects to EJS
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving data");
  }
};

exports.viewProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.render("project-view", {
      project,
      title: project.title,
      path: "/project-view",
    }); // Sending the project to the EJS template
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving project");
  }
};
