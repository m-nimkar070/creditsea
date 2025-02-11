const express = require("express");
const cors = require("cors");
const creditRoutes = require("./routes/creditRoutes");

const app = express();

// Allow CORS for all origins (Render sometimes ignores middleware)
app.use(cors("*"));

// Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Incoming request from origin:", req.headers.origin);
  next();
});
// Routes
app.use("/api", creditRoutes);

module.exports = app;