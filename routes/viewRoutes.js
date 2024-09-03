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
    return res.render("index", {
      title: i18n.__("Home"),
      path: "/",
    });
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
      title: i18n.__("projects"),
      profileData: profileData,
    });
  } else {
    return res.render("project-view", {
      title: i18n.__("projects"),
      path: "/project",
    });
  }
});
router.get("/privacy", async (req, res) => {
  const language = req.cookies.i18n;
  let showPrivacyLangNotice = false;
  if (language && language !== "en") {
    showPrivacyLangNotice = true;
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
    return res.render("privacy", {
      title: "Privacy policy",
      path: "/privacy",
      profileData: profileData,
      showPrivacyLangNotice: showPrivacyLangNotice,
    });
  } else {
    return res.render("privacy", {
      title: "Privacy policy",
      path: "privacy",
      showPrivacyLangNotice: showPrivacyLangNotice,
    });
  }
});
router.get("/terms", async (req, res) => {
  const language = req.cookies.i18n;
  let showTermsLangNotice = false;
  if (language && language !== "en") {
    showTermsLangNotice = true;
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
    return res.render("terms", {
      title: "Terms & Conditions",
      path: "/terms",
      profileData: profileData,
      showTermsLangNotice: showTermsLangNotice,
    });
  } else {
    return res.render("terms", {
      title: "Terms & Conditions",
      path: "/terms",
      showTermsLangNotice: showTermsLangNotice,
    });
  }
});
router.get("/cookies", async (req, res) => {
  const language = req.cookies.i18n;
  let showCookieLangNotice = false;
  if (language && language !== "en") {
    showCookieLangNotice = true;
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
    return res.render("use-of-cookies", {
      title: "cookies",
      path: "/cookies",
      profileData: profileData,
      showCookieLangNotice: showCookieLangNotice,
    });
  } else {
    return res.render("use-of-cookies", {
      title: "cookies",
      path: "/cookies",
      showCookieLangNotice: showCookieLangNotice,
    });
  }
});
router.get("/projects", showProjectsController.showProjects);
router.get("/project-view/:id", showProjectsController.viewProject);
// to test file uploader
router.get("/file", (req, res) => {
  res.render("app/fileupload", { title: "File Upload", path: "/file" });
});
module.exports = router;
