const Project = require("../models/postProject");
const axios = require("axios");

exports.showProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (req.session.appUserToken) {
      const profileResponse = await axios.get(
        `${process.env.API_URL}getappUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${req.session.appUserToken}`,
          },
        }
      );

      const profileData = profileResponse.data.result;

      if (!profileData.full_name) {
        return res.redirect("/new-profile");
      }
      return res.render("projects", {
        projects,
        title: "Projects",
        path: "/Allprojects",
        profileData: profileData,
      });
    } else {
      return res.render("projects", {
        projects,
        title: "Projects",
        path: "/Allprojects",
      }); // Sending projects to EJS
    }
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
    if (req.session.appUserToken) {
      const profileResponse = await axios.get(
        `${process.env.API_URL}getappUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${req.session.appUserToken}`,
          },
        }
      );

      const profileData = profileResponse.data.result;

      if (!profileData.full_name) {
        return res.redirect("/new-profile");
      }
      return res.render("project-view", {
        project,
        title: project.title,
        path: "/project-view",
        profileData: profileData,
      });
    } else {
      return res.render("project-view", {
        project,
        title: project.title,
        path: "/project-view",
      }); // Sending the project to the EJS template
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error retrieving project");
  }
};
