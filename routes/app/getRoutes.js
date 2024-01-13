const express = require("express");
const axios = require("axios");
const router = express.Router();

// router.get("/app/home", async function (req, res) {
//   try {
//     if (!req.session.appUserToken) {
//       return res.redirect("/login");
//     }

//     const profileResponse = await axios.get(
//       `${process.env.API_URL}getappUserProfile`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );

//     const profileData = profileResponse.data.result;

// if (
//   !profileData.name ||
//   (!profileData.name.first_name && !profileData.name.last_name)
// ) {
//   return res.redirect("/new-profile");
// }

//     const onGoingContestsResponse = await axios.post(
//       `${process.env.API_URL}all/contest`,
//       {
//           type: "ongoing",
//         },
//     );

//     const onGoingContestsData = onGoingContestsResponse.data;

//     const upComingContestsResponse = await axios.post(
//       `${process.env.API_URL}all/contest`,
//       {
//           type: "upcoming",
//         },
//     );

//     const upComingContestsData = upComingContestsResponse.data;

//     return res.render("app/home", {
//       title: "Home",
//       path: "/home",
//       profileData: profileData,
//       onGoingContestsData: onGoingContestsData,
//       upComingContestsData: upComingContestsData,
//       ADMIN_URL: process.env.ADMIN_URL,
//     });
//   } catch (error) {
//     // Handle errors gracefully
//     console.error("Error fetching profile:", error);
//     // return res.status(500).send("Internal Server Error");
//     res.render("500", {
//       title: "500 Server error!",
//       path: "/500",
//     });
//   }
// });

// router.get("/app/contest-view/:id", async function (req, res) {
//   const contest_id = req.params.id;
//   if (!req.session.appUserToken) {
//     return res.redirect("/login");
//   }

//   const profileResponse = await axios.get(
//     `${process.env.API_URL}getappUserProfile`,
//     {
//       headers: {
//         Authorization: `Bearer ${req.session.appUserToken}`,
//       },
//     }
//   );

//   const profileData = profileResponse.data.result;
//   const userId = profileData._id;

//   const contestDetailResponse = await axios.get(
//     `${process.env.API_URL}contest-details/${contest_id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${req.session.appUserToken}`,
//       },
//     }
//   );
//   const contestDetailData = contestDetailResponse.data;
//   let isParticipated = false;

//   if (contestDetailData.result.participates) {
//     const userIdExists = contestDetailData.result.participates.some(
//       (participant) => participant.user._id === userId
//     );

//     if (userIdExists) {
//       isParticipated = true;
//     }
//   }
//   if (contestDetailData.status === 0) {
//     return res.redirect("/app/home");
//   }

//   res.render("app/contest-view", {
//     title: "Contests",
//     path: "/contests",
//     contestDetailData: contestDetailData,
//     isParticipated,
//   });
// });

// router.get("/app/participate/:id", async function (req, res) {
//   const contest_id = req.params.id;
//   if (!req.session.appUserToken) {
//     return res.redirect("/login");
//   }

//   const profileResponse = await axios.get(
//     `${process.env.API_URL}getappUserProfile`,
//     {
//       headers: {
//         Authorization: `Bearer ${req.session.appUserToken}`,
//       },
//     }
//   );

//   const profileData = profileResponse.data.result;
//   const userId = profileData._id;

//   const contestDetailResponse = await axios.get(
//     `${process.env.API_URL}contest-details/${contest_id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${req.session.appUserToken}`,
//       },
//     }
//   );
//   const contestDetailData = contestDetailResponse.data;
//   if (contestDetailData.status === 0) {
//     return res.redirect("/app/home");
//   }

//   const genreApiResponse = await axios.get(`${process.env.API_URL}all/genre`);

//   const genreData = genreApiResponse.data.result;

//   let isParticipated = false;

//   const userIdExists = contestDetailData.result.participates.some(
//     (participant) => participant.user._id === userId
//   );
//   if (userIdExists) {
//     isParticipated = true;
//     const participatedParticipant = contestDetailData.result.participates.find(
//       (participant) => participant.user._id === userId
//     );

