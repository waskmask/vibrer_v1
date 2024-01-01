const express = require("express");
const axios = require("axios");
const router = express.Router();

// app home page
router.get("/app/home", async function (req, res) {
  try {
    if (!req.session.appUserToken) {
      return res.redirect("/login");
    }

    const profileResponse = await axios.get(
      `${process.env.API_URL}getappUserProfile`,
      {
        headers: {
          Authorization: `Bearer ${req.session.appUserToken}`,
        },
      }
    );

    const profileData = profileResponse.data.result;

    if (!profileData.name.first_name && !profileData.name.last_name) {
      return res.redirect("/new-profile");
    }

    const onGoingContestsResponse = await axios.post(
      `${process.env.API_URL}all/contest`,
      {
        data: {
          type: "ongoing",
        },
      }
    );

    const onGoingContestsData = onGoingContestsResponse.data;

    const upComingContestsResponse = await axios.post(
      `${process.env.API_URL}all/contest`,
      {
        data: {
          type: "upcoming",
        },
      }
    );

    const upComingContestsData = upComingContestsResponse.data;

    return res.render("app/home", {
      title: "Home",
      path: "/home",
      profileData: profileData,
      onGoingContestsData: onGoingContestsData,
      upComingContestsData: upComingContestsData,
      ADMIN_URL: process.env.ADMIN_URL,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching profile:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// app home page

router.get("/app/contest-view/:id", async function (req, res) {
  const contest_id = req.params.id;
  if (!req.session.appUserToken) {
    return res.redirect("/login");
  }

  const contestDetailResponse = await axios.get(
    `${process.env.API_URL}contest-details/${contest_id}`,
    {
      headers: {
        Authorization: `Bearer ${req.session.appUserToken}`,
      },
    }
  );
  const contestDetailData = contestDetailResponse.data;
  if (contestDetailData.status === 0) {
    return res.redirect("/app/home");
  }

  res.render("app/contest-view", {
    title: "Contests",
    path: "/contests",
    contestDetailData: contestDetailData,
  });
});

router.get("/app/participate/:id", async function (req, res) {
  const contest_id = req.params.id;
  if (!req.session.appUserToken) {
    return res.redirect("/login");
  }

  const contestDetailResponse = await axios.get(
    `${process.env.API_URL}contest/${contest_id}`
  );
  const contestDetailData = contestDetailResponse.data;
  if (contestDetailData.status === 0) {
    return res.redirect("/app/home");
  }

  const genreApiResponse = await axios.get(`${process.env.API_URL}all/genre`);

  const genreData = genreApiResponse.data.result;

  res.render("app/participate", {
    title: "Participate",
    path: "/contests",
    contestDetailData: contestDetailData,
    genreData: genreData,
  });
});

router.get("/app/contests", async function (req, res) {
  try {
    if (!req.session.appUserToken) {
      return res.redirect("/login");
    }

    const profileResponse = await axios.get(
      `${process.env.API_URL}getappUserProfile`,
      {
        headers: {
          Authorization: `Bearer ${req.session.appUserToken}`,
        },
      }
    );

    const profileData = profileResponse.data.result;

    if (!profileData.name.first_name && !profileData.name.last_name) {
      return res.redirect("/new-profile");
    }

    const onGoingContestsResponse = await axios.post(
      `${process.env.API_URL}all/contest`,
      {
        data: {
          type: "ongoing",
        },
      }
    );

    const onGoingContestsData = onGoingContestsResponse.data;

    const upComingContestsResponse = await axios.post(
      `${process.env.API_URL}all/contest`,
      {
        data: {
          type: "upcoming",
        },
      }
    );

    const upComingContestsData = upComingContestsResponse.data;

    return res.render("app/contests", {
      title: "Contests",
      path: "/contests",
      profileData: profileData,
      onGoingContestsData: onGoingContestsData,
      upComingContestsData: upComingContestsData,
      ADMIN_URL: process.env.ADMIN_URL,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching profile:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/app/my-contests", function (req, res) {
  res.render("app/my-contests", {
    title: "My Contests",
    path: "/my-contests",
    link: "/my-contests",
  });
});

router.get("/app/my-votes", function (req, res) {
  res.render("app/my-votes", {
    title: "My Votes",
    path: "/my-contests",
    link: "/my-contest-votes",
  });
});

router.get("/app/my-contest-favs", function (req, res) {
  res.render("app/my-contest-favs", {
    title: "My Contest favorites",
    path: "/my-contests",
    link: "/my-contest-favs",
  });
});

router.get("/app/pre-participate/:contest_id", async function (req, res) {
  try {
    if (!req.session.appUserToken) {
      return res.redirect("/login");
    }

    const contest_id = req.params.contest_id;

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

    if (!profileData.name.first_name && !profileData.name.last_name) {
      return res.redirect("/new-profile");
    }

    const genreApiResponse = await axios.get(`${process.env.API_URL}all/genre`);

    const genreData = genreApiResponse.data.result;

    const contestDetailsResponse = await axios.get(
      `${process.env.API_URL}contest-details/${contest_id}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.appUserToken}`,
        },
      }
    );
    const contestDetailsData = contestDetailsResponse.data;
    let isParticipated = false;

    const userIdExists = contestDetailsData.result.participates.some(
      (participant) => participant.user._id === userId
    );
    if (userIdExists) {
      isParticipated = true;
      const participatedParticipant =
        contestDetailsData.result.participates.find(
          (participant) => participant.user._id === userId
        );

      res.render("app/pre_my-contests", {
        title: "Participate",
        path: "/contests",
        isParticipated: isParticipated,
        participatedParticipantData: participatedParticipant,
        contestDetailsData: contestDetailsData,
        genreData: genreData,
        profileData: profileData,
      });
    } else {
      res.render("app/pre_my-contests", {
        title: "Participate",
        path: "/contests",
        isParticipated: isParticipated,
        contestDetailsData: contestDetailsData,
        genreData: genreData,
        profileData: profileData,
      });
    }
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching profile:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/app/pre-home", async function (req, res) {
  try {
    if (!req.session.appUserToken) {
      return res.redirect("/login");
    }
    const contest_id = "64d4a16ec4292ce3c4cd47a0";

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

    const contestDetailsResponse = await axios.get(
      `${process.env.API_URL}contest-details/${contest_id}`,
      {
        headers: {
          Authorization: `Bearer ${req.session.appUserToken}`,
        },
      }
    );

    const contestDetailsData = contestDetailsResponse.data;
    // const isParticipated = contestDetailsData.result.isParticipated;
    let isParticipated = false;

    const userIdExists = contestDetailsData.result.participates.some(
      (participant) => participant.user._id === userId
    );
    if (userIdExists) {
      isParticipated = true;
    }

    res.render("app/pre_home", {
      title: "Home",
      path: "/home",
      isParticipated,
      onGoingContestsData: contestDetailsData,
      profileData: profileData,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching profile:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
