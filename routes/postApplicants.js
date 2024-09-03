const express = require("express");
const router = express.Router();
const Project = require("../models/postProject"); // assuming this is the path to your model
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

router.post("/addApplicant/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const newApplicant = req.body;

  if (
    !newApplicant.firstName ||
    !newApplicant.lastName ||
    !newApplicant.email ||
    !newApplicant.phone ||
    !newApplicant.city ||
    !newApplicant.link
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the project exists
  const projectDetails = await Project.findById(projectId);
  if (!projectDetails) {
    return res.status(404).json({ message: "Project not found" });
  }

  try {
    await Project.updateOne(
      { _id: projectId },
      {
        $push: { applicants: newApplicant },
      },
      { runValidators: true }
    );

    // Read the email template
    const emailTemplatePath = path.join(
      __dirname,
      "..",
      "emails",
      "applProjectEmail.html"
    );
    let emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");
    emailTemplate = emailTemplate.replace(
      "[firstName & lastName]",
      `${newApplicant.firstName} ${newApplicant.lastName}`
    );

    // Replace other placeholders
    emailTemplate = emailTemplate.replace(
      "[Singer]",
      projectDetails.requirements.ArtistType
    );
    emailTemplate = emailTemplate.replace(
      "[projectLink]",
      `https://vibrer.app/project-view/${projectId}`
    );

    // Set up transporter and send email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"Vibrer" <subscriptions@vibrer.app>',
      to: req.body.email,
      subject: "Application Received",
      html: emailTemplate,
    });

    res.status(200).json({ message: "Applicant successfully added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