//     res.render("app/participate", {
//       title: "Participate",
//       path: "/contests",
//       isParticipated: isParticipated,
//       participatedParticipantData: participatedParticipant,
//       contestDetailsData: contestDetailData,
//       genreData: genreData,
//       profileData: profileData,
//     });
//   } else {
//     res.render("app/participate", {
//       title: "Participate",
//       path: "/contests",
//       isParticipated: isParticipated,
//       contestDetailsData: contestDetailData,
//       genreData: genreData,
//       profileData: profileData,
//     });
//   }
// });

// router.get("/app/contests", async function (req, res) {
//   try {
//     if (!req.session.appUserToken) {
//       return res.redirect("/login");
//     }

//     const profileResponse = await axios.get(
//       `${process.env.API_URL}getappUserProfile`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );

//     const profileData = profileResponse.data.result;

// if (
//   !profileData.name ||
//   (!profileData.name.first_name && !profileData.name.last_name)
// ) {
//   return res.redirect("/new-profile");
// }

//     const onGoingContestsResponse = await axios.post(
//       `${process.env.API_URL}all/contest`,
//       {
//         type: "ongoing",
//       }
//     );

//     const onGoingContestsData = onGoingContestsResponse.data;

//     const upComingContestsResponse = await axios.post(
//       `${process.env.API_URL}all/contest`,
//       {
//         type: "upcoming",
//       }
//     );

//     const upComingContestsData = upComingContestsResponse.data;

//     return res.render("app/contests", {
//       title: "Contests",
//       path: "/contests",
//       profileData: profileData,
//       onGoingContestsData: onGoingContestsData,
//       upComingContestsData: upComingContestsData,
//       ADMIN_URL: process.env.ADMIN_URL,
//     });
//   } catch (error) {
//     // Handle errors gracefully
//     console.error("Error fetching profile:", error);
//     return res.render("500", {
//       title: "500 Server error!",
//       path: "/500",
//     });
//     // res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/app/my-contests", function (req, res) {
//   res.render("app/my-contests", {
//     title: "My Contests",
//     path: "/my-contests",
//     link: "/my-contests",
//   });
// });

// router.get("/app/my-votes", async function (req, res) {
//   try {
//     if (!req.session.appUserToken) {
//       return res.redirect("/login");
//     }

//     const profileResponse = await axios.get(
//       `${process.env.API_URL}getappUserProfile`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );

//     const votedDataResponse = await axios.get(
//       `${process.env.API_URL}getVotedContestParticipants`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );

//     const profileData = profileResponse.data.result;
//     const votedData = votedDataResponse.data;

//     res.render("app/my-votes", {
//       title: "My Votes",
//       path: "/my-contests",
//       link: "/my-contest-votes",
//       profileData: profileData,
//       votedData: votedData,
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Handle error, e.g., redirect to an error page
//     // res.status(500).render("error", {
//     //   title: "Error",
//     //   message: "An error occurred while fetching data.",
//     // });
//     res.render("500", {
//       title: "500 Server error!",
//       path: "/500",
//     });
//   }
// });

// router.get("/app/my-contest-favs", async function (req, res) {
//   try {
//     if (!req.session.appUserToken) {
//       return res.redirect("/login");
//     }

//     const profileResponse = await axios.get(
//       `${process.env.API_URL}getappUserProfile`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );

//     const favouritesDataResponse = await axios.get(
//       `${process.env.API_URL}getAllFavouriteContestParticipants`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );

//     const profileData = profileResponse.data.result;
//     const favouritesData = favouritesDataResponse.data;

//     const userId = profileData._id;

//     res.render("app/my-contest-favs", {
//       title: "My Contest favorites",
//       path: "/my-contests",
//       link: "/my-contest-favs",
//       profileData: profileData,
//       favouritesData: favouritesData,
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     // Handle error, e.g., redirect to an error page
//     // res.status(500).render("error", {
//     //   title: "Error",
//     //   message: "An error occurred while fetching data.",
//     // });
//     res.render("500", {
//       title: "500 Server error!",
//       path: "/500",
//     });
//   }
// });

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

    if (
      !profileData.name ||
      (!profileData.name.first_name && !profileData.name.last_name)
    ) {
      return res.redirect("/new-profile");
    }

    if (profileData.user_type === "Fan") {
      return res.redirect("/404");
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
    // return res.status(500).send("Internal Server Error");
    res.render("500", {
      title: "500 Server error!",
      path: "/500",
    });
  }
});

