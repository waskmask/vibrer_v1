const express = require("express");
const axios = require("axios");
const router = express.Router();
const i18n = require("i18n");

router.get("/contests", async function (req, res) {
  try {
    const onGoingContestsResponse = await axios.post(
      `${process.env.API_URL}all/contest`,
      {
        type: "Active",
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

      if (!profileData.full_name) {
        return res.redirect("/new-profile");
      }
      return res.render("contests", {
        title: i18n.__("contests"),
        path: "/contest",
        onGoingContestsData: onGoingContestsData,
        upComingContestsData: upComingContestsData,
        profileData: profileData,
        ADMIN_URL: process.env.ADMIN_URL,
      });
    } else {
      return res.render("contests", {
        title: i18n.__("contests"),
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

router.get("/contest", async function (req, res) {
  const contest_id = process.env.PRE_CONTEST_ID;
  let isParticipated = false;

  if (req.session.appUserToken) {
    return res.redirect("/app/pre-contest");
  } else {
    const contestDetailResponse = await axios.get(
      `${process.env.API_URL}contest/${contest_id}`
    );
    const contestDetailData = contestDetailResponse.data;

    if (contestDetailData.status === 0) {
      return res.redirect("/contests");
    }

    const activeEntries = contestDetailData.result.participates.filter(
      (participant) => participant.status === "Active"
    );
    const sortedParticipants = activeEntries.sort(
      (a, b) => b.votes.length - a.votes.length
    );

    const participantsWithVotes = sortedParticipants.filter(
      (participant, index) => index < 3 && participant.votes.length > 0
    );
    const participantsWithoutVotes = sortedParticipants.filter(
      (participant, index) => index >= 3 || participant.votes.length === 0
    );

    const participantsWithLeastQuality = participantsWithoutVotes.filter(
      (participant) => participant.least_quality
    );
    const participantsWithoutLeastQuality = participantsWithoutVotes.filter(
      (participant) => !participant.least_quality
    );

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledParticipants = shuffle(participantsWithoutLeastQuality);

    return res.render("contest", {
      title: i18n.__("vscontest"),
      path: "/contest",
      contestDetailData: contestDetailData,
      ADMIN_URL: process.env.ADMIN_URL,
      participantsWithVotes: participantsWithVotes,
      participantsWithoutLeastQuality: shuffledParticipants,
      participantsWithLeastQuality: participantsWithLeastQuality,
    });
  }
});

// router.get("/contest", async function (req, res) {
//   const contest_id = process.env.PRE_CONTEST_ID;
//   let isParticipated = false;

//   if (req.session.appUserToken) {
//     const profileResponse = await axios.get(
//       `${process.env.API_URL}getappUserProfile`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );

//     const profileData = profileResponse.data.result;
//     const userId = profileData._id;

//     const contestDetailResponse = await axios.get(
//       `${process.env.API_URL}contest-details/${contest_id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${req.session.appUserToken}`,
//         },
//       }
//     );
//     const contestDetailData = contestDetailResponse.data;

//     if (contestDetailData.status === 0) {
//       return res.redirect("/contests");
//     }

//     if (contestDetailData.result.participates) {
//       const userIdExists = contestDetailData.result.participates.some(
//         (participant) => participant.user._id === userId
//       );

//       if (userIdExists) {
//         isParticipated = true;
//       }
//     }

//     if (!profileData.full_name) {
//       return res.redirect("/new-profile");
//     }
//     return res.render("contest", {
//       title: i18n.__("vscontest"),
//       path: "/contest",
//       contestDetailData: contestDetailData,
//       ADMIN_URL: process.env.ADMIN_URL,
//       isParticipated,
//       profileData: profileData,
//     });
//   } else {
//     const contestDetailResponse = await axios.get(
//       `${process.env.API_URL}contest/${contest_id}`
//     );
//     const contestDetailData = contestDetailResponse.data;

//     if (contestDetailData.status === 0) {
//       return res.redirect("/contests");
//     }
//     return res.render("contest", {
//       title: i18n.__("vscontest"),
//       path: "/contest",
//       contestDetailData: contestDetailData,
//       ADMIN_URL: process.env.ADMIN_URL,
//       isParticipated,
//     });
//   }
// });

module.exports = router;
