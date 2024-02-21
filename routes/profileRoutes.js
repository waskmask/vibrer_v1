const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const i18n = require("i18n");

router.get("/new-profile", async function (req, res) {
  if (!req.session.appUserToken) {
    res.redirect("/login");
  } else {
    try {
      const profileResponse = await axios.get(
        `${process.env.API_URL}getappUserProfile`,
        {
          headers: {
            Authorization: `Bearer ${req.session.appUserToken}`,
          },
        }
      );
      const profileData = profileResponse.data.result;
      const contest_id = process.env.PRE_CONTEST_ID;
      if (profileData.full_name) {
        const intentToParticipate = req.cookies.intent === "participate";
        if (profileData.user_type === "Artist" && intentToParticipate) {
          res.clearCookie("intent"); // Clear the intent cookie
          res.redirect("/app/pre-participate/" + contest_id);
        } else {
          res.redirect("/app/pre-home");
        }
      }

      const artistCategoriesapiResponse = await axios.get(
        `${process.env.API_URL}all/artist-category`
      );
      const genreApiResponse = await axios.get(
        `${process.env.API_URL}all/genre`
      );

      const artistCategoriesData = artistCategoriesapiResponse.data.result;
      const genreData = genreApiResponse.data.result;

      // if (profileData.user_type === "Artist") {
      res.render("app/new-profile", {
        title: i18n.__("new_profile"),
        path: "/register",
        artistCategoriesData: artistCategoriesData,
        genreData: genreData,
        profileData: profileData,
      });
      // } else {
      //   res.render("app/new-profileFan", {
      //     title: i18n.__("new_profile"),
      //     path: "/register",
      //     artistCategoriesData: artistCategoriesData,
      //     genreData: genreData,
      //     profileData: profileData,
      //   });
      // }
    } catch (error) {
      console.error("Error fetching data from API:", error);

      // res.status(500).send("Internal Server Error");
      res.render("500", {
        title: "500 Server error!",
        path: "/500",
      });
    }
  }
});

router.get("/register-successfull", async function (req, res) {
  if (!req.session.appUserToken) {
    res.redirect("/login");
  }

  try {
    const profileResponse = await axios.get(
      `${process.env.API_URL}getappUserProfile`,
      {
        headers: {
          Authorization: `Bearer ${req.session.appUserToken}`,
        },
      }
    );
    const profileData = profileResponse.data.result;

    if (profileData.full_name) {
      res.redirect("/app/pre-home");
    } else {
      res.render("register-success", {
        title: i18n.__("registration_successful"),
        path: "/new-account",
      });
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);

    // res.status(500).send("Internal Server Error");
    res.render("500", {
      title: "500 Server error!",
      path: "/500",
    });
  }
});

module.exports = router;
