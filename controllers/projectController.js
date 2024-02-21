const Project = require("../models/postProject");
const i18n = require("i18n");

exports.postProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      message: "Project successfully created",
      data: project,
    });
  } catch (err) {
    const errorMsg = {};
    for (let field in err.errors) {
      errorMsg[field] = err.errors[field].message;
    }
    res.status(500).json({
      message: "Error creating project",
      error: errorMsg,
    });
  }
};

// Existing getProjects function
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching projects",
      error: err.message,
    });
  }
};
