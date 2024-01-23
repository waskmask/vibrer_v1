const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/new-profile", async function (req, res) {
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
    }

    const artistCategoriesapiResponse = await axios.get(
      `${process.env.API_URL}all/artist-category`
    );
    const genreApiResponse = await axios.get(`${process.env.API_URL}all/genre`);

    const artistCategoriesData = artistCategoriesapiResponse.data.result;
    const genreData = genreApiResponse.data.result;

    if (profileData.user_type === "Artist") {
      res.render("app/new-profile", {
        title: "Register",
        path: "/register",
        artistCategoriesData: artistCategoriesData,
        genreData: genreData,
      });
    } else {
      res.render("app/new-profileFan", {
        title: "Register",
        path: "/register",
        artistCategoriesData: artistCategoriesData,
        genreData: genreData,
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