router.get("/app/pre-home", async function (req, res) {
  try {
    if (!req.session.appUserToken) {
      return res.redirect("/login");
    }
    const contest_id = process.env.PRE_CONTEST_ID;

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
      !profileData.name ||
      (!profileData.name.first_name && !profileData.name.last_name)
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

    if (contestDetailsData.result.participates) {
      const userIdExists = contestDetailsData.result.participates.some(
        (participant) => participant.user._id === userId
      );

      if (userIdExists) {
        isParticipated = true;
      }
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
    return res.render("500", {
      title: "500 Server error!",
      path: "/500",
    });
  }
});

router.get("/app/pre-contest", async function (req, res) {
  try {
    if (!req.session.appUserToken) {
      return res.redirect("/login");
    }
    const contest_id = process.env.PRE_CONTEST_ID;

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
      !profileData.name ||
      (!profileData.name.first_name && !profileData.name.last_name)
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

    if (contestDetailsData.result.participates) {
      const userIdExists = contestDetailsData.result.participates.some(
        (participant) => participant.user._id === userId
      );

      if (userIdExists) {
        isParticipated = true;
      }
    }

    res.render("app/pre-home-content", {
      title: "Contest",
      path: "/contest",
      isParticipated,
      onGoingContestsData: contestDetailsData,
      profileData: profileData,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching profile:", error);
    return res.render("500", {
      title: "500 Server error!",
      path: "/500",
    });
  }
});
router.get("/imprint", function (req, res) {
  res.render("imprint", {
    title: "Imprint",
    path: "/imprint",
  });
});

// router.get("/app/report", function (req, res) {
//   res.render("app/report", {
//     title: "Report",
//     path: "/report",
//   });
// });

// router.get("/app/reports", function (req, res) {
//   res.render("app/reports", {
//     title: "Reports",
//     path: "/reports",
//     link: "allreports",
//   });
// });
// router.get("/app/active-reports", function (req, res) {
//   res.render("app/active-reports", {
//     title: "Reports",
//     path: "/reports",
//     link: "active",
//   });
// });
// router.get("/app/you-reported", function (req, res) {
//   res.render("app/you-reported", {
//     title: "You reported",
//     path: "/reports",
//     link: "youreported",
//   });
// });

// router.get("/app/report-view", function (req, res) {
//   res.render("app/report-view", {
//     title: "report ID",
//     path: "/reports",
//   });
// });

router.get("/contest", async function (req, res) {
  const contest_id = process.env.PRE_CONTEST_ID;
  let isParticipated = false;

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
      return res.redirect("/contests");
    }

    if (contestDetailData.result.participates) {
      const userIdExists = contestDetailData.result.participates.some(
        (participant) => participant.user._id === userId
      );

      if (userIdExists) {
        isParticipated = true;
      }
    }

    if (
      !profileData.name ||
      (!profileData.name.first_name && !profileData.name.last_name)
    ) {
      return res.redirect("/new-profile");
    }
    return res.render("contest", {
      title: "Contest",
      path: "/contest",
      contestDetailData: contestDetailData,
      ADMIN_URL: process.env.ADMIN_URL,
      isParticipated,
      profileData: profileData,
    });
  } else {
    const contestDetailResponse = await axios.get(
      `${process.env.API_URL}contest/${contest_id}`
    );
    const contestDetailData = contestDetailResponse.data;

    if (contestDetailData.status === 0) {
      return res.redirect("/contests");
    }
    return res.render("contest", {
      title: "Contest",
      path: "/contest",
      contestDetailData: contestDetailData,
      ADMIN_URL: process.env.ADMIN_URL,
      isParticipated,
    });
  }
});

// my profile
// router.get("/app/my-profile", function (req, res) {
//   res.render("app/my-profile", {
//     title: "My Profile",
//     path: "/my-profile",
//   });
// });
// my profile
router.get("/500", function (req, res) {
  res.render("500", {
    title: "500 Server error!",
    path: "/500",
  });
});

module.exports = router;
