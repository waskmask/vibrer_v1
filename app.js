require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

// Import controllers
const notifyController = require("./controllers/notifyController");
const projectRoutes = require("./routes/projectRoutes");
const viewRoutes = require("./routes/viewRoutes");
const contestRoutes = require("./routes/contestRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postApplicants = require("./routes/postApplicants");

// app routes
const getRoutes = require("./routes/app/getRoutes");

// Create the server
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Post Routes
app.post("/api/v1/notify", notifyController.addToNotifyList);
app.use("/api", projectRoutes);

app.use("/", viewRoutes);
app.use("/", contestRoutes);
app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", postApplicants);

app.get("/register-email", (req, res) => {
  res.render("email-templates/registration");
});
// app routes
app.use("/", getRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
