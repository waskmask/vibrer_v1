const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/register", function (req, res) {
  if (req.session.appUserToken) {
    return res.redirect("/app/pre-home");
  }
  return res.render("register", { title: "Register", path: "/register" });
});

router.get("/login", (req, res) => {
  if (req.session.appUserToken) {
    return res.redirect("/app/pre-home");
  }

  return res.render("login", { title: "Login", path: "/login" });
});

router.get("/forgot-password", function (req, res) {
  res.render("forgotpass", {
    title: "Forgot password",
    path: "/forgot-password",
  });
});

router.get("/reset-password", function (req, res) {
  if (!req.query.token) {
    return res.redirect("/login");
  }
  return res.render("reset-password", {
    title: "Reset password",
    path: "/reset-password",
    token: req.query.token,
  });
});

router.get("/email-verified", async function (req, res) {
  if (!req.query.token) {
    return res.redirect("/404");
  }
  const token = req.query.token;
  try {
    const tokenResponse = await axios.post(
      `${process.env.API_URL}appUser/verification-code`,
      {
        token: token,
      }
    );
    if (tokenResponse) {
      if (tokenResponse.data.status === 1) {
        res.render("email-verified", {
          title: "Email verified",
          path: "/email-verified",
          tokenResponse: tokenResponse.data,
        });
      } else {
        return res.redirect("/404");
      }
    } else {
      return res.redirect("/500");
    }
  } catch (error) {
    return res.redirect("/500");
  }
});

module.exports = router;
