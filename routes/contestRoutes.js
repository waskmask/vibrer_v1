const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/contests", async function (req, res) {
  try {
    const onGoingContestsResponse = await axios.post(
      `${process.env.API_URL}all/contest`,
      {
        type: "ongoing",
      }
    );

    const onGoingContestsData = onGoingContestsResponse.data;

    const upComingContestsResponse = await axios.post(
      `${process.env.API_URL}all/contest`,
      {
        type: "upcoming",
      }
    );

    const upComingContestsData = upComingContestsResponse.data;

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
      const userId = profileData._id;

      if (
        !profileData.name &&
        !profileData.name.first_name &&
        !profileData.name.last_name
      ) {
        return res.redirect("/new-profile");
      }
      return res.render("contests", {
        title: "Contest",
        path: "/contest",
        onGoingContestsData: onGoingContestsData,
        upComingContestsData: upComingContestsData,
        profileData: profileData,
        ADMIN_URL: process.env.ADMIN_URL,
      });
    } else {
      return res.render("contests", {
        title: "Contest",
        path: "/contest",
        onGoingContestsData: onGoingContestsData,
        upComingContestsData: upComingContestsData,
        ADMIN_URL: process.env.ADMIN_URL,
      });
    }
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching profile:", error);
    return res.render("500", {
      title: "500 Server error!",
      path: "/500",
    });
  }
});

module.exports = router;
