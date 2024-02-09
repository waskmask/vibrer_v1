const express = require("express");
const axios = require("axios");
const router = express.Router();
const showProjectsController = require("../controllers/showProjectsController");
const i18n = require("i18n");
// Use router.get instead of app.get
// Get Routes
router.get("/", async (req, res) => {
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
    return res.render("index", {
      title: i18n.__("Home"),
      path: "/",
      profileData: profileData,
    });
  } else {
    return res.render("index", { title: i18n.__("Home"), path: "/" });
  }
});
router.get("/road-map", async (req, res) => {
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
    return res.render("road-map", {
      title: "Road Map",
      path: "/road-map",
      profileData: profileData,
    });
  } else {
    return res.render("road-map", { title: "Road Map", path: "/road-map" });
  }
});

router.get("/project", async (req, res) => {
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
      title: "Projects",
      path: "/project",
      profileData: profileData,
    });
  } else {
    return res.render("project-view", { title: "Projects", path: "/project" });
  }
});
router.get("/privacy", async (req, res) => {
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
    return res.render("privacy", {
      title: "Privacy policy",
      path: "/privacy",
      profileData: profileData,
    });
  } else {
    return res.render("privacy", { title: "Privacy policy", path: "privacy" });
  }
});
router.get("/terms", async (req, res) => {
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
    return res.render("terms", {
      title: "Terms & Conditions",
      path: "/terms",
      profileData: profileData,
    });
  } else {
    return res.render("terms", { title: "Terms & Conditions", path: "/terms" });
  }
});
router.get("/cookies", async (req, res) => {
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
    return res.render("use-of-cookies", {
      title: "cookies",
      path: "/cookies",
      profileData: profileData,
    });
  } else {
    return res.render("use-of-cookies", { title: "cookies", path: "/cookies" });
  }
});
router.get("/projects", showProjectsController.showProjects);
router.get("/project-view/:id", showProjectsController.viewProject);

module.exports = router;
